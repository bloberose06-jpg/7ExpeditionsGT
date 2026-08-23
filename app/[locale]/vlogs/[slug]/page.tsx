import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { client, urlFor } from "@/sanity/client";

export const revalidate = 0; // Desactiva la caché rígida en desarrollo

async function getVlog(slug: string) {
  const query = `*[_type == "vlog" && slug.current == $slug][0]{
    title,
    slug,
    coverImage,
    publishedAt,
    content
  }`;
  return client.fetch(query, { slug }, { cache: "no-store" });
}

export async function generateStaticParams() {
  const slugs: { slug: { current: string } }[] = await client.fetch(
    `*[_type == "vlog"]{ slug }`
  );
  return slugs.map((v) => ({ slug: v.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const vlog = await getVlog(slug);

  if (!vlog) return {};

  const title = vlog.title?.[locale] ?? vlog.title?.es ?? vlog.title?.en ?? "Vlog";
  const baseUrl = "https://www.7expeditionsguatemala.com";

  const imageUrl = vlog.coverImage
    ? urlFor(vlog.coverImage).width(1200).height(630).fit("crop").url()
    : `${baseUrl}/gallery/Acatenango1.jpg`;

  return {
    title: `${title} — 7 Expeditions Guatemala`,
    description: `Lee sobre la expedición ${title} en 7 Expeditions Guatemala.`,
    openGraph: {
      title,
      images: [{ url: imageUrl }],
    },
  };
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="relative w-full aspect-video my-8 rounded-sm overflow-hidden">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value?.alt || "Imagen de la expedición"}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
        />
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
  // 1. Resolver params asíncronos
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // 2. Fetch del documento
  const vlog = await getVlog(slug);

  // 3. Redirección si el slug no coincide con Sanity
  if (!vlog) {
    notFound();
  }

  // 4. Extracción segura según tu esquema exacto
  const title = vlog.title?.[locale] ?? vlog.title?.es ?? vlog.title?.en ?? "";
  
  // Extrae el array de bloques especificando el idioma del objeto content
  const body = vlog.content?.[locale] ?? vlog.content?.es ?? vlog.content?.en ?? [];

  return (
    <article className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt-2)] min-h-screen text-[var(--bruma)]">
      <div className="mx-auto max-w-3xl">
        {vlog.publishedAt && (
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-3">
            {new Date(vlog.publishedAt).toLocaleDateString(locale)}
          </p>
        )}

        <h1
          className="font-display uppercase text-[var(--bruma)] leading-none mb-8"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          {title}
        </h1>

        {vlog.coverImage && (
          <div className="relative aspect-video mb-10 rounded-sm overflow-hidden">
            <Image
              src={urlFor(vlog.coverImage).width(1200).url()}
              alt={title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none text-[var(--bruma-dim)] prose-headings:text-[var(--bruma)] prose-a:text-[var(--lava-bright)]">
          {Array.isArray(body) && body.length > 0 ? (
            <PortableText value={body} components={components} />
          ) : (
            <p className="text-neutral-500 italic">No hay contenido disponible para este artículo.</p>
          )}
        </div>
      </div>
    </article>
  );
}
