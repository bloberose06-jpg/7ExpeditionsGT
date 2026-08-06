import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// 1. Configuración del cliente de Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// 2. Generación de rutas estáticas para Next.js
export async function generateStaticParams() {
  const query = `*[_type == "volcano"]{ "slug": slug.current }`;
  const volcanoes = await client.fetch(query);
  return (volcanoes || []).map((v: { slug: string }) => ({ slug: v.slug }));
}

// 3. 🎯 AQUÍ AGREGAS LA INFORMACIÓN DE LA TARJETA / VISTA PREVIA (generateMetadata)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const query = `*[_type == "volcano" && slug.current == $slug][0]{ 
    name, 
    description,
    mainImage
  }`;
  
  const volcano = await client.fetch(query, { slug });

  if (!volcano) return {};

  const title = `${volcano.name} — 7 Expeditions Guatemala`;
  const description = volcano.description || `Conoce la expedición al volcán ${volcano.name}.`;

  // Cambia esto por tu dominio real cuando estés en producción
  const baseUrl = "https://7expeditions.com"; 

  // Si no hay foto cargada en Sanity, usa la imagen de public/gallery
  const imageUrl = volcano.mainImage 
    ? urlFor(volcano.mainImage).width(1200).height(630).fit("crop").url()
    : `${baseUrl}/gallery/IMG-20260706-WA0005.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/volcanoes/${slug}`,
      siteName: "7 Expeditions Guatemala",
      locale: locale === "es" ? "es_GT" : "en_US",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: volcano.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

// 4. Componente principal de la vista del Volcán
export default async function VolcanoPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

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

        {/* Highlights */}
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

        {/* Galería */}
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
