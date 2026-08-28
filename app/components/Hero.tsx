import { getTranslations } from "next-intl/server";
import VolcanoProfile from "./VolcanoProfile";

export default async function Hero() {
  const t = await getTranslations("hero");

  // Schema.org Structured Data para potenciar SEO en Google Video/Search
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Erupción del Volcán de Fuego - 7Expeditions Guatemala",
    "description": "Video de erupción volcánica y vistas panorámicas en las expediciones de senderismo en Guatemala.",
    "thumbnailUrl": "https://7expeditions.gt/og-volcan-fuego.jpg", // Asegúrate de ajustar esta URL
    "uploadDate": "2026-08-28T00:00:00Z",
    "contentUrl": "https://7expeditions.gt/volcandefuegoguatemala.webm",
  };

  return (
    <section
      id="top"
      aria-label="Presentación principal de expediciones a volcanes en Guatemala"
      className="relative pt-32 pb-16 md:pt-44 md:pb-20 px-6 lg:px-10 overflow-hidden"
    >
      {/* Schema.org JSON-LD para SEO de Video */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[var(--basalt)]">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          aria-label="Video de fondo del Volcán de Fuego en erupción"
          className="w-full h-full object-cover object-center scale-90 transition-transform duration-700 md:scale-95"
        >
          <source src="/volcandefuegoguatemala.webm" type="video/webm" />
        </video>

        {/* Capa de contraste / Overlay */}
        <div
          className="absolute inset-0 opacity-75 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 0%, var(--basalt-2) 0%, var(--basalt) 80%)",
          }}
        />
      </div>

      {/* Hero Content (Estructura Semántica para SEO) */}
      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="reveal font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-5">
          {t("eyebrow")}
        </p>

        <h1
          className="reveal font-display uppercase leading-[0.92] text-[var(--bruma)]"
          style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)", animationDelay: "0.05s" }}
        >
          {t("title1")}
          <br />
          <span className="text-[var(--lava)]">{t("title2")}</span>
        </h1>

        <p
          className="reveal mt-6 max-w-xl text-base md:text-lg text-[var(--bruma-dim)] font-medium"
          style={{ animationDelay: "0.15s" }}
        >
          {t("description")}
        </p>

        {/* Enlaces con atributos accesibles y descriptivos para SEO */}
        <div className="reveal mt-8 flex flex-wrap gap-4" style={{ animationDelay: "0.25s" }}>
          <a
            href="#reservar"
            title="Reservar tour guiado a volcanes"
            className="rounded-sm bg-[var(--lava)] hover:bg-[var(--lava-bright)] transition-colors px-6 py-3 font-display text-base uppercase tracking-wide text-[var(--bruma)]"
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="#expediciones"
            title="Ver catálogo de expediciones en Guatemala"
            className="rounded-sm border border-[var(--ceniza-line)] hover:border-[var(--sulfuro)] transition-colors px-6 py-3 font-display text-base uppercase tracking-wide text-[var(--bruma)]"
          >
            {t("ctaSecondary")}
          </a>
        </div>
      </div>

      {/* Perfil del Volcán */}
      <div className="relative z-10 mx-auto max-w-6xl mt-16 md:mt-24 reveal" style={{ animationDelay: "0.35s" }}>
        <VolcanoProfile />
      </div>
    </section>
  );
}
