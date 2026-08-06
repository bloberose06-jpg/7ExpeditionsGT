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

    // 🌋 DESPLEGABLE REAL DE LOS 7 VOLCANES
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
        layout: 'dropdown', // Fuerza la vista de menú desplegable
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
    defineField({
      name: 'difficulty',
      title: 'Dificultad',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'highlights',
      title: 'Puntos Destacados',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de Imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})
