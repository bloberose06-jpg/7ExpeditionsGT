import Link from "next/link";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { client, urlFor } from "@/sanity/client";

export const revalidate = 0;

async function getAllVlogs() {
  // Consulta limpia para traer TODOS los vlogs publicados ordenados por fecha
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

  const vlogs = await getAllVlogs();
  const lang = locale.startsWith("es") ? "es" : "en";

  return (
    <main className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt-2)] min-h-screen">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display uppercase text-[var(--bruma)] text-4xl md:text-6xl mb-12">
          Vlogs & Experiencias
        </h1>

        {vlogs.length === 0 ? (
          <p className="text-neutral-400">No hay vlogs publicados en este momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vlogs.map((vlog: any) => {
              // Manejo seguro del título traducido
              const title =
                vlog.title?.[lang] ??
                vlog.title?.es ??
                vlog.title?.en ??
                "Sin título";

              const slugString = vlog.slug?.current;

              if (!slugString) return null;

              return (
                <Link
                  key={vlog._id}
                  href={`/${locale}/vlogs/${slugString}`}
                  className="group block bg-[var(--basalt-1)] rounded overflow-hidden border border-neutral-800 hover:border-[var(--lava-bright)] transition-colors"
                >
                  {vlog.coverImage && (
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={urlFor(vlog.coverImage).width(600).url()}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    {vlog.publishedAt && (
                      <p className="font-mono text-xs text-[var(--lava-bright)] uppercase tracking-wider mb-2">
                        {new Date(vlog.publishedAt).toLocaleDateString(locale)}
                      </p>
                    )}
                    <h2 className="font-display uppercase text-xl text-[var(--bruma)] group-hover:text-white transition-colors">
                      {title}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
