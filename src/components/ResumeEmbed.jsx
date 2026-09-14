import { useState } from "react";
import { FiDownload, FiArrowUpRight } from "react-icons/fi";

const CV_EN = "/Ahmetcan Aksu CV EN.pdf";
const CV_TR = "/Ahmetcan Aksu CV TR.pdf";

const ResumeEmbed = () => {
  const [lang, setLang] = useState("en");
  const src = lang === "en" ? CV_EN : CV_TR;

  return (
    <div>
      {/* Interactive generators (from the CVMaker submodule) */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <a
          href={`/cv/cv.html#${lang}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group border border-rule p-5 transition-colors hover:border-ink"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent">
              Interactive CV
            </h3>
            <FiArrowUpRight className="h-5 w-5 shrink-0 text-ink-3 transition-colors group-hover:text-accent" />
          </div>
          <p className="mt-1.5 text-sm text-ink-2">
            Live, bilingual (EN/TR), always current — export to PDF from the page.
          </p>
        </a>
        <a
          href="/cv/letter.html"
          target="_blank"
          rel="noopener noreferrer"
          className="group border border-rule p-5 transition-colors hover:border-ink"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent">
              Cover letter
            </h3>
            <FiArrowUpRight className="h-5 w-5 shrink-0 text-ink-3 transition-colors group-hover:text-accent" />
          </div>
          <p className="mt-1.5 text-sm text-ink-2">
            A tailored, one-page cover-letter generator — fill in the role, export.
          </p>
        </a>
      </div>

      {/* PDF preview + downloads */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <span className="meta">Quick PDF</span>
          {["en", "tr"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`uppercase transition-colors ${
                lang === l
                  ? "text-accent underline decoration-accent underline-offset-4"
                  : "text-ink-3 hover:text-ink"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <a
          href={src}
          download={`Ahmetcan_Aksu_CV_${lang.toUpperCase()}.pdf`}
          className="btn-line btn-sm"
        >
          <FiDownload className="h-4 w-4" /> Download
        </a>
      </div>

      <div className="h-[600px] w-full overflow-hidden rounded-sm border border-rule bg-paper-2">
        <object data={src} type="application/pdf" width="100%" height="100%" aria-label="Résumé PDF">
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <p className="text-ink-2">PDF preview isn&apos;t available here.</p>
            <a href={src} target="_blank" rel="noopener noreferrer" className="btn-solid">
              Open PDF
            </a>
          </div>
        </object>
      </div>
    </div>
  );
};

export default ResumeEmbed;
