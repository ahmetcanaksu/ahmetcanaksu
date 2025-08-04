const About = () => {
  return (
    <div className="min-h-screen bg-base-100 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="avatar placeholder mb-8">
            <div className="bg-neutral text-neutral-content rounded-full w-40 h-40">
              <img src="photo.jpg" alt="" />
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-6">
            <span className="gradient-text">About Me</span>
          </h1>

          <p className="text-xl text-base-content/80 max-w-2xl mx-auto">
            Software developer, open-source enthusiast, and programming language
            designer from Beykoz, Istanbul, Turkey.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <div className="card bg-base-200 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title text-3xl mb-6">Who I Am</h2>

              <p className="text-lg leading-relaxed mb-6">
                I'm Ahmetcan Aksu, a passionate software developer and
                open-source contributor based in Beykoz, Istanbul, Turkey. With
                8+ years of experience in software development, including 3
                years in full-time roles, 2 years freelancing, and ongoing
                personal projects, I specialize in building scalable web
                applications, programming languages, and developer tools.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                My journey began with a Computer Programming degree from Işık
                University (GPA 3.53/4) and I'm currently pursuing Management
                Information Systems at Anadolu University. I've worked with
                modern web technologies like React, TypeScript, Node.js, and
                have experience in desktop apps (Electron, Rust), mobile
                development (Flutter), and embedded systems (Rust on ARM/ESP).
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Currently, I work as a Backend Developer at Fonmap Financial
                Technologies, where I lead backend and frontend development
                initiatives on Turkey's leading digital investment platform.
                Previously, I was a Full Stack Developer at Qpien, contributing
                to an all-in-one e-commerce platform with real-time messaging
                capabilities.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                I'm the creator of the{" "}
                <a
                  href="https://github.com/behemehal/ellie-language"
                  className="link link-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ellie programming language
                </a>
                , a type-safe language for embedded and sandboxed environments,
                and developer of{" "}
                <a
                  href="https://utilstation.com"
                  className="link link-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  UtilStation
                </a>
                , your one-stop shop for development tools.
              </p>

              <p className="text-lg leading-relaxed">
                I thrive in dynamic environments, adapt quickly, and
                consistently focus on performance, scalability, and long-term
                maintainability. When I'm not coding, you can find me
                contributing to open-source projects, writing technical blog
                posts, or exploring new technologies.
              </p>
            </div>
          </div>

          {/* Skills & Technologies */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-4">
                  Technologies I Love
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Backend Development</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="badge badge-primary">Node.js</span>
                      <span className="badge badge-primary">C#</span>
                      <span className="badge badge-primary">GraphQL</span>
                      <span className="badge badge-primary">
                        Entity Framework Core
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Frontend Development</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="badge badge-secondary">JavaScript</span>
                      <span className="badge badge-secondary">TypeScript</span>
                      <span className="badge badge-secondary">React</span>
                      <span className="badge badge-secondary">Redux</span>
                      <span className="badge badge-secondary">HTML/CSS</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">
                      Databases & Infrastructure
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="badge badge-accent">MSSQL</span>
                      <span className="badge badge-accent">PostgreSQL</span>
                      <span className="badge badge-accent">MongoDB</span>
                      <span className="badge badge-accent">Redis</span>
                      <span className="badge badge-accent">Elasticsearch</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Systems & Embedded</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="badge badge-info">Rust</span>
                      <span className="badge badge-info">WebAssembly</span>
                      <span className="badge badge-info">Arduino</span>
                      <span className="badge badge-info">ESP-32/8266</span>
                      <span className="badge badge-info">ARM</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Mobile Development</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="badge badge-warning">Dart</span>
                      <span className="badge badge-warning">Flutter</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">DevOps & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="badge badge-success">Docker</span>
                      <span className="badge badge-success">AWS</span>
                      <span className="badge badge-success">Git</span>
                      <span className="badge badge-success">Linux</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-4">What I Do</h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="badge badge-primary badge-lg">�</div>
                    <div>
                      <h4 className="font-semibold">Backend Development</h4>
                      <p className="text-sm text-base-content/70">
                        Building scalable backend systems and APIs for financial
                        and e-commerce platforms.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="badge badge-secondary badge-lg">�🚀</div>
                    <div>
                      <h4 className="font-semibold">Language Design</h4>
                      <p className="text-sm text-base-content/70">
                        Designing and implementing programming languages with
                        focus on safety and performance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="badge badge-accent badge-lg">⚡</div>
                    <div>
                      <h4 className="font-semibold">Full Stack Development</h4>
                      <p className="text-sm text-base-content/70">
                        Creating complete web applications from database to user
                        interface with modern technologies.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="badge badge-info badge-lg">�</div>
                    <div>
                      <h4 className="font-semibold">Developer Tools</h4>
                      <p className="text-sm text-base-content/70">
                        Building tools that make developers' lives easier and
                        more productive like UtilStation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="badge badge-warning badge-lg">🌐</div>
                    <div>
                      <h4 className="font-semibold">Open Source</h4>
                      <p className="text-sm text-base-content/70">
                        Contributing to and maintaining open-source projects for
                        the community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="card bg-base-200 shadow-xl mb-8">
            <div className="card-body">
              <h3 className="card-title text-2xl mb-6">
                Professional Experience
              </h3>

              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-lg">Backend Developer</h4>
                      <p className="text-primary font-semibold">
                        Fonmap Financial Technologies
                      </p>
                    </div>
                    <span className="text-sm text-base-content/70">
                      Feb 2024 - Present
                    </span>
                  </div>
                  <p className="text-sm text-base-content/70 mb-2">
                    Leading backend and frontend development initiatives on
                    Turkey's premier digital investment platform.
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-base-content/70">
                    <li>
                      Migrated core systems to TypeScript, improving
                      maintainability and security
                    </li>
                    <li>
                      Engineered backend infrastructure for TEFAS integration
                    </li>
                    <li>
                      Digitized VCIF and REIF processes with regulatory
                      compliance
                    </li>
                    <li>
                      Contributed to C# and Entity Framework Core migration
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-secondary pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-lg">
                        Full Stack Developer
                      </h4>
                      <p className="text-secondary font-semibold">Qpien</p>
                    </div>
                    <span className="text-sm text-base-content/70">
                      Aug 2022 - Feb 2024
                    </span>
                  </div>
                  <p className="text-sm text-base-content/70 mb-2">
                    Contributed to all-in-one e-commerce platform with real-time
                    messaging capabilities.
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-base-content/70">
                    <li>
                      Built scalable systems processing 100,000+ messages per
                      hour
                    </li>
                    <li>
                      Implemented real-time communication using WebSockets and
                      RabbitMQ
                    </li>
                    <li>
                      Developed responsive frontend interfaces with React and
                      TypeScript
                    </li>
                    <li>
                      Created robust backend APIs with Node.js and GraphQL
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-accent pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-lg">
                        Full Stack Developer
                      </h4>
                      <p className="text-accent font-semibold">
                        Massive Energy
                      </p>
                    </div>
                    <span className="text-sm text-base-content/70">
                      Jun 2021 - Jul 2022
                    </span>
                  </div>
                  <p className="text-sm text-base-content/70 mb-2">
                    Independently developed management panels, backend
                    architecture, and databases.
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-base-content/70">
                    <li>
                      Built complete full-stack solutions using Node.js and
                      MongoDB
                    </li>
                    <li>
                      Managed Linux-based deployment on AWS infrastructure
                    </li>
                    <li>Ensured system scalability and reliability</li>
                  </ul>
                </div>

                <div className="border-l-4 border-info pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-lg">
                        Mobile & Backend Developer
                      </h4>
                      <p className="text-info font-semibold">Freelancer</p>
                    </div>
                    <span className="text-sm text-base-content/70">
                      Jan 2019 - Aug 2022
                    </span>
                  </div>
                  <p className="text-sm text-base-content/70 mb-2">
                    Delivered scalable, high-performance mobile and backend
                    applications for diverse clients.
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-base-content/70">
                    <li>
                      Developed Flutter mobile apps and React web applications
                    </li>
                    <li>
                      Built Node.js backends and Rust-based high-performance
                      systems
                    </li>
                    <li>Ensured seamless frontend-backend integration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Projects & Organizations */}
          <div className="card bg-base-200 shadow-xl mb-8">
            <div className="card-body">
              <h3 className="card-title text-2xl mb-6">
                Personal Projects & Organizations
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold text-lg">Behemehal Organization</h4>
                  <p className="text-base-content/70 mb-2">
                    Founder & Lead Developer
                  </p>
                  <p className="text-sm">
                    Open-source organization focused on developing programming
                    languages, developer tools, and educational resources for
                    the programming community.
                  </p>
                  <a
                    href="https://behemehal.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-primary text-sm"
                  >
                    Visit Behemehal →
                  </a>
                </div>

                <div className="border-l-4 border-secondary pl-4">
                  <h4 className="font-bold text-lg">Ellie Language</h4>
                  <p className="text-base-content/70 mb-2">
                    Creator & Lead Maintainer
                  </p>
                  <p className="text-sm">
                    A memory-safe, type-safe compiled programming language
                    designed for system programming with modern syntax and
                    powerful features.
                  </p>
                  <a
                    href="https://ellie-lang.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-secondary text-sm"
                  >
                    Learn about Ellie →
                  </a>
                </div>

                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-bold text-lg">UtilStation</h4>
                  <p className="text-base-content/70 mb-2">
                    Creator & Developer
                  </p>
                  <p className="text-sm">
                    Comprehensive collection of developer utilities and tools
                    including JSON formatters, regex testers, and code
                    converters.
                  </p>
                  <a
                    href="https://utilstation.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-accent text-sm"
                  >
                    Try UtilStation →
                  </a>
                </div>

                <div className="border-l-4 border-info pl-4">
                  <h4 className="font-bold text-lg">
                    Open Source Contributions
                  </h4>
                  <p className="text-base-content/70 mb-2">
                    Active Contributor
                  </p>
                  <p className="text-sm">
                    Regular contributor to various open-source projects
                    including Rust libraries, web frameworks, and developer
                    tools.
                  </p>
                  <a
                    href="https://github.com/ahmetcanaksu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-info text-sm"
                  >
                    View GitHub →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl justify-center mb-4">
                  Let's Connect!
                </h3>
                <p className="mb-6">
                  Interested in collaborating on a project, discussing
                  technology, or just want to chat? I'd love to hear from you!
                </p>
                <div className="card-actions justify-center">
                  <a
                    href="mailto:hello@ahmetcanaksu.com"
                    className="btn btn-primary-content"
                  >
                    Send me an email
                  </a>
                  <a
                    href="https://twitter.com/ahmetcanaksu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-primary-content"
                  >
                    Follow on Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
