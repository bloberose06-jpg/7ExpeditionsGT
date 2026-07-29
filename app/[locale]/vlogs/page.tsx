import Link from "next/link";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { client, urlFor } from "@/sanity/client";

export const revalidate = 60; // re-fetch cada 60s (ajustá a gusto)

type VlogListItem = {
  slug: string;
  title: string;
  coverImage?: any;
  publishedAt?: string;
};

async function getVlogs(locale: string): Promise<VlogListItem[]> {
  const query = `*[_type == "vlog"] | order(publishedAt desc) {
    "slug": slug.current,
    "title": title[$locale],
    coverImage,
    publishedAt
  }`;
  return client.fetch(query, { locale });
}

export default async function VlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const vlogs = await getVlogs(locale);

  return (
    <section className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt-2)] min-h-screen">
      <div className="mx-auto max-w-5xl">
        <h1
          className="font-display uppercase text-[var(--bruma)] leading-none mb-12"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Vlogs
        </h1>

        {vlogs.length === 0 && (
          <p className="text-[var(--bruma-dim)]">No hay vlogs publicados todavía.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {vlogs.map((vlog) => (
            <Link
              key={vlog.slug}
              href={`/${locale}/vlogs/${vlog.slug}`}
              className="group block border border-white/10 rounded-sm overflow-hidden hover:border-[var(--lava-bright)] transition-colors"
            >
              {vlog.coverImage && (
                <div className="relative aspect-video">
                  <Image
                    src={urlFor(vlog.coverImage).width(800).height(450).url()}
                    alt={vlog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5">
                {vlog.publishedAt && (
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-2">
                    {new Date(vlog.publishedAt).toLocaleDateString(locale)}
                  </p>
                )}
                <h2 className="font-display text-2xl text-[var(--bruma)]">
                  {vlog.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
