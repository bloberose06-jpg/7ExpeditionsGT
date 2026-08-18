
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'instagramPost',
  title: 'Instagram Post',
  type: 'document',
  // Estos documentos los crea/actualiza el cron de sincronización con la
  // Instagram Graph API. Se pueden editar a mano (por ejemplo para curar
  // el "caption" que se muestra) pero "igId" nunca debe tocarse.
  fields: [
    defineField({
      name: 'igId',
      title: 'ID del post en Instagram',
      type: 'string',
      description: 'ID devuelto por la Graph API. No editar. Se usa para evitar duplicados al sincronizar.',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'mediaType',
      title: 'Tipo de media',
      type: 'string',
      options: {
        list: [
          {title: 'Imagen', value: 'IMAGE'},
          {title: 'Video', value: 'VIDEO'},
          {title: 'Carrusel', value: 'CAROUSEL_ALBUM'},
        ],
      },
    }),
    defineField({
      name: 'mediaUrl',
      title: 'URL de la imagen/video',
      type: 'url',
      description: 'URL que devuelve la Graph API. OJO: estas URLs expiran, por eso conviene también subir la imagen a Sanity (ver "image" abajo) para tener una copia permanente.',
    }),
    defineField({
      name: 'image',
      title: 'Imagen (copia permanente)',
      type: 'image',
      description: 'Copia subida a Sanity para no depender de la URL temporal de Instagram. El cron debe descargarla y subirla aquí.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'permalink',
      title: 'Link al post original',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'captionRaw',
      title: 'Caption original (tal cual Instagram)',
      type: 'text',
      description: 'El caption completo tal como viene de Instagram, con hashtags y todo. Se guarda para referencia pero NO se muestra tal cual en el sitio.',
    }),
    defineField({
      name: 'captionEs',
      title: 'Caption curado (Español)',
      type: 'text',
      description: 'Versión corta y limpia del caption para mostrar en el sitio (sin spam de hashtags). Esto es lo que aporta texto real indexable por Google.',
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: 'captionEn',
      title: 'Caption curado (English)',
      type: 'text',
      description: 'Traducción curada del caption para la versión en inglés del sitio.',
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: 'altTextEs',
      title: 'Texto alternativo de la imagen (Español)',
      type: 'string',
      description: 'Alt text descriptivo para SEO/accesibilidad. Ej: "Grupo de excursionistas en la cumbre del volcán Acatenango al amanecer con el volcán de Fuego al fondo"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altTextEn',
      title: 'Texto alternativo de la imagen (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keywords',
      title: 'Palabras clave / hashtags relevantes',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'Hashtags o términos útiles extraídos del caption (ej: Acatenango, VolcanDeFuego, hiking Guatemala). Se usan para SEO, no se muestran necesariamente tal cual.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación en Instagram',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Destacar en el scroll principal',
      type: 'boolean',
      initialValue: true,
      description: 'Desmarca para ocultar un post del sitio sin borrarlo (por ejemplo si el caption no aplica o la foto no es relevante).',
    }),
  ],
  orderings: [
    {
      title: 'Más reciente primero',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'captionEs',
      subtitle: 'publishedAt',
      media: 'image',
    },
  },
})
