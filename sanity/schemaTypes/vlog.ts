import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'vlog',
  title: 'Vlog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'es', title: 'Spanish', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // 📍 UBICACIÓN: Permite elegir entre un Volcán o un Destino (Lago Atitlán, etc.)
    defineField({
      name: 'location',
      title: 'Ubicación / Relación (Location / Related)',
      type: 'reference',
      to: [
        { type: 'volcano' },      // Referencia a tu esquema de volcanes
        { type: 'destination' }  // Referencia a tu nuevo esquema de destinos
      ],
      description: 'Selecciona el volcán o destino asociado a este Vlog',
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alternative Text' },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        {
          name: 'es',
          title: 'Spanish',
          type: 'array',
          of: [
            { type: 'block' },
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text (Alt)',
                  description: 'Importante para SEO y accesibilidad',
                },
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Leyenda / Pie de foto',
                },
              ],
            },
          ],
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [
            { type: 'block' },
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                { name: 'alt', type: 'string', title: 'Alternative Text' },
                { name: 'caption', type: 'string', title: 'Caption' },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'coverImage',
      locationName: 'location.name', // Lee el nombre sea volcán o destino
    },
    prepare({ title, media, locationName }) {
      return {
        title: title || 'Sin Título',
        media,
        subtitle: locationName ? `📍 ${locationName}` : 'Sin ubicación',
      }
    },
  },
})
