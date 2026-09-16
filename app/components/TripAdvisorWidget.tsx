'use client';

import Script from 'next/script';

export default function TripAdvisorWidget() {
  return (
    <section className="py-12 bg-black text-white border-t border-zinc-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div 
          className="sk-ww-tripadvisor-reviews" 
          data-embed-id="25714443"
        ></div>

        <Script 
          src="https://widgets.sociablekit.com/tripadvisor-reviews/widget.js" 
          strategy="lazyOnload"
        />
      </div>
    </section>
  );
}
