/* eslint-disable react-refresh/only-export-components -- the provider, its hook
   and the small path helpers belong together; this file rarely changes. */
import {
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/*
 * Two languages, chosen by the URL path rather than the hash:
 *
 *   https://ahmetcanaksu.com/#/projects      English (the URLs already indexed)
 *   https://ahmetcanaksu.com/tr/#/projects   Turkish
 *
 * The router is a HashRouter, so every <Link to="/about"> resolves inside the
 * hash and works under either prefix untouched. Only the path prefix decides
 * the language. dist/tr/index.html is a real file (see build/tr-entry.js), so
 * crawlers get a Turkish URL with Turkish meta tags.
 *
 * Content is written as { en, tr } pairs next to each other, the same model the
 * CV uses, so the two languages cannot drift apart. `t()` picks one and passes
 * plain strings, numbers and JSX straight through.
 */

export const LANGS = ["en", "tr"];
export const STORAGE_KEY = "lang";

export const langFromPath = (pathname) =>
  /^\/tr(\/|$)/.test(pathname) ? "tr" : "en";

export const basePath = (lang) => (lang === "tr" ? "/tr/" : "/");

const isPair = (v) =>
  v !== null &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  !isValidElement(v) &&
  ("en" in v || "tr" in v);

export const pick = (v, lang) => (isPair(v) ? (v[lang] ?? v.en) : v);

/* The tab title and description a visitor sees after switching in place.
   The static versions crawlers see live in index.html and build/tr-entry.js. */
const HEAD = {
  en: {
    title: "Ahmetcan Aksu - Full Stack Developer · Fintech & AI",
    description:
      "Full stack developer from Istanbul building in .NET, Node.js, React and Rust: bank and TEFAS integrations, applications on LLMs, and the Ellie programming language.",
  },
  tr: {
    title: "Ahmetcan Aksu - Full Stack Developer · Fintek & Yapay Zeka",
    description:
      "İstanbul'da .NET, Node.js, React ve Rust ile çalışan full stack geliştirici: banka ve TEFAS entegrasyonları, LLM tabanlı uygulamalar ve Ellie programlama dili.",
  },
};

const LangContext = createContext({
  lang: "en",
  setLang: () => {},
  t: (v) => pick(v, "en"),
  hrefFor: (lang) => basePath(lang),
  locale: "en-US",
});

export const LangProvider = ({ children }) => {
  const [lang, setLangState] = useState(() =>
    langFromPath(window.location.pathname)
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = HEAD[lang].title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", HEAD[lang].description);
  }, [lang]);

  /* Switching rewrites the path and leaves the hash (the page) alone. It is a
     replaceState, not a push: Back should leave the page, not flip the
     language. The router's own history state is carried over so it keeps its
     place in the stack. */
  const setLang = useCallback((next) => {
    if (!LANGS.includes(next)) return;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode: the choice just isn't remembered */
    }
    const { search, hash } = window.location;
    window.history.replaceState(
      window.history.state,
      "",
      basePath(next) + search + hash
    );
    setLangState(next);
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (v) => pick(v, lang),
      /* A real href for the language switcher, so it is a crawlable link. */
      hrefFor: (target) =>
        basePath(target) + window.location.search + window.location.hash,
      locale: lang === "tr" ? "tr-TR" : "en-US",
    }),
    [lang, setLang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);
