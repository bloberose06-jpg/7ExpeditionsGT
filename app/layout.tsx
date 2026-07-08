import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "7 Expeditions GT · Expediciones a los volcanes de Guatemala",
  description:
    "Ascensos guiados a Acatenango, Pacaya, Fuego, Agua, Atitlán y Tajumulco. Guías certificados, grupos pequeños, equipo incluido. Reserva tu expedición al fuego de Guatemala.",
  keywords: [
    "volcanes Guatemala",
    "Acatenango tour",
    "Pacaya tour",
    "expediciones volcanes",
    "turismo Guatemala",
    "hiking Guatemala",
    "glamping acatenango",
    "guia de turistas guatemala"
  ],
  authors: [{ name: "7 Expeditions GT" }],
  creator: "7 Expeditions GT",
  
  // 🚀 ESTO AGREGA EL FORMATO VISUAL PARA REDES SOCIALES Y WHATSAPP
  openGraph: {
    title: "7 Expeditions GT · Expediciones a los volcanes de Guatemala",
    description: "Ascensos guiados a Acatenango, Pacaya, Fuego y más. Guías certificados y equipo incluido. ¡Reserva tu cupo!",
    url: "https://www.7expeditionsgt.com", // ⚠️ Cambia por tu dominio real definitivo
    siteName: "7 Expeditions GT",
    locale: "es_GT",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // ⚠️ Sube una foto horizontal atractiva (1200x630px) a tu carpeta 'public' con este nombre
        width: 1200,
        height: 630,
        alt: "Expediciones a los volcanes de Guatemala con 7 Expeditions GT",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800;900&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--basalt)]">{children}</body>
    </html>
  );
}
