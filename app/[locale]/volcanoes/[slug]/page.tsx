import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { Metadata } from "next";

// ISR: Revalida la página cada hora
export const revalidate = 3600;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  if (!source || !source.asset) return null;
  try {
    return builder.image(source);
  } catch (e) {
    return null;
  }
}

export async function generateStaticParams() {
  const query = `*[_type == "volcano" && defined(slug)][].slug`;
  const rawSlugs = await client.fetch(query);

  const slugs: string[] = (rawSlugs || [])
    .map((s: any) => (typeof s === "string" ? s : s?.current))
    .filter(Boolean);

  return slugs.map((slug) => ({ slug }));
}

// Metadata SEO Avanzada
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const query = `*[_type == "volcano" && (slug.current == $slug || slug == $slug)][0]{ 
    name, 
    description,
    mainImage
  }`;

  const volcano = await client.fetch(query, { slug });

  if (!volcano) return {};

  const volcanoName = volcano.name || "Volcán";
  const title = `${volcanoName} — Expedición en Guatemala | 7 Expeditions`;
  const description =
    volcano.description ||
    `Conoce los detalles de la expedición guiada al volcán ${volcanoName} en Guatemala. Rutas, fotos y vlogs de la caminata.`;

  const baseUrl = "https://7expeditionsguatemala.com";
  const canonicalUrl = `${baseUrl}/${locale}/volcanoes/${slug}`;

  const imageBuilder = urlFor(volcano.mainImage);
  const imageUrl = imageBuilder
    ? imageBuilder.width(1200).height(630).fit("crop").url()
    : `${baseUrl}/gallery/IMG-20260706-WA0005.jpg`;

  const currentLocale = locale === "es" ? "es_GT" : "en_US";
  const alternateLocale = locale === "es" ? "en_US" : "es_GT";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "es-GT": `${baseUrl}/es/volcanoes/${slug}`,
        "en-US": `${baseUrl}/en/volcanoes/${slug}`,
        "x-default": `${baseUrl}/es/volcanoes/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "7 Expeditions Guatemala",
      locale: currentLocale,
      alternateLocale: [alternateLocale],
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Expedición al volcán ${volcanoName} en Guatemala`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
}

export default async function VolcanoPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const query = `*[_type == "volcano" && (slug.current == $slug || slug == $slug)] | order(_createdAt desc)[0]{
    _id,
    name,
    elevation,
    difficulty,
    description,
    highlights,
    mainImage,
    gallery,
    "vlogs": *[_type == "vlog" && (
      references(^._id) || 
      relatedVolcano._ref == ^._id || 
      volcanoSlug == $slug ||
      volcanoSlug == ^.slug.current
    )]{
      _id,
      title,
      slug,
      coverImage,
      publishedAt
    }
  }`;

  const volcano = await client.fetch(query, { slug });

  if (!volcano) notFound();

  const baseUrl = "https://7expeditionsguatemala.com";
  const mainImgUrl = urlFor(volcano.mainImage)?.url();

  // JSON-LD Enriquecido
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `${baseUrl}/${locale}/volcanoes/${slug}#attraction`,
    name: volcano.name,
    description: volcano.description,
    inLanguage: locale === "es" ? "es-GT" : "en-US",
    touristType: ["Hiking", "Adventure travel", "Outdoor"],
    location: {
      "@type": "Place",
      name: volcano.name,
      address: {
        "@type": "PostalAddress",
        addressCountry: "GT",
      },
      geo: {
        "@type": "GeoCoordinates",
        elevation: volcano.elevation ? `${volcano.elevation} m` : undefined,
      },
    },
    image: mainImgUrl ? [mainImgUrl] : undefined,
    provider: {
      "@type": "TravelAgency",
      name: "7 Expeditions Guatemala",
      url: baseUrl,
    },
  };

  return (
    <section className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt-2)] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-3">
          {volcano.elevation ? `${volcano.elevation.toLocaleString()} m` : ""}
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

        {/* Highlights con marcado HTML más semántico */}
        {volcano.highlights && volcano.highlights.length > 0 && (
          <ul className="mb-10 space-y-2">
            {volcano.highlights.map((h: string) => (
              <li
                key={h}
                className="flex items-center gap-2 text-[var(--bruma)] font-mono text-sm"
              >
                <span className="w-1.5 h-1.5 bg-[var(--lava-bright)]" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Galería de imágenes con optimización LCP */}
        {volcano.gallery && volcano.gallery.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {volcano.gallery.map((img: any, idx: number) => {
              const imgObj = urlFor(img);
              if (!imgObj) return null;
              return (
                <div
                  key={idx}
                  className="relative aspect-square rounded-sm overflow-hidden border border-white/10"
                >
                  <Image
                    src={imgObj.url()}
                    alt={`Vista de la ruta en la expedición al volcán ${volcano.name} - Imagen ${idx + 1}`}
                    fill
                    priority={idx === 0} // La primera imagen carga con prioridad para mejor LCP
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Vlogs & Experiencias Relacionadas */}
        {volcano.vlogs && volcano.vlogs.length > 0 && (
          <div className="mt-16 border-t border-white/10 pt-12">
            <h2 className="font-display uppercase text-2xl text-[var(--bruma)] mb-6 tracking-wide">
              Vlogs & Experiencias en {volcano.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {volcano.vlogs.map((vlog: any) => {
                const vlogTitle =
                  typeof vlog.title === "object"
                    ? vlog.title[locale] || vlog.title.es || vlog.title.en
                    : vlog.title;

                const vlogSlug =
                  typeof vlog.slug === "object"
                    ? vlog.slug?.current
                    : vlog.slug;

                if (!vlogSlug) return null;

                const coverBuilder = urlFor(vlog.coverImage);
                const coverUrl = coverBuilder
                  ? coverBuilder.width(600).height(380).fit("crop").url()
                  : null;

                return (
                  <Link
                    key={vlog._id}
                    href={`/${locale}/vlogs/${vlogSlug}`}
                    className="group block rounded-sm overflow-hidden border border-white/10 bg-[var(--basalt-1)] hover:border-[var(--lava-bright)] transition-all"
                  >
                    {coverUrl && (
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={coverUrl}
                          alt={`Vlog de la expedición: ${vlogTitle}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--lava-bright)] mb-1">
                        Vlog de Expedición
                      </p>
                      <h3 className="font-display uppercase text-lg text-[var(--bruma)] group-hover:text-[var(--sulfuro)] transition-colors">
                        {vlogTitle}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
