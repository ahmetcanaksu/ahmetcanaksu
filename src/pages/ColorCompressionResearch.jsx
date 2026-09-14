import { useEffect, useRef, useState } from "react";
import PageHeader from "../components/PageHeader";

const W = 320;
const H = 176;

const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);

/* HSL (0-360, 0-1, 0-1) -> [r,g,b] 0-255 */
function hslToRgb(h, s, l) {
  h /= 360;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h * 12) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

/* A synthetic test frame: saturated colour bars over a smooth hue/brightness
   gradient — sharp chroma edges plus smooth areas, ideal for seeing subsampling. */
function buildSource() {
  const d = new Uint8ClampedArray(W * H * 4);
  const bars = [
    [235, 45, 45],
    [45, 210, 70],
    [60, 95, 240],
    [240, 220, 45],
    [45, 205, 215],
    [225, 65, 215],
    [240, 240, 240],
  ];
  const barTop = Math.floor(H * 0.46);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let r, g, b;
      if (y < barTop) {
        const bi = Math.min(bars.length - 1, Math.floor(x / (W / bars.length)));
        [r, g, b] = bars[bi];
      } else {
        const hue = (x / W) * 300;
        const t = (y - barTop) / (H - barTop);
        [r, g, b] = hslToRgb(hue, 0.72, 0.62 - t * 0.32);
      }
      const i = (y * W + x) * 4;
      d[i] = r;
      d[i + 1] = g;
      d[i + 2] = b;
      d[i + 3] = 255;
    }
  }
  return d;
}

/* Colour-space transforms. Chroma channels are centred at 0. */
const SPACES = {
  yuv: {
    name: "Y′CbCr (YUV)",
    chroma: ["U · Cb", "V · Cr"],
    to: (r, g, b) => [
      0.299 * r + 0.587 * g + 0.114 * b,
      -0.168736 * r - 0.331264 * g + 0.5 * b,
      0.5 * r - 0.418688 * g - 0.081312 * b,
    ],
    from: (Y, c1, c2) => [
      Y + 1.402 * c2,
      Y - 0.344136 * c1 - 0.714136 * c2,
      Y + 1.772 * c1,
    ],
    matrix: `Y  =  0.299·R + 0.587·G + 0.114·B
Cb = −0.169·R − 0.331·G + 0.500·B   (+128)
Cr =  0.500·R − 0.419·G − 0.081·B   (+128)`,
  },
  yiq: {
    name: "YIQ (NTSC)",
    chroma: ["I · in-phase", "Q · quadrature"],
    to: (r, g, b) => [
      0.299 * r + 0.587 * g + 0.114 * b,
      0.596 * r - 0.274 * g - 0.322 * b,
      0.211 * r - 0.523 * g + 0.312 * b,
    ],
    from: (Y, c1, c2) => [
      Y + 0.956 * c1 + 0.621 * c2,
      Y - 0.272 * c1 - 0.647 * c2,
      Y + 1.106 * c1 - 1.703 * c2,
    ],
    matrix: `Y = 0.299·R + 0.587·G + 0.114·B
I = 0.596·R − 0.274·G − 0.322·B
Q = 0.211·R − 0.523·G + 0.312·B`,
  },
};

const MODES = {
  "444": { bw: 1, bh: 1, bpp: 3, label: "4:4:4" },
  "422": { bw: 2, bh: 1, bpp: 2, label: "4:2:2" },
  "420": { bw: 2, bh: 2, bpp: 1.5, label: "4:2:0" },
};

const paint = (canvas, arr) => {
  if (!canvas) return;
  canvas.getContext("2d").putImageData(new ImageData(arr, W, H), 0, 0);
};

const Stage = ({ n, title, badge, caption, canvasRef }) => (
  <figure className="overflow-hidden rounded-sm border border-rule bg-paper-2/40">
    <figcaption className="flex items-center gap-2 border-b border-rule px-3 py-2">
      <span className="meta">{n}</span>
      <span className="text-sm font-semibold text-ink">{title}</span>
      {badge && <span className="meta ml-auto text-accent">{badge}</span>}
    </figcaption>
    <canvas ref={canvasRef} width={W} height={H} className="block h-auto w-full" />
    <p className="px-3 py-2 text-xs leading-relaxed text-ink-3">{caption}</p>
  </figure>
);

