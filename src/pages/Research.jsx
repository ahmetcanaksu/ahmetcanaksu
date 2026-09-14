import { useState, useMemo } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import researchData from "../data/research.json";

const Research = () => {
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(researchData.map((r) => r.category))],
    []
  );

  const filtered =
    category === "All"
      ? researchData
      : researchData.filter((r) => r.category === category);

  return (
    <div className="wrap py-16 sm:py-20">
      <PageHeader kicker="Research & Experiments" title="Building to understand.">
        Hands-on experiments in computer systems, networking, and hardware —
        emulators, protocols, and embedded tinkering, built from the ground up.
      </PageHeader>

      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`text-sm transition-colors ${
              category === c
                ? "text-accent underline decoration-accent underline-offset-4"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            {c}
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
                        {r.name}
                      </a>
                    ) : (
                      r.name
                    )}
                  </h3>
                  <span className="meta shrink-0 tabular-nums">{r.year}</span>
                </div>
                <p className="mt-1.5 max-w-2xl text-ink-2">{r.longDescription}</p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                  <div className="tags">
                    <span className="text-accent">{r.category}</span>
                    {r.techTags.slice(0, 4).map((t) => (
                      <span key={t}>
                        <span className="mr-2 text-rule">·</span>
                        {t}
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
                      {r.repoUrl && !r.liveUrl ? "Code" : "Open"}
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
        “True understanding comes from building systems from the ground up — from
        low-level hardware emulation to high-level network protocols.”
      </blockquote>
    </div>
  );
};

export default Research;
