import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { client, urlFor } from "@/sanity/client";

export const revalidate = 60;

// Custom Portable Text Renderers
const components = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="font-display text-3xl md:text-4xl text-[var(--bruma)] mt-12 mb-6 tracking-wide border-b border-white/10 pb-3 uppercase">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-display text-xl md:text-2xl text-[var(--lava-bright)] mt-8 mb-4 uppercase">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-[var(--bruma-dim)] text-base md:text-lg leading-relaxed mb-6 font-light">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-[var(--lava-bright)] pl-6 py-4 my-8 italic text-lg text-[var(--bruma)] bg-white/5 rounded-r">
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-10 overflow-hidden rounded-sm border border-white/10 bg-black/20">
          <div className="relative aspect-video w-full">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt || "Vlog Image"}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <p className="p-3 font-mono text-xs text-center text-[var(--bruma-dim)] uppercase tracking-wider bg-black/40">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};

async function getVlogSingle(slug: string, locale: string) {
  const query = `*[_type == "vlog" && slug.current == $slug][0]{
    "title": title[$locale],
    "content": content[$locale],
    coverImage,
    publishedAt,
    location,
    readTime
  }`;
  return client.fetch(query, { slug, locale });
}

export default async function VlogSinglePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const vlog = await getVlogSingle(slug, locale);

  if (!vlog) {
    return (
      <section className="px-6 py-32 bg-[var(--basalt-2)] min-h-screen text-[var(--bruma)]">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-3xl">Vlog no encontrado</h1>
          <Link href={`/${locale}/vlogs`} className="text-[var(--lava-bright)] mt-4 inline-block">
            ← Volver a vlogs
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="min-h-screen bg-[var(--basalt-2)] text-[var(--bruma)] py-24 md:py-32 px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          href={`/${locale}/vlogs`}
          className="inline-block font-mono text-xs uppercase tracking-widest text-[var(--bruma-dim)] hover:text-[var(--lava-bright)] mb-8 transition-colors"
        >
          ← Volver a Vlogs
        </Link>

        {/* Header Section */}
        <header className="mb-10">
          {vlog.publishedAt && (
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-4">
              {new Date(vlog.publishedAt).toLocaleDateString(locale, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
          <h1
            className="font-display uppercase leading-tight text-[var(--bruma)] mb-8"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            {vlog.title}
          </h1>

          {/* Highlights Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-sm bg-white/5 border border-white/10 font-mono text-xs">
            <div>
              <span className="block text-[var(--bruma-dim)] uppercase mb-1">Ubicación</span>
              <span className="text-[var(--bruma)] font-bold">{vlog.location || "Lago Atitlán"}</span>
            </div>
            <div>
              <span className="block text-[var(--bruma-dim)] uppercase mb-1">Tipo</span>
              <span className="text-[var(--lava-bright)] font-bold">Expedición</span>
            </div>
            <div>
              <span className="block text-[var(--bruma-dim)] uppercase mb-1">Lectura</span>
              <span className="text-[var(--bruma)] font-bold">{vlog.readTime || "3 min"}</span>
            </div>
          </div>
        </header>

        {/* Main Cover Image */}
        {vlog.coverImage && (
          <div className="relative aspect-[16/9] w-full mb-12 rounded-sm overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={urlFor(vlog.coverImage).width(1400).height(787).url()}
              alt={vlog.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Content Body */}
        <div className="prose prose-invert max-w-none">
          {vlog.content ? (
            <PortableText value={vlog.content} components={components} />
          ) : (
            <p className="text-[var(--bruma-dim)]">Sin contenido disponible.</p>
          )}
        </div>
      </div>
    </article>
  );
}
