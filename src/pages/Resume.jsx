import { Link } from "react-router-dom";
import ResumeEmbed from "../components/ResumeEmbed";
import PageHeader from "../components/PageHeader";

const Resume = () => (
  <div className="wrap py-16 sm:py-20">
    <PageHeader kicker="Résumé" title="Experience, on one page.">
      A live, bilingual CV you can read in the browser and export to PDF — or
      grab the quick download. Prefer the narrative? See{" "}
      <Link to="/about" className="link">
        about
      </Link>
      .
    </PageHeader>

    <ResumeEmbed />

    <div className="mt-16 max-w-2xl">
      <h2 className="text-2xl font-semibold">Let&apos;s work together.</h2>
      <p className="mt-3 text-ink-2">
        Reach out for roles, freelance work, or open-source collaboration.
      </p>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        <a href="mailto:hello@ahmetcanaksu.com" className="btn-solid">
          Contact me
        </a>
        <a
          href="https://linkedin.com/in/ahmetcanaksu"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-line"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </div>
);

export default Resume;
