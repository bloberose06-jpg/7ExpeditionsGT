import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { volcanoes } from "@/app/data/volcanoes"; // ajusta al import real que ya usas en Hero/VolcanoProfile

export function generateStaticParams() {
  return volcanoes.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const volcano = volcanoes.find((v) => v.slug === slug);
  if (!volcano) return {};
  return {
    title: `${volcano.name} — 7 Expeditions`,
    description: volcano.description,
  };
}

export default async function VolcanoPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const volcano = volcanoes.find((v) => v.slug === slug);
  if (!volcano) notFound();

  const t = await getTranslations("volcanoPage");

  return (
    <section className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt-2)] min-h-screen">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-3">
          {volcano.elevation.toLocaleString()} m
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

        {volcano.highlights && volcano.highlights.length > 0 && (
          <ul className="mb-10 space-y-2">
            {volcano.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-[var(--bruma)] font-mono text-sm">
                <span className="w-1.5 h-1.5 bg-[var(--lava-bright)]" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {volcano.images && volcano.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {volcano.images.map((src) => (
              <div key={src} className="relative aspect-square rounded-sm overflow-hidden border border-white/10">
                <Image src={src} alt={volcano.name} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Espacio para crecer: itinerario, precios, qué llevar, FAQ, etc. */}
      </div>
    </section>
  );
}
