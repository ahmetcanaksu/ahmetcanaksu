import { FiArrowUpRight } from "react-icons/fi";
import { ProjIcon, LangDot } from "./ProjectMeta";

const ProjectCard = ({ project, num }) => {
  const {
    name,
    description,
    techTags = [],
    repoUrl,
    liveUrl,
    links = [],
    stars,
    status,
    year,
    language,
    icon,
  } = project;

  const primary = liveUrl || repoUrl;
  const isInternal = primary && primary.startsWith("#");
  const extLinks = [
    ...links,
    repoUrl && { label: "Code", url: repoUrl },
    liveUrl && {
      label: liveUrl.includes("docs") ? "Docs" : "Live",
      url: liveUrl,
    },
  ].filter(Boolean);

  return (
    <article className="row">
      {num && <span className="row-num">{num}</span>}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <ProjIcon
              name={icon}
              className="h-4 w-4 shrink-0 text-ink-3"
            />
            <h3 className="row-title truncate">
              {primary ? (
                <a
                  href={primary}
                  target={isInternal ? undefined : "_blank"}
                  rel={isInternal ? undefined : "noopener noreferrer"}
                >
                  {name}
                </a>
              ) : (
                name
              )}
            </h3>
          </div>
          <span className="meta shrink-0 tabular-nums">
            {status === "active" && (
              <span className="dot mr-1.5 text-accent" aria-hidden="true" />
            )}
            {year}
          </span>
        </div>

        <p className="mt-1.5 max-w-2xl text-ink-2">{description}</p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <div className="tags">
            <LangDot language={language} />
            {techTags.map((t) => (
              <span key={t}>
                <span className="mr-2 text-rule">·</span>
                {t}
              </span>
            ))}
            {stars >= 2 && (
              <span className="text-ink-3">
                <span className="mr-2 text-rule">·</span>★ {stars}
              </span>
            )}
          </div>

          {extLinks.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {extLinks.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target={l.url.startsWith("#") ? undefined : "_blank"}
                  rel={l.url.startsWith("#") ? undefined : "noopener noreferrer"}
                  className="link-arrow text-sm"
                >
                  {l.label}
                  <FiArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
