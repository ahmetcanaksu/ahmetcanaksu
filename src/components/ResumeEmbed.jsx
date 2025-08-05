const ResumeEmbed = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Resume</h2>

          {/* PDF Embed */}
          <div className="w-full h-96 mb-6 border rounded-lg overflow-hidden">
            <embed
              src="Ahmetcan Aksu CV EN.pdf"
              type="application/pdf"
              width="100%"
              height="100%"
              className="border-0"
            />
            <div className="flex items-center justify-center h-full bg-base-200">
              <div className="text-center">
                <p className="text-lg mb-4">PDF viewer not supported</p>
                <a
                  href="cv_en.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Download Resume PDF
                </a>
              </div>
            </div>
          </div>

          {/* Resume Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3">Education</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">
                    Management Information Systems
                  </h4>
                  <p className="text-sm text-base-content/70">
                    Anadolu University
                  </p>
                  <p className="text-sm text-base-content/70">2023 - Present</p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <h4 className="font-semibold">
                    Computer Programming (Associate)
                  </h4>
                  <p className="text-sm text-base-content/70">
                    Işık University
                  </p>
                  <p className="text-sm text-base-content/70">
                    2020 - 2022 (GPA: 3.53/4.00)
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Work Experience</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-secondary pl-4">
                  <h4 className="font-semibold">Backend Developer</h4>
                  <p className="text-sm text-base-content/70">
                    Fonmap Financial Technologies
                  </p>
                  <p className="text-sm text-base-content/70">
                    Feb 2024 - Present
                  </p>
                  <ul className="text-sm text-base-content/70 mt-2 space-y-1">
                    <li>
                      • Leading backend development on digital investment
                      platform
                    </li>
                    <li>• Migrated core systems to TypeScript</li>
                    <li>• Engineered TEFAS integration infrastructure</li>
                  </ul>
                </div>

                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-semibold">Full Stack Developer</h4>
                  <p className="text-sm text-base-content/70">Qpien</p>
                  <p className="text-sm text-base-content/70">
                    Aug 2022 - Feb 2024
                  </p>
                  <ul className="text-sm text-base-content/70 mt-2 space-y-1">
                    <li>• Built scalable e-commerce platform</li>
                    <li>• Implemented real-time messaging with WebSockets</li>
                    <li>• Developed React frontend and Node.js APIs</li>
                  </ul>
                </div>

                <div className="border-l-4 border-info pl-4">
                  <h4 className="font-semibold">Full Stack Developer</h4>
                  <p className="text-sm text-base-content/70">Massive Energy</p>
                  <p className="text-sm text-base-content/70">
                    Jun 2021 - Jul 2022
                  </p>
                  <ul className="text-sm text-base-content/70 mt-2 space-y-1">
                    <li>• Developed management panels and backend systems</li>
                    <li>• Managed AWS deployment and infrastructure</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-3">Technical Skills</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Programming Languages</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-primary">Rust</span>
                  <span className="badge badge-primary">C#</span>
                  <span className="badge badge-primary">JavaScript</span>
                  <span className="badge badge-primary">TypeScript</span>
                  <span className="badge badge-primary">Dart</span>
                  <span className="badge badge-primary">C</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Frameworks & Libraries</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-secondary">React</span>
                  <span className="badge badge-secondary">Node.js</span>
                  <span className="badge badge-secondary">Express.js</span>
                  <span className="badge badge-secondary">Flutter</span>
                  <span className="badge badge-secondary">.NET</span>
                  <span className="badge badge-secondary">
                    Entity Framework
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Tools & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-accent">Git</span>
                  <span className="badge badge-accent">Docker</span>
                  <span className="badge badge-accent">PostgreSQL</span>
                  <span className="badge badge-accent">MongoDB</span>
                  <span className="badge badge-accent">AWS</span>
                  <span className="badge badge-accent">Redis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="card-actions justify-center mt-6">
            <a
              href="cv_en.pdf"
              download="Ahmetcan_Aksu_Resume.pdf"
              className="btn btn-primary btn-lg"
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
              Download Resume PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEmbed;
