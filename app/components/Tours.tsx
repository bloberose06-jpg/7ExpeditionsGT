import { client, urlFor } from "@/sanity/client";
import { getLocale, getTranslations } from "next-intl/server";

export const revalidate = 10;

interface SanityTour {
  _id: string;
  title: string;
  titleEn?: string;
  slug: { current: string };
  mainImage?: any;
  date?: string;
  price?: string;
  duration?: string;
  durationEn?: string;
  status?: "disponible" | "ultimos-cupos" | "agotado";
  description?: string;
  descriptionEn?: string;
  pdfUrl?: string;
  pdfUrlEn?: string;
}

export default async function Tours() {
  const locale = await getLocale();
  const t = await getTranslations("tours");

  const statusStyles: Record<string, { label: string; color: string }> = {
    disponible: { label: t("status.disponible"), color: "var(--musgo-bright)" },
    "ultimos-cupos": { label: t("status.ultimos-cupos"), color: "var(--sulfuro)" },
    agotado: { label: t("status.agotado"), color: "var(--lava)" },
  };

  // Solicitamos la URL del archivo de manera directa usando la referencia -> asset->url
  const tours: SanityTour[] = await client.fetch(
    `*[_type == "tour"] | order(_createdAt desc) {
      _id,
      title,
      titleEn,
      slug,
      mainImage,
      date,
      price,
      duration,
      durationEn,
      status,
      description,
      descriptionEn,
      "pdfUrl": pdfCatalogue.asset->url,
      "pdfUrlEn": pdfCatalogueEn.asset->url
    }`,
    {},
    {
      next: { revalidate: 10 },
    }
  );

  return (
    <section id="expediciones" className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt)]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-3">
              {t("eyebrow")}
            </p>
            <h2 className="font-display uppercase text-[var(--bruma)]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
              {t("title")}
            </h2>
          </div>
          <p className="max-w-sm text-[var(--bruma-dim)]">
            {t("description")}
          </p>
        </div>

        {tours.length === 0 ? (
          <p className="text-center font-mono text-sm text-[var(--bruma-dim)]">
            {t("empty")}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tours.map((v) => {
              const currentStatus = v.status || "disponible";
              const title = (locale === "en" && v.titleEn) || v.title;
              const description = (locale === "en" && v.descriptionEn) || v.description;
              const duration = (locale === "en" && v.durationEn) || v.duration;
              const pdfUrl = (locale === "en" && v.pdfUrlEn) || v.pdfUrl;

              return (
                <article
                  key={v._id}
                  id={v.slug.current}
                  className="group scroll-mt-24 flex flex-col justify-between rounded-sm border border-[var(--ceniza-line)] bg-[var(--ceniza)] overflow-hidden hover:border-[var(--lava)] transition-colors"
                >
                  <div>
                    {/* 📸 CONTENEDOR DE LA IMAGEN DINÁMICA */}
                    {v.mainImage && (
                      <div className="relative h-48 w-full bg-[var(--basalt)] overflow-hidden">
                        <img
                          src={urlFor(v.mainImage).url()}
                          alt={title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Contenido de la tarjeta */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-display text-2xl uppercase text-[var(--bruma)]">
                          {title}
                        </h3>
                        <span
                          className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: statusStyles[currentStatus].color }}
                          title={t("statusTitle", { status: statusStyles[currentStatus].label })}
                        />
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-[var(--bruma-dim)] mb-4">
                        {v.date && <span>📅 {v.date}</span>}
                        {v.date && duration && <span>·</span>}
                        {duration && <span>{duration}</span>}
                        <span>·</span>
                        <span style={{ color: statusStyles[currentStatus].color }}>
                          {statusStyles[currentStatus].label}
                        </span>
                      </div>

                      <p className="text-sm text-[var(--bruma-dim)] mb-2 leading-relaxed">
                        {description || t("noDescription")}
                      </p>
                    </div>
                  </div>

                  {/* Footer de la tarjeta */}
                  <div className="flex items-center justify-between mx-6 pb-6 pt-4 border-t border-[var(--ceniza-line)]">
                    <span className="font-display text-lg text-[var(--sulfuro)]">
                      {v.price || t("priceFallback")}
                    </span>

                    <div className="flex items-center gap-5">
                      {/* Botón dinámico para el PDF real subido a Sanity */}
                      {pdfUrl && (
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--bruma-dim)] hover:text-[var(--sulfuro)] border-b border-[var(--ceniza-line)] hover:border-[var(--sulfuro)] pb-0.5 transition-all"
                          title={t("infoPdfTitle")}
                        >
                          {t("infoPdf")}
                        </a>
                      )}

                      {/* Botón de Reservar */}
                      <a
                        href={`#reservar`}
                        data-tour={title}
                        className="reservar-link font-mono text-xs uppercase tracking-[0.15em] text-[var(--bruma)] border-b border-[var(--lava)] hover:text-[var(--lava-bright)] pb-0.5"
                      >
                        {t("reservar")}
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

