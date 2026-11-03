import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import ProjectCard from "../components/ProjectCard";
import PageHeader from "../components/PageHeader";
import CodeCard from "../components/CodeCard";
import { ProjIcon, LangDot, STATUS, projectLinks } from "../components/ProjectMeta";
import projectsData from "../data/projects.json";
import { useLang } from "../i18n/LangContext";

const HighlightsPanel = ({ items, url }) => {
  const { t } = useLang();
  return (
    <div className="rounded-sm border border-rule bg-paper-2/50 p-5">
      <p className="meta mb-4">
        {url?.replace(/^https?:\/\//, "")} — {t({ en: "inside the box", tr: "neler var" })}
      </p>
      <ul className="space-y-2.5 text-sm text-ink-2">
        {items.map((h) => (
          <li key={h} className="flex gap-2.5">
            <span className="dot mt-2 shrink-0 text-accent" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FeatureBlock = ({ project, reversed }) => {
  const { t, lang } = useLang();
  const links = projectLinks(project);
  const highlights = project.highlights?.[lang] ?? project.highlights?.en;
  return (
    <article className="grid items-center gap-8 border-t border-rule py-12 lg:grid-cols-2 lg:gap-14">
      <div className={reversed ? "lg:order-2" : ""}>
        <div className="flex items-center gap-3">
          <ProjIcon name={project.icon} className="h-6 w-6 text-ink" />
          <h3 className="font-display text-2xl font-semibold text-ink">
            <Link to={`/projects/${project.slug}`} className="transition-colors hover:text-accent">
              {project.name}
            </Link>
          </h3>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <LangDot language={project.language} />
          <span className="meta">{project.year}</span>
          <span className="meta">{t(STATUS[project.status]) ?? project.status}</span>
        </div>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-2">
          {t(project.longDescription || project.description)}
        </p>
        <div className="tags mt-4">
          {project.techTags.filter((tag) => tag !== project.language).map((tag, i) => (
            <span key={i}>
              {i > 0 && <span className="mr-2 text-rule">·</span>}
              {t(tag)}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          <Link to={`/projects/${project.slug}`} className="btn-line btn-sm">
            {t({ en: "Details", tr: "Detaylar" })}
            <FiArrowRight className="h-3.5 w-3.5" />
          </Link>
          {links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow text-sm"
            >
              {l.kind === "repo" ? t({ en: "Code", tr: "Kod" }) : t(l.label)}
              <FiArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>

      <div className={reversed ? "lg:order-1" : ""}>
        {project.code ? (
          <CodeCard file={project.code.file} code={project.code.code} />
        ) : highlights ? (
          <HighlightsPanel items={highlights} url={project.liveUrl} />
        ) : null}
      </div>
    </article>
  );
};

const Projects = () => {
  const { t } = useLang();
  const featured = projectsData.filter((p) => p.featured);
  const rest = projectsData.filter((p) => !p.featured);

  return (
    <div className="wrap py-16 sm:py-20">
      <PageHeader
        kicker={t({ en: "Projects", tr: "Projeler" })}
        title={t({ en: "Things I've built.", tr: "Geliştirdiklerim." })}
      >
        {t({
          en: "Programming languages, developer tools, systems libraries, and apps — spanning Rust, C#, TypeScript, and embedded hardware. A few flagships up close, then everything else.",
          tr: "Programlama dilleri, geliştirici araçları, sistem kütüphaneleri ve uygulamalar — Rust, C#, TypeScript ve gömülü donanım üzerine. Önce öne çıkanlara yakından bakış, ardından geri kalanlar.",
        })}
      </PageHeader>

      {/* Flagship feature blocks */}
      <section>
        <div className="mb-2 flex items-center gap-3">
          <span className="dot text-accent" />
          <h2 className="kicker">{t({ en: "Flagships", tr: "Öne çıkanlar" })}</h2>
        </div>
        {featured.map((p, i) => (
          <FeatureBlock key={p.id} project={p} reversed={i % 2 === 1} />
        ))}
        <div className="border-t border-rule" />
      </section>

      {/* Everything else */}
      <section className="mt-16">
        <h2 className="kicker mb-2">{t({ en: "More projects", tr: "Diğer projeler" })}</h2>
        <div>
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} num={String(i + 1).padStart(2, "0")} />
          ))}
          <div className="border-t border-rule" />
        </div>
      </section>

      {/* CTA */}
      <div className="mt-16 max-w-2xl">
        <h2 className="text-2xl font-semibold">
          {t({ en: "Interested in working together?", tr: "Birlikte çalışmak ister misiniz?" })}
        </h2>
        <p className="mt-3 text-ink-2">
          {t({
            en: "I'm open to interesting projects, open-source collaboration, and consulting around language design and systems.",
            tr: "İlginç projelere, açık kaynak iş birliklerine ve dil tasarımı ile sistem programlama üzerine danışmanlığa açığım.",
          })}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <a href="mailto:hello@ahmetcanaksu.com" className="btn-solid">
            {t({ en: "Get in touch", tr: "İletişime geçin" })}
          </a>
          <a
            href="https://github.com/ahmetcanaksu"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-line"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
