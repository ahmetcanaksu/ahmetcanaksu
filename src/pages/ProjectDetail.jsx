import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiChevronDown,
  FiChevronUp,
  FiX,
} from "react-icons/fi";
import projectsData from "../data/projects.json";
import CodeCard from "../components/CodeCard";
import NotFound from "./NotFound";
import {
  ProjIcon,
  LangDot,
  STATUS,
  developerOf,
  projectLinks,
} from "../components/ProjectMeta";
import { useLang } from "../i18n/LangContext";

/*
 * /#/projects/:slug — one introduction page per project, generated from
 * src/data/projects.json. Adding a project is one entry there (and, if it has
 * screenshots, a folder under public/img/projects/<slug>/); there is no route
 * to add.
 *
 * Laid out like a store listing — hero, links, stat strip, screenshots, about,
 * info — in this site's paper-and-ink style rather than a store's.
 */

const pairList = (v, lang) => (Array.isArray(v) ? v : (v?.[lang] ?? v?.en ?? []));

/* ------------------------------------------------------------- screenshots */

const Screenshots = ({ shots, name, portrait = false }) => {
  const { t } = useLang();
  const dialog = useRef(null);
  const [at, setAt] = useState(0);

  const show = useCallback(
    (i) => setAt(Math.max(0, Math.min(shots.length - 1, i))),
    [shots.length]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (!dialog.current?.open) return;
      if (e.key === "ArrowRight") show(at + 1);
      if (e.key === "ArrowLeft") show(at - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [at, show]);

  const open = (i) => {
    show(i);
    dialog.current?.showModal();
  };

  return (
    <section className="py-12">
      <h2 className="kicker mb-5">{t({ en: "Screenshots", tr: "Ekran görüntüleri" })}</h2>
      {/* scroll-px matches px: without it, mandatory snapping scrolls the first
          shot flush to the container edge and out of line with the page. */}
      <div className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-4 sm:-mx-8 sm:scroll-px-8 sm:px-8">
        {shots.map((s, i) => (
          <figure
            key={s.src}
            className={`shrink-0 snap-start ${portrait ? "w-[45%] sm:w-[240px]" : "w-[85%] sm:w-[560px]"}`}
          >
            {/* Pressing a shot opens it at full size: a desktop UI at rail width
                is a picture of a window, not something you can read. */}
            <button
              type="button"
              onClick={() => open(i)}
              className="block w-full cursor-zoom-in overflow-hidden rounded-sm border border-rule bg-paper-2"
              aria-label={`${t({ en: "Open screenshot", tr: "Ekran görüntüsünü aç" })}: ${t(s.caption)}`}
            >
              <img
                src={s.src}
                alt={t(s.caption) || name}
                loading="lazy"
                width={portrait ? 540 : 1440}
                height={portrait ? 960 : 900}
                className="h-auto w-full"
              />
            </button>
            <figcaption className="mt-2.5 text-sm leading-relaxed text-ink-3">
              {t(s.caption)}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* A <dialog>: Escape closes it, focus is trapped, and the backdrop is the
          browser's own. Clicking the backdrop (the dialog element itself) closes. */}
      <dialog
        ref={dialog}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        className="w-[min(96vw,1600px)] max-w-[96vw] bg-transparent p-0 backdrop:bg-ink/85"
        aria-label={t({ en: "Screenshot", tr: "Ekran görüntüsü" })}
      >
        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={() => show(at - 1)}
            disabled={at === 0}
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper/10 text-paper transition hover:bg-paper/20 disabled:opacity-25 sm:flex"
            aria-label={t({ en: "Previous screenshot", tr: "Önceki ekran görüntüsü" })}
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>
          <figure className="m-0 min-w-0 flex-1">
            <img
              src={shots[at].src}
              alt={t(shots[at].caption)}
              className="block max-h-[84vh] w-full rounded-sm object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-paper/70">
              {t(shots[at].caption)}
              <span className="meta ml-2 text-paper/50">
                {at + 1} / {shots.length}
              </span>
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={() => show(at + 1)}
            disabled={at === shots.length - 1}
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper/10 text-paper transition hover:bg-paper/20 disabled:opacity-25 sm:flex"
            aria-label={t({ en: "Next screenshot", tr: "Sonraki ekran görüntüsü" })}
          >
            <FiArrowRight className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-paper backdrop-blur transition hover:bg-ink/80 sm:right-16"
            aria-label={t({ en: "Close", tr: "Kapat" })}
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
      </dialog>
    </section>
  );
};

/* ------------------------------------------------------------------ video */

/* A short, web-sized cut (see public/video/<slug>/): preload="none" so the
   page doesn't download it until someone presses play, and the poster stands
   in until then. The narration is English, so the subtitles are on by default. */
const Video = ({ video }) => {
  const { t } = useLang();
  return (
    <section className="pt-12">
      <h2 className="kicker mb-5">{t({ en: "Video", tr: "Video" })}</h2>
      <figure className="m-0 max-w-4xl">
        <video
          controls
          preload="none"
          playsInline
          poster={video.poster}
          width={1280}
          height={720}
          className="h-auto w-full rounded-sm border border-rule bg-ink"
        >
          <source src={video.src} type="video/mp4" />
          {video.captions && (
            <track kind="subtitles" src={video.captions} srcLang="en" label="English" default />
          )}
        </video>
        {video.caption && (
          <figcaption className="mt-2.5 text-sm leading-relaxed text-ink-3">
            {t(video.caption)}
          </figcaption>
        )}
      </figure>
    </section>
  );
};

/* ------------------------------------------------------------------ about */

const About = ({ project }) => {
  const { t, lang } = useLang();
  const [expanded, setExpanded] = useState(false);
  const paragraphs = pairList(project.about, lang);
  const sections = project.sections || [];
  if (!paragraphs.length && !sections.length) return null;

  // Long write-ups fold to a preview; short ones are shown whole.
  const long =
    paragraphs.join(" ").length +
      sections.reduce((n, s) => n + pairList(s.items, lang).join(" ").length, 0) >
    1100;
  const folded = long && !expanded;

  return (
    <section className="border-t border-rule py-12">
      <h2 className="kicker mb-6">{t({ en: "About this project", tr: "Proje hakkında" })}</h2>
      <div className="relative">
        <div className={folded ? "max-h-[360px] overflow-hidden" : undefined}>
          <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-ink-2">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {sections.map((s, i) => (
            <div key={i} className="mt-10">
              <h3 className="font-display text-xl font-semibold">{t(s.heading)}</h3>
              <ul className="mt-4 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
                {pairList(s.items, lang).map((item, j) => (
                  <li key={j} className="flex gap-3 leading-relaxed text-ink-2">
                    <span className="dot mt-2.5 shrink-0 text-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {folded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-paper to-transparent" />
        )}
      </div>

      {long && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="link-arrow mt-6 text-sm"
        >
          {expanded
            ? t({ en: "Show less", tr: "Daha az göster" })
            : t({ en: "Read more", tr: "Devamını oku" })}
          {expanded ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
        </button>
      )}
    </section>
  );
};

/* ------------------------------------------------------------------- page */

const ProjectDetail = () => {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const index = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[index];

  // Per-project tab title and structured data. Google renders this SPA, so
  // both are read; they also make shared links and the history list legible.
  useEffect(() => {
    if (!project) return;
    const prev = document.title;
    document.title = `${project.name} — ${pick(project.description, lang)} · Ahmetcan Aksu`;
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": project.repoUrl ? "SoftwareSourceCode" : "SoftwareApplication",
      name: project.name,
      description: pick(project.description, lang),
      inLanguage: lang,
      ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
      ...(project.language ? { programmingLanguage: project.language } : {}),
      ...(project.liveUrl ? { url: project.liveUrl } : {}),
      dateCreated: project.year,
      author: { "@type": "Person", name: "Ahmetcan Aksu", url: "https://ahmetcanaksu.com" },
    });
    document.head.appendChild(ld);
    return () => {
      document.title = prev;
      ld.remove();
    };
  }, [project, lang]);

  // A block body on purpose: current Chrome's scrollTo() returns a Promise, and
  // an arrow returning it would hand React a Promise as the effect's cleanup.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <NotFound />;

  const links = projectLinks(project);
  const [primary, ...secondary] = links;
  const tags = project.techTags || [];
  const shots = project.screenshots || [];
  const prev = projectsData[(index - 1 + projectsData.length) % projectsData.length];
  const next = projectsData[(index + 1) % projectsData.length];

  /* The strip: facts every project has, then the hand-written ones. */
  const stats = [
    project.stars >= 1 && {
      value: `★ ${project.stars}`,
      label: { en: "GitHub stars", tr: "GitHub yıldızı" },
    },
    project.year && { value: project.year, label: { en: "Started", tr: "Başlangıç" } },
    project.language && {
      value: <LangDot language={project.language} />,
      label: { en: "Language", tr: "Dil" },
    },
    ...(project.stats || []),
    project.status && {
      value: t(STATUS[project.status]) ?? project.status,
      label: { en: "Status", tr: "Durum" },
    },
  ].filter(Boolean);

  const info = [
    { label: { en: "Developer", tr: "Geliştirici" }, value: developerOf(project) },
    project.year && { label: { en: "Started", tr: "Başlangıç" }, value: project.year },
    project.language && { label: { en: "Main language", tr: "Ana dil" }, value: project.language },
    project.status && { label: { en: "Status", tr: "Durum" }, value: STATUS[project.status] },
    ...(project.info || []),
    project.repoUrl && {
      label: { en: "Repository", tr: "Depo" },
      value: project.repoUrl.replace(/^https?:\/\/(www\.)?/, ""),
      href: project.repoUrl,
    },
  ].filter(Boolean);

  return (
    <div className="fade-up">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b border-rule bg-paper-2/40">
        <div className="wrap pb-12 pt-10 sm:pt-14">
          <nav aria-label={t({ en: "Breadcrumb", tr: "Sayfa yolu" })} className="meta flex flex-wrap gap-2">
            <Link to="/" className="hover:text-accent">
              Ahmetcan Aksu
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/projects" className="hover:text-accent">
              {t({ en: "Projects", tr: "Projeler" })}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink-2">{project.name}</span>
          </nav>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-sm border border-rule bg-paper sm:h-24 sm:w-24">
              <ProjIcon name={project.icon} className="h-9 w-9 text-accent sm:h-10 sm:w-10" />
            </div>
            <div className="min-w-0">
              <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl">{project.name}</h1>
              <p className="meta mt-2">{developerOf(project)}</p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
                {t(project.description)}
              </p>
              {tags.length > 0 && (
                <div className="tags mt-4">
                  {tags.map((tag, i) => (
                    <span key={i}>
                      {i > 0 && <span className="mr-2 text-rule">·</span>}
                      {t(tag)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {links.length > 0 && (
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={primary.url} target="_blank" rel="noopener noreferrer" className="btn-solid">
                {primary.kind === "repo"
                  ? t({ en: "View source", tr: "Kaynak kodu gör" })
                  : t(primary.label)}
                <FiArrowUpRight className="h-4 w-4" />
              </a>
              {secondary.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="link-arrow text-sm">
                  {t(l.label)}
                  <FiArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          )}

          {stats.length > 0 && (
            <dl className="mt-10 grid grid-cols-2 border-t border-rule sm:grid-cols-[repeat(auto-fit,minmax(130px,1fr))]">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="border-b border-rule py-5 pr-4 sm:border-b-0 sm:border-l sm:px-5 sm:first:border-l-0 sm:first:pl-0"
                >
                  <dd className="font-display text-2xl font-semibold leading-none text-ink">
                    {typeof s.value === "object" && s.value !== null && !("en" in s.value)
                      ? s.value
                      : t(s.value)}
                  </dd>
                  <dt className="meta mt-2">{t(s.label)}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <div className="wrap">
        {project.video && <Video video={project.video} />}
        {shots.length > 0 && <Screenshots
            shots={shots}
            name={project.name}
            portrait={project.orientation === "portrait"}
          />}

        <About project={project} />

        {/* ── In practice: real usage, when there is some ─────────────── */}
        {(project.code || project.highlights) && (
          <section className="border-t border-rule py-12">
            <h2 className="kicker mb-6">
              {project.code
                ? t({ en: "In practice", tr: "Kullanımda" })
                : t({ en: "Inside the box", tr: "Neler var" })}
            </h2>
            <div className="max-w-3xl">
              {project.code ? (
                <CodeCard file={project.code.file} code={project.code.code} />
              ) : (
                <ul className="grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
                  {pairList(project.highlights, lang).map((h, i) => (
                    <li key={i} className="flex gap-3 text-ink-2">
                      <span className="dot mt-2.5 shrink-0 text-accent" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* ── Info ──────────────────────────────────────────────────────── */}
        <section className="border-t border-rule py-12">
          <h2 className="kicker mb-6">{t({ en: "Project info", tr: "Proje bilgileri" })}</h2>
          <dl className="max-w-3xl">
            {info.map((row, i) => (
              <div key={i} className="flex gap-6 border-t border-rule py-3 first:border-t-0">
                <dt className="w-[38%] shrink-0 text-sm text-ink-3 sm:w-48">{t(row.label)}</dt>
                <dd className="min-w-0 break-words text-sm text-ink">
                  {row.href ? (
                    <a href={row.href} target="_blank" rel="noopener noreferrer" className="link">
                      {t(row.value)}
                    </a>
                  ) : (
                    t(row.value)
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Neighbours ───────────────────────────────────────────────── */}
        <nav
          aria-label={t({ en: "More projects", tr: "Diğer projeler" })}
          className="grid gap-4 border-t border-rule py-10 sm:grid-cols-2"
        >
          <Link to={`/projects/${prev.slug}`} className="group">
            <span className="meta inline-flex items-center gap-1">
              <FiArrowLeft className="h-3.5 w-3.5" /> {t({ en: "Previous", tr: "Önceki" })}
            </span>
            <span className="row-title mt-1 block text-xl group-hover:text-accent">{prev.name}</span>
          </Link>
          <Link to={`/projects/${next.slug}`} className="group sm:text-right">
            <span className="meta inline-flex items-center gap-1">
              {t({ en: "Next", tr: "Sonraki" })} <FiArrowRight className="h-3.5 w-3.5" />
            </span>
            <span className="row-title mt-1 block text-xl group-hover:text-accent">{next.name}</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

const pick = (v, lang) =>
  v && typeof v === "object" && !Array.isArray(v) ? (v[lang] ?? v.en) : v;

export default ProjectDetail;