const ColorCompressionExperiment = () => {
  const [space, setSpace] = useState("yuv");
  const [mode, setMode] = useState("420");
  const [stats, setStats] = useState({ bpp: 1.5, reduction: 50, psnr: 0 });

  const src = useRef(null);
  const orig = useRef(null);
  const luma = useRef(null);
  const chroma = useRef(null);
  const recon = useRef(null);
  const diff = useRef(null);

  useEffect(() => {
    src.current = buildSource();
  }, []);

  useEffect(() => {
    if (!src.current) return;
    const d = src.current;
    const conv = SPACES[space];
    const m = MODES[mode];
    const N = W * H;

    const Y = new Float32Array(N);
    const C1 = new Float32Array(N);
    const C2 = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const j = i * 4;
      const [y, c1, c2] = conv.to(d[j], d[j + 1], d[j + 2]);
      Y[i] = y;
      C1[i] = c1;
      C2[i] = c2;
    }

    paint(orig.current, d);

    const lum = new Uint8ClampedArray(N * 4);
    for (let i = 0; i < N; i++) {
      const v = clamp(Y[i]);
      const j = i * 4;
      lum[j] = lum[j + 1] = lum[j + 2] = v;
      lum[j + 3] = 255;
    }
    paint(luma.current, lum);

    const chr = new Uint8ClampedArray(N * 4);
    for (let i = 0; i < N; i++) {
      const [r, g, b] = conv.from(128, C1[i], C2[i]);
      const j = i * 4;
      chr[j] = clamp(r);
      chr[j + 1] = clamp(g);
      chr[j + 2] = clamp(b);
      chr[j + 3] = 255;
    }
    paint(chroma.current, chr);

    // subsample chroma over bw×bh blocks, then replicate back
    const C1s = new Float32Array(N);
    const C2s = new Float32Array(N);
    for (let by = 0; by < H; by += m.bh) {
      for (let bx = 0; bx < W; bx += m.bw) {
        let s1 = 0;
        let s2 = 0;
        let cnt = 0;
        for (let yy = 0; yy < m.bh && by + yy < H; yy++) {
          for (let xx = 0; xx < m.bw && bx + xx < W; xx++) {
            const px = (by + yy) * W + (bx + xx);
            s1 += C1[px];
            s2 += C2[px];
            cnt++;
          }
        }
        const a1 = s1 / cnt;
        const a2 = s2 / cnt;
        for (let yy = 0; yy < m.bh && by + yy < H; yy++) {
          for (let xx = 0; xx < m.bw && bx + xx < W; xx++) {
            const px = (by + yy) * W + (bx + xx);
            C1s[px] = a1;
            C2s[px] = a2;
          }
        }
      }
    }

    const rec = new Uint8ClampedArray(N * 4);
    const dif = new Uint8ClampedArray(N * 4);
    let mse = 0;
    for (let i = 0; i < N; i++) {
      const [r, g, b] = conv.from(Y[i], C1s[i], C2s[i]);
      const rr = clamp(r);
      const gg = clamp(g);
      const bb = clamp(b);
      const j = i * 4;
      rec[j] = rr;
      rec[j + 1] = gg;
      rec[j + 2] = bb;
      rec[j + 3] = 255;
      const dr = d[j] - rr;
      const dg = d[j + 1] - gg;
      const db = d[j + 2] - bb;
      mse += dr * dr + dg * dg + db * db;
      dif[j] = clamp(Math.abs(dr) * 6);
      dif[j + 1] = clamp(Math.abs(dg) * 6);
      dif[j + 2] = clamp(Math.abs(db) * 6);
      dif[j + 3] = 255;
    }
    paint(recon.current, rec);
    paint(diff.current, dif);

    mse /= N * 3;
    const psnr = mse <= 0.01 ? 99 : 10 * Math.log10((255 * 255) / mse);
    setStats({
      bpp: m.bpp,
      reduction: Math.round((1 - m.bpp / 3) * 1000) / 10,
      psnr: Math.round(psnr * 10) / 10,
    });
  }, [space, mode]);

  const conv = SPACES[space];
  const m = MODES[mode];

  const btn = (active) =>
    `text-sm transition-colors ${
      active
        ? "text-accent underline decoration-accent underline-offset-4"
        : "text-ink-3 hover:text-ink"
    }`;

  return (
    <div className="wrap py-16 sm:py-20">
      <PageHeader kicker="Experiment · live" title="Compressing color.">
        How analog TV and modern video shrink an image by throwing away color
        detail your eyes barely notice. Everything below is computed live in your
        browser on a canvas — no libraries.
      </PageHeader>

      <div className="prose-paper max-w-3xl">
        <p>
          A pixel in RGB spends one byte each on red, green and blue — three bytes,
          all treated equally. But human vision has far more brightness receptors
          than color ones, so we&apos;re much better at seeing fine{" "}
          <strong>luminance</strong> detail than fine <strong>color</strong>. The
          trick, used by NTSC television in the 1950s and by JPEG and every video
          codec since, is to separate an image into a brightness channel and two
          color-difference channels — then keep brightness sharp and blur the color.
        </p>
      </div>

      {/* Controls */}
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <div className="flex items-center gap-4">
          <span className="meta">Color space</span>
          {Object.keys(SPACES).map((k) => (
            <button key={k} onClick={() => setSpace(k)} className={btn(space === k)}>
              {SPACES[k].name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="meta">Subsampling</span>
          {Object.keys(MODES).map((k) => (
            <button key={k} onClick={() => setMode(k)} className={btn(mode === k)}>
              {MODES[k].label}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Stage
          n="01"
          title="Original · RGB"
          badge="3 B/px · 24-bit"
          canvasRef={orig}
          caption="Every pixel stores R, G and B — three bytes, full resolution."
        />
        <Stage
          n="02"
          title="Luma · Y"
          badge="kept sharp"
          canvasRef={luma}
          caption="Brightness only — the channel we keep at full resolution, and all a black-&-white set ever showed."
        />
        <Stage
          n="03"
          title={`Chroma · ${conv.chroma[0]} / ${conv.chroma[1]}`}
          badge="the color"
          canvasRef={chroma}
          caption="Color with brightness removed. This is the part we're allowed to blur."
        />
        <Stage
          n="04"
          title={`Reconstructed · ${m.label}`}
          badge={
            stats.reduction > 0
              ? `${stats.bpp} B/px · −${stats.reduction}%`
              : `${stats.bpp} B/px`
          }
          canvasRef={recon}
          caption={`Full-res luma + ${m.label} chroma, converted back to RGB. Often near-indistinguishable from the original.`}
        />
      </div>

      {/* Error + stats */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Stage
          n="05"
          title="Error · ×6"
          badge="what was lost"
          canvasRef={diff}
          caption="Per-pixel difference, amplified 6×. Color bleeds at sharp edges — exactly where subsampling costs the most, and where flat areas cost nothing."
        />
        <div className="lg:col-span-2 rounded-sm border border-rule p-5">
          <p className="meta">Numbers for {m.label}</p>
          <dl className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <dt className="meta">Per pixel</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-ink">
                {stats.bpp}<span className="text-base text-ink-3"> B</span>
              </dd>
            </div>
            <div>
              <dt className="meta">Data saved</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-accent">
                {stats.reduction}%
              </dd>
            </div>
            <div>
              <dt className="meta">Quality (PSNR)</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-ink">
                {stats.psnr >= 99 ? "∞" : stats.psnr}
                <span className="text-base text-ink-3"> dB</span>
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-ink-2">
            <strong>4:4:4</strong> keeps full color (same size as RGB, just
            decorrelated). <strong>4:2:2</strong> halves color horizontally — 2
            bytes/pixel, a third smaller. <strong>4:2:0</strong> halves it both
            ways — 1.5 bytes/pixel, half the data — and is what JPEG, H.264 and
            most streaming video use by default.
          </p>
        </div>
      </div>

      {/* Math */}
      <div className="prose-paper mt-14 max-w-3xl">
        <h2>The transform</h2>
        <p>
          The forward matrix for <strong>{conv.name}</strong>. Y is a weighted sum
          that matches the eye&apos;s brightness response; the other two rows encode
          color as differences from it:
        </p>
        <pre>{conv.matrix}</pre>
        <p>
          Because Y already carries most of the perceptible detail, the two color
          rows can be stored at a fraction of the resolution. Averaging them over
          2×1 ({MODES["422"].label}) or 2×2 ({MODES["420"].label}) blocks and
          stretching them back is the whole of chroma subsampling — a lossy step so
          well-matched to human vision that it&apos;s been hiding in plain sight on
          every screen for seventy years.
        </p>
      </div>
    </div>
  );
};

export default ColorCompressionExperiment;
