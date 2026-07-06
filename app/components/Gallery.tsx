import fs from "fs";
import path from "path";
import Image from "next/image";

type IconType = "sunrise" | "lava" | "forest" | "group" | "stars" | "crater";

type Metadata = {
  caption?: string;
  location?: string;
  icon?: IconType;
};

type Shot = {
  id: string;
  caption: string;
  location: string;
  span: string;
  icon: IconType;
  image: string;
};

const ICON_CYCLE: IconType[] = ["sunrise", "lava", "forest", "group", "stars", "crater"];

// Aseguramos que estas clases estén exactamente escritas para que Tailwind las compile bien
const SPAN_CYCLE = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
];

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

function humanizeFilename(filename: string, index: number) {
  const base = filename.replace(/\.[^.]+$/, "");

  const isWhatsappStyle = /^IMG-\d{6,8}-WA\d+$/i.test(base);
  if (isWhatsappStyle) {
    return `Momento de expedición ${index + 1}`;
  }

  return base
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function loadMetadata(galleryDir: string): Record<string, Metadata> {
  const metaPath = path.join(galleryDir, "metadata.json");
  if (!fs.existsSync(metaPath)) return {};
  try {
    const raw = fs.readFileSync(metaPath, "utf-8");
    return JSON.parse(raw) as Record<string, Metadata>;
  } catch {
    console.warn("gallery/metadata.json inválido, ignorando.");
    return {};
  }
}

function getShots(): Shot[] {
  const galleryDir = path.join(process.cwd(), "public", "gallery");

  let files: string[] = [];
  try {
    files = fs
      .readdirSync(galleryDir)
      .filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()))
      .sort();
  } catch {
    return [];
  }

  const metadata = loadMetadata(galleryDir);

  return files.map((filename, index) => {
    const meta = metadata[filename] ?? {};
    return {
      id: String(index + 1).padStart(2, "0"),
      caption: meta.caption ?? humanizeFilename(filename, index),
      location: meta.location ?? "Guatemala",
      icon: meta.icon ?? ICON_CYCLE[index % ICON_CYCLE.length],
      span: SPAN_CYCLE[index % SPAN_CYCLE.length],
      image: `/gallery/${filename}`,
    };
  });
}

function ShotIcon({ type }: { type: IconType }) {
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
  const shots = getShots();

  return (
    <section id="galeria" className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt-2)]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-3">
              7 Expeditions
            </p>
            <h2 className="font-display uppercase text-[var(--bruma)] leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
              Guatemala Inolvidable.<br />
              <span className="text-[var(--lava-bright)]">Tú la conquistas.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[var(--bruma-dim)]">
            Fotografías reales tomadas en nuestros ascensos. Agrega tus capturas en <code className="font-mono text-[var(--sulfuro)]">/public/gallery</code> y aparecerán automáticamente aquí.
          </p>
        </div>

        {shots.length === 0 ? (
          <p className="text-[var(--bruma-dim)] font-mono text-sm">
            No hay fotos todavía en /public/gallery.
          </p>
        ) : (
          /* Cambiado md:auto-rows-[180px] a grid-flow-row-dense y min-height explícitos para forzar la renderización de layouts rotos */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[180px] grid-flow-row-dense gap-4">
            {shots.map((s) => (
              <div
                key={s.id}
                className={`group relative rounded-sm overflow-hidden border border-white/10 w-full h-full ${s.span}`}
              >
                <Image
                  src={s.image}
                  alt={s.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={s.id === "01"}
                />

                <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/20" />

                <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-white/70">
                  {s.id}
                </div>

                <div className="absolute top-3 right-3 text-white/70">
                  <ShotIcon type={s.icon} />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-display uppercase text-white text-lg leading-tight">{s.caption}</p>
                  <p className="font-mono text-[11px] text-white/70 mt-0.5">{s.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
