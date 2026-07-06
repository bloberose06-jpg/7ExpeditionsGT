"use client";

import { useState } from "react";

type Shot = {
  id: string;
  caption: string;
  location: string;
  span: string; // clases de grid para el mosaico
  gradient: string;
  icon: "sunrise" | "lava" | "forest" | "group" | "stars" | "crater";
};

const shots: Shot[] = [
  {
    id: "01",
    caption: "Amanecer sobre el Fuego",
    location: "Campamento Acatenango, 3,600 m",
    span: "md:col-span-2 md:row-span-2",
    gradient: "linear-gradient(155deg, #3a1c10 0%, #c6491d 55%, #d9a73b 100%)",
    icon: "sunrise",
    tile: <Image src="/gallery/acatenango-amanecer.jpg" alt="Amanecer sobre el Fuego" fill className="object-cover" />,
  },
  {
    id: "02",
    caption: "Colada de lava activa",
    location: "Volcán Pacaya",
    span: "md:col-span-1 md:row-span-1",
    gradient: "linear-gradient(160deg, #1c1713 0%, #7a2d12 60%, #ea7134 100%)",
    icon: "lava",
  },
  {
    id: "03",
    caption: "Bosque nuboso en ruta",
    location: "Sendero al Atitlán",
    span: "md:col-span-1 md:row-span-1",
    gradient: "linear-gradient(160deg, #14110f 0%, #2f3a2b 55%, #4a5a43 100%)",
    icon: "forest",
  },
  {
    id: "04",
    caption: "Grupo en la cumbre",
    location: "Volcán de Agua, 3,760 m",
    span: "md:col-span-1 md:row-span-1",
    gradient: "linear-gradient(160deg, #1c1713 0%, #6b4a2c 60%, #d9a73b 100%)",
    icon: "group",
  },
  {
    id: "05",
    caption: "Cielo estrellado en campamento",
    location: "Campamento Acatenango",
    span: "md:col-span-1 md:row-span-2",
    gradient: "linear-gradient(170deg, #0c0b0a 0%, #211c18 50%, #3a322c 100%)",
    icon: "stars",
  },
  {
    id: "06",
    caption: "Cráter cubierto de musgo",
    location: "Volcán San Pedro",
    span: "md:col-span-2 md:row-span-1",
    gradient: "linear-gradient(150deg, #1c1713 0%, #3f4a3d 60%, #6b7f61 100%)",
    icon: "crater",
  },
  {
    id: "07",
    caption: "Explosión estromboliana nocturna",
    location: "Volcán de Fuego, visto desde Acatenango",
    span: "md:col-span-1 md:row-span-1",
    gradient: "linear-gradient(160deg, #14110f 0%, #7a2d12 55%, #ea7134 100%)",
    icon: "lava",
  },
];

function ShotIcon({ type }: { type: Shot["icon"] }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none" } as const;
  switch (type) {
    case "sunrise":
      return (
        <svg {...common}>
          <circle cx="12" cy="14" r="4" stroke="currentColor" strokeWidth="1.4" />
          <path d="M2 20h20M12 4v3M5 11l2 2M19 11l-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "lava":
      return (
        <svg {...common}>
          <path d="M12 3c2 3-1 4-1 6.5A3 3 0 0012 15a3 3 0 003-3c1.5 1 2 2.7 2 4a5 5 0 01-10 0c0-4 3-5 3-8 0-1.6-.7-2.7 2-5z" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "forest":
      return (
        <svg {...common}>
          <path d="M12 3l4 6h-2.5L17 14h-3v6h-4v-6H7l3.5-5H8l4-6z" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "group":
      return (
        <svg {...common}>
          <circle cx="8" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="16" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.3" />
          <path d="M3 19c0-2.8 2.2-5 5-5s5 2.2 5 5M11 19c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "stars":
      return (
        <svg {...common}>
          <path d="M12 3l1.4 4.3L18 9l-4.6 1.7L12 15l-1.4-4.3L6 9l4.6-1.7L12 3z" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="18.5" cy="16" r="1" fill="currentColor" />
          <circle cx="6" cy="17" r="0.8" fill="currentColor" />
        </svg>
      );
    case "crater":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="12" rx="9" ry="5" stroke="currentColor" strokeWidth="1.3" />
          <ellipse cx="12" cy="12" rx="4" ry="2.2" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      );
  }
}

export default function Gallery() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="galeria" className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt-2)]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-3">
              Diario de expedición
            </p>
            <h2 className="font-display uppercase text-[var(--bruma)]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
              Galería
            </h2>
          </div>
          <p className="max-w-sm text-[var(--bruma-dim)]">
            Espacio reservado para fotografías reales de cada expedición.
            Reemplazá cada tile con tus propias imágenes en{" "}
            <code className="font-mono text-[var(--sulfuro)]">/public/gallery</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[180px] gap-4">
          {shots.map((s) => (
            <div
              key={s.id}
              className={`relative rounded-sm overflow-hidden border border-dashed border-white/15 cursor-default min-h-[180px] ${s.span}`}
              style={{ background: s.gradient }}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-white/70">
                {s.id}
              </div>
              <div className="absolute top-3 right-3 text-white/70">
                <ShotIcon type={s.icon} />
              </div>
              <div
                className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
                  hovered === s.id ? "opacity-100" : "opacity-90"
                }`}
              >
                <p className="font-display uppercase text-white text-lg leading-tight">{s.caption}</p>
                <p className="font-mono text-[11px] text-white/70 mt-0.5">{s.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
