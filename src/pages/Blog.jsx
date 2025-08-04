import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts] = useState([
    {
      id: 1,
      title:
        "Building Ellie Language: Lessons from Creating a Memory-Safe Programming Language",
      excerpt:
        "A deep dive into the design decisions and challenges faced while building Ellie, a modern programming language focused on memory safety and performance.",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: [
        "Programming Languages",
        "Rust",
        "Compiler Design",
        "Memory Safety",
      ],
      author: "Ahmetcan Aksu",
      slug: "building-ellie-language",
      featured: true,
    },
    {
      id: 2,
      title:
        "The Future of Developer Tools: Making Programming More Accessible",
      excerpt:
        "Exploring how modern developer tools are evolving to make programming more accessible to newcomers while maintaining the power that experts need.",
      date: "2024-01-10",
      readTime: "6 min read",
      tags: ["Developer Tools", "UX", "Programming", "Accessibility"],
      author: "Ahmetcan Aksu",
      slug: "future-of-developer-tools",
      featured: false,
    },
    {
      id: 3,
      title: "Why I Choose Rust for Systems Programming",
      excerpt:
        "An exploration of Rust's unique features that make it an excellent choice for systems programming, based on my experience building Ellie Language.",
      date: "2024-01-05",
      readTime: "5 min read",
      tags: ["Rust", "Systems Programming", "Performance", "Safety"],
      author: "Ahmetcan Aksu",
      slug: "why-rust-for-systems",
      featured: false,
    },
    {
      id: 4,
      title: "Building UtilStation: A Collection of Developer Utilities",
      excerpt:
        "The story behind creating UtilStation, lessons learned about building developer tools, and the importance of good UX in technical products.",
      date: "2023-12-28",
      readTime: "7 min read",
      tags: ["Web Development", "React", "Developer Tools", "Product Design"],
      author: "Ahmetcan Aksu",
      slug: "building-utilstation",
      featured: false,
    },
    {
      id: 5,
      title: "Understanding Cryptography in Modern Applications",
      excerpt:
        "A beginner-friendly guide to cryptography concepts and how they apply to modern software development, including quantum-resistant algorithms.",
      date: "2023-12-20",
      readTime: "10 min read",
      tags: [
        "Cryptography",
        "Security",
        "Quantum Computing",
        "Software Development",
      ],
      author: "Ahmetcan Aksu",
      slug: "cryptography-in-modern-apps",
      featured: true,
    },
  ]);

  const [selectedTag, setSelectedTag] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    if (selectedTag === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((post) =>
          post.tags.some(
            (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
          )
        )
      );
    }
  }, [selectedTag, posts]);

  const allTags = [...new Set(posts.flatMap((post) => post.tags))];
  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-base-100 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            <span className="gradient-text">Engineering & Blog</span>
          </h1>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            Thoughts on programming languages, software engineering, technology
            trends, and lessons learned from building developer tools and
            open-source projects.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="card bg-base-200 shadow-xl mb-12">
          <div className="card-body">
            <h2 className="card-title mb-4">Filter by Topic</h2>
            <div className="flex flex-wrap gap-2">
              <button
                className={`btn btn-sm ${
                  selectedTag === "all" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setSelectedTag("all")}
              >
                All Posts
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`btn btn-sm ${
                    selectedTag === tag ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Stats */}
        <div className="stats shadow mb-12 w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div className="stat-title">Total Posts</div>
            <div className="stat-value text-primary">{posts.length}</div>
            <div className="stat-desc">Technical articles</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <div className="stat-title">Featured Articles</div>
            <div className="stat-value text-secondary">
              {featuredPosts.length}
            </div>
            <div className="stat-desc">Highlighted content</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-accent">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <div className="stat-title">Topics Covered</div>
            <div className="stat-value text-accent">{allTags.length}</div>
            <div className="stat-desc">Different subjects</div>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Articles</h2>
              <div className="badge badge-primary badge-lg">⭐ Featured</div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article
                  key={post.id}
                  className="card bg-base-200 shadow-xl card-hover"
                >
                  <div className="card-body">
                    <div className="flex justify-between items-start mb-2">
                      <div className="badge badge-primary">Featured</div>
                      <span className="text-sm text-base-content/60">
                        {formatDate(post.date)}
                      </span>
                    </div>

                    <h3 className="card-title text-xl mb-3 leading-tight">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-base-content/80 mb-4">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="badge badge-outline badge-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="card-actions justify-between items-center">
                      <span className="text-sm text-base-content/60">
                        {post.readTime}
                      </span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="btn btn-primary btn-sm"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">
              {featuredPosts.length > 0 ? "Latest Articles" : "All Articles"}
            </h2>

            <div className="space-y-6">
              {regularPosts.map((post) => (
                <article key={post.id} className="card bg-base-200 shadow-xl">
                  <div className="card-body">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="card-title text-2xl mb-2 md:mb-0">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <span className="text-sm text-base-content/60 md:ml-4">
                        {formatDate(post.date)} • {post.readTime}
                      </span>
                    </div>

                    <p className="text-base-content/80 mb-4 text-lg">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="badge badge-secondary badge-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="card-actions justify-end">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="btn btn-primary"
                      >
                        Read Full Article
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* No posts message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-4">No articles found</h3>
            <p className="text-base-content/70 mb-6">
              Try selecting a different topic to see more articles.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setSelectedTag("all")}
            >
              Show All Posts
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20">
          <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
            <div className="card-body text-center">
              <h3 className="card-title text-2xl justify-center mb-4">
                Stay Updated
              </h3>
              <p className="mb-6">
                Get notified when I publish new articles about programming
                languages, software engineering, and developer tools.
              </p>
              <div className="card-actions justify-center">
                <a
                  href="https://twitter.com/ahmetcanaksu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary-content"
                >
                  Follow on Twitter
                </a>
                <a
                  href="mailto:hello@ahmetcanaksu.com?subject=Blog Updates"
                  className="btn btn-outline btn-primary-content"
                >
                  Email for Updates
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
