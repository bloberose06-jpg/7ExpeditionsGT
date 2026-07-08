import { client, urlFor } from "@/sanity/client";
import { volcanoes } from "../data/volcanoes"; // Tus datos originales protegidos

// 1. Interfaz para tipar los datos unificados
interface UnifiedTour {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: string;
  duration: string;
  status: "disponible" | "ultimos-cupos" | "agotado";
  date?: string;
  mainImage?: any; // Solo vendrá en los de Sanity
  isLocal?: boolean; // Para saber si es de los fijos o de Sanity
}

const statusStyles: Record<string, { label: string; color: string }> = {
  "disponible": { label: "Disponible", color: "var(--musgo-bright)" },
  "ultimos-cupos": { label: "Últimos Cupos", color: "var(--sulfuro)" },
  "agotado": { label: "Agotado", color: "var(--lava)" },
};

export default async function Tours() {
  // 2. Traemos las expediciones creadas por el dueño en Sanity
  let sanityToursRaw: any[] = [];
  try {
    sanityToursRaw = await client.fetch(`*[_type == "tour"] | order(_createdAt desc)`);
  } catch (error) {
    console.error("Error trayendo datos de Sanity:", error);
  }

  // 3. Formateamos los datos de Sanity
  const sanityTours: UnifiedTour[] = sanityToursRaw.map((t) => ({
    _id: t._id,
    title: t.title,
    slug: t.slug?.current || t._id,
    description: t.description || "Sin descripción disponible.",
    price: t.price || "Consultar precio",
    duration: t.duration || "2 Días",
    status: t.status || "disponible",
    date: t.date,
    mainImage: t.mainImage,
    isLocal: false,
  }));

  // 4. Formateamos tus datos locales (volcanoes.ts) al mismo formato
  const localTours: UnifiedTour[] = volcanoes.map((v) => ({
    _id: v.slug,
    title: v.name,
    slug: v.slug,
    description: v.summary,
    price: v.price,
    duration: v.duration,
    status: "disponible", // Estado por defecto para tus fijos
    date: "Próximamente", 
    isLocal: true,
  }));

  // 5. Fusionamos ambas listas: Primero lo que publique el dueño, abajo los fijos
  const tours = [...sanityTours, ...localTours];

  return (
    <section id="expediciones" className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt)]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-3">
              De 2,552 a 4,220 metros
            </p>
            <h2 className="font-display uppercase text-[var(--bruma)]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
              Las expediciones
            </h2>
          </div>
          <p className="max-w-sm text-[var(--bruma-dim)]">
            Cada ruta incluye guía certificado, equipo de montaña y transporte
            desde Antigua Guatemala o Ciudad de Guatemala.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tours.map((v) => {
            const currentStatus = v.status || "disponible";
            
            return (
              <article
                key={v._id}
                id={v.slug}
                className="group scroll-mt-24 flex flex-col justify-between rounded-sm border border-[var(--ceniza-line)] bg-[var(--ceniza)] overflow-hidden hover:border-[var(--lava)] transition-colors"
              >
                <div>
                  {/* 📸 SECCIÓN DE IMAGEN: Si tiene de Sanity la pinta, si no, deja un fondo limpio */}
                  {v.mainImage ? (
                    <div className="relative h-48 w-full bg-[var(--basalt)] overflow-hidden">
                      <img
                        src={urlFor(v.mainImage).url()}
                        alt={v.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    // Fondo minimalista estético para tus volcanes antiguos del código
                    <div className="h-12 w-full bg-gradient-to-r from-[var(--basalt)] to-[var(--ceniza-line)] opacity-40" />
                  )}

                  {/* Contenido acolchado */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-display text-2xl uppercase text-[var(--bruma)]">
                        {v.title}
                      </h3>
                      <span 
                        className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full" 
                        style={{ backgroundColor: statusStyles[currentStatus].color }}
                        title={`Estado: ${statusStyles[currentStatus].label}`}
                      />
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-[var(--bruma-dim)] mb-4">
                      {v.date && <span>📅 {v.date}</span>}
                      <span>·</span>
                      <span>{v.duration}</span>
                      <span>·</span>
                      <span style={{ color: statusStyles[currentStatus].color }}>
                        {statusStyles[currentStatus].label}
                      </span>
                    </div>

                    <p className="text-sm text-[var(--bruma-dim)] mb-2 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>

                {/* Footer de la tarjeta de viaje */}
                <div className="flex items-center justify-between mx-6 pb-6 pt-4 border-t border-[var(--ceniza-line)]">
                  <span className="font-display text-lg text-[var(--sulfuro)]">
                    {v.price}
                  </span>

                  <a
                    href={`#reservar`}
                    data-tour={v.title}
                    className="reservar-link font-mono text-xs uppercase tracking-[0.15em] text-[var(--bruma)] border-b border-[var(--lava)] hover:text-[var(--lava-bright)] pb-0.5"
                  >
                    Reservar →
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
