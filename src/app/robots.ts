import type { MetadataRoute } from 'next';
import { brandConfig } from '@/lib/brand.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${brandConfig.url}/sitemap.xml`,
  };
}
