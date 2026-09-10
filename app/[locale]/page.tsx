import { Metadata } from "next";
import Hero from "@/app/components/Hero";
import Tours from "@/app/components/Tours";
import Gallery from "@/app/components/Gallery";
import InstagramScroll, { mockInstagramPosts } from "@/app/components/InstagramScroll";
import WhyUs from "@/app/components/WhyUs";
import Calendar from "@/app/components/Calendar";
import Reservation from "@/app/components/Reservation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://www.7expeditionsguatemala.com";

  const isEs = locale === "es";

  // Título enriquecido
  const title = isEs
    ? "Tours al Volcán Acatenango y Trekking en Guatemala — 7 Expeditions"
    : "Acatenango Volcano Overnight Hike & Trekking Guatemala — 7 Expeditions";

  // Meta descripción optimizada con llamadas a la acción y tus palabras clave
  const description = isEs
    ? "Reserva tu tour a Acatenango overnight y vive el ascenso al Volcán de Fuego. Disfruta de glamping exclusivo y guías certificados. ¡Reserva hoy con 7 Expeditions!"
    : "Book your Acatenango overnight tour and experience the Fuego Volcano hike. Enjoy exclusive glamping and certified guides. Reserve today with 7 Expeditions!";

  const altImage = isEs
    ? "Senderista en la cima del Volcán Acatenango con vista al Volcán de Fuego en Guatemala"
    : "Hiker on Acatenango Volcano summit with views of Fuego Volcano in Guatemala";

  const imageUrl = `${baseUrl}/gallery/Acatenango1.jpg`;

  return {
    title,
    description,
    keywords: isEs
      ? ["Tour Acatenango overnight", "Ascenso Volcán de Fuego", "Glamping Acatenango", "Tours volcanes Guatemala"]
      : ["Acatenango overnight tour", "Fuego volcano hike", "Acatenango glamping", "Guatemala trekking"],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "es-GT": `${baseUrl}/es`,
        "en-US": `${baseUrl}/en`,
        "x-default": `${baseUrl}/es`, // Recomendado por Google para idioma por defecto
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: "7 Expeditions Guatemala",
      locale: isEs ? "es_GT" : "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: altImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === "es";
  const currentLocale = (locale === "en" ? "en" : "es") as "es" | "en";

  // Schema JSON-LD enriquecido para Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": isEs
      ? "Tour Acatenango Overnight & Volcán de Fuego"
      : "Acatenango Overnight Tour & Fuego Volcano Hike",
    "description": isEs
      ? "Excursión guiada de senderismo al Volcán Acatenango con glamping y vistas a las erupciones del Volcán de Fuego."
      : "Guided overnight hiking tour to Acatenango Volcano with glamping and views of active Fuego Volcano eruptions.",
    "image": "https://www.7expeditionsguatemala.com/gallery/Acatenango1.jpg",
    "touristType": [
      "Hikers",
      "Adventure Travelers",
      "Outdoor Enthusiasts"
    ],
    "offers": {
      "@type": "Offer",
      "price": "99.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "7 Expeditions Guatemala",
      "url": `https://www.7expeditionsguatemala.com/${locale}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Tours />
      <Gallery />
      <InstagramScroll items={mockInstagramPosts} locale={currentLocale} />
      <WhyUs />
      <Calendar />
      <Reservation />
    </>
  );
}
