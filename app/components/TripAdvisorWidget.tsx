'use client';

import Script from 'next/script';

export default function Reviews() {
  return (
    <section className="py-12 bg-zinc-950 text-white min-h-[250px]">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-wide">
          Opiniones de nuestros viajeros
        </h2>

        {/* Carga del script oficial de Trustindex */}
        <Script 
          src="https://cdn.trustindex.io/loader.js?2e3d5b781f6a550d7986e17d845" 
          strategy="lazyOnload" 
        />
      </div>
    </section>
  );
}
