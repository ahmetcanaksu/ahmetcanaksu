/*
 * Emits dist/tr/index.html: the same app shell as dist/index.html, with the
 * Turkish <html lang>, title, description and social tags baked in.
 *
 * It has to be a real file. Search engines ignore everything after "#", so the
 * English pages are all indexed as https://ahmetcanaksu.com/ and the Turkish
 * ones need a path of their own: https://ahmetcanaksu.com/tr/. GitHub Pages
 * serves /tr/ from tr/index.html, and the app reads the language from the path
 * (src/i18n/LangContext.jsx).
 *
 * In `pnpm dev` there is nothing to do: Vite's SPA fallback already serves
 * index.html at /tr/.
 */
import fs from "node:fs";
import path from "node:path";

const SITE = "https://ahmetcanaksu.com";

const TR = {
  title: "Ahmetcan Aksu - Full Stack Developer · Fintek & Yapay Zeka",
  description:
    "İstanbul'da .NET, Node.js, React ve Rust ile çalışan full stack geliştirici: banka ve TEFAS entegrasyonları, LLM tabanlı uygulamalar ve Ellie programlama dili.",
  shortDescription:
    ".NET, Node.js, React ve Rust ile full stack geliştirme: banka ve TEFAS entegrasyonları, LLM tabanlı uygulamalar ve Ellie programlama dili.",
  keywords:
    "Ahmetcan Aksu, Full Stack Developer, Yazılım Geliştirici, Backend Geliştirici, Fintek, Yapay Zeka, LLM, TEFAS, Rust, React, Programlama Dili, Ellie Language, UtilStation, Türkiye, İstanbul",
  url: `${SITE}/tr/`,
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

/* Replace the content="" of <meta name|property="key">, however it is wrapped. */
const setMeta = (html, key, value) => {
  const re = new RegExp(
    `(<meta\\s+(?:name|property)="${key.replace(/[.:]/g, "\\$&")}"\\s+content=")[^"]*(")`
  );
  if (!re.test(html)) throw new Error(`[tr-entry] <meta ${key}> not found in index.html`);
  return html.replace(re, `$1${esc(value)}$2`);
};

export const toTurkish = (html) => {
  let out = html
    .replace(/<html lang="en">/, '<html lang="tr">')
    .replace(/<title>[^<]*<\/title>/, `<title>${TR.title}</title>`)
    .replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
      `$1${TR.url}$2`
    );
  out = setMeta(out, "title", TR.title);
  out = setMeta(out, "description", TR.description);
  out = setMeta(out, "keywords", TR.keywords);
  out = setMeta(out, "og:url", TR.url);
  out = setMeta(out, "og:title", TR.title);
  out = setMeta(out, "og:description", TR.shortDescription);
  out = setMeta(out, "og:locale", "tr_TR");
  out = setMeta(out, "og:locale:alternate", "en_US");
  out = setMeta(out, "twitter:url", TR.url);
  out = setMeta(out, "twitter:title", TR.title);
  out = setMeta(out, "twitter:description", TR.shortDescription);
  return out;
};

export default function trEntry() {
  let outDir;
  return {
    name: "tr-entry",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    writeBundle() {
      const html = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
      fs.mkdirSync(path.join(outDir, "tr"), { recursive: true });
      fs.writeFileSync(path.join(outDir, "tr/index.html"), toTurkish(html));
    },
  };
}
