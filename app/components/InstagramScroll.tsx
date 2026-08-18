'use client'

import {useRef} from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Forma de dato que va a venir de Sanity (ver sanity/schemaTypes/instagramPost.ts).
// Mientras conectas Sanity, este mismo tipo sirve para los datos de ejemplo.
export type InstagramScrollItem = {
  igId: string
  imageUrl: string
  permalink: string
  caption: string // ya viene en el idioma correcto (captionEs o captionEn)
  altText: string // ya viene en el idioma correcto (altTextEs o altTextEn)
  publishedAt: string
}

type InstagramScrollProps = {
  items: InstagramScrollItem[]
  locale: 'es' | 'en'
  igHandle?: string
}

// Copys del componente en los dos idiomas. Si ya usas next-intl para todo
// lo demás, lo ideal es mover esto a tus archivos messages/en.json y
// messages/es.json y reemplazar por t('instagram.title'), etc.
const copy = {
  es: {
    eyebrow: 'Desde nuestro Instagram',
    follow: 'Seguir',
    viewPost: 'Ver publicación',
  },
  en: {
    eyebrow: 'From our Instagram',
    follow: 'Follow',
    viewPost: 'View post',
  },
} as const

export default function InstagramScroll({items, locale, igHandle = '7expeditionsgt'}: InstagramScrollProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const t = copy[locale]

  if (!items?.length) return null

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({left: dir * 320, behavior: 'smooth'})
  }

  return (
    <section aria-labelledby="instagram-scroll-heading" className="py-12">
      <div className="flex items-end justify-between mb-4 px-4 md:px-0">
        <div>
          <h2 id="instagram-scroll-heading" className="text-xl md:text-2xl font-semibold">
            {t.eyebrow}
          </h2>
          <Link
            href={`https://instagram.com/${igHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            @{igHandle}
          </Link>
        </div>

        {/* Controles de navegación: útiles en desktop, en mobile el scroll táctil ya funciona */}
        <div className="hidden md:flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label={locale === 'es' ? 'Anterior' : 'Previous'}
            className="w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label={locale === 'es' ? 'Siguiente' : 'Next'}
            className="w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 md:px-0 pb-2 scrollbar-hide"
      >
        {items.map((post) => (
          <article
            key={post.igId}
            className="group flex-none w-[220px] md:w-[260px] snap-start rounded-xl overflow-hidden border border-neutral-200 bg-white"
          >
            <Link href={post.permalink} target="_blank" rel="noopener noreferrer">
              <div className="relative w-full aspect-square">
                <Image
                  src={post.imageUrl}
                  alt={post.altText}
                  fill
                  sizes="(max-width: 768px) 220px, 260px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            {/*
              Este texto es lo que realmente aporta al SEO: es HTML real
              renderizado en el servidor (si esta sección se pinta en un
              Server Component o con ISR), no contenido dentro de un
              iframe/widget que Google no puede leer.
            */}
            <div className="p-3">
              <p className="text-sm text-neutral-700 line-clamp-3 leading-snug">{post.caption}</p>
              <Link
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-xs font-medium text-neutral-500 hover:text-neutral-800 transition-colors"
              >
                {t.viewPost} ↗
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// DATOS DE EJEMPLO — bórralos cuando conectes el fetch real a Sanity.
// Úsalos así en una página para ver el componente funcionando:
//
//   import InstagramScroll, { mockInstagramPosts } from '@/components/InstagramScroll'
//   <InstagramScroll items={mockInstagramPosts} locale="es" />
// ---------------------------------------------------------------------------
export const mockInstagramPosts: InstagramScrollItem[] = [
  {
    igId: 'mock-1',
    imageUrl: '/gallery/acatenango-amanecer.jpg',
    permalink: 'https://instagram.com/p/mock1',
    caption: 'Sobre las nubes, el volcán de Fuego hace su show justo al amanecer.',
    altText: 'Grupo de excursionistas viendo el amanecer desde la cumbre del volcán Acatenango con el volcán de Fuego al fondo',
    publishedAt: '2026-08-10T06:00:00Z',
  },
  {
    igId: 'mock-2',
    imageUrl: '/gallery/acatenango-cumbre.jpg',
    permalink: 'https://instagram.com/p/mock2',
    caption: 'Llegamos a la cumbre de Acatenango (3,976 m) justo a tiempo para el atardecer.',
    altText: 'Excursionistas en la cumbre del volcán Acatenango al atardecer',
    publishedAt: '2026-08-05T17:30:00Z',
  },
  {
    igId: 'mock-3',
    imageUrl: '/gallery/pacaya-lava.jpg',
    permalink: 'https://instagram.com/p/mock3',
    caption: 'Tour de un día al volcán Pacaya: lava fresca y malvaviscos asados sobre el calor de la tierra.',
    altText: 'Turistas asando malvaviscos sobre roca volcánica caliente en el volcán Pacaya',
    publishedAt: '2026-08-01T14:00:00Z',
  },
]
