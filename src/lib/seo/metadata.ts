import type { Metadata } from 'next';
import { brandConfig } from '@/lib/brand.config';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/lib/i18n/config';

export interface PageMetadataOptions {
  locale: Locale;
  path?: string; // e.g. "" (home), "/collection", "/collection/totem-atelier-1", "/atelier", "/contact"
  title?: string;
  description?: string;
}

const OG_LOCALES: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  de: 'de_DE',
  ar: 'ar_AR',
};

/**
 * Generates strongly typed, locale-aware metadata with canonical and hreflang alternates.
 */
export function generatePageMetadata({
  locale,
  path = '',
  title,
  description,
}: PageMetadataOptions): Metadata {
  const normalizedPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const brandStrings = brandConfig.localized[locale] ?? brandConfig.localized[DEFAULT_LOCALE];

  const pageTitle = title ? `${title} | ${brandConfig.name}` : brandStrings.title;
  const pageDescription = description || brandStrings.description;

  const currentCanonical = `${brandConfig.url}/${locale}${normalizedPath}`;

  // Build language alternates (hreflang)
  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = `${brandConfig.url}/${loc}${normalizedPath}`;
  }
  languages['x-default'] = `${brandConfig.url}/${DEFAULT_LOCALE}${normalizedPath}`;

  return {
    metadataBase: new URL(brandConfig.url),
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: currentCanonical,
      languages,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: currentCanonical,
      siteName: brandConfig.name,
      locale: OG_LOCALES[locale] || 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
        { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/site.webmanifest',
  };
}
