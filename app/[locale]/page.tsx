import { Metadata } from "next";
import Hero from "@/app/components/Hero";
import Tours from "@/app/components/Tours";
import Gallery from "@/app/components/Gallery";
import WhyUs from "@/app/components/WhyUs";
import Calendar from "@/app/components/Calendar";
import Reservation from "@/app/components/Reservation";

// 1. Configuración Dinámica de Metadatos centrada en Acatenango y Tours (ES / EN)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://www.7expeditionsguatemala.com";

  const isEs = locale === "es";

  // Título enfocado en Tours de Acatenango y Volcanes
  const title = isEs
    ? "Tours al Volcán Acatenango y Trekking en Guatemala — 7 Expeditions"
    : "Acatenango Volcano Tours & Trekking in Guatemala — 7 Expeditions";

  // Descripción enfocada en excursiones, caminatas e itinerarios
  const description = isEs
    ? "Vive la mejor aventura de trekking al Volcán Acatenango y Fuego. Tours guiados de 2 días y 1 noche, equipamiento incluido y guías expertos en Guatemala."
    : "Experience the ultimate Acatenango and Fuego volcano hiking adventure. Guided 2-day/1-night tours with full gear and expert local guides in Guatemala.";

  // Alt de la imagen optimizado para búsqueda de imágenes de Acatenango
  const altImage = isEs
    ? "Senderista en la cima del Volcán Acatenango con vista al Volcán de Fuego en Guatemala"
    : "Hiker on Acatenango Volcano summit with views of Fuego Volcano in Guatemala";

  const imageUrl = `${baseUrl}/gallery/Acatenango1.jpg`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "es-GT": `${baseUrl}/es`,
        "en-US": `${baseUrl}/en`,
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

// 2. Componente Principal del Home con Datos Estructurados para Tours
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === "es";

  // Schema JSON-LD enfocado en Tour de Senderismo / Viajes de Aventura
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": isEs
      ? "Tour y Trekking al Volcán Acatenango"
      : "Acatenango Volcano Hiking Tour",
    "description": isEs
      ? "Excursión guiada de senderismo al Volcán Acatenango con vistas a las erupciones del Volcán de Fuego."
      : "Guided hiking tour to Acatenango Volcano with active views of Fuego Volcano eruptions.",
    "image": "https://www.7expeditionsguatemala.com/gallery/Acatenango1.jpg",
    "touristType": [
      "Hikers",
      "Adventure Travelers",
      "Outdoor Enthusiasts"
    ],
    "offers": {
      "@type": "Offer",
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
      <WhyUs />
      <Calendar />
      <Reservation />
    </>
  );
}
