import { useState, useMemo } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import blogsData from "../data/blogs.json";
import { useLang } from "../i18n/LangContext";

const ALL = "all";

/* What a post is written in, shown when it differs from the page language. */
const POST_LANG = {
  tr: { en: "in Turkish", tr: "Türkçe" },
  en: { en: "English", tr: "İngilizce" },
};

const Blog = () => {
  const { t, lang, locale } = useLang();
  const [tag, setTag] = useState(ALL);

  const tags = useMemo(
    () => [ALL, ...new Set(blogsData.flatMap((p) => p.tags))],
    []
  );

  const posts = useMemo(() => {
    const list =
      tag === ALL ? blogsData : blogsData.filter((p) => p.tags.includes(tag));
    return [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [tag]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString(locale, { year: "numeric", month: "short" });

  return (
    <div className="wrap py-16 sm:py-20">
      <PageHeader
        kicker={t({ en: "Writing", tr: "Yazılar" })}
        title={t({ en: "Notes on building.", tr: "İnşa etmeye dair notlar." })}
      >
        {t({
          en: "Thoughts on programming languages, software engineering, and lessons from building developer tools and open source.",
          tr: "Programlama dilleri ve yazılım mühendisliği üzerine düşüncelerim; geliştirici araçları ve açık kaynak projeler yaparken öğrendiklerim.",
        })}
      </PageHeader>

      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {tags.map((tg) => (
          <button
            key={tg}
            onClick={() => setTag(tg)}
            className={`text-sm transition-colors ${
              tag === tg
                ? "text-accent underline decoration-accent underline-offset-4"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            {tg === ALL ? t({ en: "all", tr: "tümü" }) : tg}
          </button>
        ))}
      </div>

      <div>
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="row"
          >
            <span className="row-num sm:w-16">{formatDate(post.date)}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="row-title">{t(post.title)}</h3>
                <span className="meta hidden shrink-0 items-center gap-1 sm:inline-flex">
                  {post.platform}
                  <FiArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-1.5 max-w-2xl text-ink-2">{t(post.excerpt)}</p>
              <div className="tags mt-3">
                {post.tags.map((tg, i) => (
                  <span key={tg}>
                    {i > 0 && <span className="mr-2 text-rule">·</span>}
                    {tg}
                  </span>
                ))}
                <span className="text-ink-3">
                  <span className="mr-2 text-rule">·</span>
                  {t(post.readTime)}
                </span>
                {post.lang && post.lang !== lang && POST_LANG[post.lang] && (
                  <span className="text-accent">
                    <span className="mr-2 text-rule">·</span>
                    {t(POST_LANG[post.lang])}
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
        <div className="border-t border-rule" />
      </div>

      {posts.length === 0 && (
        <p className="py-12 text-ink-3">
          {t({ en: "No posts with that tag yet.", tr: "Bu etikette henüz yazı yok." })}
        </p>
      )}
    </div>
  );
};

export default Blog;
