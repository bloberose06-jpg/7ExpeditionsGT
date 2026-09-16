'use client';

import { useEffect } from 'react';

export default function TripAdvisorWidget() {
  useEffect(() => {
    // Evita duplicar el script en el DOM
    const scriptId = 'trustindex-loader-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.trustindex.io/loader.js?2e3d5b781f6a550d7986e17d845';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-16 bg-black text-white border-t border-zinc-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-widest text-orange-500">
          Opiniones de nuestros viajeros
        </h2>

        {/* Contenedor oficial para la inserción de Trustindex */}
        <div 
          className="ti-widget text-center min-h-[150px]" 
          data-widget-id="2e3d5b781f6a550d7986e17d845"
        ></div>
      </div>
    </section>
  );
}
