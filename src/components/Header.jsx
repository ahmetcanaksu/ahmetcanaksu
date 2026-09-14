import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { path: "/journey", label: "Journey" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/research", label: "Research" },
  { path: "/blog", label: "Writing" },
  { path: "/resume", label: "Résumé" },
  { path: "/contact", label: "Contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between">
        <Link
          to="/"
          className="font-display text-base font-semibold tracking-tight text-ink"
        >
          Ahmetcan Aksu
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive
                    ? "text-ink"
                    : "text-ink-3 hover:text-ink"
                }`
              }
            >
              {({ isActive }) => (
                <span
                  className={
                    isActive
                      ? "border-b-2 border-accent pb-0.5"
                      : "border-b-2 border-transparent pb-0.5"
                  }
                >
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          className="btn-ghost md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 top-16 z-40 bg-paper/60"
            onClick={() => setOpen(false)}
          />
          <nav className="relative z-50 border-t border-rule bg-paper">
            <ul className="wrap flex flex-col py-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block border-b border-rule/70 py-3 text-sm ${
                        isActive ? "text-accent" : "text-ink"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
