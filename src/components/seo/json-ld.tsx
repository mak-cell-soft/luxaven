import React from 'react';
import { brandConfig } from '@/lib/brand.config';
import type { Locale } from '@/lib/i18n/config';

interface OrganizationJsonLdProps {
  locale: Locale;
}

export function OrganizationJsonLd({ locale }: OrganizationJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brandConfig.name,
    url: `${brandConfig.url}/${locale}`,
    logo: `${brandConfig.url}/images/brand/logo.png`,
    email: brandConfig.contactEmail,
    address: {
      '@type': 'PostalAddress',
      streetAddress: brandConfig.atelier.address,
      addressLocality: brandConfig.atelier.city,
      addressCountry: brandConfig.atelier.country,
    },
    description: brandConfig.localized[locale]?.description ?? brandConfig.description,
    slogan: brandConfig.tagline[locale] ?? brandConfig.localized[locale]?.tagline,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArtworkJsonLdProps {
  name: string;
  description: string;
  image?: string;
  material?: string;
  creator?: string;
  url: string;
}

/**
 * CreativeWork schema for art objects / sculptures without commercial e-commerce pricing.
 */
export function ArtworkJsonLd({
  name,
  description,
  image,
  material,
  creator = brandConfig.name,
  url,
}: ArtworkJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name,
    description,
    image,
    artform: 'Sculpture',
    artMedium: material,
    creator: {
      '@type': 'Organization',
      name: creator,
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
