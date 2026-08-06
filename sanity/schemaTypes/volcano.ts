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
    // 🌋 SLUG COMO SELECCIÓN DESPLEGABLE CON LOS 7 VOLCANES
    defineField({
      name: 'slug',
      title: 'Seleccionar Volcán (Slug)',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Volcán Acatenango', value: 'acatenango' },
          { title: 'Volcán de Fuego', value: 'fuego' },
          { title: 'Volcán Tajumulco', value: 'tajumulco' },
          { title: 'Volcán Pacaya', value: 'pacaya' },
          { title: 'Volcán Atitlán', value: 'atitlan' },
          { title: 'Volcán Santa María', value: 'santa-maria' },
          { title: 'Volcán Agua', value: 'agua' },
        ],
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
