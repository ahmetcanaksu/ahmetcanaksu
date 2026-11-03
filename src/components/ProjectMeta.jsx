/* eslint-disable react-refresh/only-export-components -- small project helpers
   shared by the list, the card and the detail page. */
import {
  FiTerminal,
  FiTool,
  FiNavigation,
  FiActivity,
  FiPower,
  FiSmartphone,
  FiRadio,
  FiDatabase,
  FiEdit3,
  FiCpu,
  FiWind,
  FiBox,
  FiGrid,
  FiFilm,
  FiLayers,
  FiKey,
  FiSend,
  FiZap,
} from "react-icons/fi";

// GitHub-ish language colors, nudged for contrast on warm paper.
const LANG_COLORS = {
  Rust: "#c56a2e",
  TypeScript: "#2f6cc4",
  JavaScript: "#b59a17",
  "C#": "#178600",
  Dart: "#009c94",
  C: "#6a6a6a",
};

const ICONS = {
  terminal: FiTerminal,
  tool: FiTool,
  navigation: FiNavigation,
  activity: FiActivity,
  power: FiPower,
  smartphone: FiSmartphone,
  radio: FiRadio,
  database: FiDatabase,
  edit: FiEdit3,
  cpu: FiCpu,
  wind: FiWind,
  grid: FiGrid,
  film: FiFilm,
  layers: FiLayers,
  key: FiKey,
  send: FiSend,
  zap: FiZap,
};

export const ProjIcon = ({ name, className = "h-5 w-5" }) => {
  const Icon = ICONS[name] || FiBox;
  return <Icon className={className} />;
};

export const LangDot = ({ language }) => {
  if (!language) return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-ink-3">
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: LANG_COLORS[language] || "#8a8577" }}
      />
      {language}
    </span>
  );
};

/* ---------------------------------------------------------------- helpers */

export const STATUS = {
  active: { en: "Active", tr: "Aktif" },
  development: { en: "In development", tr: "Geliştiriliyor" },
  complete: { en: "Complete", tr: "Tamamlandı" },
};

/* Whose name the project ships under, read off the repository owner. */
export const developerOf = (p) =>
  p.developer ??
  (/github\.com\/behemehal\//i.test(p.repoUrl || "") ? "Behemehal" : "Ahmetcan Aksu");

const linkLabel = (url) => {
  if (/crates\.io/.test(url)) return "crates.io";
  if (/pub\.dev/.test(url)) return "pub.dev";
  if (/play\.google\.com/.test(url)) return "Google Play";
  if (/npmjs/.test(url)) return "npm";
  if (/docs\./.test(url)) return { en: "Docs", tr: "Dokümantasyon" };
  if (/playground/.test(url)) return "Playground";
  return { en: "Website", tr: "Web sitesi" };
};

/* Every outbound link of a project, labelled, de-duplicated, in a stable
   order: the live product first, then source, then the rest. Labels may be
   {en,tr} pairs — run them through t(). */
export const projectLinks = (p) => {
  const out = [];
  if (p.liveUrl && !p.liveUrl.startsWith("#"))
    out.push({ label: linkLabel(p.liveUrl), url: p.liveUrl, kind: "live" });
  if (p.repoUrl)
    out.push({ label: { en: "Source code", tr: "Kaynak kod" }, url: p.repoUrl, kind: "repo" });
  (p.links || []).forEach((l) => out.push({ label: l.label, url: l.url, kind: "extra" }));
  const seen = new Set();
  return out.filter((l) => !seen.has(l.url) && seen.add(l.url));
};
