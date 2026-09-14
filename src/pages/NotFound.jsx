import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const links = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Writing" },
  { to: "/contact", label: "Contact" },
];

const NotFound = () => (
  <div className="wrap flex min-h-[60vh] flex-col justify-center py-20">
    <p className="kicker mb-4">Error 404</p>
    <h1 className="text-5xl font-semibold sm:text-7xl">Page not found.</h1>
    <p className="mt-5 max-w-xl text-lg text-ink-2">
      The page you&apos;re looking for doesn&apos;t exist or has moved.
    </p>

    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
      <Link to="/" className="btn-solid">
        Back home
        <FiArrowRight className="h-4 w-4" />
      </Link>
      {links.map((l) => (
        <Link key={l.to} to={l.to} className="link">
          {l.label}
        </Link>
      ))}
    </div>
  </div>
);

export default NotFound;
