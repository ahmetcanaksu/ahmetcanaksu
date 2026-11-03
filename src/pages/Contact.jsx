import { FiArrowUpRight } from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import { useLang } from "../i18n/LangContext";

const channels = [
  { label: { en: "Email", tr: "E-posta" }, value: "hello@ahmetcanaksu.com", href: "mailto:hello@ahmetcanaksu.com" },
  { label: "GitHub", value: "@ahmetcanaksu", href: "https://github.com/ahmetcanaksu" },
  { label: "LinkedIn", value: "in/ahmetcanaksu", href: "https://linkedin.com/in/ahmetcanaksu" },
  { label: "Twitter", value: "@ahmetcanaksu", href: "https://twitter.com/ahmetcanaksu" },
];

const Contact = () => {
  const { t } = useLang();

  return (
    <div className="wrap py-16 sm:py-20">
      <PageHeader
        kicker={t({ en: "Contact", tr: "İletişim" })}
        title={t({ en: "Say hello.", tr: "Merhaba deyin." })}
      >
        {t({
          en: "Open to interesting projects, open-source collaboration, and conversations about language design or systems. I usually reply within a day or two.",
          tr: "İlginç projelere, açık kaynak iş birliklerine, dil tasarımı ya da sistemler üzerine sohbetlere her zaman açığım. Genellikle bir iki gün içinde dönüş yaparım.",
        })}
      </PageHeader>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div>
            {channels.map((c) => {
              const external = !c.href.startsWith("mailto:");
              return (
                <a
                  key={c.href}
                  href={c.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="row group"
                >
                  <span className="row-num sm:w-28">{t(c.label)}</span>
                  <div className="flex flex-1 items-baseline justify-between gap-4">
                    <span className="row-title">{c.value}</span>
                    <FiArrowUpRight className="h-5 w-5 shrink-0 text-ink-3 transition-colors group-hover:text-accent" />
                  </div>
                </a>
              );
            })}
            <div className="border-t border-rule" />
          </div>
        </div>

        <aside className="space-y-6 lg:pt-2">
          <div className="border-t border-rule pt-2">
            <p className="kicker">{t({ en: "Status", tr: "Durum" })}</p>
            <p className="mt-1 flex items-center gap-2 text-ink">
              <span className="dot text-accent" />{" "}
              {t({ en: "Available for projects", tr: "Yeni projelere açığım" })}
            </p>
          </div>
          <div className="border-t border-rule pt-2">
            <p className="kicker">{t({ en: "Timezone", tr: "Saat dilimi" })}</p>
            <p className="mt-1 text-ink">{t({ en: "Istanbul · UTC+3", tr: "İstanbul · UTC+3" })}</p>
          </div>
          <div className="border-t border-rule pt-2">
            <p className="kicker">{t({ en: "Best for", tr: "En iyi olduğum alanlar" })}</p>
            <p className="mt-1 text-ink-2">
              {t({
                en: "Language & tool design, systems programming, backend, embedded.",
                tr: "Dil ve araç tasarımı, sistem programlama, backend, gömülü sistemler.",
              })}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Contact;
