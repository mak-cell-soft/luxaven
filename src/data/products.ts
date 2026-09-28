import type { Locale } from '@/lib/i18n/config';

export type ProductCategory = 'totem' | 'mobilier' | 'vase';

export type ArtworkAvailability = 'available' | 'reserved' | 'archive' | 'on-request';

export interface LocalizedArtworkDetails {
  readonly name: string;
  readonly material: string;
  readonly description: string;
  readonly edition?: string;
}

export interface Artwork {
  readonly id: string;
  readonly slug: string;
  readonly category: ProductCategory;
  readonly images: readonly string[];
  readonly dimensions?: string;
  readonly year?: number;
  readonly availability: ArtworkAvailability;
  readonly isMasterpiece?: boolean;
  readonly localized: Record<Locale, LocalizedArtworkDetails>;
}

export const ARTWORKS: readonly Artwork[] = [
  {
    id: 'p1',
    slug: 'totem-atelier-1',
    category: 'totem',
    images: [
      '/images/products/totem-atelier-1-01.jpeg',
      '/images/products/totem-atelier-1-02.jpeg',
    ],
    dimensions: '180 x 30 x 30 cm',
    year: 2024,
    availability: 'on-request',
    localized: {
      fr: {
        name: "Totem d'Atelier N°1",
        material: 'Chêne Massif Tourné',
        description: 'Pièce sculpturale tournée à la main dans un fût de chêne massif sélectionné pour la puissance de ses fibres.',
      },
      en: {
        name: 'Studio Totem N°1',
        material: 'Turned Solid Oak',
        description: 'Hand-turned sculptural monolith shaped from solid oak chosen for the expressive power of its grain.',
      },
      de: {
        name: 'Atelier Totem N°1',
        material: 'Gedrechselte Massiveiche',
        description: 'Handgedrechselte Skulptur aus massivem Eichenstamm, ausgewählt nach der Intensität seiner Holzfasern.',
      },
      ar: {
        name: 'مجسم الورشة رقم 1',
        material: 'خشب بلوط صلب مخروط',
        description: 'قطعة نحتية مخروطة يدوياً من جذع بلوط صلب تم انتقاؤه لقوة أليافه وكثافته التعبيرية.',
      },
    },
  },
  {
    id: 'p2',
    slug: 'totem-sculptural-3',
    category: 'totem',
    images: ['/images/products/totem-sculptural-3-01.jpeg'],
    dimensions: '190 x 35 x 35 cm',
    availability: 'on-request',
    localized: {
      fr: {
        name: 'Totem Sculptural N°3',
        material: 'Terre Cuite Naturelle & Argile',
        description: 'Totem aux courbes sensuelles combinant textures minérales et structure sculpturale équilibrée.',
      },
      en: {
        name: 'Sculptural Totem N°3',
        material: 'Natural Terracotta & Clay',
        description: 'Totem with tactile curves merging mineral textures and balanced sculptural posture.',
      },
      de: {
        name: 'Skulpturales Totem N°3',
        material: 'Natürliche Terrakotta & Ton',
        description: 'Skulpturales Totem mit taktilen Kurven, das mineralische Oberflächen mit harmonischer Balance verbindet.',
      },
      ar: {
        name: 'مجسم نحتي رقم 3',
        material: 'طين طبيعي وتراكوتا',
        description: 'مجسم نحتي بتعرجات انسيابية تجمع بين الخامات المعدنية والتوازن المعماري المتقن.',
      },
    },
  },
  {
    id: 'p3',
    slug: 'table-repas-monolithe',
    category: 'mobilier',
    images: ['/images/products/table-repas-monolithe-01.jpeg'],
    dimensions: '220 x 100 x 75 cm',
    year: 2024,
    availability: 'on-request',
    localized: {
      fr: {
        name: 'Table de Repas Monolithe',
        material: 'Noyer Brossé & Chêne',
        description: 'Table aux proportions architecturales affirmées, célébrant le dialogue entre le noyer sombre et le chêne brut.',
      },
      en: {
        name: 'Monolith Dining Table',
        material: 'Brushed Walnut & Oak',
        description: 'Table of bold architectural proportions celebrating the quiet contrast between dark walnut and raw oak.',
      },
      de: {
        name: 'Monolith Esstisch',
        material: 'Gebürsteter Nussbaum & Eiche',
        description: 'Esstisch von architektonischer Monumentalität, der den Dialog zwischen dunklem Nussbaum und Eiche feiert.',
      },
      ar: {
        name: 'طاولة طعام أحادية التكوين',
        material: 'جوز مصقول وبلوط',
        description: 'طاولة بتناسبات معمارية مهيبة تحتفي بالحوار البصري بين خشب الجوز الداكن والبلوط الطبيعي.',
      },
    },
  },
  {
    id: 'p4',
    slug: 'piliers-totemiques-chene',
    category: 'totem',
    images: ['/images/products/piliers-totemiques-chene-01.jpeg'],
    dimensions: '160 x 28 x 28 cm',
    availability: 'on-request',
    localized: {
      fr: {
        name: 'Piliers Totémiques en Chêne',
        material: 'Chêne Huilé Tourné',
        description: 'Colonnes géométriques façonnées pour introduire une ponctuation rythmique dans les intérieurs contemporains.',
      },
      en: {
        name: 'Oak Totemic Pillars',
        material: 'Oiled Turned Oak',
        description: 'Geometric columns conceived to establish a rhythmic architectural presence in contemporary interiors.',
      },
      de: {
        name: 'Totemische Eichensäulen',
        material: 'Geölte gedrechselte Eiche',
        description: 'Geometrische Säulen, geschaffen für eine rhythmische architektonische Gliederung moderner Räume.',
      },
      ar: {
        name: 'أعمدة طوطمية من البلوط',
        material: 'خشب بلوط مزيت ومخروط',
        description: 'أعمدة هندسية صُممت لتضفي إيقاعاً معمارياً مهيباً في المساحات الداخلية المعاصرة.',
      },
    },
  },
  {
    id: 'p5',
    slug: 'vases-tournes-lot-7',
    category: 'vase',
    images: [
      '/images/products/vases-tournes-lot-7-01.jpeg',
      '/images/products/vases-tournes-lot-7-02.jpeg',
    ],
    dimensions: 'Hauteurs variables (30-80cm)',
    availability: 'on-request',
    localized: {
      fr: {
        name: 'Vases Tournés (Lot de 7)',
        material: 'Frêne, Chêne & Noyer Mixtes',
        description: 'Ensemble de récipients sculpturaux tournés dans différentes essences suisses pour explorer la variété des veines.',
      },
      en: {
        name: 'Turned Vases (Set of 7)',
        material: 'Mixed Ash, Oak & Walnut',
        description: 'Suite of sculptural vessels turned from varied Swiss woods to celebrate the diversity of natural grains.',
      },
      de: {
        name: 'Gedrechselte Vasen (7er-Set)',
        material: 'Esche, Eiche & Nussbaum',
        description: 'Serie skulpturaler Gefäße aus verschiedenen Schweizer Edelhölzern, die die Vielfalt der Holzmaserung zelebriert.',
      },
      ar: {
        name: 'مزهريات مخروطة (مجموعة من 7)',
        material: 'مزيج خشب الدردار والبلوط والجوز',
        description: 'مجموعة أوانٍ نحتية مخروطة من أخشاب سويسرية نبيلة تسلط الضوء على تباين التموجات الخشبية الطبيعية.',
      },
    },
  },
  {
    id: 'p6',
    slug: 'chaise-sphaera',
    category: 'mobilier',
    images: ['/images/products/chaise-sphaera-01.jpeg'],
    dimensions: '85 x 60 x 65 cm',
    availability: 'on-request',
    localized: {
      fr: {
        name: 'Chaise Sphaera',
        material: 'Chêne Sculpté & Velours Bouclé',
        description: 'Assise sculpturale associant la force brute du chêne à la douceur tactile du velours bouclé naturel.',
      },
      en: {
        name: 'Sphaera Chair',
        material: 'Sculpted Oak & Bouclé Velvet',
        description: 'Sculptural seating pairing the raw presence of solid oak with the tactile softness of natural bouclé velvet.',
      },
      de: {
        name: 'Sphaera Stuhl',
        material: 'Geschnitzte Eiche & Bouclé-Samt',
        description: 'Skulpturales Sitzobjekt, das die rohe Präsenz von Eichenholz mit der taktilen Weichheit von Bouclé-Samt verbindet.',
      },
      ar: {
        name: 'كرسي سفايرا',
        material: 'بلوط منحوت ومخمل بوكليه',
        description: 'مقعد نحتي يزاوج بين هيبة خشب البلوط الصلب ونعومة نسيج البوكليه المخملي الفاخر.',
      },
    },
  },
  {
    id: 'p7',
    slug: 'console-sphaera',
    category: 'mobilier',
    images: ['/images/products/console-sphaera-01.jpeg'],
    year: 2024,
    availability: 'on-request',
    isMasterpiece: true,
    localized: {
      fr: {
        name: 'La Table Console Sphaera',
        material: 'Noyer Massif Suisse',
        description:
          "Formée par la superposition de sphères en noyer suisse massif, la console Sphaera se dresse comme un monument d'équilibre et de matière. Chaque sphère est tournée à la main par nos maîtres artisans.",
        edition: 'Série limitée à 12 exemplaires',
      },
      en: {
        name: 'The Sphaera Console Table',
        material: 'Swiss Solid Walnut',
        description:
          'Formed by the sculptural stacking of solid Swiss walnut spheres, the Sphaera console stands as a monument to balance and matter. Each sphere is hand-turned by our master artisans.',
        edition: 'Limited series of 12 pieces',
      },
      de: {
        name: 'Der Konsolentisch Sphaera',
        material: 'Schweizer Massivnussbaum',
        description:
          'Geformt durch die skulpturale Stapelung massiver Schweizer Nussbaumkugeln, steht die Konsole Sphaera wie ein Monument vollkommener Balance. Jede Kugel wird von unseren Meistern von Hand gedrechselt.',
        edition: 'Limitierte Serie von 12 Exemplaren',
      },
      ar: {
        name: 'طاولة كونسول سفايرا',
        material: 'خشب جوز سويسري مصمت',
        description:
          'بتراكب كرات نحتية من خشب الجوز السويسري المصمت، تنتصب كونسول سفايرا كصرح يجمع بين التوازن وصلابة المادة. كل كرة يتم خراطتها يدوياً بعناية فائقة.',
        edition: 'سلسلة محدودة من 12 نسخة فقط',
      },
    },
  },
] as const;

/**
 * Get all artworks.
 */
export function getAllArtworks(): readonly Artwork[] {
  return ARTWORKS;
}

/**
 * Find artwork by its stable technical canonical slug.
 */
export function getArtworkBySlug(slug: string): Artwork | undefined {
  return ARTWORKS.find((item) => item.slug === slug);
}

/**
 * Filter artworks by category or return all.
 */
export function getArtworksByCategory(category: ProductCategory | 'all'): readonly Artwork[] {
  if (category === 'all') return ARTWORKS;
  return ARTWORKS.filter((item) => item.category === category);
}

/**
 * Helper to extract localized data for a product with fallback.
 */
export function getLocalizedArtwork(artwork: Artwork, locale: Locale) {
  const details = artwork.localized[locale] ?? artwork.localized.fr;
  return {
    ...artwork,
    name: details.name,
    material: details.material,
    description: details.description,
    edition: details.edition,
  };
}
