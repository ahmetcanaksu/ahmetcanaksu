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
