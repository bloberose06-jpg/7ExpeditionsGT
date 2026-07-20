import { getLocale, getTranslations } from "next-intl/server";

export default async function Calendar() {
  const locale = await getLocale();
  const t = await getTranslations("calendar");

  // TODO: si subís una versión en inglés del catálogo, ponla en
  // /public/docs/Acatenango_Fuego_7Expeditions_en.pdf y este código la
  // usará automáticamente cuando el sitio esté en /en. Mientras tanto,
  // muestra siempre el PDF en español.
  const pdfPath =
    locale === "en"
      ? "/docs/Acatenango_Fuego_7Expeditions_en.pdf"
      : "/docs/Acatenango_Fuego_7Expeditions.pdf";

  return (
    <div id="calendario" className="w-full max-w-4xl mx-auto mt-20 px-4 scroll-mt-24">
      <div className="text-center mb-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-2">
          {t("eyebrow")}
        </p>
        <h3 className="font-display uppercase text-[var(--bruma)] text-2xl">
          {t("title")}
        </h3>
        <p className="text-[var(--text-dim,var(--bruma-dim))] text-sm mt-1">
          {t("description")}
        </p>
      </div>
      {/* Contenedor adaptativo para el PDF */}
      <div className="relative w-full h-[600px] md:h-[750px] rounded-sm overflow-hidden border border-white/10 bg-black/20 shadow-2xl">
        <object
          data={pdfPath}
          type="application/pdf"
          className="w-full h-full"
        >
          <iframe
            src={`${pdfPath}#toolbar=0`}
            className="w-full h-full border-none"
            title={t("iframeTitle")}
          >
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <p className="text-[var(--bruma-dim)] font-mono text-sm mb-4">
                {t("unsupported")}
              </p>
              <a
                href={pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-[var(--lava-bright)] text-[var(--lava-bright)] font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-[var(--lava-bright)] hover:text-white transition-all"
              >
                {t("openPdf")}
              </a>
            </div>
          </iframe>
        </object>
      </div>
    </div>
  );
}
