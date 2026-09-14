import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import PageHeader from "../components/PageHeader";

const experience = [
  {
    period: "2024 — Now",
    role: "Backend Developer",
    company: "Fonmap Financial Technologies",
    points: [
      "Lead backend work on Turkey's premier digital investment platform.",
      "Migrated core systems to TypeScript; built TEFAS integration infrastructure.",
      "Digitized VCIF & REIF processes under regulatory compliance.",
    ],
  },
  {
    period: "2022 — 2024",
    role: "Full-Stack Developer",
    company: "Qpien",
    points: [
      "Built systems processing 100,000+ messages/hour.",
      "Real-time messaging with WebSockets & RabbitMQ; React + Node.js + GraphQL.",
    ],
  },
  {
    period: "2021 — 2022",
    role: "Full-Stack Developer",
    company: "Massive Energy",
    points: [
      "Full-stack solutions with Node.js & MongoDB, deployed on AWS/Linux.",
    ],
  },
  {
    period: "2019 — 2022",
    role: "Freelance Developer",
    company: "Mobile & Backend",
    points: [
      "Flutter apps, React web apps, Node.js backends, and Rust systems for clients.",
    ],
  },
];

const skills = [
  { group: "Languages", items: "Rust · C# · C · TypeScript · JavaScript · Dart · SQL" },
  { group: "Backend", items: "Node.js · Express · .NET · EF Core · GraphQL · REST · RabbitMQ" },
  { group: "Frontend", items: "React · Redux · Tailwind · Vite · HTML/CSS" },
  { group: "Data", items: "PostgreSQL · MSSQL · MongoDB · Redis · Elasticsearch" },
  { group: "Systems & Embedded", items: "Rust · C · WebAssembly · ESP32 · ESP8266 · Arduino · ARM" },
  { group: "Hardware / EDA", items: "EasyEDA (beginner) · PCB design (beginner) · Soldering" },
  { group: "DevOps", items: "Docker · AWS · Linux · Git · CI/CD" },
];

const education = [
  {
    period: "2023 — Now",
    title: "Management Information Systems",
    school: "Anadolu University",
  },
  {
    period: "2020 — 2022",
    title: "Computer Programming (Associate) · GPA 3.53/4.00",
    school: "Işık University",
  },
];

const elsewhere = [
  { name: "Behemehal", role: "Founder & lead developer", href: "https://behemehal.org" },
  { name: "Ellie Language", role: "Creator & maintainer", href: "https://ellie-lang.org" },
  { name: "UtilStation", role: "Creator", href: "https://utilstation.com" },
  { name: "GitHub", role: "Open-source contributions", href: "https://github.com/ahmetcanaksu" },
];

const Section = ({ title, children }) => (
  <section className="mt-16">
    <h2 className="kicker mb-6">{title}</h2>
    {children}
  </section>
);

const About = () => {
  return (
    <div className="wrap py-16 sm:py-20">
      <PageHeader kicker="About" title="A bit about me.">
        Software developer and open-source enthusiast from Istanbul.
      </PageHeader>

      <div className="prose-paper max-w-3xl text-lg">
        <p>
          I&apos;ve been writing code since 2017. I care about performance,
          correctness, and building things from first principles — which is how I
          ended up designing my own programming language,{" "}
          <a href="https://ellie-lang.org" target="_blank" rel="noopener noreferrer">
            Ellie
          </a>
          , a type-safe language for embedded and sandboxed environments.
        </p>
        <p>
          Day to day I work across the stack — React and TypeScript on the web,
          Rust and C# on the backend, and embedded systems on ARM/ESP hardware.
          I&apos;m currently a backend developer at Fonmap, and I build developer
          tools like{" "}
          <a href="https://utilstation.com" target="_blank" rel="noopener noreferrer">
            UtilStation
          </a>{" "}
          in my own time.
        </p>
      </div>

      <Section title="Experience">
        <div>
          {experience.map((e) => (
            <div key={e.company} className="row">
              <span className="row-num sm:w-32">{e.period}</span>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-ink">
                  {e.role}{" "}
                  <span className="font-normal text-ink-3">— {e.company}</span>
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {e.points.map((p, i) => (
                    <li key={i} className="flex gap-2 text-ink-2">
                      <span className="text-accent">—</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div className="border-t border-rule" />
        </div>
      </Section>

      <Section title="Skills">
        <dl>
          {skills.map((s) => (
            <div
              key={s.group}
              className="flex flex-col gap-1 border-t border-rule py-4 sm:flex-row sm:gap-6"
            >
              <dt className="shrink-0 font-medium text-ink sm:w-48">{s.group}</dt>
              <dd className="font-mono text-sm text-ink-2">{s.items}</dd>
            </div>
          ))}
          <div className="border-t border-rule" />
        </dl>
      </Section>

      <Section title="Education">
        <div>
          {education.map((e) => (
            <div key={e.school} className="row">
              <span className="row-num sm:w-32">{e.period}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-ink">{e.title}</h3>
                <p className="mt-1 text-ink-3">{e.school}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-rule" />
        </div>
      </Section>

      <Section title="Elsewhere">
        <div>
          {elsewhere.map((o) => (
            <a
              key={o.name}
              href={o.href}
              target="_blank"
              rel="noopener noreferrer"
              className="row"
            >
              <span className="row-num sm:w-32" />
              <div className="flex flex-1 items-baseline justify-between gap-4">
                <h3 className="row-title">{o.name}</h3>
                <span className="meta hidden items-center gap-1 sm:inline-flex">
                  {o.role} <FiArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          ))}
          <div className="border-t border-rule" />
        </div>
      </Section>

      <div className="mt-16 flex flex-wrap gap-x-6 gap-y-3">
        <Link to="/contact" className="btn-solid">
          Get in touch
        </Link>
        <Link to="/resume" className="btn-line">
          View résumé
        </Link>
      </div>
    </div>
  );
};

export default About;
