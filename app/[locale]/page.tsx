import { Metadata } from "next";
import Hero from "@/app/components/Hero";
import Tours from "@/app/components/Tours";
import Gallery from "@/app/components/Gallery";
import WhyUs from "@/app/components/WhyUs";
import Calendar from "@/app/components/Calendar";
import Reservation from "@/app/components/Reservation";

// 1. Configuración de Metadatos y Tarjeta Open Graph para el Home
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://www.7expeditionsguatemala.com";

  const title = "7 Expeditions Guatemala — Expediciones y Trekking de Volcanes";
  const description =
    "Descubre los volcanes más impresionantes de Guatemala con guías expertos. Tours, trekking y aventuras inolvidables.";

  // Usamos una de las imágenes de tu carpeta public/gallery (ej. Acatenango1.jpg)
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
      locale: locale === "es" ? "es_GT" : "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "7 Expeditions Guatemala",
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

// 2. Componente Principal del Home
export default function Home() {
  return (
    <>
      <Hero />
      <Tours />
      <Gallery />
      <WhyUs />
      <Calendar />
      <Reservation />
    </>
  );
}
