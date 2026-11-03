import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import blogsData from "../data/blogs.json";
import projectsData from "../data/projects.json";
import ProjectCard from "../components/ProjectCard";
import { useLang } from "../i18n/LangContext";
import { docUrl } from "../lib/docs";

const facts = [
  {
    k: { en: "Role", tr: "Rol" },
    v: { en: "Full Stack Developer", tr: "Full Stack Developer" },
  },
  {
    k: { en: "Focus", tr: "Odak" },
    v: { en: "Fintech · AI · Systems", tr: "Fintek · Yapay Zeka · Sistemler" },
  },
  { k: { en: "Based", tr: "Konum" }, v: { en: "Istanbul, Turkey", tr: "İstanbul, Türkiye" } },
  {
    k: { en: "Since", tr: "Başlangıç" },
    v: { en: "Writing code since 2017", tr: "2017'den beri kod yazıyorum" },
  },
];

const Home = () => {
  const { t, lang, locale } = useLang();
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setPosts(blogsData);
    setProjects(projectsData);
  }, []);

  const featuredProjects = projects.filter((p) => p.featured);
  const featuredPosts = posts.filter((p) => p.featured);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString(locale, { year: "numeric", month: "short" });

  return (
    <div className="fade-up">
      {/* ===================== HERO ===================== */}
      <section className="wrap grid gap-12 pb-16 pt-16 sm:pt-24 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="kicker mb-6">
            {t({ en: "Full Stack · Fintech · AI — Istanbul", tr: "Full Stack · Fintek · Yapay Zeka — İstanbul" })}
          </p>
          <h1 className="text-5xl font-semibold leading-[1.02] sm:text-7xl">
            Ahmetcan Aksu
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-ink-2">
            {t({
              en: (
                <>
                  I build backend systems and applications on LLMs. At an
                  SPK-licensed fund platform I owned the TEFAS fund-order integration
                  end to end; on my own time I
                  build{" "}
                  <Link to="/projects/ai-sprite-studio" className="link">
                    LLM agents
                  </Link>{" "}
                  that draw, animate and edit through tool calling. Underneath it
                  all are algorithms and systems: I created the{" "}
                  <Link to="/projects/ellie-language" className="link">
                    Ellie language
                  </Link>{" "}
                  and founded the open-source collective Behemehal.
                </>
              ),
              tr: (
                <>
                  Backend sistemleri ve LLM tabanlı uygulamalar geliştiriyorum.
                  SPK lisanslı bir fon platformunda TEFAS fon emir altyapısını uçtan uca geliştirip
                  canlıya aldım; kendi projelerimde modelin araç kullanarak çizdiği,
                  animasyon yaptığı ve düzenlediği{" "}
                  <Link to="/projects/ai-sprite-studio" className="link">
                    uygulamalar
                  </Link>{" "}
                  geliştiriyorum. Hepsinin temelinde algoritmalar ve sistem
                  programlama var:{" "}
                  <Link to="/projects/ellie-language" className="link">
                    Ellie dilini
                  </Link>{" "}
                  geliştirdim ve açık kaynak topluluğu Behemehal&apos;i kurdum.
                </>
              ),
            })}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to="/projects" className="btn-solid">
              {t({ en: "View projects", tr: "Projeleri incele" })}
              <FiArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/about" className="link-arrow">
              {t({ en: "About me", tr: "Hakkımda" })}
              <FiArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={docUrl("cv", lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow text-ink-2"
            >
              {t({ en: "Résumé", tr: "Özgeçmiş" })}
              <FiArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Masthead info column */}
        <aside className="lg:pt-2">
          <div className="mb-6 h-40 w-40 overflow-hidden rounded-sm border border-rule grayscale">
            <img
              src="/photo.jpg"
              alt="Ahmetcan Aksu"
              className="h-full w-full object-cover"
            />
          </div>
          <dl className="space-y-3">
            {facts.map((f) => (
              <div key={f.k.en} className="border-t border-rule pt-2">
                <dt className="kicker">{t(f.k)}</dt>
                <dd className="mt-1 text-sm text-ink">{t(f.v)}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      {/* ===================== SELECTED WORK ===================== */}
      <section className="wrap py-10">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="kicker">{t({ en: "Selected work", tr: "Öne çıkan işler" })}</h2>
          <Link to="/projects" className="link-arrow text-sm text-ink-2">
            {t({ en: "All projects", tr: "Tüm projeler" })}
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div>
          {featuredProjects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              num={String(i + 1).padStart(2, "0")}
            />
          ))}
        </div>
      </section>

      {/* ===================== WRITING ===================== */}
      <section className="wrap py-10">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="kicker">{t({ en: "Writing", tr: "Yazılar" })}</h2>
          <Link to="/blog" className="link-arrow text-sm text-ink-2">
            {t({ en: "All posts", tr: "Tüm yazılar" })}
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div>
          {featuredPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="row"
            >
              <span className="row-num">{formatDate(post.date)}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="row-title">{t(post.title)}</h3>
                  <span className="meta hidden shrink-0 items-center gap-1 sm:inline-flex">
                    {t(post.platform)}
                    <FiArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <p className="mt-1.5 max-w-2xl text-ink-2">{t(post.excerpt)}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
