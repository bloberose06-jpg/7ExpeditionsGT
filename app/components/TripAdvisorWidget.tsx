'use client';

import Script from 'next/script';

export default function TripAdvisorWidget() {
  return (
    <section className="py-16 bg-black text-white border-t border-zinc-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-widest text-orange-500">
          Opiniones de nuestros viajeros
        </h2>

        {/* Estructura oficial del iframe/widget de Trustindex */}
        <div 
          className="ti-widget min-h-[180px] flex justify-center items-center" 
          data-widget-id="2e3d5b781f6a550d7986e17d845"
        >
          <a 
            href="https://www.trustindex.io" 
            target="_blank" 
            rel="noreferrer" 
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            Cargando evaluaciones de TripAdvisor...
          </a>
        </div>

        {/* Script cargado inmediatamente después de que la página sea interactiva */}
        <Script 
          src="https://cdn.trustindex.io/loader.js?2e3d5b781f6a550d7986e17d845" 
          strategy="afterInteractive" 
        />
      </div>
    </section>
  );
}
