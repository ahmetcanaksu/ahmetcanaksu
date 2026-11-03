import { useState } from "react";
import { FiDownload, FiArrowUpRight } from "react-icons/fi";
import { useLang } from "../i18n/LangContext";
import { docUrl, docDownloadName } from "../lib/docs";

/* The PDFs are not files in the repo: build/doc-pdfs.js renders them from
   the CVMaker submodule (public/cv/cv.html, letter.html) with headless Chrome
   on every build, and on request in dev. The HTML versions stay linked for
   tailoring a letter to one application before exporting it. */
const DOCS = {
  cv: {
    label: { en: "CV", tr: "Özgeçmiş" },
    html: "/cv/cv.html",
    pages: { en: "2 pages · A4", tr: "2 sayfa · A4" },
  },
  letter: {
    label: { en: "Cover letter", tr: "Ön yazı" },
    html: "/cv/letter.html",
    pages: { en: "1 page · A4", tr: "1 sayfa · A4" },
  },
};

const Toggle = ({ options, value, onChange, label }) => (
  <div className="flex items-center gap-3 text-sm" role="group" aria-label={label}>
    {options.map(([key, text]) => (
      <button
        key={key}
        onClick={() => onChange(key)}
        aria-pressed={value === key}
        className={`transition-colors ${
          value === key
            ? "text-accent underline decoration-accent underline-offset-4"
            : "text-ink-3 hover:text-ink"
        }`}
      >
        {text}
      </button>
    ))}
  </div>
);

const ResumeEmbed = () => {
  const { t, lang: siteLang } = useLang();
  const [kind, setKind] = useState("cv");
  // Starts in the site's language; the EN/TR toggle only changes this preview.
  const [picked, setPicked] = useState(null);
  const lang = picked ?? siteLang;
  const src = docUrl(kind, lang);

  return (
    <div>
      {/* The two documents, as PDFs */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {Object.entries(DOCS).map(([key, d]) => (
          <div key={key} className="border border-rule p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-lg font-semibold text-ink">{t(d.label)}</h3>
              <span className="meta">{t(d.pages)}</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={docUrl(key, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid btn-sm"
              >
                {t({ en: "Open PDF", tr: "PDF'i aç" })}
                <FiArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={docUrl(key, lang)}
                download={docDownloadName(key, lang)}
                className="link-arrow text-sm"
              >
                <FiDownload className="h-3.5 w-3.5" /> {t({ en: "Download", tr: "İndir" })}
              </a>
              <a
                href={`${d.html}#${lang}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow text-sm text-ink-3"
              >
                {t({ en: "Interactive (HTML)", tr: "İnteraktif (HTML)" })}
                <FiArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Preview */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Toggle
            label={t({ en: "Document", tr: "Belge" })}
            options={Object.entries(DOCS).map(([k, d]) => [k, t(d.label)])}
            value={kind}
            onChange={setKind}
          />
          <span className="text-rule" aria-hidden="true">|</span>
          <Toggle
            label={t({ en: "Language", tr: "Dil" })}
            options={[["en", "EN"], ["tr", "TR"]]}
            value={lang}
            onChange={setPicked}
          />
        </div>
        <a href={src} download={docDownloadName(kind, lang)} className="btn-line btn-sm">
          <FiDownload className="h-4 w-4" /> {t({ en: "Download", tr: "İndir" })}
        </a>
      </div>

      <div className="h-[720px] w-full overflow-hidden rounded-sm border border-rule bg-paper-2">
        <object
          key={src}
          data={src}
          type="application/pdf"
          width="100%"
          height="100%"
          aria-label={t(DOCS[kind].label)}
        >
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <p className="text-ink-2">
              {t({
                en: "PDF preview isn't available here.",
                tr: "PDF önizlemesi burada gösterilemiyor.",
              })}
            </p>
            <a href={src} target="_blank" rel="noopener noreferrer" className="btn-solid">
              {t({ en: "Open PDF", tr: "PDF'i aç" })}
            </a>
          </div>
        </object>
      </div>

      <p className="meta mt-3">
        {t({
          en: "Generated from the interactive versions on every deploy · A4 · ATS-readable text",
          tr: "Her yayında interaktif sürümlerden üretilir · A4 · ATS uyumlu metin",
        })}
      </p>
    </div>
  );
};

export default ResumeEmbed;
