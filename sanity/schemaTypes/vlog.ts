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
            { type: 'block' }, // Permite párrafos, títulos, listas, etc.
            {
              type: 'image', // <-- Esto permite agregar imágenes entre párrafos
              options: { hotspot: true }, // Permite recortar/centrar la imagen en Sanity
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
    },
  },
})
