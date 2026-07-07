import { useState } from "react";

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

export function AcatenangoPdfViewer() {
  const pdfPath = "/docs/Acatenango_Fuego_7Expeditions.pdf";

  return (
    <div className="w-full max-w-4xl mx-auto mt-20 px-4">
      <div className="text-center mb-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-2">
          Información Oficial
        </p>
        <h3 className="font-display uppercase text-[var(--bruma)] text-2xl">
          Catálogo del Tour Completo
        </h3>
        <p className="text-[var(--bruma-dim)] text-sm mt-1">
          Explora los itinerarios, menús de glamping y precios directamente aquí.
        </p>
      </div>

      {/* Contenedor adaptativo para el PDF */}
      <div className="relative w-full h-[600px] md:h-[750px] rounded-sm overflow-hidden border border-white/10 bg-black/20 shadow-2xl">
        <object
          data={pdfPath}
          type="application/pdf"
          className="w-full h-full"
        >
          {/* Un iframe como plan de respaldo nativo si el object falla */}
          <iframe
            src={`${pdfPath}#toolbar=0`}
            className="w-full h-full border-none"
            title="Catálogo Acatenango"
          >
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <p className="text-[var(--bruma-dim)] font-mono text-sm mb-4">
                Tu navegador no puede previsualizar el PDF de forma nativa.
              </p>
              <a
                href={pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-[var(--lava-bright)] text-[var(--lava-bright)] font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-[var(--lava-bright)] hover:text-white transition-all"
              >
                Abrir PDF en pestaña nueva
              </a>
            </div>
          </iframe>
        </object>
      </div>
    </div>
  );
}

export default function WhyUs() {
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

        {/* 💥 IMPORTANTE: Aquí llamamos al componente para que aparezca abajo de los textos */}
        <AcatenangoPdfViewer />

      </div>
    </section>
  );
}
