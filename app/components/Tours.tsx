import { client } from "@/sanity/client";

// 1. Tipamos los datos que vienen desde Sanity
interface SanityTour {
  _id: string;
  title: string;
  slug: { current: string };
  date?: string;
  price?: string;
  duration?: string;
  status?: "disponible" | "ultimos-cupos" | "agotado";
  description?: string;
}

// Mapeo de colores estéticos según el estado del tour
const statusStyles: Record<string, { label: string; color: string }> = {
  "disponible": { label: "Disponible", color: "var(--musgo-bright)" },
  "ultimos-cupos": { label: "Últimos Cupos", color: "var(--sulfuro)" },
  "agotado": { label: "Agotado", color: "var(--lava)" },
};

export default async function Tours() {
  // 2. Traemos los datos de Sanity usando GROQ en tiempo real
  const tours: SanityTour[] = await client.fetch(
    `*[_type == "tour"] | order(_createdAt desc)`
  );

  return (
    <section id="expediciones" className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt)]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-3">
              Próximas Salidas
            </p>
            <h2 className="font-display uppercase text-[var(--bruma)]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
              Las expediciones
            </h2>
          </div>
          <p className="max-w-sm text-[var(--bruma-dim)]">
            Cada ruta incluye guía certificado, equipo de montaña y transporte
            desde Antigua Guatemala o Ciudad de Guatemala. ¡Elige tu próxima aventura!
          </p>
        </div>

        {tours.length === 0 ? (
          <p className="text-center font-mono text-sm text-[var(--bruma-dim)]">
            No hay expediciones publicadas en este momento. Ingresa al /studio para agregar una.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tours.map((v) => {
              const currentStatus = v.status || "disponible";
              
              return (
                <article
                  key={v._id}
                  id={v.slug.current}
                  className="group scroll-mt-24 flex flex-col justify-between rounded-sm border border-[var(--ceniza-line)] bg-[var(--ceniza)] p-6 hover:border-[var(--lava)] transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-display text-2xl uppercase text-[var(--bruma)]">
                        {v.title}
                      </h3>
                      {/* Puntos de estado dinámicos basados en la selección del owner */}
                      <span 
                        className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full" 
                        style={{ backgroundColor: statusStyles[currentStatus].color }}
                        title={`Estado: ${statusStyles[currentStatus].label}`}
                      />
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-[var(--bruma-dim)] mb-4">
                      {v.date && <span>📅 {v.date}</span>}
                      {v.date && v.duration && <span>·</span>}
                      {v.duration && <span>{v.duration}</span>}
                      <span>·</span>
                      <span style={{ color: statusStyles[currentStatus].color }}>
                        {statusStyles[currentStatus].label}
                      </span>
                    </div>

                    <p className="text-sm text-[var(--bruma-dim)] mb-6 leading-relaxed">
                      {v.description || "Sin descripción disponible."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--ceniza-line)]">
                    <span className="font-display text-lg text-[var(--sulfuro)]">
                      {v.price || "Consultar precio"}
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
        )}
      </div>
    </section>
  );
}
