import { defineField, defineType } from 'sanity'

export const tourType = defineType({
  name: 'tour',
  title: 'Expediciones',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre de la Expedición',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Amigable (Slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pdfPath',
      title: 'Catálogo o Información en PDF',
      type: 'string',
      description: 'Pega aquí la ruta del PDF (Ej: "/pdf/acatenango.pdf") o el link de descarga.',
    }),
    defineField({
      name: 'date',
      title: 'Fecha del Viaje',
      type: 'string',
      description: 'Ej: "15 - 16 Octubre" o "Todos los fines de semana"',
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'string',
      description: 'Ej: "Q 450.00"',
    }),
    defineField({
      name: 'duration',
      title: 'Duración',
      type: 'string',
      description: 'Ej: "2 Días / 1 Noche"',
    }),
    defineField({
      name: 'status',
      title: 'Estado del Tour',
      type: 'string',
      options: {
        list: [
          { title: 'Disponible', value: 'disponible' },
          { title: 'Últimos Cupos', value: 'ultimos-cupos' },
          { title: 'Agotado', value: 'agotado' },
        ],
      },
      initialValue: 'disponible',
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta',
      type: 'text',
      rows: 3,
    }),
  ],
})
