import { useState, useMemo } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import researchData from "../data/research.json";
import { useLang, pick } from "../i18n/LangContext";

const ALL = "All";

/* Categories are { en, tr } pairs; the English text is the filter key so the
   selection survives a language switch. */
const categoryKey = (c) => pick(c, "en");

const Research = () => {
  const { t } = useLang();
  const [category, setCategory] = useState(ALL);

  const categories = useMemo(() => {
    const seen = new Map();
    researchData.forEach((r) => {
      const key = categoryKey(r.category);
      if (!seen.has(key)) seen.set(key, r.category);
    });
    return [{ key: ALL, label: { en: "All", tr: "Tümü" } }].concat(
      [...seen].map(([key, label]) => ({ key, label }))
    );
  }, []);

  const filtered =
    category === ALL
      ? researchData
      : researchData.filter((r) => categoryKey(r.category) === category);

  return (
    <div className="wrap py-16 sm:py-20">
      <PageHeader
        kicker={t({ en: "Research & Experiments", tr: "Araştırma & Deneyler" })}
        title={t({ en: "Building to understand.", tr: "Anlamak için inşa etmek." })}
      >
        {t({
          en: "Hands-on experiments in computer systems, networking, and hardware — emulators, protocols, and embedded tinkering, built from the ground up.",
          tr: "Bilgisayar sistemleri, ağlar ve donanım üzerine elimi kirlettiğim deneyler — emülatörler, protokoller ve gömülü kurcalamalar, hepsi sıfırdan.",
        })}
      </PageHeader>

      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            className={`text-sm transition-colors ${
              category === c.key
                ? "text-accent underline decoration-accent underline-offset-4"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            {t(c.label)}
          </button>
        ))}
      </div>

      <div>
        {filtered.map((r, i) => {
          const url = r.liveUrl || r.repoUrl;
          const internal = url && url.startsWith("#");
          return (
            <article key={r.id} className="row">
              <span className="row-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="row-title">
                    {url ? (
                      <a
                        href={url}
                        target={internal ? undefined : "_blank"}
                        rel={internal ? undefined : "noopener noreferrer"}
                      >
                        {t(r.name)}
                      </a>
                    ) : (
                      t(r.name)
                    )}
                  </h3>
                  <span className="meta shrink-0 tabular-nums">{r.year}</span>
                </div>
                <p className="mt-1.5 max-w-2xl text-ink-2">{t(r.longDescription)}</p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                  <div className="tags">
                    <span className="text-accent">{t(r.category)}</span>
                    {r.techTags.slice(0, 4).map((tag) => (
                      <span key={tag}>
                        <span className="mr-2 text-rule">·</span>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {url && (
                    <a
                      href={url}
                      target={internal ? undefined : "_blank"}
                      rel={internal ? undefined : "noopener noreferrer"}
                      className="link-arrow text-sm"
                    >
                      {r.repoUrl && !r.liveUrl
                        ? t({ en: "Code", tr: "Kod" })
                        : t({ en: "Open", tr: "Aç" })}
                      <FiArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
        <div className="border-t border-rule" />
      </div>

      <blockquote className="mt-16 max-w-3xl border-l-2 border-accent pl-6 text-lg italic text-ink-2">
        {t({
          en: "“True understanding comes from building systems from the ground up — from low-level hardware emulation to high-level network protocols.”",
          tr: "“Gerçek anlayış, sistemleri sıfırdan inşa etmekten gelir — düşük seviyeli donanım emülasyonundan yüksek seviyeli ağ protokollerine kadar.”",
        })}
      </blockquote>
    </div>
  );
};

export default Research;
