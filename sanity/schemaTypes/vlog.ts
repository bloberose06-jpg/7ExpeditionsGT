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
            }
          ]
        }
      ]
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
            { name: 'caption', type: 'string', title: 'Caption' }
          ]
        }
      ]
    }
  ],
})
