import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { client, urlFor } from "@/sanity/client";
import type { Metadata } from "next";
import Reservation from "@/app/components/Reservation";

export const revalidate = 0;

async function getVlog(slug: string) {
  const query = `*[_type == "vlog" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    coverImage,
    publishedAt,
    _updatedAt,
    content
  }`;

  return client.fetch(query, { slug }, { cache: "no-store" });
}

export async function generateStaticParams() {
  const slugs: { slug: { current: string } }[] = await client.fetch(
    `*[_type == "vlog" && defined(slug.current)]{ slug }`
  );
  return slugs.map((v) => ({ slug: v.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const vlog = await getVlog(slug);

  if (!vlog) return {};

  const lang = locale.startsWith("es") ? "es" : "en";
  const title = vlog.title?.[lang] ?? vlog.title?.es ?? vlog.title?.en ?? "Vlog";
  
  const rawBody = vlog.content?.[lang] ?? vlog.content?.es ?? [];
  const autoSnippet = Array.isArray(rawBody) && rawBody.length > 0
    ? rawBody.find((b: any) => b._type === "block")?.children?.map((c: any) => c.text).join(" ").slice(0, 155)
    : null;

  const description = autoSnippet || `Guía y experiencia de senderismo en ${title} con 7 Expeditions Guatemala.`;
  const baseUrl = "https://www.7expeditionsguatemala.com";
  const currentUrl = `${baseUrl}/${locale}/vlogs/${slug}`;

  const imageUrl = vlog.coverImage
    ? urlFor(vlog.coverImage).width(1200).height(630).fit("crop").url()
    : `${baseUrl}/gallery/Acatenango1.jpg`;

  return {
    title: `${title} | 7 Expeditions Guatemala`,
    description,
    alternates: {
      canonical: currentUrl,
      languages: {
        "es": `${baseUrl}/es/vlogs/${slug}`,
        "en": `${baseUrl}/en/vlogs/${slug}`,
        "x-default": `${baseUrl}/es/vlogs/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | 7 Expeditions Guatemala`,
      description,
      url: currentUrl,
      siteName: "7 Expeditions Guatemala",
      locale: locale === "es" ? "es_GT" : "en_US",
      type: "article",
      publishedTime: vlog.publishedAt,
      modifiedTime: vlog._updatedAt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | 7 Expeditions Guatemala`,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children, value }: { children?: React.ReactNode; value?: any }) => {
      const text = value?.children?.map((c: any) => c.text).join("") || "";

      if (text.length > 0 && text.length < 65 && !text.trim().endsWith(".")) {
        return (
          <h3 className="font-display uppercase text-xl md:text-2xl text-[var(--lava-bright)] mt-10 mb-4 tracking-wide">
            {children}
          </h3>
        );
      }

      return (
        <p className="text-[var(--bruma-dim)] leading-relaxed mb-6 text-base md:text-lg">
          {children}
        </p>
      );
    },
    h2: ({ children }) => (
      <h2 className="font-display uppercase text-2xl md:text-3xl text-[var(--bruma)] mt-10 mb-4 border-b border-neutral-800 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display uppercase text-xl md:text-2xl text-[var(--lava-bright)] mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--lava-bright)] pl-4 my-6 italic text-[var(--bruma)] bg-black/20 py-2 rounded-r">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--lava-bright)] underline hover:text-white transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-[var(--bruma-dim)]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-[var(--bruma-dim)]">
        {children}
      </ol>
    ),
  },
  types: {
    image: ({ value }) => (
      <div className="relative w-full aspect-video my-8 rounded-sm overflow-hidden border border-neutral-800">
        {value?.asset && (
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value?.alt || "Fotografía de expedición en Guatemala"}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        )}
        {value?.caption && (
          <p className="text-sm text-[var(--bruma-dim)] mt-2 italic text-center">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
};

export default async function VlogPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;

  setRequestLocale(locale);

  const vlog = await getVlog(slug);

  if (!vlog) {
    notFound();
  }

  const lang = locale.startsWith("es") ? "es" : "en";

  const title =
    vlog.title?.[lang] ?? vlog.title?.es ?? vlog.title?.en ?? "Sin título";
  const body =
    vlog.content?.[lang] ?? vlog.content?.es ?? vlog.content?.en ?? [];

  const baseUrl = "https://www.7expeditionsguatemala.com";
  const imageUrl = vlog.coverImage
    ? urlFor(vlog.coverImage).width(1200).height(630).fit("crop").url()
    : `${baseUrl}/gallery/Acatenango1.jpg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "image": [imageUrl],
    "datePublished": vlog.publishedAt || new Date().toISOString(),
    "dateModified": vlog._updatedAt || vlog.publishedAt || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "7 Expeditions Guatemala",
      "url": baseUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": "7 Expeditions Guatemala",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale}/vlogs/${slug}`,
    },
    "description": `Guía y expedición en ${title} organizada por 7 Expeditions Guatemala.`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="px-6 lg:px-10 pt-24 md:pt-32 bg-[var(--basalt-2)] min-h-screen text-[var(--bruma)]">
        <div className="mx-auto max-w-3xl">
          {vlog.publishedAt && (
            <time 
              dateTime={vlog.publishedAt}
              className="block font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-3"
            >
              {new Date(vlog.publishedAt).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          )}

          <h1
            className="font-display uppercase text-[var(--bruma)] leading-none mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {title}
          </h1>

          {vlog.coverImage && (
            <div className="relative aspect-video mb-10 rounded-sm overflow-hidden border border-neutral-800">
              <Image
                src={urlFor(vlog.coverImage).width(1200).url()}
                alt={title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none text-[var(--bruma-dim)] mb-16">
            {Array.isArray(body) && body.length > 0 ? (
              <PortableText value={body} components={components} />
            ) : (
              <p className="text-neutral-500 italic">
                No hay contenido disponible para este artículo.
              </p>
            )}
          </div>
        </div>

        {/* Passing resolved parameters inside the expected `params` object prop */}
        <Reservation params={{ locale, slug }} />
      </article>
    </>
  );
}
