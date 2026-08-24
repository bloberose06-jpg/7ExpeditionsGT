import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "@/sanity/client";
import { setRequestLocale } from "next-intl/server";

export const revalidate = 0;

async function getVlogs() {
  const query = `*[_type == "vlog"] | order(publishedAt desc){
    _id,
    title,
    slug,
    coverImage,
    publishedAt
  }`;
  return client.fetch(query, {}, { cache: "no-store" });
}

export default async function VlogsListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const vlogs = await getVlogs();
  const lang = locale.startsWith("es") ? "es" : "en";

  return (
    <main className="px-6 lg:px-10 pt-24 md:pt-32 bg-[var(--basalt-2)] min-h-screen text-[var(--bruma)]">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display uppercase text-4xl md:text-6xl mb-12">
          Vlogs & Expediciones
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {vlogs?.map((vlog: any) => {
            const title =
              vlog.title?.[lang] ?? vlog.title?.es ?? vlog.title?.en ?? "Sin título";
            const slug = vlog.slug?.current;

            if (!slug) return null;

            return (
              <Link
                key={vlog._id}
                href={`/${locale}/vlogs/${slug}`}
                className="group border border-neutral-800 rounded-sm overflow-hidden bg-black/20 hover:border-[var(--lava-bright)] transition-colors"
              >
                {vlog.coverImage && (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={urlFor(vlog.coverImage).width(600).url()}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="font-display text-xl uppercase mb-2 group-hover:text-[var(--lava-bright)] transition-colors">
                    {title}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
