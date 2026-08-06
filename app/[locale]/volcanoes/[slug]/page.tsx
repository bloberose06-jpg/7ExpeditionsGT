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

// 2. Generación de rutas estáticas
export async function generateStaticParams() {
  // Traemos el slug directamente (que ahora es un string simple)
  const query = `*[_type == "volcano"].slug`;
  const slugs: string[] = await client.fetch(query);

  // Aseguramos devolver únicamente un objeto con la llave "slug" como string
  return (slugs || [])
    .filter((slug) => typeof slug === "string") // Filtra si hay algún documento viejo con slug de tipo objeto
    .map((slug) => ({
      slug,
    }));
}

// 3. Metadata, Tarjeta Open Graph y SEO (Paso 2)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const query = `*[_type == "volcano" && slug == $slug][0]{ 
    name, 
    description,
    mainImage
  }`;
  
  const volcano = await client.fetch(query, { slug });

  if (!volcano) return {};

  const title = `${volcano.name} — 7 Expeditions Guatemala`;
  const description = volcano.description || `Conoce la expedición al volcán ${volcano.name}.`;
  
  // Reemplaza esto con tu dominio real cuando estés en producción
  const baseUrl = "https://7expeditions.com"; 

  // Si tiene imagen en Sanity la usa recortada a 1200x630, si no, usa la foto de public/gallery
  const imageUrl = volcano.mainImage 
    ? urlFor(volcano.mainImage).width(1200).height(630).fit("crop").url()
    : `${baseUrl}/gallery/IMG-20260706-WA0005.jpg`;

  return {
    title,
    description,

    // 🎯 PASO 2 SEO: Canonical & Alternate Languages
    alternates: {
      canonical: `${baseUrl}/${locale}/volcanoes/${slug}`,
      languages: {
        "es-GT": `${baseUrl}/es/volcanoes/${slug}`,
        "en-US": `${baseUrl}/en/volcanoes/${slug}`,
      },
    },

    // Tarjeta de presentación (Open Graph / Redes Sociales)
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

// 4. Componente de la Página de Volcán
export default async function VolcanoPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const query = `*[_type == "volcano" && slug == $slug][0]{
    name,
    elevation,
    difficulty,
    description,
    highlights,
    mainImage,
    gallery
  }`;

  const volcano = await client.fetch(query, { slug });

  if (!volcano) notFound();

  // 🎯 PASO 1 SEO: Schema.org / JSON-LD para motores de búsqueda
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": volcano.name,
    "description": volcano.description,
    "geo": {
      "@type": "GeoCoordinates",
      "elevation": `${volcano.elevation} m`,
    },
    "touristType": "Hiking",
    "image": volcano.mainImage ? urlFor(volcano.mainImage).url() : undefined,
  };

  return (
    <section className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt-2)] min-h-screen">
      {/* Inyección del script JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

        {/* Galería de imágenes */}
        {volcano.gallery && volcano.gallery.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {volcano.gallery.map((img: any, idx: number) => (
              <div
                key={idx}
                className="relative aspect-square rounded-sm overflow-hidden border border-white/10"
              >
                <Image
                  src={urlFor(img).url()}
                  alt={`Fotografía ${idx + 1} de la expedición al volcán ${volcano.name}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
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
