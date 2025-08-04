import ResumeEmbed from "../components/ResumeEmbed";

const Resume = () => {
  return (
    <div className="min-h-screen bg-base-100 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-xl text-base-content/80 max-w-2xl mx-auto">
            My professional experience, education, and skills in software
            engineering and programming language design.
          </p>
        </div>

        {/* Resume Component */}
        <ResumeEmbed />

        {/* Additional Information */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-2xl mb-4">
                Professional Highlights
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="badge badge-primary badge-lg">🎯</div>
                  <div>
                    <h4 className="font-semibold">
                      Programming Language Creator
                    </h4>
                    <p className="text-sm text-base-content/70">
                      Designed and implemented Ellie, a memory-safe programming
                      language with over 1K+ GitHub stars.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="badge badge-secondary badge-lg">🚀</div>
                  <div>
                    <h4 className="font-semibold">Open Source Leader</h4>
                    <p className="text-sm text-base-content/70">
                      Founded Behemehal organization and maintain multiple
                      active open-source projects.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="badge badge-accent badge-lg">💡</div>
                  <div>
                    <h4 className="font-semibold">Full-Stack Developer</h4>
                    <p className="text-sm text-base-content/70">
                      Experience building scalable web applications, mobile
                      apps, and developer tools.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="badge badge-info badge-lg">🔒</div>
                  <div>
                    <h4 className="font-semibold">Security Specialist</h4>
                    <p className="text-sm text-base-content/70">
                      Developed cryptographic libraries and quantum-resistant
                      security solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-2xl mb-4">Key Achievements</h3>

              <div className="space-y-4">
                <div className="stat">
                  <div className="stat-title">GitHub Repositories</div>
                  <div className="stat-value text-primary">50+</div>
                  <div className="stat-desc">Public repositories</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Programming Languages</div>
                  <div className="stat-value text-secondary">10+</div>
                  <div className="stat-desc">Professional experience</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Years Experience</div>
                  <div className="stat-value text-accent">5+</div>
                  <div className="stat-desc">Software development</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Open Source Stars</div>
                  <div className="stat-value text-info">2K+</div>
                  <div className="stat-desc">Across all projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-2xl justify-center mb-4">
                Ready to Work Together?
              </h3>
              <p className="mb-6">
                I'm always interested in new opportunities and exciting
                projects. Let's discuss how we can collaborate!
              </p>
              <div className="card-actions justify-center">
                <a
                  href="mailto:hello@ahmetcanaksu.com"
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
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contact Me
                </a>
                <a
                  href="https://linkedin.com/in/ahmetcanaksu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-primary-content btn-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
