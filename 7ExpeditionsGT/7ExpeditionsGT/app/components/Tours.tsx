import { volcanoes } from "../data/volcanoes";

const difficultyColor: Record<string, string> = {
  Moderada: "var(--musgo-bright)",
  Alta: "var(--sulfuro)",
  "Muy alta": "var(--lava)",
};

export default function Tours() {
  return (
    <section id="expediciones" className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt)]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-3">
              De 2,552 a 4,220 metros
            </p>
            <h2 className="font-display uppercase text-[var(--bruma)]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
              Las siete expediciones
            </h2>
          </div>
          <p className="max-w-sm text-[var(--bruma-dim)]">
            Cada ruta incluye guía certificado, equipo de montaña y transporte
            desde Antigua Guatemala o Ciudad de Guatemala.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {volcanoes.map((v) => (
            <article
              key={v.slug}
              id={v.slug}
              className="group scroll-mt-24 flex flex-col justify-between rounded-sm border border-[var(--ceniza-line)] bg-[var(--ceniza)] p-6 hover:border-[var(--lava)] transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-display text-2xl uppercase text-[var(--bruma)]">{v.name}</h3>
                  {v.active && (
                    <span className="ember mt-1.5 inline-block h-2 w-2 rounded-full bg-[var(--sulfuro)]" title="Actividad eruptiva" />
                  )}
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-[var(--bruma-dim)] mb-4">
                  <span>{v.elevation.toLocaleString()} m</span>
                  <span>·</span>
                  <span>{v.duration}</span>
                  <span>·</span>
                  <span style={{ color: difficultyColor[v.difficulty] }}>{v.difficulty}</span>
                </div>

                <p className="text-sm text-[var(--bruma-dim)] mb-4 leading-relaxed">{v.summary}</p>

                <ul className="space-y-1.5 mb-6">
                  {v.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-[var(--bruma)]">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--lava)]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--ceniza-line)]">
                <span className="font-display text-lg text-[var(--sulfuro)]">{v.price}</span>
                <a
                  href={`#reservar`}
                  data-tour={v.name}
                  className="reservar-link font-mono text-xs uppercase tracking-[0.15em] text-[var(--bruma)] border-b border-[var(--lava)] hover:text-[var(--lava-bright)] pb-0.5"
                >
                  Reservar →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
