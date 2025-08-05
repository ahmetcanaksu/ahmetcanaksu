import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projects.json";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    setProjects(projectsData);
    setFilteredProjects(projectsData);
  }, []);

  useEffect(() => {
    let filtered = projects;

    // Filter by technology
    if (selectedFilter !== "all") {
      filtered = filtered.filter((project) =>
        project.techTags.some((tag) =>
          tag.toLowerCase().includes(selectedFilter.toLowerCase())
        )
      );
    }

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter(
        (project) => project.status === selectedStatus
      );
    }

    setFilteredProjects(filtered);
  }, [projects, selectedFilter, selectedStatus]);

  const allTechnologies = [
    ...new Set(projects.flatMap((project) => project.techTags)),
  ];
  const allStatuses = [...new Set(projects.map((project) => project.status))];

  const featuredProjects = filteredProjects.filter(
    (project) => project.featured
  );
  const otherProjects = filteredProjects.filter((project) => !project.featured);

  return (
    <div className="min-h-screen bg-base-100 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            <span className="gradient-text">My Projects</span>
          </h1>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            A collection of projects I've built, ranging from programming
            languages and developer tools to web applications and mobile apps.
            Each project represents a learning journey and a contribution to the
            developer community.
          </p>
        </div>

        {/* Filters */}
        <div className="card bg-base-200 shadow-xl mb-12 hidden">
          <div className="card-body">
            <h2 className="card-title mb-4">Filter Projects</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Filter by Technology
                  </span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All Technologies</option>
                  {allTechnologies.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Filter by Status
                  </span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  {allStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(selectedFilter !== "all" || selectedStatus !== "all") && (
              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    setSelectedFilter("all");
                    setSelectedStatus("all");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Project Stats */}
        <div className="stats shadow mb-12 w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div className="stat-title">Total Projects</div>
            <div className="stat-value text-primary">{projects.length}</div>
            <div className="stat-desc">Across multiple technologies</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="stat-title">Active Projects</div>
            <div className="stat-value text-secondary">
              {projects.filter((p) => p.status === "active").length}
            </div>
            <div className="stat-desc">Currently maintained</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-accent">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <div className="stat-title">Featured</div>
            <div className="stat-value text-accent">
              {featuredProjects.length}
            </div>
            <div className="stat-desc">Highlighted projects</div>
          </div>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Projects</h2>
              <div className="badge badge-primary badge-lg">⭐ Featured</div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">
              {featuredProjects.length > 0 ? "Other Projects" : "All Projects"}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* No projects message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-4">No projects found</h3>
            <p className="text-base-content/70 mb-6">
              Try adjusting your filters to see more projects.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSelectedFilter("all");
                setSelectedStatus("all");
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-2xl justify-center mb-4">
                Interested in Collaborating?
              </h3>
              <p className="text-base-content/70 mb-6">
                I'm always open to discussing new projects, innovative ideas, or
                opportunities to contribute to interesting work.
              </p>
              <div className="card-actions justify-center">
                <a
                  href="mailto:hello@ahmetcanaksu.com"
                  className="btn btn-primary"
                >
                  Get In Touch
                </a>
                <a
                  href="https://github.com/ahmetcanaksu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  View GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
