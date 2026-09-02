import { defineField, defineType } from 'sanity'

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
      title: 'Seleccionar Volcán (Slug para la URL)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Volcán Acatenango (acatenango)', value: 'acatenango' },
          { title: 'Volcán de Fuego (fuego)', value: 'fuego' },
          { title: 'Volcán Tajumulco (tajumulco)', value: 'tajumulco' },
          { title: 'Volcán Pacaya (pacaya)', value: 'pacaya' },
          { title: 'Volcán Atitlán (atitlan)', value: 'atitlan' },
          { title: 'Volcán Santa María (santa-maria)', value: 'santa-maria' },
          { title: 'Volcán Agua (agua)', value: 'agua' },
        ],
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'elevation',
      title: 'Altitud (metros)',
      type: 'number',
    }),

    // 🌐 DIFICULTAD TRADUCIBLE (Objeto con ES / EN)
    defineField({
      name: 'difficulty',
      title: 'Dificultad',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'en', title: 'Inglés', type: 'string' },
      ],
    }),

    // 🌐 DESCRIPCIÓN TRADUCIBLE (Objeto con ES / EN)
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'text' },
        { name: 'en', title: 'Inglés', type: 'text' },
      ],
    }),

    // 🌐 PUNTOS DESTACADOS TRADUCIBLES
    defineField({
      name: 'highlights',
      title: 'Puntos Destacados',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'array', of: [{ type: 'string' }] },
        { name: 'en', title: 'Inglés', type: 'array', of: [{ type: 'string' }] },
      ],
    }),

    defineField({
      name: 'gallery',
      title: 'Galería de Imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})
