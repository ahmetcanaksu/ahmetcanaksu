/*
 * The CV and cover-letter PDFs are rendered from the CVMaker submodule
 * (public/cv/cv.html, public/cv/letter.html) by headless Chrome instead of
 * being exported by hand and committed. The HTML data blocks are the only
 * source, so a PDF can't fall behind them.
 *
 *   pnpm build   renders every PDF into dist/ after the bundle
 *   pnpm dev     renders the same URLs on request, again whenever the HTML changes
 *
 * Every link to a PDF carries ?v=<hash of the source HTML> (see
 * src/lib/docs.js). The file names stay the same, so links already out in the
 * world keep working, but a browser or CDN holding yesterday's copy under the
 * same name is forced to fetch the new one.
 *
 * Chrome is driven through puppeteer-core, which ships no browser of its own:
 * set CHROME_PATH, or it finds a normal Chrome/Chromium/Edge install.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";
import { PDFDocument } from "pdf-lib";

const KEYWORDS = [
  "Ahmetcan Aksu", "Full Stack Developer", "Software Developer", "Backend Developer", "Fintech", "AI",
  "LLM", "TEFAS", "Node.js", "TypeScript", "C#", ".NET", "Rust", "React",
  "MSSQL", "PostgreSQL", "Redis",
];

export const DOCS = {
  cv: {
    source: "cv.html",
    files: { en: "Ahmetcan Aksu CV EN.pdf", tr: "Ahmetcan Aksu CV TR.pdf" },
    maxPages: 2,
    meta: {
      en: { title: "Ahmetcan Aksu — Full Stack Developer — CV", subject: "Curriculum vitae of Ahmetcan Aksu, full stack developer" },
      tr: { title: "Ahmetcan Aksu — Full Stack Developer — Özgeçmiş", subject: "Ahmetcan Aksu özgeçmişi, full stack geliştirici" },
    },
    hint: "Lower layout.baseFontPt in public/cv/cv.html.",
  },
  letter: {
    source: "letter.html",
    files: { en: "Ahmetcan Aksu Cover Letter EN.pdf", tr: "Ahmetcan Aksu Cover Letter TR.pdf" },
    maxPages: 1,
    meta: {
      en: { title: "Ahmetcan Aksu — Cover Letter", subject: "Cover letter of Ahmetcan Aksu, software developer" },
      tr: { title: "Ahmetcan Aksu — Ön Yazı", subject: "Ahmetcan Aksu ön yazısı, yazılım geliştirici" },
    },
    hint: "Shorten the letter or lower layout.baseFontPt in public/cv/letter.html.",
  },
};

const LANGS = ["en", "tr"];

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
].filter(Boolean);

const findChrome = () => {
  const found = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
  if (!found) {
    throw new Error(
      "[doc-pdfs] No Chrome found to render the PDFs. Install Chrome or set CHROME_PATH."
    );
  }
  return found;
};

/* One short hash over every source document: the ?v= on every PDF link. */
export const docsVersion = (dir) => {
  const h = crypto.createHash("sha256");
  for (const doc of Object.values(DOCS)) {
    const file = path.join(dir, doc.source);
    h.update(fs.existsSync(file) ? fs.readFileSync(file) : "");
  }
  return h.digest("hex").slice(0, 10);
};

async function renderOne(browser, html, lang, doc) {
  const page = await browser.newPage();
  try {
    // The documents make no network requests, so a file:// URL is enough.
    await page.goto(`${pathToFileURL(html).href}#${lang}`, { waitUntil: "load" });
    // A fresh profile has no remembered type size, so the PDF always uses
    // layout.baseFontPt from the data block — the value tuned for the page count.
    await page.waitForFunction(
      (l) =>
        document.documentElement.lang === l &&
        document.getElementById("sheet")?.children.length > 0,
      {},
      lang
    );
    await page.emulateMediaType("print");
    const raw = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      tagged: true, // a structure tree: screen readers and some parsers use it
      outline: false,
    });

    // Metadata is part of what a résumé parser reads; Chrome only sets a title.
    const pdf = await PDFDocument.load(raw);
    pdf.setTitle(doc.meta[lang].title);
    pdf.setAuthor("Ahmetcan Aksu");
    pdf.setSubject(doc.meta[lang].subject);
    pdf.setKeywords(KEYWORDS);
    pdf.setCreator(`CVMaker (${doc.source})`);
    pdf.setProducer("ahmetcanaksu.com");
    pdf.setLanguage(lang === "tr" ? "tr-TR" : "en-US");
    return { bytes: Buffer.from(await pdf.save()), pages: pdf.getPageCount() };
  } finally {
    await page.close();
  }
}

/* jobs: [{ key: "cv", lang: "en" }, ...]; dir holds cv.html and letter.html */
export async function renderDocs(dir, jobs) {
  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: true,
    args: ["--no-sandbox", "--font-render-hinting=none"],
  });
  try {
    const out = [];
    for (const { key, lang } of jobs) {
      const doc = DOCS[key];
      const html = path.join(dir, doc.source);
      if (!fs.existsSync(html)) {
        throw new Error(
          `${path.relative(process.cwd(), html)} is missing — run \`git submodule update --init\`.`
        );
      }
      out.push({ key, lang, doc, file: doc.files[lang], ...(await renderOne(browser, html, lang, doc)) });
    }
    return out;
  } finally {
    await browser.close();
  }
}

const allJobs = () =>
  Object.keys(DOCS).flatMap((key) => LANGS.map((lang) => ({ key, lang })));

export default function docPdfs() {
  let root;
  let outDir;
  const cache = new Map(); // "key/lang" -> { mtime, bytes }

  return {
    name: "doc-pdfs",

    /* The version the site's PDF links carry. In dev it is computed once at
       startup; restart `pnpm dev` after editing the HTML to refresh the links
       (the PDFs themselves re-render on request either way). */
    config(config) {
      const dir = path.resolve(config.root || process.cwd(), "public/cv");
      return { define: { __DOCS_VERSION__: JSON.stringify(docsVersion(dir)) } };
    },

    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },

    configureServer(server) {
      const dir = path.join(root, "public/cv");
      const byUrl = {};
      for (const [key, doc] of Object.entries(DOCS))
        for (const lang of LANGS) byUrl["/" + encodeURI(doc.files[lang])] = { key, lang };

      server.middlewares.use(async (req, res, next) => {
        const job = byUrl[(req.url || "").split("?")[0]];
        if (!job) return next();
        try {
          const html = path.join(dir, DOCS[job.key].source);
          const mtime = fs.existsSync(html) ? fs.statSync(html).mtimeMs : 0;
          const id = `${job.key}/${job.lang}`;
          let hit = cache.get(id);
          if (!hit || hit.mtime !== mtime) {
            const [r] = await renderDocs(dir, [job]);
            hit = { mtime, bytes: r.bytes };
            cache.set(id, hit);
          }
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader("Cache-Control", "no-store");
          res.end(hit.bytes);
        } catch (err) {
          server.config.logger.error(`[doc-pdfs] ${err.message}`);
          res.statusCode = 500;
          res.end(`PDF render failed: ${err.message}`);
        }
      });
    },

    async writeBundle() {
      const rendered = await renderDocs(path.join(outDir, "cv"), allJobs());
      for (const { doc, file, bytes, pages } of rendered) {
        fs.writeFileSync(path.join(outDir, file), bytes);
        this.info?.(`${file} — ${pages} page(s)`);
        if (pages > doc.maxPages) {
          this.warn(`${file} is ${pages} pages, over its ${doc.maxPages}. ${doc.hint}`);
        }
      }
    },
  };
}
