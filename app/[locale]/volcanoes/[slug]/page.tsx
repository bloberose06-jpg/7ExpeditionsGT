import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Configuración del cliente de Sanity usando variables de entorno
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

// Helper interno para transformar referencias de imágenes en URLs
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// Genera las rutas estáticas consultando los slugs en Sanity
export async function generateStaticParams() {
  const query = `*[_type == "volcano"]{ "slug": slug.current }`;
  const volcanoes = await client.fetch(query);
  return (volcanoes || []).map((v: { slug: string }) => ({ slug: v.slug }));
}

// Genera la metadata SEO dinámicamente
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const query = `*[_type == "volcano" && slug.current == $slug][0]{ name, description }`;
  const volcano = await client.fetch(query, { slug });

  if (!volcano) return {};
  return {
    title: `${volcano.name} — 7 Expeditions`,
    description: volcano.description,
  };
}

// Componente principal de la página del volcán
export default async function VolcanoPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // Consulta GROQ para obtener toda la información cargada desde Sanity
  const query = `*[_type == "volcano" && slug.current == $slug][0]{
    name,
    elevation,
    difficulty,
    description,
    highlights,
    gallery
  }`;

  const volcano = await client.fetch(query, { slug });

  if (!volcano) notFound();

  return (
    <section className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt-2)] min-h-screen">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-3">
          {volcano.elevation?.toLocaleString()} m
          {volcano.difficulty ? ` · ${volcano.difficulty}` : ""}
        </p>

        <h1
          className="font-display uppercase text-[var(--bruma)] leading-none mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          {volcano.name}
        </h1>

        {volcano.description && (
          <p className="text-[var(--bruma-dim)] text-lg max-w-2xl mb-8">
            {volcano.description}
          </p>
        )}

        {/* Puntos destacados / Highlights */}
        {volcano.highlights && volcano.highlights.length > 0 && (
          <ul className="mb-10 space-y-2">
            {volcano.highlights.map((h: string) => (
              <li key={h} className="flex items-center gap-2 text-[var(--bruma)] font-mono text-sm">
                <span className="w-1.5 h-1.5 bg-[var(--lava-bright)]" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Galería de imágenes cargadas en Sanity */}
        {volcano.gallery && volcano.gallery.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {volcano.gallery.map((img: any, idx: number) => (
              <div
                key={idx}
                className="relative aspect-square rounded-sm overflow-hidden border border-white/10"
              >
                <Image
                  src={urlFor(img).url()}
                  alt={`${volcano.name} foto ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
