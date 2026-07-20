import { getTranslations } from "next-intl/server";

export default async function WhyUs() {
  const t = await getTranslations("whyUs");

  const stats = [
    { value: t("stats.volcanoesValue"), label: t("stats.volcanoesLabel") },
    { value: t("stats.yearsValue"), label: t("stats.yearsLabel") },
    { value: t("stats.groupMaxValue"), label: t("stats.groupMaxLabel") },
    { value: t("stats.guidesValue"), label: t("stats.guidesLabel") },
  ];

  const items = [
    { title: t("items.guidesTitle"), text: t("items.guidesText") },
    { title: t("items.groupsTitle"), text: t("items.groupsText") },
    { title: t("items.equipmentTitle"), text: t("items.equipmentText") },
    { title: t("items.safetyTitle"), text: t("items.safetyText") },
  ];

  return (
    <section id="nosotros" className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt)] border-t border-[var(--ceniza-line)]">
      <div className="mx-auto max-w-6xl">
        
        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 pb-16 border-b border-[var(--ceniza-line)]">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl md:text-5xl text-[var(--lava)]">{s.value}</p>
              <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--bruma-dim)] mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        {/* Bloque Informativo Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-3">
              {t("eyebrow")}
            </p>
            <h2 className="font-display uppercase text-[var(--bruma)]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)" }}>
              {t("title1")}
              <br /> {t("title2")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {items.map((it) => (
              <div key={it.title}>
                <h3 className="font-display uppercase text-lg text-[var(--sulfuro)] mb-1.5">{it.title}</h3>
                <p className="text-sm text-[var(--bruma-dim)] leading-relaxed">{it.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
