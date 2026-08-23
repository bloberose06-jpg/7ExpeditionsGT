import { MetadataRoute } from 'next';
import { client } from '@/sanity/client';

interface SanitySlugItem {
  slug: string;
  _updatedAt?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Corrección del dominio base con www
  const baseUrl = 'https://www.7expeditionsguatemala.com';
  const locales = ['es', 'en'];

  // Función helper para construir URLs relacionales (hreflang) en el sitemap
  const getAlternates = (path: string) => ({
    languages: {
      es: `${baseUrl}/es${path}`,
      en: `${baseUrl}/en${path}`,
      'x-default': `${baseUrl}/es${path}`,
    },
  });

  // 2. Rutas estáticas principales
  const staticRoutes: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: getAlternates(''),
  }));

  // 3. Rutas estáticas del índice de vlogs
  const vlogsIndexRoutes: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/vlogs`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
    alternates: getAlternates('/vlogs'),
  }));

  // 4. Consultas a Sanity
  const tourQuery = `*[_type == "tour" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;
  const vlogQuery = `*[_type == "vlog" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;

  let tours: SanitySlugItem[] = [];
  let vlogs: SanitySlugItem[] = [];

  try {
    const [toursData, vlogsData] = await Promise.all([
      client.fetch(tourQuery),
      client.fetch(vlogQuery),
    ]);
    tours = toursData || [];
    vlogs = vlogsData || [];
  } catch (error) {
    console.error('Error fetching data from Sanity for sitemap:', error);
  }

  // 5. Rutas dinámicas de Volcanes / Tours
  const volcanoRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    tours.map((tour) => ({
      url: `${baseUrl}/${locale}/volcanoes/${tour.slug}`,
      lastModified: tour._updatedAt ? new Date(tour._updatedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: getAlternates(`/volcanoes/${tour.slug}`),
    }))
  );

  // 6. Rutas dinámicas de Vlogs
  const vlogRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    vlogs.map((vlog) => ({
      url: `${baseUrl}/${locale}/vlogs/${vlog.slug}`,
      lastModified: vlog._updatedAt ? new Date(vlog._updatedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: getAlternates(`/vlogs/${vlog.slug}`),
    }))
  );

  return [
    ...staticRoutes,
    ...volcanoRoutes,
    ...vlogsIndexRoutes,
    ...vlogRoutes,
  ];
}
