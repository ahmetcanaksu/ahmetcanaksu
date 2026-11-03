import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useLang, LANGS } from "../i18n/LangContext";

const navItems = [
  { path: "/journey", label: { en: "Journey", tr: "Yolculuk" } },
  { path: "/about", label: { en: "About", tr: "Hakkımda" } },
  { path: "/projects", label: { en: "Projects", tr: "Projeler" } },
  { path: "/research", label: { en: "Research", tr: "Araştırma" } },
  { path: "/blog", label: { en: "Writing", tr: "Yazılar" } },
  { path: "/resume", label: { en: "Résumé", tr: "Özgeçmiş" } },
  { path: "/contact", label: { en: "Contact", tr: "İletişim" } },
];

/* EN / TR. Each is a real link to the other language's URL (crawlable, and
   it opens in a new tab on middle-click); a plain click switches in place. */
const LangSwitch = ({ className = "" }) => {
  const { lang, setLang, hrefFor, t } = useLang();
  useLocation(); // re-render on navigation so hrefFor() carries the current #/page
  return (
    <div
      className={`flex items-center gap-1 font-mono text-xs ${className}`}
      role="group"
      aria-label={t({ en: "Language", tr: "Dil" })}
    >
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-rule">/</span>}
          <a
            href={hrefFor(l)}
            hrefLang={l}
            lang={l}
            aria-current={lang === l ? "true" : undefined}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
              e.preventDefault();
              setLang(l);
            }}
            className={`uppercase transition-colors ${
              lang === l ? "text-accent" : "text-ink-3 hover:text-ink"
            }`}
            title={l === "tr" ? "Türkçe" : "English"}
          >
            {l}
          </a>
        </span>
      ))}
    </div>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t } = useLang();

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
                  {t(item.label)}
                </span>
              )}
            </NavLink>
          ))}
          <LangSwitch className="ml-1 border-l border-rule pl-5" />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LangSwitch />
          <button
            className="btn-ghost"
            onClick={() => setOpen((v) => !v)}
            aria-label={t({ en: "Menu", tr: "Menü" })}
            aria-expanded={open}
          >
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
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
                    {t(item.label)}
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
