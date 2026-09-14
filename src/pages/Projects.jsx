import { FiArrowUpRight } from "react-icons/fi";
import ProjectCard from "../components/ProjectCard";
import PageHeader from "../components/PageHeader";
import CodeCard from "../components/CodeCard";
import { ProjIcon, LangDot } from "../components/ProjectMeta";
import projectsData from "../data/projects.json";

/* Real usage snippets / highlights for the flagship projects. */
const DETAILS = {
  "Ellie Language": {
    file: "chunker.ei",
    code: `// A generic, type-safe array chunker
class Chunker<T> {
    co(chunkCount, items);
    pri v chunkCount : int;
    pri v items : [T, *];

    fn chunks() : [[T, *], *] {
        v chunks : [[T, *], *];
        v temp : [T, self.chunkCount];
        for i : self.items.len {
            if temp.len == self.chunkCount {
                chunks.push(temp);
                temp.clean();
            } else {
                temp.push(this.items[i]!);
            }
        }
        ret chunks;
    }
}`,
  },
  Menemen: {
    file: "main.rs",
    code: `use menemen::request::{Request, RequestTypes};

fn main() {
    let mut req = Request::new(
        "http://postman-echo.com/get",
        RequestTypes::GET,
    ).unwrap();

    // Read the response as a stream, not a buffer
    let mut res = req.send().unwrap();
    let mut buf = Vec::new();
    res.stream.read_to_end(&mut buf);

    println!("{}", String::from_utf8_lossy(&buf));
}`,
  },
  "Rust-NMEA": {
    file: "gps.rs",
    code: `use rust_nmea::parser::Parser;

// A raw GPS sentence from the receiver
let line = "$GPGGA,161009.00,1122.20,N,02339.35,E,1,08,1.09,11.5,M,,*62";

let fix = Parser::parse_line(line).unwrap();

// -> GGA { satellites: 8, altitude: 11.5, lat, lon, .. }`,
  },
  UtilStation: {
    highlights: [
      "JSON / JS / HTML / CSS formatters & minifiers",
      "Base64 · JWT · URL encoders and inspectors",
      "UUID · ULID · QR · cron · hash generators",
      "JSON ↔ TypeScript / YAML, CSV ↔ JSON converters",
      "Regex tester, cURL converter, and 28+ tools total",
    ],
  },
};

const linkLabel = (url) => {
  if (/crates\.io/.test(url)) return "crates.io";
  if (/pub\.dev/.test(url)) return "pub.dev";
  if (/npmjs/.test(url)) return "npm";
  if (/docs\./.test(url)) return "Docs";
  if (/playground/.test(url)) return "Playground";
  return "Website";
};

const projectLinks = (p) => {
  const out = [];
  if (p.repoUrl) out.push({ label: "Code", url: p.repoUrl });
  if (p.liveUrl && !p.liveUrl.startsWith("#"))
    out.push({ label: linkLabel(p.liveUrl), url: p.liveUrl });
  (p.links || []).forEach((l) =>
    out.push({ label: l.label.replace(/^\w/, (c) => c.toUpperCase()), url: l.url })
  );
  return out;
};

const HighlightsPanel = ({ items, url }) => (
  <div className="rounded-sm border border-rule bg-paper-2/50 p-5">
    <p className="meta mb-4">{url?.replace(/^https?:\/\//, "")} — inside the box</p>
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

const FeatureBlock = ({ project, reversed }) => {
  const d = DETAILS[project.name] || {};
  const links = projectLinks(project);
  return (
    <article className="grid items-center gap-8 border-t border-rule py-12 lg:grid-cols-2 lg:gap-14">
      <div className={reversed ? "lg:order-2" : ""}>
        <div className="flex items-center gap-3">
          <ProjIcon name={project.icon} className="h-6 w-6 text-ink" />
          <h3 className="font-display text-2xl font-semibold text-ink">
            {project.name}
          </h3>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <LangDot language={project.language} />
          <span className="meta">{project.year}</span>
          <span className="meta capitalize">{project.status}</span>
        </div>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-2">
          {project.longDescription || project.description}
        </p>
        <div className="tags mt-4">
          {project.techTags.map((t, i) => (
            <span key={t}>
              {i > 0 && <span className="mr-2 text-rule">·</span>}
              {t}
            </span>
          ))}
        </div>
        {links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-5">
            {links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow text-sm"
              >
                {l.label}
                <FiArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>

      <div className={reversed ? "lg:order-1" : ""}>
        {d.code ? (
          <CodeCard file={d.file} code={d.code} />
        ) : d.highlights ? (
          <HighlightsPanel items={d.highlights} url={project.liveUrl} />
        ) : null}
      </div>
    </article>
  );
};

const Projects = () => {
  const featured = projectsData.filter((p) => p.featured);
  const rest = projectsData.filter((p) => !p.featured);

  return (
    <div className="wrap py-16 sm:py-20">
      <PageHeader kicker="Projects" title="Things I've built.">
        Programming languages, developer tools, systems libraries, and apps —
        spanning Rust, C#, TypeScript, and embedded hardware. A few flagships up
        close, then everything else.
      </PageHeader>

      {/* Flagship feature blocks */}
      <section>
        <div className="mb-2 flex items-center gap-3">
          <span className="dot text-accent" />
          <h2 className="kicker">Flagships</h2>
        </div>
        {featured.map((p, i) => (
          <FeatureBlock key={p.id} project={p} reversed={i % 2 === 1} />
        ))}
        <div className="border-t border-rule" />
      </section>

      {/* Everything else */}
      <section className="mt-16">
        <h2 className="kicker mb-2">More projects</h2>
        <div>
          {rest.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              num={String(i + 1).padStart(2, "0")}
            />
          ))}
          <div className="border-t border-rule" />
        </div>
      </section>

      {/* CTA */}
      <div className="mt-16 max-w-2xl">
        <h2 className="text-2xl font-semibold">Interested in working together?</h2>
        <p className="mt-3 text-ink-2">
          I&apos;m open to interesting projects, open-source collaboration, and
          consulting around language design and systems.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <a href="mailto:hello@ahmetcanaksu.com" className="btn-solid">
            Get in touch
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
