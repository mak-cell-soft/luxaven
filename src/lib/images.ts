/**
 * Image Utilities & Asset Metadata — LUXAVÉN
 *
 * Centralized helpers for organized asset paths, responsive sizes,
 * and gallery sequences.
 */

export const ASSET_PATHS = {
  products: {
    totemAtelier1: {
      primary: '/images/products/totem-atelier-1-01.jpeg',
      gallery: [
        '/images/products/totem-atelier-1-01.jpeg',
        '/images/products/totem-atelier-1-02.jpeg',
      ],
    },
    totemSculptural3: {
      primary: '/images/products/totem-sculptural-3-01.jpeg',
      gallery: ['/images/products/totem-sculptural-3-01.jpeg'],
    },
    tableRepasMonolithe: {
      primary: '/images/products/table-repas-monolithe-01.jpeg',
      gallery: ['/images/products/table-repas-monolithe-01.jpeg'],
    },
    piliersTotemiquesChene: {
      primary: '/images/products/piliers-totemiques-chene-01.jpeg',
      gallery: ['/images/products/piliers-totemiques-chene-01.jpeg'],
    },
    vasesTournesLot7: {
      primary: '/images/products/vases-tournes-lot-7-01.jpeg',
      gallery: [
        '/images/products/vases-tournes-lot-7-01.jpeg',
        '/images/products/vases-tournes-lot-7-02.jpeg',
      ],
    },
    chaiseSphaera: {
      primary: '/images/products/chaise-sphaera-01.jpeg',
      gallery: ['/images/products/chaise-sphaera-01.jpeg'],
    },
    consoleSphaera: {
      primary: '/images/products/console-sphaera-01.jpeg',
      gallery: ['/images/products/console-sphaera-01.jpeg'],
    },
  },
  hero: {
    handmade01: '/images/hero/hero-handmade-01.jpeg',
    candidateA: '/images/hero/hero-totems-living-space.jpeg',
    candidateB: '/images/hero/hero-cascade-gallery.jpeg',
    candidateC: '/images/hero/hero-monolith-interior.jpeg',
  },
  atelier: {
    woodTextureDetail: '/images/atelier/wood-texture-detail.jpeg',
    craftsmanshipTable: '/images/atelier/craftsmanship-table.jpeg',
    woodGrainSpiral: '/images/atelier/wood-grain-spiral.jpeg',
    handcraftedVessel: '/images/atelier/handcrafted-vessel.jpeg',
  },
  collections: {
    flutedPedestal: '/images/collections/collection-fluted-pedestal.jpeg',
    cascadeForm: '/images/collections/collection-cascade-form.jpeg',
    naturalResidence: '/images/collections/collection-natural-residence.jpeg',
    texturedVase: '/images/collections/collection-textured-vase.jpeg',
    majesticSpindle: '/images/collections/collection-majestic-spindle.jpeg',
    geometricPedestal: '/images/collections/collection-geometric-pedestal.jpeg',
    ornateTower: '/images/collections/collection-ornate-tower.jpeg',
    twistedColumn: '/images/collections/collection-twisted-column.jpeg',
    handcraftedExcellence: '/images/collections/collection-handcrafted-excellence.jpeg',
    ovalPedestal: '/images/collections/collection-oval-pedestal.jpeg',
    spiralVase: '/images/collections/collection-spiral-vase.jpeg',
  },
  handmadeLuxury: {
    flutedPedestal: '/images/handmade/luxury/handluxury1.jpeg',
    cascadeForm: '/images/handmade/luxury/handluxury2.jpeg',
    naturalResidence: '/images/handmade/luxury/handluxury3.jpeg',
    texturedVase: '/images/handmade/luxury/handluxury4.jpeg',
    majesticSpindle: '/images/handmade/luxury/handluxury5.jpeg',
    geometricPedestal: '/images/handmade/luxury/handluxury6.jpeg',
    ornateTower: '/images/handmade/luxury/handluxury7.jpeg',
    twistedColumn: '/images/handmade/luxury/handluxury8.jpeg',
    handcraftedExcellence: '/images/handmade/luxury/handluxury9.jpeg',
    ovalPedestal: '/images/handmade/luxury/handluxury10.jpeg',
    spiralVase: '/images/handmade/luxury/handluxury11.jpeg',
  },
} as const;

