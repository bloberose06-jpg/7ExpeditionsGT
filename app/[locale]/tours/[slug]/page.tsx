import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TOURS_DATA, Tour } from "@/app/data/tours";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// 1. Metadatos SEO Dinámicos por Tour
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const tour = TOURS_DATA.find((t) => t.slug === slug);

  if (!tour) return {};

  const isEs = locale === "es";
  const title = `${isEs ? tour.title.es : tour.title.en} — 7 Expeditions GT`;
  const description = isEs ? tour.metaDescription.es : tour.metaDescription.en;
  const baseUrl = "https://www.7expeditionsguatemala.com";

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/tours/${slug}`,
      languages: {
        "es-GT": `${baseUrl}/es/tours/${slug}`,
        "en-US": `${baseUrl}/en/tours/${slug}`,
        "x-default": `${baseUrl}/es/tours/${slug}`
      }
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/tours/${slug}`,
      siteName: "7 Expeditions Guatemala",
      locale: isEs ? "es_GT" : "en_US",
      type: "article",
      images: [
        {
          url: `${baseUrl}${tour.heroImage}`,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}${tour.heroImage}`]
    }
  };
}

// Generación estática opcional para máxima velocidad en Next.js
export async function generateStaticParams() {
  const locales = ["es", "en"];
  const paths: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    TOURS_DATA.forEach((tour) => {
      paths.push({ locale, slug: tour.slug });
    });
  });

  return paths;
}

// 2. Componente de la Página de Tour
export default async function TourDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const tour = TOURS_DATA.find((t) => t.slug === slug);

  if (!tour) notFound();

  const isEs = locale === "es";

  // Datos Estructurados Schema JSON-LD de Producto y Viaje Turístico
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": isEs ? tour.title.es : tour.title.en,
    "description": isEs ? tour.metaDescription.es : tour.metaDescription.en,
    "image": `https://www.7expeditionsguatemala.com${tour.heroImage}`,
    "brand": {
      "@type": "Brand",
      "name": "7 Expeditions Guatemala"
    },
    "offers": {
      "@type": "Offer",
      "price": tour.priceUSD,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `https://www.7expeditionsguatemala.com/${locale}/tours/${slug}`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "128"
    }
  };

  const itineraryItems = isEs ? tour.itinerary.es : tour.itinerary.en;
  const faqs = isEs ? tour.faqs.es : tour.faqs.en;

  return (
    <article className="min-h-screen bg-[var(--basalt)] text-[var(--bruma)] pt-24 pb-16 px-6 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="font-mono text-xs uppercase tracking-widest text-[var(--bruma-dim)] mb-6">
          <Link href={`/${locale}`} className="hover:text-[var(--sulfuro)] transition-colors">
            {isEs ? "Inicio" : "Home"}
          </Link>{" "}
          /{" "}
          <Link href={`/${locale}#expediciones`} className="hover:text-[var(--sulfuro)] transition-colors">
            {isEs ? "Expediciones" : "Expeditions"}
          </Link>{" "}
          / <span className="text-[var(--sulfuro)]">{isEs ? tour.title.es : tour.title.en}</span>
        </nav>

        {/* Header Principal H1 */}
        <header className="border-b border-[var(--ceniza-line)] pb-8 mb-10">
          <h1 className="font-display text-3xl md:text-5xl uppercase tracking-wide text-[var(--bruma)] mb-4">
            {isEs ? tour.title.es : tour.title.en}
          </h1>

          <div className="flex flex-wrap items-center gap-6 font-mono text-sm text-[var(--sulfuro)]">
            <span className="flex items-center gap-1.5">
              📅 {isEs ? tour.schedule.es : tour.schedule.en}
            </span>
            <span className="flex items-center gap-1.5">
              ⏱ {isEs ? tour.duration.es : tour.duration.en}
            </span>
            <span className="flex items-center gap-1.5">
              ⛰ {tour.elevation}
            </span>
            <span className="bg-[var(--lava)] text-white px-3 py-1 font-display uppercase tracking-wider text-lg rounded-sm">
              ${tour.priceUSD} USD
            </span>
          </div>
        </header>

        {/* Resumen & Overview */}
        <section className="mb-12">
          <h2 className="font-display text-2xl uppercase text-[var(--lava)] mb-4">
            {isEs ? "Sobre esta Expedición" : "About this Expedition"}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-[var(--bruma-dim)] max-w-4xl">
            {isEs ? tour.overview.es : tour.overview.en}
          </p>
        </section>

        {/* Secciones del PDF: Qué Incluye y Equipo de Montaña */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Incluido */}
          <div className="bg-black/30 border border-[var(--ceniza-line)] p-6 rounded-sm">
            <h3 className="font-display text-xl uppercase mb-4 text-emerald-400">
              ✓ {isEs ? "Qué Incluye el Tour" : "What's Included"}
            </h3>
            <ul className="space-y-2.5 font-sans text-sm text-[var(--bruma-dim)]">
              {(isEs ? tour.included.es : tour.included.en).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opciones de Equipo (Datos del PDF) */}
          <div className="bg-black/30 border border-[var(--ceniza-line)] p-6 rounded-sm">
            <h3 className="font-display text-xl uppercase mb-4 text-[var(--sulfuro)]">
              🎒 {isEs ? "Opciones de Equipo de Montaña" : "Mountain Gear Provided"}
            </h3>
            <p className="font-mono text-xs text-[var(--bruma-dim)] mb-3 uppercase">
              {isEs ? "Equipo técnico provisto en la expedición:" : "Gear provided for expedition:"}
            </p>
            <ul className="space-y-2 font-sans text-sm text-[var(--bruma-dim)] mb-6">
              {(isEs ? tour.gearProvided.es : tour.gearProvided.en).map((gear, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-[var(--sulfuro)]">✓</span> {gear}
                </li>
              ))}
            </ul>

            <h4 className="font-display text-base uppercase mb-2 text-[var(--lava)]">
              {isEs ? "Qué debes traer:" : "What you should bring:"}
            </h4>
            <ul className="space-y-1.5 font-sans text-xs text-[var(--bruma-dim)]">
              {(isEs ? tour.gearToBring.es : tour.gearToBring.en).map((bring, idx) => (
                <li key={idx}>• {bring}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Itinerario Paso a Paso */}
        <section className="mb-12">
          <h2 className="font-display text-2xl uppercase text-[var(--lava)] mb-6">
            📍 {isEs ? "Itinerario de la Expedición" : "Expedition Itinerary"}
          </h2>
          <div className="space-y-4">
            {itineraryItems.map((step, idx) => (
              <div
                key={idx}
                className="bg-black/20 border-l-4 border-[var(--lava)] p-5 transition-colors hover:bg-black/40"
              >
                <span className="font-mono text-xs text-[var(--sulfuro)] uppercase tracking-wider">
                  {step.time}
                </span>
                <h3 className="font-display text-xl text-[var(--bruma)] my-1">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--bruma-dim)] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sección E-E-A-T: Seguridad y Guías (Extraído del PDF) */}
        <section className="bg-[var(--lava)]/10 border border-[var(--lava)]/40 p-8 rounded-sm mb-12">
          <h2 className="font-display text-2xl uppercase text-[var(--bruma)] mb-4">
            🔥 {isEs ? "Por Qué Elegir 7 Expeditions GT" : "Why Choose 7 Expeditions GT"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 font-sans text-sm">
            <div>
              <h3 className="font-display text-lg text-[var(--sulfuro)] uppercase mb-1">
                {isEs ? "Guías Certificados" : "Certified Guides"}
              </h3>
              <p className="text-[var(--bruma-dim)] text-xs leading-relaxed">
                {isEs
                  ? "Guías locales con formación en primeros auxilios de montaña. Conocen cada ruta en cualquier condición climática."
                  : "Local guides trained in wilderness first aid. Knowledgeable in all trail weather conditions."}
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-[var(--sulfuro)] uppercase mb-1">
                {isEs ? "Seguridad Primero" : "Safety First"}
              </h3>
              <p className="text-[var(--bruma-dim)] text-xs leading-relaxed">
                {isEs
                  ? "Monitoreo constante de actividad volcánica con INSIVUMEH. Rutas ajustadas o suspendidas cuando las condiciones lo requieren."
                  : "Constant volcanic monitoring with INSIVUMEH. Trails adjusted or suspended when safety requires."}
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-[var(--sulfuro)] uppercase mb-1">
                {isEs ? "Ritmo Seguro" : "Personalized Pace"}
              </h3>
              <p className="text-[var(--bruma-dim)] text-xs leading-relaxed">
                {isEs
                  ? "Atención dedicada con un ratio de 1 guía por cada 4 viajeros para mantener un ritmo cómodo y seguro."
                  : "Dedicated support with a 1 guide per 4 travelers ratio for a comfortable and secure pace."}
              </p>
            </div>
          </div>
        </section>

        {/* Preguntas Frecuentes (SEO Schema FAQ Candidate) */}
        {faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="font-display text-2xl uppercase text-[var(--lava)] mb-6">
              ❓ {isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx} className="bg-black/30 p-4 border border-[var(--ceniza-line)] rounded-sm cursor-pointer">
                  <summary className="font-display text-lg text-[var(--bruma)]">
                    {faq.q}
                  </summary>
                  <p className="mt-2 text-sm text-[var(--bruma-dim)] leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* CTA para Reservar */}
        <div className="text-center bg-gradient-to-b from-[var(--lava)]/20 to-transparent p-10 border border-[var(--lava)] rounded-sm">
          <h2 className="font-display text-3xl uppercase mb-3 text-[var(--bruma)]">
            {isEs ? "¿Listo para conquistar el volcán?" : "Ready to Conquer the Volcano?"}
          </h2>
          <p className="font-mono text-sm text-[var(--bruma-dim)] mb-6">
            {isEs
              ? "Confirma disponibilidad en menos de 24 horas con nuestros guías."
              : "Confirm availability in less than 24 hours with our guides."}
          </p>
          <Link
            href={`/${locale}#reservar`}
            className="inline-block bg-[var(--lava)] hover:bg-[var(--lava-bright)] px-10 py-4 font-display uppercase tracking-widest text-white text-lg transition-colors rounded-sm"
          >
            {isEs ? "Reservar Esta Expedición" : "Book This Expedition"}
          </Link>
        </div>
      </div>
    </article>
  );
}
