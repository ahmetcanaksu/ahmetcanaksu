/* global __DOCS_VERSION__ */

/*
 * Links to the PDFs build/doc-pdfs.js renders from the CVMaker submodule.
 *
 * The file names never change, so links already shared keep working; the
 * ?v= is a hash of the source HTML, so after any edit a browser (or GitHub
 * Pages' CDN) holding the previous copy under the same name fetches the new
 * one instead of showing a stale PDF.
 */
const VERSION = typeof __DOCS_VERSION__ === "string" ? __DOCS_VERSION__ : "";

const FILES = {
  cv: { en: "Ahmetcan Aksu CV EN.pdf", tr: "Ahmetcan Aksu CV TR.pdf" },
  letter: { en: "Ahmetcan Aksu Cover Letter EN.pdf", tr: "Ahmetcan Aksu Cover Letter TR.pdf" },
};

/* "/Ahmetcan%20Aksu%20CV%20TR.pdf?v=1a2b3c4d5e" */
export const docUrl = (kind, lang) =>
  "/" + encodeURI(FILES[kind][lang === "tr" ? "tr" : "en"]) + (VERSION ? `?v=${VERSION}` : "");

/* The name a download is saved under. */
export const docDownloadName = (kind, lang) =>
  FILES[kind][lang === "tr" ? "tr" : "en"].replace(/ /g, "_");
