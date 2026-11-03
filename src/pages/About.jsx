import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import { useLang } from "../i18n/LangContext";

const NOW = { en: "Now", tr: "Bugün" };

const experience = [
  {
    from: "2024",
    to: NOW,
    role: { en: "Software Developer", tr: "Yazılım Geliştirici" },
    company: "Fonmap Financial Technologies",
    points: [
      {
        en: "Owned the TEFAS fund-order integration end to end: order submission, status tracking, cancellation and blockage release.",
        tr: "TEFAS fon emir entegrasyonunu uçtan uca geliştirdim: emir iletimi, durum takibi, iptal ve blokaj çözme.",
      },
      {
        en: "Custodian-bank integration, KYC / AML onboarding and VCIF & REIF fund flows under SPK regulation.",
        tr: "Saklamacı banka entegrasyonu, KYC / AML müşteri kabulü ve SPK mevzuatına uygun GSYF ve GYF süreçleri.",
      },
      {
        en: "AI portfolio recommendations and fund risk evaluations in the product; backend migrated to C#/.NET.",
        tr: "Üründe yapay zeka destekli portföy önerileri ve fon risk değerlendirmeleri; backend'in C#/.NET'e taşınması.",
      },
    ],
  },
  {
    from: "2022",
    to: "2024",
    role: { en: "Full-Stack Developer", tr: "Full Stack Geliştirici" },
    company: "Qpien",
    points: [
      {
        en: "Built systems processing 100,000+ messages/hour.",
        tr: "Saatte 100.000+ mesaj işleyen sistemler geliştirdim.",
      },
      {
        en: "Real-time messaging with WebSockets & RabbitMQ; React + Node.js + GraphQL.",
        tr: "WebSocket ve RabbitMQ ile gerçek zamanlı mesajlaşma; React + Node.js + GraphQL.",
      },
    ],
  },
  {
    from: "2021",
    to: "2022",
    role: { en: "Full-Stack Developer", tr: "Full Stack Geliştirici" },
    company: "Massive Energy",
    points: [
      {
        en: "Full-stack solutions with Node.js & MongoDB, deployed on AWS/Linux.",
        tr: "Node.js ve MongoDB ile AWS/Linux üzerinde çalışan full stack çözümler geliştirdim.",
      },
    ],
  },
  {
    from: "2019",
    to: "2022",
    role: { en: "Freelance Developer", tr: "Freelance Geliştirici" },
    company: { en: "Mobile & Backend", tr: "Mobil & Backend" },
    points: [
      {
        en: "Flutter apps, React web apps, Node.js backends, and Rust systems for clients.",
        tr: "Müşteriler için Flutter uygulamaları, React web uygulamaları, Node.js backend'leri ve Rust sistemleri geliştirdim.",
      },
    ],
  },
];

const skills = [
  {
    group: { en: "Fintech", tr: "Fintek" },
    items: {
      en: "TEFAS order integration · fund order flows · banking integrations · KYC / AML · SPK regulation",
      tr: "TEFAS emir entegrasyonu · fon emir akışları · banka entegrasyonları · KYC / AML · SPK mevzuatı",
    },
  },
  {
    group: { en: "AI & LLMs", tr: "Yapay Zeka & LLM" },
    items: {
      en: "LLM applications · tool calling · Claude API · OpenAI-compatible APIs (Groq, LM Studio) · local models (Qwen3-VL, Gemma) · vision models · ElevenLabs TTS",
      tr: "LLM tabanlı uygulamalar · tool calling · Claude API · OpenAI uyumlu API'ler (Groq, LM Studio) · yerel modeller (Qwen3-VL, Gemma) · görüntü modelleri · ElevenLabs TTS",
    },
  },
  { group: { en: "Languages", tr: "Diller" }, items: "Rust · C# · C · TypeScript · JavaScript · Dart · SQL" },
  { group: "Backend", items: ".NET · EF Core · Node.js · Deno · Bun · Express · REST · GraphQL · WebSocket · RabbitMQ" },
  { group: "Frontend", items: "React · Redux · Apollo · PWA · Tailwind · Vite · HTML/CSS" },
  { group: { en: "Mobile & Desktop", tr: "Mobil & Masaüstü" }, items: "React Native · Expo · Flutter · Dart · Tauri · Electron" },
  { group: { en: "Data", tr: "Veri" }, items: "PostgreSQL · MSSQL · MongoDB · Redis · Elasticsearch · Cloudflare R2" },
  {
    group: { en: "Systems & Embedded", tr: "Sistem & Gömülü" },
    items: "Rust · C · WebAssembly · ESP32 · ESP8266 · Arduino · ARM",
  },
  {
    group: { en: "Hardware / EDA", tr: "Donanım / EDA" },
    items: {
      en: "EasyEDA (beginner) · PCB design (beginner) · Soldering",
      tr: "EasyEDA (başlangıç) · PCB tasarımı (başlangıç) · Lehimleme",
    },
  },
  {
    group: "DevOps",
    items: "Docker · Nginx · Linux & Bash · GitHub Actions CI/CD · Cloudflare · AWS · Git",
  },
];

