import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowDown, FiArrowRight } from "react-icons/fi";
import Reveal from "../components/Reveal";
import { useLang } from "../i18n/LangContext";
import { docUrl } from "../lib/docs";

const stats = [
  { v: "4+", k: { en: "years in industry", tr: "yıl sektör deneyimi" } },
  { v: "40+", k: { en: "repositories", tr: "depo" } },
  { v: "1", k: { en: "language + VM built", tr: "dil + VM geliştirdim" } },
  { v: "5+", k: { en: "languages worked in", tr: "programlama diliyle çalıştım" } },
];

const chapters = [
  {
    id: "start",
    rail: "'17",
    kicker: {
      en: "2017 – 2018 · First principles",
      tr: "2017 – 2018 · İlk adımlar",
    },
    year: "2017",
    headline: {
      en: "Curiosity, close to the metal.",
      tr: "Donanıma yakın bir merak.",
    },
    prose: {
      en: "I started coding in late 2017 — not with a web tutorial, but with hardware. One of my first projects, rpifan, was a Node.js service that reads a Raspberry Pi's CPU temperature and drives its cooling fan with smooth, threshold-based control. Small, but it taught me Linux, real devices, and closed-loop control from day one.",
      tr: "Kod yazmaya 2017'nin sonlarında başladım — bir web eğitimiyle değil, donanımla. İlk projelerimden rpifan, Raspberry Pi'ın CPU sıcaklığını okuyup soğutma fanını eşik değerlerine göre yumuşak geçişlerle kontrol eden bir Node.js servisiydi. Küçük bir projeydi ama bana daha ilk günden Linux'u, gerçek cihazlarla çalışmayı ve kapalı döngü kontrolü öğretti.",
    },
    milestones: [
      {
        name: "rpifan",
        note: {
          en: "auto fan controller for Raspberry Pi",
          tr: "Raspberry Pi için otomatik fan kontrolcüsü",
        },
        url: "https://github.com/ahmetcanaksu/rpifan",
      },
    ],
    skills: ["Linux", "Node.js", "Raspberry Pi", "GPIO"],
  },
  {
    id: "systems",
    rail: "'19",
    kicker: {
      en: "2019 – 2020 · Systems & Rust",
      tr: "2019 – 2020 · Sistemler & Rust",
    },
    year: "2019",
    headline: {
      en: "Going lower, reaching for Rust.",
      tr: "Daha alt seviyeye inip Rust'a uzandım.",
    },
    prose: {
      en: "I moved toward systems programming and networking. Device-Database identified single-board computers and IoT hardware; then I picked up Rust and never looked back — Rust-NMEA parses the NMEA 0183 protocol behind GPS and marine navigation, and Wole is a Wake-on-LAN packet generator, sender, and listener CLI. I began freelancing and started a computer-programming degree.",
      tr: "Sistem programlama ve ağ tarafına yöneldim. Device-Database tek kartlı bilgisayarları ve IoT donanımlarını tanıyordu; ardından Rust'ı öğrendim ve bir daha bırakmadım — Rust-NMEA, GPS ve deniz navigasyonunun temelindeki NMEA 0183 protokolünü ayrıştırıyor; Wole ise Wake-on-LAN paketlerini üreten, gönderen ve dinleyen bir CLI. Bu dönemde freelance çalışmaya ve bilgisayar programcılığı eğitimime başladım.",
    },
    milestones: [
      {
        name: "Rust-NMEA",
        note: {
          en: "NMEA 0183 / GPS parser · crates.io",
          tr: "NMEA 0183 / GPS ayrıştırıcısı · crates.io",
        },
        url: "https://github.com/ahmetcanaksu/Rust-NMEA",
      },
      {
        name: "Wole",
        note: { en: "Wake-on-LAN CLI in Rust", tr: "Rust ile Wake-on-LAN CLI" },
        url: "https://github.com/ahmetcanaksu/Wole",
      },
      {
        name: "Device-Database",
        note: {
          en: "dev-board detection · npm",
          tr: "geliştirme kartı tespiti · npm",
        },
        url: "https://github.com/ahmetcanaksu/Device-Database",
      },
    ],
    skills: [
      "Rust",
      { en: "Networking", tr: "Ağ programlama" },
      { en: "Protocols", tr: "Protokoller" },
      "crates.io",
    ],
  },
  {
    id: "ellie",
    rail: "'20",
    kicker: {
      en: "2020 – 2022 · The big one",
      tr: "2020 – 2022 · Büyük proje",
    },
    year: "2020",
    headline: {
      en: "I designed a programming language — compiler, VM, and all.",
      tr: "Bir programlama dili tasarladım — derleyicisi, VM'i, her şeyiyle.",
    },
    prose: {
      en: "The work I'm proudest of: Ellie, a type-safe, compiled language for embedded and sandboxed environments. I built the whole pipeline from scratch — lexer, parser, type checker, bytecode compiler, and a virtual machine whose engine fits in as little as 49 KB. Around it grew an ecosystem: the Lia package manager, documentation, an online playground, and editor tooling. Building a language forces you to understand computing end to end — memory, instruction dispatch, and how programs actually run.",
      tr: "En gurur duyduğum işim: Ellie, gömülü ve sandbox ortamlar için tip güvenli, derlenen bir dil. Tüm hattı sıfırdan kurdum — lexer, parser, tip denetleyici, bytecode derleyici ve motoru 49 KB'a kadar küçülebilen bir sanal makine. Etrafında bir ekosistem büyüdü: Lia paket yöneticisi, dokümantasyon, online playground ve editör araçları. Bir dil geliştirmek, bilgisayarın nasıl çalıştığını uçtan uca anlamaya zorluyor — bellek, komut dağıtımı (dispatch) ve programların gerçekte nasıl çalıştığı.",
    },
    milestones: [
      {
        name: "Ellie Language",
        note: {
          en: "type-safe compiled language + bytecode VM · ★48",
          tr: "tip güvenli derlenen dil + bytecode VM · ★48",
        },
        url: "https://github.com/behemehal/Ellie-Language",
      },
      {
        name: "Lia",
        note: { en: "Ellie's package manager", tr: "Ellie'nin paket yöneticisi" },
        url: "https://github.com/behemehal/Lia",
      },
      {
        name: "Playground",
        note: { en: "run Ellie in the browser", tr: "Ellie'yi tarayıcıda çalıştırın" },
        url: "https://playground.ellie-lang.org/",
      },
    ],
    skills: [
      { en: "Compiler design", tr: "Derleyici tasarımı" },
      "Bytecode VM",
      { en: "Type systems", tr: "Tip sistemleri" },
      "Rust",
      { en: "Language tooling", tr: "Dil araçları" },
    ],
  },
  {
    id: "scale",
    rail: "'22",
    kicker: {
      en: "2022 – 2024 · Production scale",
      tr: "2022 – 2024 · Canlı ortam ölçeği",
    },
    year: "2022",
    headline: {
      en: "Shipping at scale — while going deeper on systems.",
      tr: "Ölçekli ürünler çıkarırken sistemlerde daha da derine indim.",
    },
    prose: {
      en: "While maintaining Ellie, I went professional. At Qpien I built real-time e-commerce infrastructure handling 100,000+ messages per hour over WebSockets and RabbitMQ. At Fonmap I engineer the backend for Turkey's leading digital investment platform — TEFAS integration and regulatory-compliant fund processes in TypeScript and C#. On the side I kept exploring the low level: Menemen (streaming HTTP in Rust), SafeEn (a local database), and Rusty6502 (a MOS 6502 CPU emulator).",
      tr: "Ellie'yi sürdürürken profesyonel olarak çalışmaya başladım. Qpien'de WebSocket ve RabbitMQ üzerinden saatte 100.000+ mesaj işleyen gerçek zamanlı e-ticaret altyapısı geliştirdim. Fonmap'te Türkiye'nin önde gelen dijital yatırım platformunun backend'ini geliştiriyorum — TypeScript ve C# ile TEFAS entegrasyonu ve mevzuata uyumlu fon süreçleri. Bir yandan da düşük seviyeyi keşfetmeye devam ettim: Menemen (Rust ile streaming HTTP), SafeEn (yerel bir veritabanı) ve Rusty6502 (MOS 6502 CPU emülatörü).",
    },
    milestones: [
      {
        name: "Fonmap",
        note: {
          en: "backend · fintech, TEFAS, TypeScript / C#",
          tr: "backend · fintech, TEFAS, TypeScript / C#",
        },
      },
      {
        name: "Qpien",
        note: {
          en: "real-time e-commerce · 100k+ msgs/hour",
          tr: "gerçek zamanlı e-ticaret · saatte 100 bin+ mesaj",
        },
      },
      {
        name: "Menemen · SafeEn · Rusty6502",
        note: {
          en: "streaming HTTP, a database, a CPU emulator — in Rust",
          tr: "streaming HTTP, bir veritabanı, bir CPU emülatörü — hepsi Rust ile",
        },
        url: "https://github.com/behemehal/Menemen",
      },
    ],
    skills: [
      { en: "Backend at scale", tr: "Ölçekli backend" },
      { en: "Real-time", tr: "Gerçek zamanlı sistemler" },
      "Fintech",
      "TypeScript",
      "C#",
      "Rust",
    ],
  },
  {
    id: "hardware",
    rail: "'24",
    kicker: {
      en: "2024 – 2026 · The frontier",
      tr: "2024 – 2026 · Yeni sınırlar",
    },
    year: "2025",
    headline: {
      en: "Back to the physical world — circuits, lasers, CAD.",
      tr: "Fiziksel dünyaya dönüş — devreler, lazerler, CAD.",
    },
    prose: {
      en: "Lately I've pushed deeper into hardware. LaserNet is a bi-directional laser-communication system on microcontrollers, studying timing synchronization and packet loss in free-space optical links. I design PCBs in EasyEDA, keep the emulators coming (RChip-8, a highly portable CHIP-8 machine), and explore Rust FFI and native UI with egui and GTK. Software and hardware, meeting in the middle.",
      tr: "Son dönemde donanımda daha da derine indim. LaserNet, mikrodenetleyiciler üzerinde çalışan çift yönlü bir lazer haberleşme sistemi; serbest uzay optik bağlantılarında zamanlama senkronizasyonunu ve paket kaybını inceliyor. EasyEDA'da PCB tasarlıyorum, emülatör yazmaya devam ediyorum (RChip-8, yüksek taşınabilirliğe sahip bir CHIP-8 makinesi) ve egui ile GTK üzerinden Rust FFI ve native arayüzlerle uğraşıyorum. Yazılım ve donanım, ortada buluşuyor.",
    },
    milestones: [
      {
        name: "LaserNet",
        note: {
          en: "bi-directional laser comms on microcontrollers",
          tr: "mikrodenetleyicilerle çift yönlü lazer haberleşme",
        },
        url: "https://github.com/ahmetcanaksu/LaserNet",
      },
      {
        name: "RChip-8",
        note: {
          en: "highly portable CHIP-8 emulator in Rust",
          tr: "Rust ile yüksek taşınabilirliğe sahip CHIP-8 emülatörü",
        },
        url: "https://github.com/ahmetcanaksu/RChip-8",
      },
      {
        name: { en: "EasyEDA / PCB design", tr: "EasyEDA / PCB tasarımı" },
        note: {
          en: "schematics & boards for my own hardware",
          tr: "kendi donanımlarım için şema ve kart tasarımları",
        },
      },
    ],
    skills: [
      { en: "Embedded", tr: "Gömülü sistemler" },
      "ESP32 / Arduino",
      "PCB / CAD",
      { en: "Optical comms", tr: "Optik haberleşme" },
      "Rust FFI",
    ],
  },
];

