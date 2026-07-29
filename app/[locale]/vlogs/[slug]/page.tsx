import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { client, urlFor } from "@/sanity/client";

export const revalidate = 60;

async function getVlog(slug: string) {
  const query = `*[_type == "vlog" && slug.current == $slug][0]{
    title,
    slug,
    coverImage,
    publishedAt,
    content
  }`;
  return client.fetch(query, { slug });
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
  return {
    title: `${vlog.title?.[locale] ?? vlog.title?.en} — 7 Expeditions`,
  };
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="relative w-full aspect-video my-8 rounded-sm overflow-hidden">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt || ""}
          fill
          className="object-cover"
        />
        {value.caption && (
          <p className="text-sm text-[var(--bruma-dim)] mt-2 italic">
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
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const vlog = await getVlog(slug);
  if (!vlog) notFound();

  const title = vlog.title?.[locale] ?? vlog.title?.en;
  const body = vlog.content?.[locale] ?? vlog.content?.en;

  return (
    <article className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt-2)] min-h-screen">
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
              className="object-cover"
            />
          </div>
        )}
        <div className="prose prose-invert max-w-none text-[var(--bruma-dim)]">
          {body && <PortableText value={body} components={components} />}
        </div>
      </div>
    </article>
  );
}