const education = [
  {
    from: "2023",
    to: NOW,
    title: { en: "Management Information Systems", tr: "Yönetim Bilişim Sistemleri" },
    school: { en: "Anadolu University", tr: "Anadolu Üniversitesi" },
  },
  {
    from: "2020",
    to: "2022",
    title: {
      en: "Computer Programming (Associate) · GPA 3.53/4.00",
      tr: "Bilgisayar Programcılığı (Ön Lisans) · GNO 3.53/4.00",
    },
    school: { en: "Işık University", tr: "Işık Üniversitesi" },
  },
];

const elsewhere = [
  {
    name: "Behemehal",
    role: { en: "Founder & lead developer", tr: "Kurucu & baş geliştirici" },
    href: "https://behemehal.org",
  },
  {
    name: "Ellie Language",
    role: { en: "Creator & maintainer", tr: "Yaratıcı & sürdürücü" },
    href: "https://ellie-lang.org",
  },
  { name: "UtilStation", role: { en: "Creator", tr: "Yaratıcı" }, href: "https://utilstation.com" },
  {
    name: "GitHub",
    role: { en: "Open-source contributions", tr: "Açık kaynak katkıları" },
    href: "https://github.com/ahmetcanaksu",
  },
];

const Section = ({ title, children }) => (
  <section className="mt-16">
    <h2 className="kicker mb-6">{title}</h2>
    {children}
  </section>
);

