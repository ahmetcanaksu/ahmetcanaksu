import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowDown, FiArrowRight } from "react-icons/fi";
import Reveal from "../components/Reveal";

const stats = [
  { v: "8+", k: "years, self-taught" },
  { v: "40+", k: "repositories" },
  { v: "1", k: "language + VM built" },
  { v: "5+", k: "languages worked in" },
];

const chapters = [
  {
    id: "start",
    rail: "'17",
    kicker: "2017 – 2018 · First principles",
    year: "2017",
    headline: "Curiosity, close to the metal.",
    prose:
      "I started coding in late 2017 — not with a web tutorial, but with hardware. One of my first projects, rpifan, was a Node.js service that reads a Raspberry Pi's CPU temperature and drives its cooling fan with smooth, threshold-based control. Small, but it taught me Linux, real devices, and closed-loop control from day one.",
    milestones: [
      {
        name: "rpifan",
        note: "auto fan controller for Raspberry Pi",
        url: "https://github.com/ahmetcanaksu/rpifan",
      },
    ],
    skills: ["Linux", "Node.js", "Raspberry Pi", "GPIO"],
  },
  {
    id: "systems",
    rail: "'19",
    kicker: "2019 – 2020 · Systems & Rust",
    year: "2019",
    headline: "Going lower, reaching for Rust.",
    prose:
      "I moved toward systems programming and networking. Device-Database identified single-board computers and IoT hardware; then I picked up Rust and never looked back — Rust-NMEA parses the NMEA 0183 protocol behind GPS and marine navigation, and Wole is a Wake-on-LAN packet generator, sender, and listener CLI. I began freelancing and started a computer-programming degree.",
    milestones: [
      {
        name: "Rust-NMEA",
        note: "NMEA 0183 / GPS parser · crates.io",
        url: "https://github.com/ahmetcanaksu/Rust-NMEA",
      },
      {
        name: "Wole",
        note: "Wake-on-LAN CLI in Rust",
        url: "https://github.com/ahmetcanaksu/Wole",
      },
      {
        name: "Device-Database",
        note: "dev-board detection · npm",
        url: "https://github.com/ahmetcanaksu/Device-Database",
      },
    ],
    skills: ["Rust", "Networking", "Protocols", "crates.io"],
  },
  {
    id: "ellie",
    rail: "'20",
    kicker: "2020 – 2022 · The big one",
    year: "2020",
    headline: "I designed a programming language — compiler, VM, and all.",
    prose:
      "The work I'm proudest of: Ellie, a type-safe, compiled language for embedded and sandboxed environments. I built the whole pipeline from scratch — lexer, parser, type checker, bytecode compiler, and a virtual machine whose engine fits in as little as 49 KB. Around it grew an ecosystem: the Lia package manager, documentation, an online playground, and editor tooling. Building a language forces you to understand computing end to end — memory, instruction dispatch, and how programs actually run.",
    milestones: [
      {
        name: "Ellie Language",
        note: "type-safe compiled language + bytecode VM · ★48",
        url: "https://github.com/behemehal/Ellie-Language",
      },
      {
        name: "Lia",
        note: "Ellie's package manager",
        url: "https://github.com/behemehal/Lia",
      },
      {
        name: "Playground",
        note: "run Ellie in the browser",
        url: "https://playground.ellie-lang.org/",
      },
    ],
    skills: [
      "Compiler design",
      "Bytecode VM",
      "Type systems",
      "Rust",
      "Language tooling",
    ],
  },
  {
    id: "scale",
    rail: "'22",
    kicker: "2022 – 2024 · Production scale",
    year: "2022",
    headline: "Shipping at scale — while going deeper on systems.",
    prose:
      "While maintaining Ellie, I went professional. At Qpien I built real-time e-commerce infrastructure handling 100,000+ messages per hour over WebSockets and RabbitMQ. At Fonmap I engineer the backend for Turkey's leading digital investment platform — TEFAS integration and regulatory-compliant fund processes in TypeScript and C#. On the side I kept exploring the low level: Menemen (streaming HTTP in Rust), SafeEn (a local database), and Rusty6502 (a MOS 6502 CPU emulator).",
    milestones: [
      { name: "Fonmap", note: "backend · fintech, TEFAS, TypeScript / C#" },
      { name: "Qpien", note: "real-time e-commerce · 100k+ msgs/hour" },
      {
        name: "Menemen · SafeEn · Rusty6502",
        note: "streaming HTTP, a database, a CPU emulator — in Rust",
        url: "https://github.com/behemehal/Menemen",
      },
    ],
    skills: [
      "Backend at scale",
      "Real-time",
      "Fintech",
      "TypeScript",
      "C#",
      "Rust",
    ],
  },
  {
    id: "hardware",
    rail: "'24",
    kicker: "2024 – 2026 · The frontier",
    year: "2025",
    headline: "Back to the physical world — circuits, lasers, CAD.",
    prose:
      "Lately I've pushed deeper into hardware. LaserNet is a bi-directional laser-communication system on microcontrollers, studying timing synchronization and packet loss in free-space optical links. I design PCBs in EasyEDA, keep the emulators coming (RChip-8, a highly portable CHIP-8 machine), and explore Rust FFI and native UI with egui and GTK. Software and hardware, meeting in the middle.",
    milestones: [
      {
        name: "LaserNet",
        note: "bi-directional laser comms on microcontrollers",
        url: "https://github.com/ahmetcanaksu/LaserNet",
      },
      {
        name: "RChip-8",
        note: "highly portable CHIP-8 emulator in Rust",
        url: "https://github.com/ahmetcanaksu/RChip-8",
      },
      { name: "EasyEDA / PCB design", note: "schematics & boards for my own hardware" },
    ],
    skills: [
      "Embedded",
      "ESP32 / Arduino",
      "PCB / CAD",
      "Optical comms",
      "Rust FFI",
    ],
  },
];

