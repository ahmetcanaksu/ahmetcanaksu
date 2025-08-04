import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero min-h-screen bg-base-200 hero-pattern">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <div className="avatar placeholder mb-8">
              <div className="bg-neutral text-neutral-content rounded-full w-32 h-32">
                <img src="photo.jpg" alt="" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Ahmetcan Aksu</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-base-content/80">
              Software Developer •{" "}
              <span className="text-primary font-semibold">Rust</span> •
              <span className="text-primary font-semibold">C#</span> •
              <span className="text-accent font-semibold">
                {" "}
                JavaScript | TypeScript
              </span>
            </p>

            <p className="text-lg mb-8 max-w-2xl mx-auto text-base-content/70">
              Passionate about building programming languages, developer tools,
              and open-source software. Creator of the Ellie programming
              language and founder of various tech projects.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link to="/projects" className="btn btn-primary btn-lg">
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                View Projects
              </Link>

              <Link to="/contact" className="btn btn-outline btn-lg">
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
                Get In Touch
              </Link>

              <a
                href="cv_en.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-lg"
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Resume
              </a>
            </div>

            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/ahmetcanaksu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-colors"
                aria-label="GitHub Profile"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com/in/ahmetcanaksu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="https://twitter.com/ahmetcanaksu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-colors"
                aria-label="Twitter Profile"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-base-content/70">
              Some of the projects I'm most proud of
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="card bg-base-200 shadow-xl card-hover">
              <div className="card-body">
                <h3 className="card-title">Ellie Language</h3>
                <p>
                  Type-safe programming language for embedded and sandboxed
                  environments
                </p>
                <div className="card-actions justify-end">
                  <span className="badge badge-primary">Rust</span>
                  <span className="badge badge-secondary">WebAssembly</span>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl card-hover">
              <div className="card-body">
                <h3 className="card-title">UtilStation</h3>
                <p>
                  Your one-stop shop for all development tools and utilities
                </p>
                <div className="card-actions justify-end">
                  <span className="badge badge-primary">React</span>
                  <span className="badge badge-secondary">TypeScript</span>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl card-hover">
              <div className="card-body">
                <h3 className="card-title">Behemehal</h3>
                <p>
                  Open-source organization for programming languages and dev
                  tools
                </p>
                <div className="card-actions justify-end">
                  <span className="badge badge-primary">Open Source</span>
                  <span className="badge badge-secondary">Community</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/projects" className="btn btn-primary btn-lg">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Latest Blog Posts</h2>
            <p className="text-xl text-base-content/70">
              Thoughts on programming, technology, and life
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl">
                  Building Ellie Language: Lessons from Creating a Memory-Safe
                  Programming Language
                </h3>
                <p className="text-base-content/70 mb-4">
                  A deep dive into the design decisions and challenges faced
                  while building Ellie, a modern programming language focused on
                  memory safety and performance.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge badge-outline">
                    Programming Languages
                  </span>
                  <span className="badge badge-outline">Rust</span>
                  <span className="badge badge-outline">Compiler Design</span>
                </div>
                <div className="card-actions justify-between items-center">
                  <span className="text-sm text-base-content/60">
                    January 15, 2024 • 8 min read
                  </span>
                  <Link to="/blog" className="btn btn-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/blog" className="btn btn-outline btn-lg">
              View All Posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
