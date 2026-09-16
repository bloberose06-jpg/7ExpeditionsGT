'use client';

import Script from 'next/script';

export default function TripAdvisorWidget() {
  return (
    <section className="py-16 bg-black text-white border-t border-zinc-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-widest text-orange-500">
          Opiniones de nuestros viajeros
        </h2>

        {/* Contenedor del widget de SociableKIT */}
        <div 
          className="sk-ww-tripadvisor-reviews min-h-[200px]" 
          data-embed-id="25714443"
        ></div>

        {/* Carga optimizada del script oficial de SociableKIT */}
        <Script
          src="https://widgets.sociablekit.com/tripadvisor-reviews/widget.js"
          strategy="lazyOnload"
        />
      </div>
    </section>
  );
}
