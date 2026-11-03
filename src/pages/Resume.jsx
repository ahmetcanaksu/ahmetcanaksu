import { Link } from "react-router-dom";
import ResumeEmbed from "../components/ResumeEmbed";
import PageHeader from "../components/PageHeader";
import { useLang } from "../i18n/LangContext";

const Resume = () => {
  const { t } = useLang();
  return (
    <div className="wrap py-16 sm:py-20">
      <PageHeader
        kicker={t({ en: "Résumé", tr: "Özgeçmiş" })}
        title={t({ en: "Experience, on one page.", tr: "Deneyimim, tek sayfada." })}
      >
        {t({
          en: (
            <>
              A live, bilingual CV you can read in the browser and export to PDF
              — or grab the quick download. Prefer the narrative? See{" "}
              <Link to="/about" className="link">
                about
              </Link>
              .
            </>
          ),
          tr: (
            <>
              Tarayıcıda okuyup PDF olarak dışa aktarabileceğiniz canlı, iki dilli
              bir özgeçmiş — ya da doğrudan indirin. Hikâyesini mi merak
              ediyorsunuz?{" "}
              <Link to="/about" className="link">
                Hakkımda
              </Link>{" "}
              sayfasına göz atın.
            </>
          ),
        })}
      </PageHeader>

      <ResumeEmbed />

      <div className="mt-16 max-w-2xl">
        <h2 className="text-2xl font-semibold">
          {t({ en: "Let's work together.", tr: "Birlikte çalışalım." })}
        </h2>
        <p className="mt-3 text-ink-2">
          {t({
            en: "Reach out for roles, freelance work, or open-source collaboration.",
            tr: "İş fırsatları, freelance projeler ya da açık kaynak iş birlikleri için bana ulaşın.",
          })}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <a href="mailto:hello@ahmetcanaksu.com" className="btn-solid">
            {t({ en: "Contact me", tr: "Bana ulaşın" })}
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
};

export default Resume;
