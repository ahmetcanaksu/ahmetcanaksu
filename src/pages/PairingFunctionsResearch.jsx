import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import PageHeader from "../components/PageHeader";
import { useLang } from "../i18n/LangContext";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const PairingFunctionsExperiment = () => {
  const { t } = useLang();
  const szudzik = (x, y) => (x >= y ? x * x + x + y : y * y + x);
  const cantor = (x, y) => ((x + y) * (x + y + 1)) / 2 + y;
  const bitInterleave = (x, y) => {
    let z = 0;
    for (let i = 0; i < 32; i++) {
      z |= ((y >> i) & 1) << (2 * i);
      z |= ((x >> i) & 1) << (2 * i + 1);
    }
    return z;
  };

  const xs = [],
    ys = [],
    sz = [],
    ca = [],
    bi = [];
  for (let i = 0; i < 100; i++) {
    const x = i + 1;
    const y = i + 2;
    xs.push(x);
    ys.push(y);
    sz.push(szudzik(x, y));
    ca.push(cantor(x, y));
    bi.push(bitInterleave(x, y));
  }

  const tick = "#736c60";
  const grid = "rgba(24,22,18,0.08)";
  const mk = (label, data, color) => ({
    label,
    data,
    borderColor: color,
    backgroundColor: color,
    fill: false,
    pointRadius: 0,
    borderWidth: 2,
  });

  const data = {
    labels: Array.from({ length: 100 }, (_, i) => i + 1),
    datasets: [
      mk("x", xs, "#736c60"),
      mk("y", ys, "#a8a093"),
      mk("Szudzik", sz, "#b4421d"),
      mk("Cantor", ca, "#2b6cb0"),
      mk(t({ en: "Bit interleave", tr: "Bit serpiştirme" }), bi, "#3a7d44"),
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { color: tick, font: { family: "Inter", size: 12 }, boxWidth: 14 },
      },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "index", intersect: false },
    scales: {
      x: {
        title: { display: true, text: t({ en: "Iteration", tr: "Adım" }), color: tick },
        ticks: { color: tick },
        grid: { color: grid },
      },
      y: {
        title: { display: true, text: t({ en: "Value", tr: "Değer" }), color: tick },
        ticks: { color: tick },
        grid: { color: grid },
      },
    },
  };

  return (
    <div className="wrap py-16 sm:py-20">
      <PageHeader
        kicker={t({ en: "Experiment", tr: "Deney" })}
        title={t({
          en: "Pairing functions, compared.",
          tr: "Eşleme fonksiyonları, karşılaştırmalı.",
        })}
      >
        {t({
          en: "A visual and mathematical look at three ways to map two integers into one — Szudzik's, Cantor's, and bit interleaving.",
          tr: "İki tam sayıyı tek bir tam sayıya eşlemenin üç yoluna görsel ve matematiksel bir bakış — Szudzik, Cantor ve bit serpiştirme.",
        })}
      </PageHeader>

      <div className="prose-paper max-w-3xl">
        {t({
          en: (
            <p>
              Pairing functions uniquely encode a pair of integers as a single
              integer. Starting from sequences <strong>x</strong> (from 1) and{" "}
              <strong>y</strong> (from 2), both incrementing over 100 steps, we
              compare how each function grows relative to its inputs.
            </p>
          ),
          tr: (
            <p>
              Eşleme fonksiyonları, bir tam sayı çiftini tek bir tam sayı olarak
              birebir kodlar. <strong>x</strong> (1&apos;den) ve{" "}
              <strong>y</strong> (2&apos;den) dizilerini 100 adım boyunca birer
              birer artırarak, her fonksiyonun girdilerine göre nasıl büyüdüğünü
              karşılaştırıyorum.
            </p>
          ),
        })}

        <h2>{t({ en: "Formulas", tr: "Formüller" })}</h2>
        <pre>
          {t({
            en: `Szudzik   x >= y ? x² + x + y : y² + x
Cantor    (x + y)(x + y + 1) / 2 + y
Interleave  weave the bits of x and y into one integer`,
            tr: `Szudzik   x >= y ? x² + x + y : y² + x
Cantor    (x + y)(x + y + 1) / 2 + y
Interleave  x ve y'nin bitlerini tek bir tam sayıda iç içe ör`,
          })}
        </pre>

        <h2>{t({ en: "Implementation", tr: "Uygulama" })}</h2>
        <pre>{`function szudzik(x, y) {
  return x >= y ? x * x + x + y : y * y + x;
}
function cantor(x, y) {
  return ((x + y) * (x + y + 1)) / 2 + y;
}
function bitInterleave(x, y) {
  let z = 0;
  for (let i = 0; i < 32; i++) {
    z |= ((y >> i) & 1) << (2 * i);
    z |= ((x >> i) & 1) << (2 * i + 1);
  }
  return z;
}`}</pre>
      </div>

      <h2 className="mt-12 mb-4 text-2xl font-semibold">
        {t({ en: "Growth", tr: "Büyüme" })}
      </h2>
      <div className="rounded-sm border border-rule bg-paper-2/40 p-4">
        <div style={{ width: "100%", height: 420 }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PairingFunctionsExperiment;
