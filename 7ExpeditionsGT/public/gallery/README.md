# Carpeta de fotos de la galería

Poné aquí tus fotos reales de las expediciones (formato .jpg o .webp,
recomendado 1600px de ancho máximo para que cargue rápido).

Luego, en `app/components/Gallery.tsx`, reemplazá cada tile del arreglo
`shots` por una imagen real, por ejemplo:

```tsx
<Image src="/gallery/acatenango-amanecer.jpg" alt="Amanecer sobre el Fuego" fill className="object-cover" />
```

(Importá `Image` desde `next/image` al inicio del archivo.)
