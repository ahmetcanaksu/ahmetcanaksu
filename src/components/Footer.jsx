import { Link } from "react-router-dom";

const socials = [
  { href: "https://github.com/ahmetcanaksu", label: "GitHub" },
  { href: "https://linkedin.com/in/ahmetcanaksu", label: "LinkedIn" },
  { href: "https://twitter.com/ahmetcanaksu", label: "Twitter" },
  { href: "https://behemehal.org", label: "Behemehal" },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="wrap flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            Let&apos;s build something.
          </p>
          <a href="mailto:hello@ahmetcanaksu.com" className="link mt-1 inline-block">
            hello@ahmetcanaksu.com
          </a>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </nav>
          <p className="meta">
            © {year} Ahmetcan Aksu · Istanbul ·{" "}
            <Link to="/" className="hover:text-accent">
              ahmetcanaksu.com
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
