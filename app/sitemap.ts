import { MetadataRoute } from 'next';
import { client } from '@/sanity/client';

interface TourSlug {
  slug: {
    current: string;
  };
  _updatedAt?: string;
}

interface VlogSlug {
  slug: string;
  _updatedAt?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://7expeditionsguatemala.com';
  const locales = ['es', 'en'];

  // 1. Rutas estáticas principales (Inicio en español e inglés)
  const staticRoutes: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  }));

  // 2. Consulta a Sanity para obtener todos los slugs de los tours/volcanes
  const tourQuery = `*[_type == "tour" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;

  let tours: TourSlug[] = [];
  try {
    tours = await client.fetch(tourQuery);
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

  // 4. Rutas estáticas del listado de vlogs (/vlogs)
  const vlogsIndexRoutes: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/vlogs`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 5. Consulta a Sanity para obtener todos los slugs de los vlogs
  const vlogQuery = `*[_type == "vlog" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;

  let vlogs: VlogSlug[] = [];
  try {
    vlogs = await client.fetch(vlogQuery);
  } catch (error) {
    console.error('Error fetching vlogs from Sanity for sitemap:', error);
  }

  // 6. Generar rutas dinámicas para cada vlog en español e inglés
  const vlogRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    vlogs.map((vlog) => ({
      url: `${baseUrl}/${locale}/vlogs/${vlog.slug}`,
      lastModified: vlog._updatedAt ? new Date(vlog._updatedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...volcanoRoutes, ...vlogsIndexRoutes, ...vlogRoutes];
}
