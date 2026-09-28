/**
 * Brand Configuration — LUXAVÉN
 *
 * Single source of truth for all public-facing brand identity,
 * technical identifiers, contact points, and localized defaults.
 *
 * NOTE: Brand values must be imported from this file rather than
 * hardcoded in UI components, routes, or metadata.
 */

import type { Locale } from '@/lib/i18n/config';

export interface BrandLocaleStrings {
  title: string;
  tagline: string;
  description: string;
  craftStatement?: string;
}

export interface BrandConfig {
  /** Public display name with exact diacritics preserved */
  readonly name: string;
  /** Technical identifier / URL-safe slug */
  readonly slug: string;
  readonly technicalName: string;
  /** Primary web domain */
  readonly domain: string;
  /** Canonical base URL */
  readonly url: string;
  /** Primary contact and inquiry email */
  readonly contactEmail: string;
  /** Primary brand slogan across supported languages */
  readonly tagline: Record<Locale, string>;
  /** Secondary atelier / craftsmanship statement */
  readonly craftStatement: {
    readonly ar: string;
  };
  /** Default fallback description */
  readonly description: string;
  /** Atelier physical presence details */
  readonly atelier: {
    readonly name: string;
    readonly address: string;
    readonly city: string;
    readonly country: string;
  };
  /** Supported and default locales */
  readonly i18n: {
    readonly defaultLocale: 'fr';
    readonly supportedLocales: readonly ['fr', 'en', 'de', 'ar'];
  };
  /** Social media and press placeholders (to be populated once official channels are established) */
  readonly social: {
    readonly instagram: string;
    readonly pinterest: string;
    readonly linkedin: string;
  };
  /** Metadata presets per locale */
  readonly localized: Record<Locale, BrandLocaleStrings>;
}

export const brandConfig: BrandConfig = {
  name: "LUXAVÉN",
  slug: "luxaven",
  technicalName: "luxaven",
  domain: "luxaven.art",
  url: "https://luxaven.art",
  contactEmail: "contact@luxaven.art",

  // Primary brand slogan (Where Material Becomes Form)
  tagline: {
    en: "Where Material Becomes Form.",
    fr: "Quand la matière devient forme.",
    de: "Wo Materie zur Form wird.",
    ar: "حيث تتحول المادة إلى شكل",
  },

  // Secondary atelier / craftsmanship statement (Arabic care dimension)
  craftStatement: {
    ar: "أشياء صُنعت بعناية",
  },

  description:
    "LUXAVÉN conçoit des objets décoratifs rares et faits main — totems sculpturaux, récipients tournés et mobilier architectural — pour des intérieurs qui valorisent la beauté et la permanence.",

  atelier: {
    name: "Marta Atelier",
    address: "Marta Atelier, 42",
    city: "Genève",
    country: "Suisse",
  },

  i18n: {
    defaultLocale: "fr",
    supportedLocales: ["fr", "en", "de", "ar"] as const,
  },

  social: {
    instagram: "",
    pinterest: "",
    linkedin: "",
  },

  localized: {
    fr: {
      title: "LUXAVÉN — Quand la matière devient forme.",
      tagline: "Quand la matière devient forme.",
      description:
        "LUXAVÉN conçoit des objets décoratifs rares et faits main — totems sculpturaux, récipients tournés et mobilier architectural — pour des intérieurs qui valorisent la beauté et la permanence.",
    },
    en: {
      title: "LUXAVÉN — Where Material Becomes Form.",
      tagline: "Where Material Becomes Form.",
      description:
        "LUXAVÉN creates rare, handcrafted decorative objects — sculptural totems, turned vessels, and architectural furniture — for interiors that celebrate beauty and permanence.",
    },
    de: {
      title: "LUXAVÉN — Wo Materie zur Form wird.",
      tagline: "Wo Materie zur Form wird.",
      description:
        "LUXAVÉN erschafft seltene, handgefertigte Dekorations- und Kunstobjekte — skulpturale Totems, gedrechselte Gefäße und architektonische Möbel für erlesene Wohnräume.",
    },
    ar: {
      title: "LUXAVÉN — حيث تتحول المادة إلى شكل",
      tagline: "حيث تتحول المادة إلى شكل",
      craftStatement: "أشياء صُنعت بعناية",
      description:
        "تبتكر لوكْسافين قطعاً فنية وتحفاً ديكورية نادرة مصنوعة يدوياً — مجسمات نحتية، أوانٍ خشبية مخروطة، وأثاث معماري للمساحات الراقية.",
    },
  },
} as const;

export function getBrandTagline(locale: Locale): string {
  return brandConfig.tagline[locale] ?? brandConfig.tagline.fr;
}

export default brandConfig;