const capabilities = [
  {
    t: "Language & compiler design",
    d: "Parsers, type systems, bytecode compilers, and virtual machines — built from scratch.",
  },
  {
    t: "Systems programming",
    d: "Rust and C, from network protocols to CPU emulators, with an eye on footprint.",
  },
  {
    t: "Embedded & hardware",
    d: "Microcontrollers, PCB/CAD, and optical communication — comfortable at the metal.",
  },
  {
    t: "Backend at scale",
    d: "Real-time, high-throughput, and regulated fintech systems in production.",
  },
  {
    t: "Full-stack delivery",
    d: "React and TypeScript through to databases — shipping end to end.",
  },
  {
    t: "Open source",
    d: "A language, libraries, and tools across 40+ repositories, maintained in the open.",
  },
];

const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
};

const Journey = () => {
  const railIds = useMemo(
    () => ["intro", ...chapters.map((c) => c.id), "capabilities"],
    []
  );
  const railLabels = useMemo(
    () => ({
      intro: "Intro",
      capabilities: "Now",
      ...Object.fromEntries(chapters.map((c) => [c.id, c.rail])),
    }),
    []
  );
  const active = useActiveSection(railIds);

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="relative">
      {/* Era rail */}
      <nav
        aria-label="Timeline"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      >
        <ul className="space-y-3">
          {railIds.map((id) => {
            const isActive = active === id;
            return (
              <li key={id} className="flex justify-end">
                <button
                  onClick={() => go(id)}
                  className="group flex items-center gap-2"
                  aria-label={`Go to ${railLabels[id]}`}
                >
                  <span
                    className={`font-mono text-[11px] uppercase tracking-widest transition-opacity ${
                      isActive
                        ? "text-accent opacity-100"
                        : "text-ink-3 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {railLabels[id]}
                  </span>
                  <span
                    className={`h-px transition-all ${
                      isActive ? "w-8 bg-accent" : "w-4 bg-ink/25 group-hover:bg-ink"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Intro */}
      <section
        id="intro"
        className="chapter min-h-[92vh] justify-center"
      >
        <Reveal className="wrap">
          <p className="kicker mb-6">Journey · 2017 → 2026</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] sm:text-6xl">
            From blinking an LED to designing a language.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-2">
            I&apos;m a self-taught software developer. Over eight years I&apos;ve
            gone from controlling a Raspberry Pi&apos;s fan to building a complete
            programming language, shipping fintech backends, and researching
            embedded hardware. Here&apos;s the path — and what each step taught
            me.
          </p>

          <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.k} className="border-t border-rule pt-3">
                <dt className="font-display text-3xl font-semibold text-ink">
                  {s.v}
                </dt>
                <dd className="mt-1 text-sm text-ink-3">{s.k}</dd>
              </div>
            ))}
          </dl>

          <button
            onClick={() => go("start")}
            className="link-arrow mt-12 text-ink-2"
          >
            Start the story <FiArrowDown className="h-4 w-4" />
          </button>
        </Reveal>
      </section>

      {/* Chapters */}
      {chapters.map((c) => (
        <section key={c.id} id={c.id} className="chapter">
          <Reveal className="wrap">
            <p className="kicker">{c.kicker}</p>
            <div className="chapter-year mt-2" aria-hidden="true">
              {c.year}
            </div>
            <h2 className="mt-1 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
              {c.headline}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-2">
              {c.prose}
            </p>

            <ul className="mt-8 max-w-3xl">
              {c.milestones.map((m) => (
                <li
                  key={m.name}
                  className="flex flex-col gap-0.5 border-t border-rule py-3 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <span className="flex items-center gap-2 font-medium text-ink sm:w-[19rem] sm:shrink-0">
                    <span className="dot text-accent" />
                    {m.url ? (
                      <a
                        href={m.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-arrow"
                      >
                        {m.name}
                        <FiArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      m.name
                    )}
                  </span>
                  <span className="pl-4 text-sm text-ink-3 sm:pl-0">{m.note}</span>
                </li>
              ))}
            </ul>

            <div className="tags mt-6 max-w-3xl">
              {c.skills.map((s, i) => (
                <span key={s}>
                  {i > 0 && <span className="mr-2 text-rule">·</span>}
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </section>
      ))}

      {/* Capabilities / close */}
      <section id="capabilities" className="chapter">
        <Reveal className="wrap">
          <p className="kicker mb-4">The takeaway</p>
          <h2 className="max-w-3xl text-3xl font-semibold sm:text-5xl">
            What I bring to a team.
          </h2>

          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <div key={c.t} className="border-t border-rule pt-4">
                <p className="meta">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-lg font-semibold text-ink">{c.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <h3 className="text-2xl font-semibold">
              Available for roles &amp; collaboration.
            </h3>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link to="/contact" className="btn-solid">
                Get in touch <FiArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="/Ahmetcan Aksu CV EN.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow text-ink-2"
              >
                Résumé <FiArrowUpRight className="h-4 w-4" />
              </a>
              <Link to="/projects" className="link-arrow text-ink-2">
                See the work <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Journey;