const capabilities = [
  {
    t: { en: "Language & compiler design", tr: "Dil & derleyici tasarımı" },
    d: {
      en: "Parsers, type systems, bytecode compilers, and virtual machines — built from scratch.",
      tr: "Parser'lar, tip sistemleri, bytecode derleyiciler ve sanal makineler — sıfırdan.",
    },
  },
  {
    t: { en: "Systems programming", tr: "Sistem programlama" },
    d: {
      en: "Rust and C, from network protocols to CPU emulators, with an eye on footprint.",
      tr: "Ağ protokollerinden CPU emülatörlerine kadar Rust ve C; kaynak kullanımını hep göz önünde tutarak.",
    },
  },
  {
    t: { en: "Embedded & hardware", tr: "Gömülü sistemler & donanım" },
    d: {
      en: "Microcontrollers, PCB/CAD, and optical communication — comfortable at the metal.",
      tr: "Mikrodenetleyiciler, PCB/CAD ve optik haberleşme — donanıma yakın çalışmaktan keyif alırım.",
    },
  },
  {
    t: { en: "Backend at scale", tr: "Ölçekli backend" },
    d: {
      en: "Real-time, high-throughput, and regulated fintech systems in production.",
      tr: "Canlı ortamda gerçek zamanlı, yüksek hacimli ve mevzuata tabi fintech sistemleri.",
    },
  },
  {
    t: { en: "Full-stack delivery", tr: "Uçtan uca full-stack" },
    d: {
      en: "React and TypeScript through to databases — shipping end to end.",
      tr: "React ve TypeScript'ten veritabanlarına — uçtan uca ürün çıkarırım.",
    },
  },
  {
    t: { en: "Open source", tr: "Açık kaynak" },
    d: {
      en: "A language, libraries, and tools across 40+ repositories, maintained in the open.",
      tr: "40+ depoda açık olarak sürdürdüğüm bir dil, kütüphaneler ve araçlar.",
    },
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
  const { t, lang } = useLang();
  const railIds = useMemo(
    () => ["intro", ...chapters.map((c) => c.id), "capabilities"],
    []
  );
  const railLabels = useMemo(
    () => ({
      intro: t({ en: "Intro", tr: "Giriş" }),
      capabilities: t({ en: "Now", tr: "Bugün" }),
      ...Object.fromEntries(chapters.map((c) => [c.id, c.rail])),
    }),
    [t]
  );
  const active = useActiveSection(railIds);
  const cvHref = docUrl("cv", lang);

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="relative">
      {/* Era rail */}
      <nav
        aria-label={t({ en: "Timeline", tr: "Zaman çizelgesi" })}
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
                  aria-label={t({
                    en: `Go to ${railLabels[id]}`,
                    tr: `${railLabels[id]} bölümüne git`,
                  })}
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
          <p className="kicker mb-6">
            {t({ en: "Journey", tr: "Yolculuk" })} · 2017 → 2026
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] sm:text-6xl">
            {t({
              en: "From blinking an LED to designing a language.",
              tr: "Bir LED yakıp söndürmekten bir dil tasarlamaya.",
            })}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-2">
            {t({
              en: (
                <>
                  I&apos;m a self-taught software developer. Over eight years I&apos;ve
                  gone from controlling a Raspberry Pi&apos;s fan to building a complete
                  programming language, shipping fintech backends, and researching
                  embedded hardware. Here&apos;s the path — and what each step taught
                  me.
                </>
              ),
              tr: (
                <>
                  Kendi kendini yetiştirmiş bir yazılım geliştiriciyim. Sekiz yılda
                  bir Raspberry Pi&apos;ın fanını kontrol etmekten eksiksiz bir
                  programlama dili geliştirmeye, fintech backend&apos;leri canlıya
                  almaya ve gömülü donanım üzerine araştırma yapmaya uzanan bir yol
                  yürüdüm. İşte o yol — ve her adımın bana öğrettikleri.
                </>
              ),
            })}
          </p>

          <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.k.en} className="border-t border-rule pt-3">
                <dt className="font-display text-3xl font-semibold text-ink">
                  {s.v}
                </dt>
                <dd className="mt-1 text-sm text-ink-3">{t(s.k)}</dd>
              </div>
            ))}
          </dl>

          <button
            onClick={() => go("start")}
            className="link-arrow mt-12 text-ink-2"
          >
            {t({ en: "Start the story", tr: "Hikâyeye başla" })}{" "}
            <FiArrowDown className="h-4 w-4" />
          </button>
        </Reveal>
      </section>

      {/* Chapters */}
      {chapters.map((c) => (
        <section key={c.id} id={c.id} className="chapter">
          <Reveal className="wrap">
            <p className="kicker">{t(c.kicker)}</p>
            <div className="chapter-year mt-2" aria-hidden="true">
              {c.year}
            </div>
            <h2 className="mt-1 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
              {t(c.headline)}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-2">
              {t(c.prose)}
            </p>

            <ul className="mt-8 max-w-3xl">
              {c.milestones.map((m, i) => (
                <li
                  key={i}
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
                        {t(m.name)}
                        <FiArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      t(m.name)
                    )}
                  </span>
                  <span className="pl-4 text-sm text-ink-3 sm:pl-0">{t(m.note)}</span>
                </li>
              ))}
            </ul>

            <div className="tags mt-6 max-w-3xl">
              {c.skills.map((s, i) => (
                <span key={i}>
                  {i > 0 && <span className="mr-2 text-rule">·</span>}
                  {t(s)}
                </span>
              ))}
            </div>
          </Reveal>
        </section>
      ))}

      {/* Capabilities / close */}
      <section id="capabilities" className="chapter">
        <Reveal className="wrap">
          <p className="kicker mb-4">
            {t({ en: "The takeaway", tr: "Özetle" })}
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold sm:text-5xl">
            {t({
              en: "What I bring to a team.",
              tr: "Bir ekibe kattıklarım.",
            })}
          </h2>

          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <div key={c.t.en} className="border-t border-rule pt-4">
                <p className="meta">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-lg font-semibold text-ink">{t(c.t)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{t(c.d)}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <h3 className="text-2xl font-semibold">
              {t({
                en: <>Available for roles &amp; collaboration.</>,
                tr: "Yeni pozisyonlara ve iş birliklerine açığım.",
              })}
            </h3>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link to="/contact" className="btn-solid">
                {t({ en: "Get in touch", tr: "İletişime geç" })}{" "}
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={cvHref}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow text-ink-2"
              >
                {t({ en: "Résumé", tr: "Özgeçmiş" })}{" "}
                <FiArrowUpRight className="h-4 w-4" />
              </a>
              <Link to="/projects" className="link-arrow text-ink-2">
                {t({ en: "See the work", tr: "Projelere göz at" })}{" "}
                <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Journey;
