const ProjectCard = ({ project }) => {
  const {
    name,
    description,
    longDescription,
    techTags,
    repoUrl,
    liveUrl,
    featured,
    status,
    year,
  } = project;

  const statusColors = {
    active: "badge-success",
    complete: "badge-secondary",
    development: "badge-warning",
    beta: "badge-info",
    experimental: "badge-error",
  };

  return (
    <div
      className={`card bg-base-100 shadow-xl card-hover ${
        featured ? "ring-2 ring-primary" : ""
      }`}
    >
      <div className="card-body">
        <div className="flex justify-between items-start mb-2">
          <h2 className="card-title text-xl">{name}</h2>
          <div className="flex flex-wrap gap-2 justify-end">
            <span className="badge badge-outline">{year}</span>
            <span className={`badge ${statusColors[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            {featured && <span className="badge badge-primary">Featured</span>}
          </div>
        </div>

        <p className="text-base-content/80 mb-4">
          {longDescription || description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {techTags.map((tag, index) => (
            <span key={index} className="badge badge-secondary badge-sm">
              {tag}
            </span>
          ))}
        </div>

        <div className="card-actions justify-end">
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              aria-label={`View ${name} repository`}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Repository
            </a>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              aria-label={`Visit ${name} live site`}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              {liveUrl.includes("docs") ? "Documentation" : "Live Demo"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
