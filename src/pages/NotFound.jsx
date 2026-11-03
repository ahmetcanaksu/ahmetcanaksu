import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useLang } from "../i18n/LangContext";

const links = [
  { to: "/about", label: { en: "About", tr: "Hakkımda" } },
  { to: "/projects", label: { en: "Projects", tr: "Projeler" } },
  { to: "/blog", label: { en: "Writing", tr: "Yazılar" } },
  { to: "/contact", label: { en: "Contact", tr: "İletişim" } },
];

const NotFound = () => {
  const { t } = useLang();

  return (
    <div className="wrap flex min-h-[60vh] flex-col justify-center py-20">
      <p className="kicker mb-4">{t({ en: "Error 404", tr: "Hata 404" })}</p>
      <h1 className="text-5xl font-semibold sm:text-7xl">
        {t({ en: "Page not found.", tr: "Sayfa bulunamadı." })}
      </h1>
      <p className="mt-5 max-w-xl text-lg text-ink-2">
        {t({
          en: "The page you're looking for doesn't exist or has moved.",
          tr: "Aradığınız sayfa mevcut değil ya da taşınmış.",
        })}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link to="/" className="btn-solid">
          {t({ en: "Back home", tr: "Ana sayfaya dön" })}
          <FiArrowRight className="h-4 w-4" />
        </Link>
        {links.map((l) => (
          <Link key={l.to} to={l.to} className="link">
            {t(l.label)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NotFound;
