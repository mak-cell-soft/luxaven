/**
 * Brand Configuration — LUXAVÉN
 *
 * Single source of truth for all public-facing brand identity,
 * technical identifiers, contact points, and localized defaults.
 *
 * NOTE: Brand values must be imported from this file rather than
 * hardcoded in UI components, routes, or metadata.
 */

export interface BrandLocaleStrings {
  title: string;
  tagline: string;
  description: string;
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
  /** Default fallback tagline */
  readonly tagline: string;
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
  readonly localized: Record<'fr' | 'en' | 'de' | 'ar', BrandLocaleStrings>;
}

export const brandConfig: BrandConfig = {
  name: "LUXAVÉN",
  slug: "luxaven",
  technicalName: "luxaven",
  domain: "luxaven.art",
  url: "https://luxaven.art",
  contactEmail: "contact@luxaven.art",

  // Baseline brand descriptor (preserves current verified site descriptor)
  tagline: "Sculptures et Mobilier d'Art en Bois",
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
      title: "LUXAVÉN — Sculptures et Mobilier d'Art en Bois",
      tagline: "Sculptures et Mobilier d'Art en Bois",
      description:
        "LUXAVÉN conçoit des objets décoratifs rares et faits main — totems sculpturaux, récipients tournés et mobilier architectural — pour des intérieurs qui valorisent la beauté et la permanence.",
    },
    en: {
      title: "LUXAVÉN — Handcrafted Wooden Sculptures & Fine Art Objects",
      tagline: "Handcrafted Wooden Sculptures & Fine Art Objects",
      description:
        "LUXAVÉN creates rare, handcrafted decorative objects — sculptural totems, turned vessels, and architectural furniture — for interiors that celebrate beauty and permanence.",
    },
    de: {
      title: "LUXAVÉN — Handgefertigte Holzskulpturen & Kunstobjekte",
      tagline: "Handgefertigte Holzskulpturen & Kunstobjekte",
      description:
        "LUXAVÉN erschafft seltene, handgefertigte Dekorations- und Kunstobjekte — skulpturale Totems, gedrechselte Gefäße und architektonische Möbel für erlesene Wohnräume.",
    },
    ar: {
      title: "LUXAVÉN — منحوتات خشبية وتحف فنية يدوية الصنع",
      tagline: "منحوتات خشبية وتحف فنية يدوية الصنع",
      description:
        "تبتكر لوكْسافين قطعاً فنية وتحفاً ديكورية نادرة مصنوعة يدوياً — مجسمات نحتية، أوانٍ خشبية مخروطة، وأثاث معماري للمساحات الراقية.",
    },
  },
} as const;

export default brandConfig;
