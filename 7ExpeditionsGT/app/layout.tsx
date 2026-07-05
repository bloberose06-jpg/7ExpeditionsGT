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
  ],
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
