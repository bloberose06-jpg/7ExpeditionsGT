const stats = [
  { value: "7", label: "Volcanes en operación" },
  { value: "10+", label: "Años guiando expediciones" },
  { value: "Sin", label: "Máximo por grupo" },
  { value: "100%", label: "Guías con Experiencia " },
];

const items = [
  {
    title: "Guías",
    text: "Con formación en primeros auxilios de montaña. Conocen cada ruta en cualquier condición climática.",
  },
  {
    title: "Grupos Sin Limite",
    text: "Sin Máximo de personas por expedición, siempre con un ritmo seguro y atención real a cada participante.",
  },
  {
    title: "Opciones de Equipo",
    text: "Bastones, chaqueta de montaña, guantes y bolsa de dormir para las expediciones de altura.",
  },
  {
    title: "Seguridad primero",
    text: "Monitoreo constante de actividad volcánica con INSIVUMEH. Rutas ajustadas o suspendidas cuando las condiciones lo requieren.",
  },
];

export default function WhyUs() {
  return (
    <section id="nosotros" className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt)] border-t border-[var(--ceniza-line)]">
      <div className="mx-auto max-w-6xl">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-3">
              Por qué 7 Expeditions GT
            </p>
            <h2 className="font-display uppercase text-[var(--bruma)]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)" }}>
              Guiamos con
              <br /> respeto al fuego
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
