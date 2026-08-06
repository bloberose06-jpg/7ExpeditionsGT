// sanity/schemas/volcano.ts (o dentro de tu estructura de Sanity Studio)
import { defineType, defineField } from 'sanity';

export const volcano = defineType({
  name: 'volcano',
  title: 'Volcanes',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Volcán',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'elevation',
      title: 'Altitud (metros)',
      type: 'number',
    }),
    defineField({
      name: 'difficulty',
      title: 'Dificultad',
      type: 'string',
      options: {
        list: ['Fácil', 'Moderada', 'Alta', 'Extrema'],
      },
    }),
    defineField({
      name: 'description',
      title: 'Descripción breve',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de Imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'details',
      title: 'Detalles / Itinerario (Rich Text)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});
