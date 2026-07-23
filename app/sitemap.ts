import { MetadataRoute } from 'next';
import { client } from '@/sanity/client'; // Importa tu cliente de Sanity

// Definimos la interfaz básica del Tour/Volcán que viene de Sanity
interface TourSlug {
  slug: {
    current: string;
  };
  _updatedAt?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://7-expeditions-gt.vercel.app';
  const locales = ['es', 'en'];

  // 1. Rutas estáticas principales (Inicio en español e inglés)
  const staticRoutes: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  }));

  // 2. Consulta a Sanity para obtener todos los slugs de los tours/volcanes
  // NOTA: Si en Sanity tu schemaType no se llama 'tour', cambia 'tour' por el nombre correcto (ej. 'volcano')
  const query = `*[_type == "tour" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;
  
  let tours: TourSlug[] = [];
  try {
    tours = await client.fetch(query);
  } catch (error) {
    console.error('Error fetching tours from Sanity for sitemap:', error);
  }

  // 3. Generar rutas dinámicas para cada volcán/tour en español e inglés
  const volcanoRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    tours.map((tour) => ({
      url: `${baseUrl}/${locale}/volcanoes/${tour.slug}`,
      lastModified: tour._updatedAt ? new Date(tour._updatedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  );

  return [...staticRoutes, ...volcanoRoutes];
}
