/**
 * Typed Content Dictionary Schema — LUXAVÉN
 */

export interface NavigationContent {
  readonly home: string;
  readonly collection: string;
  readonly masterpiece: string;
  readonly process: string;
  readonly atelier: string;
  readonly contact: string;
  readonly inquire: string;
}

export interface HeroContent {
  readonly eyebrow: string;
  readonly titlePrefix: string;
  readonly titleHighlight: string;
  readonly description: string;
  readonly ctaCollection: string;
  readonly ctaProcess: string;
  readonly imageCaptionTitle: string;
  readonly imageCaptionMaterial: string;
  readonly stats: {
    readonly swissWoodValue: string;
    readonly swissWoodLabel: string;
    readonly handCraftedValue: string;
    readonly handCraftedLabel: string;
    readonly limitedValue: string;
    readonly limitedLabel: string;
  };
}

export interface PhilosophyContent {
  readonly eyebrow: string;
  readonly titlePrefix: string;
  readonly titleHighlight: string;
  readonly paragraph1: string;
  readonly quote: string;
  readonly quoteAuthor: string;
  readonly paragraph2: string;
}

export interface CollectionContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly viewArtwork?: string;
  readonly exploreAll?: string;
  readonly filters: {
    readonly all: string;
    readonly totem: string;
    readonly mobilier: string;
    readonly vase: string;
  };
  readonly priceOnRequest: string;
  readonly inquire: string;
  readonly dimensionsLabel: string;
  readonly luxuryShowcase?: LuxuryShowcaseContent;
}

export interface LuxuryShowcaseContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle: string;
  readonly inquireCta: string;
  readonly viewPlaque: string;
  readonly dimensionsLabel: string;
  readonly materialLabel: string;
  readonly seriesBadge: string;
  readonly filters: {
    readonly all: string;
    readonly pedestal: string;
    readonly vase: string;
    readonly column: string;
    readonly organic: string;
  };
}

export interface FeaturedContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly paragraph1: string;
  readonly paragraph2: string;
  readonly editionLabel: string;
  readonly editionValue: string;
  readonly materialLabel: string;
  readonly materialValue: string;
  readonly cta: string;
}

export interface ProcessStep {
  readonly num: string;
  readonly title: string;
  readonly desc: string;
}

export interface ProcessContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly steps: readonly ProcessStep[];
}

export interface AtelierContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly craftsmanshipTitle: string;
  readonly craftsmanshipDesc: string;
  readonly materialsTitle: string;
  readonly materialsDesc: string;
  readonly provenanceTitle: string;
  readonly provenanceDesc: string;
}

export interface ContactContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly successTitle: string;
  readonly successMessage: string;
  readonly fields: {
    readonly nameLabel: string;
    readonly namePlaceholder: string;
    readonly emailLabel: string;
    readonly emailPlaceholder: string;
    readonly requestTypeLabel: string;
    readonly options: readonly string[];
    readonly messageLabel: string;
    readonly messagePlaceholder: string;
    readonly submit: string;
  };
}

export interface FooterContent {
  readonly description: string;
  readonly tagline?: string;
  readonly craftStatement?: string;
  readonly atelierTitle: string;
  readonly contactTitle: string;
  readonly copyrightSuffix: string;
  readonly privacy: string;
  readonly terms: string;
  readonly pressKit: string;
}

export interface CommonContent {
  readonly brandName: string;
  readonly tagline: string;
  readonly craftStatement?: string;
  readonly priceOnRequest: string;
  readonly inquire: string;
  readonly backToCollection: string;
  readonly viewDetails: string;
  readonly notFoundTitle: string;
  readonly notFoundText: string;
  readonly notFoundCta: string;
}

export interface Dictionary {
  readonly navigation: NavigationContent;
  readonly hero: HeroContent;
  readonly philosophy: PhilosophyContent;
  readonly collection: CollectionContent;
  readonly featured: FeaturedContent;
  readonly process: ProcessContent;
  readonly atelier: AtelierContent;
  readonly contact: ContactContent;
  readonly footer: FooterContent;
  readonly common: CommonContent;
}
