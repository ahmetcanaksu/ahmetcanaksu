import { useState } from "react";

const Utilities = () => {
  const [activeUtility, setActiveUtility] = useState(null);

  const utilities = [
    {
      id: "json-formatter",
      title: "JSON Formatter",
      description:
        "Format, validate, and beautify JSON data with syntax highlighting",
      icon: "{ }",
      category: "Data Tools",
      liveUrl: "https://utilstation.com/json-formatter",
    },
    {
      id: "uuid-generator",
      title: "UUID Generator",
      description:
        "Generate various types of UUIDs (v1, v4, v5) with customizable options",
      icon: "🆔",
      category: "Generators",
      liveUrl: "https://utilstation.com/uuid-generator",
    },
    {
      id: "cron-parser",
      title: "Cron Expression Parser",
      description:
        "Parse and validate cron expressions with human-readable descriptions",
      icon: "⏰",
      category: "System Tools",
      liveUrl: "https://utilstation.com/cron-parser",
    },
    {
      id: "base64-encoder",
      title: "Base64 Encoder/Decoder",
      description:
        "Encode and decode Base64 strings with support for files and images",
      icon: "🔤",
      category: "Encoding",
      liveUrl: "https://utilstation.com/base64",
    },
    {
      id: "regex-tester",
      title: "Regex Tester",
      description:
        "Test regular expressions with real-time matching and explanations",
      icon: ".*",
      category: "Text Tools",
      liveUrl: "https://utilstation.com/regex-tester",
    },
    {
      id: "hash-generator",
      title: "Hash Generator",
      description:
        "Generate MD5, SHA-1, SHA-256, and other hash values for text and files",
      icon: "#️⃣",
      category: "Security",
      liveUrl: "https://utilstation.com/hash-generator",
    },
    {
      id: "color-palette",
      title: "Color Palette Generator",
      description:
        "Generate beautiful color palettes and convert between color formats",
      icon: "🎨",
      category: "Design Tools",
      liveUrl: "https://utilstation.com/color-palette",
    },
    {
      id: "qr-generator",
      title: "QR Code Generator",
      description:
        "Generate QR codes for URLs, text, WiFi credentials, and more",
      icon: "📱",
      category: "Generators",
      liveUrl: "https://utilstation.com/qr-generator",
    },
    {
      id: "jwt-decoder",
      title: "JWT Decoder",
      description:
        "Decode and inspect JSON Web Tokens (JWT) with payload visualization",
      icon: "🔐",
      category: "Security",
      liveUrl: "https://utilstation.com/jwt-decoder",
    },
    {
      id: "url-encoder",
      title: "URL Encoder/Decoder",
      description: "Encode and decode URLs with support for query parameters",
      icon: "🔗",
      category: "Encoding",
      liveUrl: "https://utilstation.com/url-encoder",
    },
    {
      id: "markdown-preview",
      title: "Markdown Preview",
      description:
        "Live preview of Markdown with syntax highlighting and export options",
      icon: "📝",
      category: "Text Tools",
      liveUrl: "https://utilstation.com/markdown-preview",
    },
    {
      id: "lorem-generator",
      title: "Lorem Ipsum Generator",
      description: "Generate placeholder text in various formats and languages",
      icon: "📄",
      category: "Generators",
      liveUrl: "https://utilstation.com/lorem-generator",
    },
  ];

  const categories = [...new Set(utilities.map((util) => util.category))];

  const UtilityCard = ({ utility }) => (
    <div className="card bg-base-200 shadow-xl card-hover">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl">{utility.icon}</div>
          <div className="badge badge-secondary">{utility.category}</div>
        </div>

        <h3 className="card-title text-xl mb-2">{utility.title}</h3>
        <p className="text-base-content/80 mb-4">{utility.description}</p>

        <div className="card-actions justify-end">
          <a
            href={utility.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Try It
          </a>
          <button
            className="btn btn-outline btn-sm"
            onClick={() =>
              setActiveUtility(activeUtility === utility.id ? null : utility.id)
            }
          >
            {activeUtility === utility.id ? "Hide" : "Preview"}
          </button>
        </div>

        {activeUtility === utility.id && (
          <div className="mt-4 p-4 bg-base-100 rounded-lg border">
            <p className="text-sm text-base-content/70 mb-2">
              This tool is hosted on UtilStation. Click "Try It" to use the full
              version.
            </p>
            <div className="mockup-browser bg-base-300 border">
              <div className="mockup-browser-toolbar">
                <div className="input">{utility.liveUrl}</div>
              </div>
              <div className="flex justify-center px-4 py-16 bg-base-200">
                <div className="text-center">
                  <div className="text-6xl mb-4">{utility.icon}</div>
                  <h4 className="text-lg font-semibold mb-2">
                    {utility.title}
                  </h4>
                  <p className="text-sm text-base-content/70">
                    Preview not available
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-100 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            <span className="gradient-text">Utilities Shop</span>
          </h1>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            A comprehensive collection of developer utilities and tools for
            everyday programming tasks. All tools are available on{" "}
            <a
              href="https://utilstation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary"
            >
              UtilStation
            </a>
            , my platform for developer productivity tools.
          </p>
        </div>

        {/* Quick Stats */}
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
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <div className="stat-title">Available Tools</div>
            <div className="stat-value text-primary">{utilities.length}</div>
            <div className="stat-desc">Developer utilities</div>
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
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <div className="stat-title">Categories</div>
            <div className="stat-value text-secondary">{categories.length}</div>
            <div className="stat-desc">Tool categories</div>
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="stat-title">Always Free</div>
            <div className="stat-value text-accent">100%</div>
            <div className="stat-desc">No registration required</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="card bg-base-200 shadow-xl mb-12">
          <div className="card-body">
            <h2 className="card-title mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              <button className="btn btn-primary btn-sm">All Tools</button>
              {categories.map((category) => (
                <button key={category} className="btn btn-outline btn-sm">
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {utilities.map((utility) => (
            <UtilityCard key={utility.id} utility={utility} />
          ))}
        </div>

        {/* UtilStation CTA */}
        <div className="text-center">
          <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-3xl justify-center mb-4">
                Visit UtilStation
              </h3>
              <p className="text-lg mb-6">
                All these tools and many more are available on UtilStation, my
                comprehensive platform for developer productivity tools. No
                registration required, completely free to use!
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6 text-left">
                <div className="flex items-center space-x-3">
                  <div className="badge badge-lg">🚀</div>
                  <div>
                    <h4 className="font-semibold">Fast & Responsive</h4>
                    <p className="text-sm opacity-90">Optimized for speed</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="badge badge-lg">🔒</div>
                  <div>
                    <h4 className="font-semibold">Privacy Focused</h4>
                    <p className="text-sm opacity-90">No data collection</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="badge badge-lg">📱</div>
                  <div>
                    <h4 className="font-semibold">Mobile Friendly</h4>
                    <p className="text-sm opacity-90">Works on all devices</p>
                  </div>
                </div>
              </div>

              <div className="card-actions justify-center">
                <a
                  href="https://utilstation.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary-content btn-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Visit UtilStation
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Request Tool */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body text-center">
            <h3 className="card-title text-2xl justify-center mb-4">
              Need a Specific Tool?
            </h3>
            <p className="text-base-content/70 mb-6">
              Can't find the utility you're looking for? Let me know what tool
              would be helpful for your development workflow, and I'll consider
              adding it to UtilStation.
            </p>
            <div className="card-actions justify-center">
              <a
                href="mailto:hello@ahmetcanaksu.com?subject=UtilStation Tool Request"
                className="btn btn-primary"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Request a Tool
              </a>
              <a
                href="https://github.com/ahmetcanaksu/utilstation/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                GitHub Issues
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Utilities;
