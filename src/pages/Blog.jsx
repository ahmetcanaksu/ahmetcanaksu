import { useState, useMemo } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import blogsData from "../data/blogs.json";

const Blog = () => {
  const [tag, setTag] = useState("all");

  const tags = useMemo(
    () => ["all", ...new Set(blogsData.flatMap((p) => p.tags))],
    []
  );

  const posts = useMemo(() => {
    const list =
      tag === "all" ? blogsData : blogsData.filter((p) => p.tags.includes(tag));
    return [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [tag]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" });

  return (
    <div className="wrap py-16 sm:py-20">
      <PageHeader kicker="Writing" title="Notes on building.">
        Thoughts on programming languages, software engineering, and lessons from
        building developer tools and open source.
      </PageHeader>

      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={`text-sm transition-colors ${
              tag === t
                ? "text-accent underline decoration-accent underline-offset-4"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            {t}
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
                <h3 className="row-title">{post.title}</h3>
                <span className="meta hidden shrink-0 items-center gap-1 sm:inline-flex">
                  {post.platform}
                  <FiArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-1.5 max-w-2xl text-ink-2">{post.excerpt}</p>
              <div className="tags mt-3">
                {post.tags.map((t, i) => (
                  <span key={t}>
                    {i > 0 && <span className="mr-2 text-rule">·</span>}
                    {t}
                  </span>
                ))}
                <span className="text-ink-3">
                  <span className="mr-2 text-rule">·</span>
                  {post.readTime}
                </span>
              </div>
            </div>
          </a>
        ))}
        <div className="border-t border-rule" />
      </div>

      {posts.length === 0 && (
        <p className="py-12 text-ink-3">No posts with that tag yet.</p>
      )}
    </div>
  );
};

export default Blog;
