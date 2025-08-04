import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission (replace with actual form handler)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      title: "Email",
      description: "Send me a message directly",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      value: "ahmetcanco@gmail.com",
      href: "mailto:ahmetcanco@gmail.com",
      action: "Send Email",
    },
    {
      title: "GitHub",
      description: "Check out my projects and contributions",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      value: "@ahmetcanaksu",
      href: "https://github.com/ahmetcanaksu",
      action: "Visit GitHub",
    },
    {
      title: "LinkedIn",
      description: "Connect with me professionally",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      value: "linkedin.com/in/ahmetcanaksu",
      href: "https://linkedin.com/in/ahmetcanaksu",
      action: "Connect",
    },
    {
      title: "Twitter",
      description: "Follow me for updates and tech thoughts",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      value: "@ahmetcanaksu",
      href: "https://twitter.com/ahmetcanaksu",
      action: "Follow",
    },
  ];

  const projectTypes = [
    "Open Source Collaboration",
    "Programming Language Design",
    "Developer Tools",
    "Web Application Development",
    "Mobile App Development",
    "Blockchain & Cryptography",
    "Technical Consulting",
    "Speaking & Presentations",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-base-100 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            <span className="gradient-text">Get In Touch</span>
          </h1>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            I'm always interested in discussing new projects, innovative ideas,
            or opportunities to collaborate. Whether you want to chat about
            programming languages, need help with a project, or just want to say
            hello, I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card bg-base-200 shadow-xl hidden">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Name *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input input-bordered input-primary"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Email *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input input-bordered input-primary"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Subject *</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="select select-bordered select-primary"
                    required
                  >
                    <option value="">Choose a subject</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Message *</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="textarea textarea-bordered textarea-primary h-32"
                    placeholder="Tell me about your project, idea, or question..."
                    required
                  ></textarea>
                </div>

                {submitStatus === "success" && (
                  <div className="alert alert-success">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      Message sent successfully! I'll get back to you soon.
                    </span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="alert alert-error">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      Failed to send message. Please try again or use email
                      directly.
                    </span>
                  </div>
                )}

                <div className="form-control">
                  <button
                    type="submit"
                    className={`btn btn-primary btn-lg ${
                      isSubmitting ? "loading" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
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
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="divider">OR</div>

              <div className="text-center">
                <p className="text-base-content/70 mb-4">
                  Prefer a more direct approach?
                </p>
                <a
                  href="mailto:ahmetcanco@gmail.com"
                  className="btn btn-outline"
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
                  Email Me Directly
                </a>
              </div>
            </div>
          </div>

          {/* Contact Methods & Info */}
          {/* Contact Methods */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Connect With Me</h2>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-base-100 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-primary">{method.icon}</div>
                      <div>
                        <h3 className="font-semibold">{method.title}</h3>
                        <p className="text-sm text-base-content/70">
                          {method.description}
                        </p>
                        <p className="text-sm font-mono text-base-content/80">
                          {method.value}
                        </p>
                      </div>
                    </div>
                    <a
                      href={method.href}
                      target={
                        method.href.startsWith("mailto:") ? undefined : "_blank"
                      }
                      rel={
                        method.href.startsWith("mailto:")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className="btn btn-primary btn-sm"
                    >
                      {method.action}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                Availability & Response Time
              </h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="badge badge-success badge-lg">🟢</div>
                  <div>
                    <h3 className="font-semibold">Currently Available</h3>
                    <p className="text-sm text-base-content/70">
                      Open to new projects and collaborations
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="badge badge-info badge-lg">⏰</div>
                  <div>
                    <h3 className="font-semibold">Response Time</h3>
                    <p className="text-sm text-base-content/70">
                      Usually within 24-48 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="badge badge-warning badge-lg">🌍</div>
                  <div>
                    <h3 className="font-semibold">Timezone</h3>
                    <p className="text-sm text-base-content/70">
                      Turkey (UTC+3) - Istanbul
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What I'm Looking For */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                What I'm Interested In
              </h2>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="badge badge-primary">🚀</div>
                  <div>
                    <h4 className="font-semibold">Open Source Projects</h4>
                    <p className="text-sm text-base-content/70">
                      Contributing to interesting open source projects,
                      especially in systems programming
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="badge badge-secondary">💼</div>
                  <div>
                    <h4 className="font-semibold">Consulting & Freelance</h4>
                    <p className="text-sm text-base-content/70">
                      Technical consulting for programming language design and
                      developer tools
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="badge badge-accent">🎤</div>
                  <div>
                    <h4 className="font-semibold">Speaking Opportunities</h4>
                    <p className="text-sm text-base-content/70">
                      Conference talks, workshops, and technical presentations
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="badge badge-info">🤝</div>
                  <div>
                    <h4 className="font-semibold">Collaborations</h4>
                    <p className="text-sm text-base-content/70">
                      Working with other developers on innovative projects and
                      ideas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 hidden">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-semibold">
                Do you take on freelance projects?
              </div>
              <div className="collapse-content">
                <p>
                  Yes, I'm open to freelance projects, especially those
                  involving programming language design, developer tools, or
                  systems programming. Feel free to reach out with project
                  details.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-semibold">
                Can you help with my open source project?
              </div>
              <div className="collapse-content">
                <p>
                  I love contributing to open source! If your project aligns
                  with my interests (Rust, programming languages, developer
                  tools), I'd be happy to discuss how I can help.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-semibold">
                Are you available for speaking engagements?
              </div>
              <div className="collapse-content">
                <p>
                  Yes! I enjoy speaking about programming language design, Rust
                  development, and building developer tools. Contact me with
                  details about your event.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-semibold">
                How can I contribute to Ellie Language?
              </div>
              <div className="collapse-content">
                <p>
                  Great question! Visit the{" "}
                  <a
                    href="https://github.com/behemehal/ellie-language"
                    className="link link-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ellie GitHub repository
                  </a>
                  for contribution guidelines, or reach out directly to discuss
                  how you can get involved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
