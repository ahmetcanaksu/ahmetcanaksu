import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { ProjIcon, LangDot, projectLinks } from "./ProjectMeta";
import { useLang } from "../i18n/LangContext";

/* One row in a project list. The name and the Details button open the
   project's own page; the links beside it go straight to the product, source
   or package. */
const ProjectCard = ({ project, num }) => {
  const { t } = useLang();
  const { slug, name, description, techTags = [], stars, status, year, language, icon } = project;
  const links = projectLinks(project);
  // The language already has its own dot; don't list it again as a tag.
  const tags = techTags.filter((tag) => tag !== language);

  return (
    <article className="row">
      {num && <span className="row-num">{num}</span>}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <ProjIcon name={icon} className="h-4 w-4 shrink-0 text-ink-3" />
            <h3 className="row-title truncate">
              <Link to={`/projects/${slug}`}>{name}</Link>
            </h3>
          </div>
          <span className="meta shrink-0 tabular-nums">
            {status === "active" && (
              <span className="dot mr-1.5 text-accent" aria-hidden="true" />
            )}
            {year}
          </span>
        </div>

        <p className="mt-1.5 max-w-2xl text-ink-2">{t(description)}</p>

        <div className="tags mt-3">
          <LangDot language={language} />
          {tags.map((tag, i) => (
            <span key={i}>
              <span className="mr-2 text-rule">·</span>
              {t(tag)}
            </span>
          ))}
          {stars >= 2 && (
            <span className="text-ink-3">
              <span className="mr-2 text-rule">·</span>★ {stars}
            </span>
          )}
        </div>

        {/* Actions on their own row, always starting at the left: sharing a
            row with the tags made them jump between the left and right edges
            depending on how long the tag line was. */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link to={`/projects/${slug}`} className="btn-line btn-sm">
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
    </article>
  );
};

export default ProjectCard;
