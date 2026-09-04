import type { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';
import Reservation from '../../components/Reservation'; // Adjust path if components is at app/components or similar

export const metadata: Metadata = {
  title: 'Acatenango & Fuego Volcano Hiking Tour | 7 Expeditions Guatemala',
  description:
    'Book the best Acatenango Volcano Glamping Hike in Guatemala. Enjoy direct views of erupting Fuego Volcano, private trail access, 4 meals, and 1:4 guide ratios.',
  keywords: [
    'Acatenango Volcano Tour',
    'Acatenango Glamping',
    'Fuego Volcano Hike',
    'Acatenango Trekking Antigua Guatemala',
    '7 Expeditions Guatemala',
    'Acatenango private trail tour',
  ],
  alternates: {
    canonical: 'https://www.7expeditionsguatemala.com/en/acatenango-volcano-tour',
  },
  openGraph: {
    title: 'Acatenango & Fuego Volcano Glamping Tour | 7 Expeditions Guatemala',
    description:
      'Hike Acatenango Volcano with luxury glamping, 1:4 guide ratios, private trail, and direct views of active Fuego eruptions.',
    url: 'https://www.7expeditionsguatemala.com/en/acatenango-volcano-tour',
    siteName: '7 Expeditions Guatemala',
    locale: 'en_US',
    type: 'website',
  },
};

export default function AcatenangoSeoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: 'Acatenango & Fuego Volcano Glamping Trek',
    description:
      'A 2-day overnight glamping hike up Acatenango Volcano offering direct views of the erupting Fuego Volcano.',
    provider: {
      '@type': 'TravelAgency',
      name: '7 Expeditions Guatemala',
      url: 'https://www.7expeditionsguatemala.com',
      telephone: '+50236181268',
    },
    offers: {
      '@type': 'Offer',
      price: '175',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://www.7expeditionsguatemala.com/en/acatenango-volcano-tour',
    },
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: 2,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Day 1: Hike via Private Trail to Base Camp & Optional Fuego Hike',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Day 2: Acatenango Sunrise Summit Hike & Return to Antigua',
        },
      ],
    },
    touristType: ['Hikers', 'Adventure Travelers'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-white text-gray-900 leading-relaxed">
        {/* Hero Section */}
        <header className="relative bg-slate-900 text-white py-24 px-6 text-center overflow-hidden">
          <Image
            src="/gallery/Volcan-Acatenango.jpg"
            alt="Volcán Acatenango Guatemala"
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="relative max-w-4xl mx-auto z-10">
            <span className="text-orange-400 font-bold uppercase tracking-widest text-sm">
              Official Tour Operator • 7 Expeditions Guatemala
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-3 mb-6 tracking-tight">
              Acatenango & Fuego Volcano Glamping Hike
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Experience the active Fuego Volcano from our private glamping base camp at 3,600m altitude with full comfort, small groups, and expert guides.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#reservar"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
              >
                Book Tour – $175 USD / Q1,350 GTQ
              </a>
            </div>
          </div>
        </header>

        {/* Quick Highlights */}
        <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-slate-50 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-500 uppercase">Base Elevation</h2>
            <p className="text-2xl font-bold text-slate-900 mt-1">3,600m / 11,811ft</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-500 uppercase">Hike Time</h2>
            <p className="text-2xl font-bold text-slate-900 mt-1">5 Hours (Private Trail)</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-500 uppercase">Guide Ratio</h2>
            <p className="text-2xl font-bold text-slate-900 mt-1">1 Guide per 4 Hikers</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-500 uppercase">Accommodation</h2>
            <p className="text-2xl font-bold text-slate-900 mt-1">Private Eco Glamping</p>
          </div>
        </section>

        {/* SEO Article Body & Features */}
        <section className="max-w-4xl mx-auto px-6 py-8 space-y-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Hike Acatenango with 7 Expeditions Guatemala?
            </h2>
            <p className="text-gray-700 text-lg">
              Hiking Acatenango Volcano is one of the top outdoor adventures in Central America. Standing at 3,976 meters above sea level, Acatenango provides direct, unobstructed views of neighboring Fuego Volcano, which registers more than 52 eruptions daily.
            </p>
            <p className="text-gray-700 text-lg mt-3">
              Unlike standard tours, 7 Expeditions offers access to a <strong>private trail</strong> that reduces total hiking time by one hour while bypassing crowded public routes.
            </p>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="relative h-64 rounded-xl overflow-hidden shadow-md">
              <Image
                src="/gallery/tiendas de acampar acatenango.jpg"
                alt="Tiendas de acampar en Volcán Acatenango"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-md">
              <Image
                src="/gallery/desayuno en volcan acatenango.jpg"
                alt="Desayuno en Volcán Acatenango"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-md">
              <Image
                src="/gallery/tour volcan acatenango.jpeg"
                alt="Tour en el Volcán Acatenango"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-md">
              <Image
                src="/gallery/tours-familiares-voclan-acatenango.jpg"
                alt="Tours familiares en el Volcán Acatenango"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition duration-300"
              />
            </div>
          </div>

          {/* Included Features */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What Is Included in the Tour Package</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <li className="flex items-center gap-2">✓ Round-trip shuttle from Antigua Central Park</li>
              <li className="flex items-center gap-2">✓ Private glamping setup + feather sleeping bags</li>
              <li className="flex items-center gap-2">✓ 4 Full meals (Breakfast, Lunch, Dinner, Breakfast)</li>
              <li className="flex items-center gap-2">✓ Unlimited coffee, tea, and hot chocolate</li>
              <li className="flex items-center gap-2">✓ Volcano national park entry fees</li>
              <li className="flex items-center gap-2">✓ Headlamps, thermal beanie, gloves, and buff</li>
              <li className="flex items-center gap-2">✓ Acatenango sunrise summit trek</li>
              <li className="flex items-center gap-2">✓ Certified guide team & paramedic service</li>
            </ul>
          </div>

          {/* 2-Day Itinerary */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">2-Day Tour Itinerary</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-xl font-semibold text-slate-900">Day 1: Ascent to Glamping Base Camp</h3>
                <p className="text-gray-600 text-sm mt-1">
                  <strong>06:15 AM:</strong> Meet at Central Park in Antigua Guatemala for pickup.<br />
                  <strong>08:45 AM:</strong> Start the ascent from La Soledad using our private trail.<br />
                  <strong>03:00 PM:</strong> Reach the 3,600m Glamping Base Camp overlooking Fuego Volcano.<br />
                  <strong>04:30 PM:</strong> Optional extra hike to Fuego Volcano crater ridge ($35 USD).<br />
                  <strong>09:00 PM:</strong> Warm dinner served at camp under the stars.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-xl font-semibold text-slate-900">Day 2: Sunrise Summit & Descent</h3>
                <p className="text-gray-600 text-sm mt-1">
                  <strong>04:00 AM:</strong> Early morning summit hike to Acatenango peak (3,976m) for sunrise.<br />
                  <strong>06:30 AM:</strong> Return to base camp for fresh pancakes and hot coffee.<br />
                  <strong>08:00 AM:</strong> Start descent down the mountain.<br />
                  <strong>01:00 PM:</strong> Arrival back in Antigua Guatemala.
                </p>
              </div>
            </div>
          </div>

          {/* Optional Add-ons & Equipment */}
          <div className="bg-slate-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Optional Add-Ons & Rentals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p><strong>Fuego Summit Hike:</strong> +$35 USD / Q250 GTQ</p>
                <p><strong>Backpack Porter Service:</strong> +$50 USD / Q350 GTQ</p>
              </div>
              <div>
                <p><strong>Trekking Poles Rental:</strong> +$10 USD / Q75 GTQ</p>
                <p><strong>35L Backpack / Jacket Rental:</strong> +$10 USD / Q75 GTQ each</p>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Reservation Section */}
        <Reservation />
      </article>
    </>
  );
}
