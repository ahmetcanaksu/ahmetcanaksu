import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import blogsData from "../data/blogs.json";
import projectsData from "../data/projects.json";
import ProjectCard from "../components/ProjectCard";

const facts = [
  { k: "Role", v: "Backend Dev · Fonmap" },
  { k: "Focus", v: "Languages · Systems · Embedded" },
  { k: "Based", v: "Istanbul, Turkey" },
  { k: "Since", v: "Writing code since 2017" },
];

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setPosts(blogsData);
    setProjects(projectsData);
  }, []);

  const featuredProjects = projects.filter((p) => p.featured);
  const featuredPosts = posts.filter((p) => p.featured);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" });

  return (
    <div className="fade-up">
      {/* ===================== HERO ===================== */}
      <section className="wrap grid gap-12 pb-16 pt-16 sm:pt-24 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="kicker mb-6">Software Developer · Istanbul</p>
          <h1 className="text-5xl font-semibold leading-[1.02] sm:text-7xl">
            Ahmetcan Aksu
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-ink-2">
            I build programming languages, developer tools, and embedded
            systems. Creator of the{" "}
            <Link to="/projects" className="link">
              Ellie language
            </Link>
            , backend developer at Fonmap, and founder of the open-source
            collective Behemehal.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to="/projects" className="btn-solid">
              View projects
              <FiArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/about" className="link-arrow">
              About me
              <FiArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/Ahmetcan Aksu CV EN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow text-ink-2"
            >
              Résumé
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
              <div key={f.k} className="border-t border-rule pt-2">
                <dt className="kicker">{f.k}</dt>
                <dd className="mt-1 text-sm text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      {/* ===================== SELECTED WORK ===================== */}
      <section className="wrap py-10">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="kicker">Selected work</h2>
          <Link to="/projects" className="link-arrow text-sm text-ink-2">
            All projects
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
          <h2 className="kicker">Writing</h2>
          <Link to="/blog" className="link-arrow text-sm text-ink-2">
            All posts
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
                  <h3 className="row-title">{post.title}</h3>
                  <span className="meta hidden shrink-0 items-center gap-1 sm:inline-flex">
                    {post.platform}
                    <FiArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <p className="mt-1.5 max-w-2xl text-ink-2">{post.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