/**
 * Standard responsive sizes configurations for next/image.
 */
export const IMAGE_SIZES = {
  hero: '100vw',
  featured: '(max-width: 1024px) 100vw, 50vw',
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  detail: '(max-width: 1024px) 100vw, 58vw',
  gallery: '(max-width: 768px) 100vw, 50vw',
} as const;

/**
 * Returns a clean, non-redundant accessible alt text for an artwork.
 */
export function getArtworkAlt(artworkName: string, locale?: string): string {
  if (!artworkName) return 'Œuvre d’art LUXAVÉN';
  if (locale === 'ar') return `${artworkName} — لوكْسَافَان`;
  return `${artworkName} — LUXAVÉN`;
}

/**
 * Cinematic Hero Sequence Slide Configuration
 *
 * Each slide represents a distinct chapter in the brand narrative:
 * 01 ENSEMBLE (Material & Table) -> 02 MATERIAL (Chisel & Grain) ->
 * 03 FORM (Fluid Sculptural Vessel) -> 04 OBJECT (Turned Silhouettes) ->
 * 05 SPACE (Totems in Architecture)
 */
export interface HeroSlideConfig {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly desktopPositionClass: string;
  readonly mobilePositionClass: string;
  readonly initialScale: number;
  readonly targetScale: number;
  readonly translateY: string;
}

export const HERO_SEQUENCE: readonly HeroSlideConfig[] = [
  {
    id: 'hero-ensemble',
    src: ASSET_PATHS.hero.handmade01,
    alt: 'Ensemble de sculptures tournées et pièces d’atelier LUXAVÉN en bois massif',
    desktopPositionClass: 'md:object-[center_42%]',
    mobilePositionClass: 'object-[center_35%]',
    initialScale: 1.0,
    targetScale: 1.025,
    translateY: '-0.8%',
  },
  {
    id: 'hero-material-detail',
    src: ASSET_PATHS.atelier.woodTextureDetail,
    alt: 'Détail de matière martelée et grain de bois sculpté à la main',
    desktopPositionClass: 'md:object-[center_35%]',
    mobilePositionClass: 'object-[center_30%]',
    initialScale: 1.025,
    targetScale: 1.005,
    translateY: '0%',
  },
  {
    id: 'hero-sculptural-form',
    src: ASSET_PATHS.atelier.handcraftedVessel,
    alt: 'Vase sculptural aux courbes organiques façonné en noyer massif',
    desktopPositionClass: 'md:object-[center_45%]',
    mobilePositionClass: 'object-[center_35%]',
    initialScale: 1.0,
    targetScale: 1.025,
    translateY: '-0.8%',
  },
  {
    id: 'hero-turned-silhouettes',
    src: ASSET_PATHS.products.vasesTournesLot7.primary,
    alt: 'Sept silhouettes de vases tournés en bois noble sur socle d’atelier',
    desktopPositionClass: 'md:object-[center_38%]',
    mobilePositionClass: 'object-[center_30%]',
    initialScale: 1.025,
    targetScale: 1.005,
    translateY: '0%',
  },
  {
    id: 'hero-living-space',
    src: ASSET_PATHS.hero.candidateA,
    alt: 'Totems géométriques en chêne massif dans un espace architectural contemporain',
    desktopPositionClass: 'md:object-[center_35%]',
    mobilePositionClass: 'object-[center_28%]',
    initialScale: 1.0,
    targetScale: 1.025,
    translateY: '-0.8%',
  },
] as const;

