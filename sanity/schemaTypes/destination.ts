import { defineField, defineType } from 'sanity'

export const destination = defineType({
  name: 'destination',
  title: 'Destinos y Volcanes',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
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
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Volcán', value: 'volcano' },
          { title: 'Lago', value: 'lake' },
          { title: 'Aventura / Tours', value: 'adventure' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