const About = () => {
  const { t } = useLang();
  const period = (e) => `${e.from} — ${t(e.to)}`;

  return (
    <div className="wrap py-16 sm:py-20">
      <PageHeader
        kicker={t({ en: "About", tr: "Hakkımda" })}
        title={t({ en: "A bit about me.", tr: "Biraz kendimden bahsedeyim." })}
      >
        {t({
          en: "Software developer and open-source enthusiast from Istanbul.",
          tr: "İstanbul'da yaşayan bir yazılım geliştirici ve açık kaynak meraklısıyım.",
        })}
      </PageHeader>

      <div className="prose-paper max-w-3xl text-lg">
        {t({
          en: (
            <>
              <p>
                I build backend, frontend, embedded and real-time data systems in
                C#/.NET, Node.js/TypeScript, React and Rust. I&apos;ve been writing code
                since 2017: REST, GraphQL and WebSocket APIs on Node.js, Deno and Bun; PWAs
                in React, desktop apps in Tauri and Electron, and mobile apps in React
                Native and Flutter, including a game live on Google Play.
              </p>
              <p>
                Lately most of my work has been in finance: bank and TEFAS integrations,
                KYC and compliance flows. It&apos;s work that talks to outside systems,
                runs over long stretches and can&apos;t be left half done. Before that I
                worked on real-time messaging infrastructure for e-commerce.
              </p>
              <p>
                On the AI side, I build applications where the model doesn&apos;t just
                write text but does the work with tools: an editor that draws and
                animates pixel art, a studio that puts together animated videos, a
                prototyping tool that turns a photo of a module into a circuit part.
              </p>
              <p>
                I also like spending time lower in the stack: I wrote{" "}
                <a href="https://ellie-lang.org" target="_blank" rel="noopener noreferrer">
                  Ellie
                </a>
                , my own programming language, compiler and virtual machine in Rust,
                and I maintain open-source libraries for embedded platforms like ARM and
                ESP32. In my own time I also run developer tools like{" "}
                <a href="https://utilstation.com" target="_blank" rel="noopener noreferrer">
                  UtilStation
                </a>
                .
              </p>
            </>
          ),
          tr: (
            <>
              <p>
                C#/.NET, Node.js/TypeScript, React ve Rust ile backend, frontend, gömülü
                yazılım ve gerçek zamanlı veri sistemleri geliştiriyorum. 2017&apos;den
                beri kod yazıyorum: Node.js, Deno ve Bun ile REST, GraphQL ve WebSocket
                API&apos;leri; React ile PWA&apos;lar, Tauri ve Electron ile masaüstü, React
                Native ve Flutter ile mobil uygulamalar. Google Play&apos;de yayında bir oyunum da var.
              </p>
              <p>
                Son yıllarda çoğunlukla finans tarafında çalışıyorum: banka ve TEFAS
                entegrasyonları, KYC ve mevzuat süreçleri. Bunlar dış sistemlerle konuşan,
                uzun süren ve yarıda kalmaması gereken işler. Daha önce e-ticaret
                tarafında gerçek zamanlı mesajlaşma altyapıları üzerinde çalıştım.
              </p>
              <p>
                Yapay zeka tarafında, modelin sadece metin üretmediği, araç kullanarak
                işi kendisinin yaptığı uygulamalar geliştiriyorum: piksel sanat çizip
                canlandıran bir editör, animasyonlu video hazırlayan bir stüdyo, bir
                modülün fotoğrafından devre parçası çıkaran bir prototipleme aracı.
              </p>
              <p>
                Daha alt seviyede de vakit geçirmeyi seviyorum: Rust ile{" "}
                <a href="https://ellie-lang.org" target="_blank" rel="noopener noreferrer">
                  Ellie
                </a>{" "}
                adında kendi programlama dilimi, derleyicisini ve sanal makinesini
                yazdım; ARM ve ESP32 gibi gömülü platformlar için açık kaynak
                kütüphaneler geliştiriyorum. Boş zamanlarımda da{" "}
                <a href="https://utilstation.com" target="_blank" rel="noopener noreferrer">
                  UtilStation
                </a>{" "}
                gibi geliştirici araçlarını yürütüyorum.
              </p>
            </>
          ),
        })}
      </div>

      <Section title={t({ en: "Experience", tr: "Deneyim" })}>
        <div>
          {experience.map((e) => (
            <div key={t(e.company)} className="row">
              <span className="row-num sm:w-32">{period(e)}</span>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-ink">
                  {t(e.role)}{" "}
                  <span className="font-normal text-ink-3">— {t(e.company)}</span>
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {e.points.map((p, i) => (
                    <li key={i} className="flex gap-2 text-ink-2">
                      <span className="text-accent">—</span>
                      <span>{t(p)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div className="border-t border-rule" />
        </div>
      </Section>

      <Section title={t({ en: "Skills", tr: "Yetenekler" })}>
        <dl>
          {skills.map((s) => (
            <div
              key={t(s.group)}
              className="flex flex-col gap-1 border-t border-rule py-4 sm:flex-row sm:gap-6"
            >
              <dt className="shrink-0 font-medium text-ink sm:w-48">{t(s.group)}</dt>
              <dd className="font-mono text-sm text-ink-2">{t(s.items)}</dd>
            </div>
          ))}
          <div className="border-t border-rule" />
        </dl>
      </Section>

      <Section title={t({ en: "Education", tr: "Eğitim" })}>
        <div>
          {education.map((e) => (
            <div key={t(e.school)} className="row">
              <span className="row-num sm:w-32">{period(e)}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-ink">{t(e.title)}</h3>
                <p className="mt-1 text-ink-3">{t(e.school)}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-rule" />
        </div>
      </Section>

      <Section title={t({ en: "Elsewhere", tr: "Diğer adresler" })}>
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
                  {t(o.role)} <FiArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          ))}
          <div className="border-t border-rule" />
        </div>
      </Section>

      <div className="mt-16 flex flex-wrap gap-x-6 gap-y-3">
        <Link to="/contact" className="btn-solid">
          {t({ en: "Get in touch", tr: "İletişime geç" })}
        </Link>
        <Link to="/resume" className="btn-line">
          {t({ en: "View résumé", tr: "Özgeçmişi gör" })}
        </Link>
      </div>
    </div>
  );
};

export default About;
