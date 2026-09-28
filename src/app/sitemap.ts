import type { MetadataRoute } from 'next';
import { brandConfig } from '@/lib/brand.config';
import { LOCALES } from '@/lib/i18n/config';
import { getAllArtworks } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const artworks = getAllArtworks();
  const entries: MetadataRoute.Sitemap = [];

  const staticRoutes = [
    '', // Home
    '/collection',
    '/atelier',
    '/contact',
  ];

  // Static section pages for each locale
  for (const route of staticRoutes) {
    for (const locale of LOCALES) {
      const languages: Record<string, string> = {};
      for (const loc of LOCALES) {
        languages[loc] = `${brandConfig.url}/${loc}${route}`;
      }

      entries.push({
        url: `${brandConfig.url}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages,
        },
      });
    }
  }

  // Dynamic artwork pages for each locale
  for (const artwork of artworks) {
    const route = `/collection/${artwork.slug}`;
    for (const locale of LOCALES) {
      const languages: Record<string, string> = {};
      for (const loc of LOCALES) {
        languages[loc] = `${brandConfig.url}/${loc}${route}`;
      }

      entries.push({
        url: `${brandConfig.url}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
