import type { Locale } from '@/lib/i18n/config';
import { ASSET_PATHS } from '@/lib/images';

export type LuxurySculptureCategory = 'pedestal' | 'vase' | 'column' | 'organic';

export interface LocalizedLuxuryPieceDetails {
  readonly title: string;
  readonly material: string;
  readonly description: string;
  readonly categoryLabel: string;
  readonly dimensions: string;
}

export interface LuxurySculpture {
  readonly id: string;
  readonly number: string;
  readonly slug: string;
  readonly plaqueTitle: string; // Authentic engraved brass plaque title seen on pedestal
  readonly category: LuxurySculptureCategory;
  readonly image: string;
  readonly orientation: 'landscape' | 'portrait';
  readonly year: number;
  readonly localized: Record<Locale, LocalizedLuxuryPieceDetails>;
}

export const LUXURY_SCULPTURES: readonly LuxurySculpture[] = [
  {
    id: 'luxury-1',
    number: '01',
    slug: 'the-fluted-pedestal',
    plaqueTitle: 'THE FLUTED PEDESTAL',
    category: 'pedestal',
    image: ASSET_PATHS.handmadeLuxury.flutedPedestal,
    orientation: 'landscape',
    year: 2024,
    localized: {
      fr: {
        title: 'Le Piédestal Cannelé',
        material: 'Noyer Suisse Massif & Socle Schiste',
        description:
          'Tourné dans un billot sélectionné de noyer suisse, ce piédestal présente des cannelures verticales régulières qui élèvent la coupe supérieure comme une fleur de bois précieux.',
        categoryLabel: 'Piédestal',
        dimensions: '52 × 26 × 26 cm',
      },
      en: {
        title: 'The Fluted Pedestal',
        material: 'Swiss Solid Walnut & Slate Plinth',
        description:
          'Turned from a curated block of Swiss walnut, this pedestal features rhythmic vertical fluting that elevates the upper chalice like a blossom of noble timber.',
        categoryLabel: 'Pedestal',
        dimensions: '52 × 26 × 26 cm',
      },
      de: {
        title: 'Der kannelierte Sockel',
        material: 'Schweizer Massivnussbaum & Schiefersockel',
        description:
          'Aus einem erlesenen Schweizer Nussbaumstamm gedrechselt, besticht dieser Sockel durch gleichmäßige vertikale Kanneluren, die die Schale emporheben.',
        categoryLabel: 'Sockel',
        dimensions: '52 × 26 × 26 cm',
      },
      ar: {
        title: 'القاعدة المضلعة',
        material: 'خشب جوز سويسري صلب وقاعدة أردواز',
        description:
          'قاعدة منحوتة ومخروطة من جذع جوز سويسري فاخر، تتألق بتضليعات عمودية متناغمة ترفع التويج العلوي كزهرة خشبية نبيلة.',
        categoryLabel: 'قاعدة نحتية',
        dimensions: '52 × 26 × 26 سم',
      },
    },
  },
  {
    id: 'luxury-2',
    number: '02',
    slug: 'the-cascade-form',
    plaqueTitle: 'THE CASCADE FORM',
    category: 'organic',
    image: ASSET_PATHS.handmadeLuxury.cascadeForm,
    orientation: 'landscape',
    year: 2024,
    localized: {
      fr: {
        title: 'La Forme Cascade',
        material: 'Noyer Ondé Finition Cirée',
        description:
          'Une prouesse de sculpture manuelle : le grain du bois semble s’écouler en plis fluides et soyeux, défiant la rigidité naturelle de la matière ligneuse.',
        categoryLabel: 'Forme Organique',
        dimensions: '44 × 24 × 22 cm',
      },
      en: {
        title: 'The Cascade Form',
        material: 'Figured Walnut Waxed Finish',
        description:
          'A triumph of hand sculpture: the wood grain appears to cascade in fluid, silky drapery folds, defying the natural rigidity of the timber.',
        categoryLabel: 'Organic Form',
        dimensions: '44 × 24 × 22 cm',
      },
      de: {
        title: 'Die Kaskadenform',
        material: 'Riegelnussbaum gewachst',
        description:
          'Eine meisterhafte Handarbeit: Die Holzmaserung scheint in fließenden, seidigen Wellen herabzugleiten und überwindet die natürliche Starre des Holzes.',
        categoryLabel: 'Organische Form',
        dimensions: '44 × 24 × 22 cm',
      },
      ar: {
        title: 'التكوين الانسيابي',
        material: 'خشب جوز مموج بلمسة شمعية طبيعية',
        description:
          'إنجاز نحتي يدوي استثنائي: تنساب تموجات الخشب في طيات انسيابية حريرية تحاكي تدفق المياه وتتحدى صلابة المادة.',
        categoryLabel: 'تكوين عضوي',
        dimensions: '44 × 24 × 22 سم',
      },
    },
  },
  {
    id: 'luxury-3',
    number: '03',
    slug: 'the-natural-residence',
    plaqueTitle: 'THE NATURAL RESIDENCE',
    category: 'organic',
    image: ASSET_PATHS.handmadeLuxury.naturalResidence,
    orientation: 'landscape',
    year: 2024,
    localized: {
      fr: {
        title: 'La Résidence Naturelle',
        material: 'Cœur de Noyer Sculpté & Huilé',
        description:
          'Ce monolithe creusé met en valeur les cavités organiques et les cicatrices du temps. Les facettes extérieures polies contrastent avec la noirceur mystérieuse du cœur évidé.',
        categoryLabel: 'Forme Organique',
        dimensions: '58 × 28 × 25 cm',
      },
      en: {
        title: 'The Natural Residence',
        material: 'Carved & Oiled Walnut Heartwood',
        description:
          'This carved monolith celebrates the tree’s organic hollows and living fissures. Polished geometric facets contrast with the deep, mysterious core.',
        categoryLabel: 'Organic Form',
        dimensions: '58 × 28 × 25 cm',
      },
      de: {
        title: 'Das natürliche Gehäuse',
        material: 'Geschnitztes & geöltes Nussbaum-Kernholz',
        description:
          'Dieser gemeißelte Monolith würdigt die gewachsenen Hohlräume des Baumes. Polierte Außenfacetten kontrastieren mit dem geheimnisvollen Kern.',
        categoryLabel: 'Organische Form',
        dimensions: '58 × 28 × 25 cm',
      },
      ar: {
        title: 'السكن الطبيعي',
        material: 'قلب خشب الجوز المنحوت والمزيت',
        description:
          'كتلة متراصة تحتفي بتجاويف الشجرة الطبيعية وتصدعاتها الحية، حيث تتباين الأوجه المصقولة مع عمق القلب الداخلي الغامض.',
        categoryLabel: 'تكوين عضوي',
        dimensions: '58 × 28 × 25 سم',
      },
    },
  },
  {
    id: 'luxury-4',
    number: '04',
    slug: 'the-textured-vase',
    plaqueTitle: 'THE TEXTURED VASE',
    category: 'vase',
    image: ASSET_PATHS.handmadeLuxury.texturedVase,
    orientation: 'landscape',
    year: 2024,
    localized: {
      fr: {
        title: 'Le Vase Texturé',
        material: 'Frêne Noble Sculpté à la Gouge',
        description:
          'Une silhouette cylindrique épurée rehaussée de concavités façonnées à la gouge ronde. Chaque empreinte capte la lumière sous un angle unique, conférant une vibration vibratile au récipient.',
        categoryLabel: 'Vase Sculptural',
        dimensions: '46 × 18 × 18 cm',
      },
      en: {
        title: 'The Textured Vase',
        material: 'Noble Ash Gouged by Hand',
        description:
          'A pure cylindrical silhouette adorned with hand-gouged indentations. Each hollow captures ambient light at a distinct angle, granting tactile vibration to the vessel.',
        categoryLabel: 'Sculptural Vase',
        dimensions: '46 × 18 × 18 cm',
      },
      de: {
        title: 'Die strukturierte Vase',
        material: 'Edle Esche handgestochen',
        description:
          'Eine puristische zylindrische Silhouette, veredelt durch handgeschnitzte Mulden. Jede Vertiefung fängt das Licht auf unvergleichliche Weise ein.',
        categoryLabel: 'Skulpturale Vase',
        dimensions: '46 × 18 × 18 cm',
      },
      ar: {
        title: 'المزهرية الملمسية',
        material: 'خشب دردار نبيل منقوش بالإزميل اليدوي',
        description:
          'قوام أسطواني نقي تثريه تجاويف دائرية منقوشة يدوياً، تلتقط الضوء المحيط بزوايا متفردة وتمنح القطعة نبضاً بصرياً ملموساً.',
        categoryLabel: 'مزهرية نحتية',
        dimensions: '46 × 18 × 18 سم',
      },
    },
  },
  {
    id: 'luxury-5',
    number: '05',
    slug: 'the-majestic-spindle',
    plaqueTitle: 'THE MAJESTIC SPINDLE',
    category: 'column',
    image: ASSET_PATHS.handmadeLuxury.majesticSpindle,
    orientation: 'landscape',
    year: 2024,
    localized: {
      fr: {
        title: 'Le Fuseau Majestueux',
        material: 'Chêne et Noyer Tournés',
        description:
          'Trois volumes sphéroïdes étagés reliés par des gorges fuselées. Cette composition verticale incarne la tension entre légèreté architecturale et densité de la matière.',
        categoryLabel: 'Colonne & Totem',
        dimensions: '74 × 18 × 18 cm',
      },
      en: {
        title: 'The Majestic Spindle',
        material: 'Turned Oak & Walnut',
        description:
          'Three tiered ellipsoidal forms connected by slender, tapered waists. This vertical composition embodies dynamic tension between lightness and wood mass.',
        categoryLabel: 'Column & Totem',
        dimensions: '74 × 18 × 18 cm',
      },
      de: {
        title: 'Die majestätische Spindel',
        material: 'Gedrechselte Eiche & Nussbaum',
        description:
          'Drei gestaffelte ellipsoide Körper, verbunden durch schlanke Einschnürungen. Eine vertikale Skulptur voller architektonischer Spannung.',
        categoryLabel: 'Säule & Stele',
        dimensions: '74 × 18 × 18 cm',
      },
      ar: {
        title: 'المغزل المهيب',
        material: 'خشب بلوط وجوز مخروط',
        description:
          'ثلاثة تكوينات بيضاوية متدرجة تلتقي عبر أخصار رشيقة، تجسد التوازن البصري بين الخفة المعمارية وثقل المادة الخشبية الأصيلة.',
        categoryLabel: 'عمود وطوطم',
        dimensions: '74 × 18 × 18 سم',
      },
    },
  },
  {
    id: 'luxury-6',
    number: '06',
    slug: 'the-geometric-pedestal',
    plaqueTitle: 'THE GEOMETRIC PEDESTAL',
    category: 'pedestal',
    image: ASSET_PATHS.handmadeLuxury.geometricPedestal,
    orientation: 'landscape',
    year: 2024,
    localized: {
      fr: {
        title: 'Le Piédestal Géométrique',
        material: 'Noyer Clair aux Arêtes Vives',
        description:
          'Une géométrie triangulée ascendante où chaque plan taillé avec exactitude capte l’ombre et la clarté. La coupe circulaire supérieure offre un contrepoint circulaire apaisant.',
        categoryLabel: 'Piédestal',
        dimensions: '56 × 26 × 26 cm',
      },
      en: {
        title: 'The Geometric Pedestal',
        material: 'Crisp-Edged Pale Walnut',
        description:
          'An ascending triangulated architecture where each faceted plane captures shadow and clarity. The circular upper crown offers a serene counterpoint.',
        categoryLabel: 'Pedestal',
        dimensions: '56 × 26 × 26 cm',
      },
      de: {
        title: 'Der geometrische Sockel',
        material: 'Heller Nussbaum mit scharfen Kanten',
        description:
          'Eine aufstrebende Dreiecksgeometrie, deren facettierte Flächen Licht und Schatten fangen. Die obere Schale bildet einen harmonischen Gegenpol.',
        categoryLabel: 'Sockel',
        dimensions: '56 × 26 × 26 cm',
      },
      ar: {
        title: 'القاعدة الهندسية',
        material: 'خشب جوز فاتح بحواف حادة متقنة',
        description:
          'تكوين هندسي مثلثي متصاعد تعكس مستوياته المنحوتة بدقة درجات الظل والنور، وتتوجها قمة دائرية توفر توازناً بصرياً هادئاً.',
        categoryLabel: 'قاعدة نحتية',
        dimensions: '56 × 26 × 26 سم',
      },
    },
  },
  {
    id: 'luxury-7',
    number: '07',
    slug: 'the-ornate-tower',
    plaqueTitle: 'THE ORNATE TOWER',
    category: 'column',
    image: ASSET_PATHS.handmadeLuxury.ornateTower,
    orientation: 'landscape',
    year: 2024,
    localized: {
      fr: {
        title: 'La Tour Ornée',
        material: 'Bois Noble Tourné de Précision',
        description:
          'Élancée vers le ciel comme un minaret ou une flèche d’église alpine, cette colonne d’atelier combine socle conique, orbes lisses et couronnement ouvragé.',
        categoryLabel: 'Colonne & Totem',
        dimensions: '78 × 16 × 16 cm',
      },
      en: {
        title: 'The Ornate Tower',
        material: 'Precision-Turned Noble Timber',
        description:
          'Reaching upward like an alpine spire, this studio column brings together a conical base, mirror-smooth turned orbs, and a delicate crown.',
        categoryLabel: 'Column & Totem',
        dimensions: '78 × 16 × 16 cm',
      },
      de: {
        title: 'Der ziselierte Turm',
        material: 'Präzisionsgedrechseltes Edelholz',
        description:
          'Wie eine alpine Turmspitze aufragend, vereint diese Säule eine konische Basis mit spiegelglatten Kugeln und einem feinen Abschluss.',
        categoryLabel: 'Säule & Stele',
        dimensions: '78 × 16 × 16 cm',
      },
      ar: {
        title: 'البرج المزخرف',
        material: 'خشب نبيل مخروط بدقة متناهية',
        description:
          'ينتصب في شموخ يماثل مآذن القمم الألبية، جامعاً بين قاعدة مخروطية راسخة وكرات مصقولة بعناية وتتويج نحتي رفيع.',
        categoryLabel: 'عمود وطوطم',
        dimensions: '78 × 16 × 16 سم',
      },
    },
  },
  {
    id: 'luxury-8',
    number: '08',
    slug: 'the-twisted-column',
    plaqueTitle: 'THE TWISTED COLUMN',
    category: 'column',
    image: ASSET_PATHS.handmadeLuxury.twistedColumn,
    orientation: 'landscape',
    year: 2024,
    localized: {
      fr: {
        title: 'La Colonne Torsadée',
        material: 'Noyer Tourné & Sculpté en Spirale',
        description:
          'Un hommage aux colonnes salomoniques réinterprété avec la pureté du design suisse contemporain. Le mouvement hélicoïdal guide le regard vers la cime.',
        categoryLabel: 'Colonne & Totem',
        dimensions: '60 × 20 × 20 cm',
      },
      en: {
        title: 'The Twisted Column',
        material: 'Walnut Turned & Spiral Carved',
        description:
          'A tribute to classical Solomonic pillars reimagined through contemporary Swiss minimalism. The helical motion carries the gaze gracefully upward.',
        categoryLabel: 'Column & Totem',
        dimensions: '60 × 20 × 20 cm',
      },
      de: {
        title: 'Die gewundene Säule',
        material: 'Nussbaum gedrechselt & spiralgeschnitzt',
        description:
          'Eine Hommage an salomonische Säulen, neu interpretiert mit zeitgenössischer Schweizer Klarheit. Die Helixbewegung zieht den Blick nach oben.',
        categoryLabel: 'Säule & Stele',
        dimensions: '60 × 20 × 20 cm',
      },
      ar: {
        title: 'العمود الملتوي',
        material: 'خشب جوز مخروط ومنحوت لولبياً',
        description:
          'تحية للأعمدة الكلاسيكية الالتوائية بلمسة عصرية سويسرية مفعمة بالصفاء، حيث توجه الحركة الحلزونية بصر المشاهد نحو الأعلى بانسجام.',
        categoryLabel: 'عمود وطوطم',
        dimensions: '60 × 20 × 20 سم',
      },
    },
  },
  {
    id: 'luxury-9',
    number: '09',
    slug: 'handcrafted-excellence',
    plaqueTitle: 'HANDCRAFTED EXCELLENCE',
    category: 'column',
    image: ASSET_PATHS.handmadeLuxury.handcraftedExcellence,
    orientation: 'portrait',
    year: 2024,
    localized: {
      fr: {
        title: 'Excellence Façonnée',
        material: 'Trio de Piliers en Chêne et Noyer',
        description:
          'Une composition majeure en trois hauteurs. Ces flèches effilées, surmontées de cupules tournées, dialoguent dans l’espace architectural avec une présence silencieuse et souveraine.',
        categoryLabel: 'Colonne & Totem',
        dimensions: '140 / 165 / 185 × 14 × 14 cm',
      },
      en: {
        title: 'Handcrafted Excellence',
        material: 'Trio of Oak & Walnut Pillars',
        description:
          'A landmark trio of tiered heights. These slender turned spires topped with circular cups command architectural interiors with serene presence.',
        categoryLabel: 'Column & Totem',
        dimensions: '140 / 165 / 185 × 14 × 14 cm',
      },
      de: {
        title: 'Handwerkliche Exzellenz',
        material: 'Trio von Eichen- und Nussbaumsäulen',
        description:
          'Ein monumentales Dreier-Ensemble in gestaffelter Höhe. Die schlanken Stelen mit feinen Schalen verleihen Räumen eine souveräne Stille.',
        categoryLabel: 'Säule & Stele',
        dimensions: '140 / 165 / 185 × 14 × 14 cm',
      },
      ar: {
        title: 'التميز الحرفي',
        material: 'ثلاثية أعمدة من خشب البلوط والجوز',
        description:
          'عمل صرحي من ثلاثة ارتفاعات متدرجة. هذه الأعمدة الرشيقة المتوجة بكؤوس دائرية تضفي على الفضاءات المعمارية حضوراً مهيباً وسكينة طاغية.',
        categoryLabel: 'عمود وطوطم',
        dimensions: '140 / 165 / 185 × 14 × 14 سم',
      },
    },
  },
  {
    id: 'luxury-10',
    number: '10',
    slug: 'the-oval-pedestal',
    plaqueTitle: 'THE OVAL PEDESTAL',
    category: 'pedestal',
    image: ASSET_PATHS.handmadeLuxury.ovalPedestal,
    orientation: 'landscape',
    year: 2024,
    localized: {
      fr: {
        title: 'Le Piédestal Ovale',
        material: 'Noyer Noble Tourné aux Veines Contrastées',
        description:
          'L’association d’un bulbe ovoïde galbé et d’un calice évasé à cannelures prononcées. Le tourneur a sélectionné le fil du bois pour épouser parfaitement la courbe extérieure.',
        categoryLabel: 'Piédestal',
        dimensions: '54 × 24 × 24 cm',
      },
      en: {
        title: 'The Oval Pedestal',
        material: 'Turned Noble Walnut with Dramatic Grain',
        description:
          'The harmonious marriage of a curved ovoid bulb and a deeply fluted chalice. The woodturner followed the natural grain to hug the exterior contours.',
        categoryLabel: 'Pedestal',
        dimensions: '54 × 24 × 24 cm',
      },
      de: {
        title: 'Der ovale Sockel',
        material: 'Edler Nussbaum mit lebendiger Maserung',
        description:
          'Harmonische Verbindung eines ovalen Schafts mit einem tief gekehlten Kelch. Der Drechsler folgte meisterhaft dem natürlichen Faserverlauf.',
        categoryLabel: 'Sockel',
        dimensions: '54 × 24 × 24 cm',
      },
      ar: {
        title: 'القاعدة البيضاوية',
        material: 'خشب جوز نبيل مخروط بتموجات خشبية حية',
        description:
          'تكامل متناغم بين انتفاخ بيضاوي ممتلئ وكأس علوي بتضليعات غائرة. اتبع الخراط ألياف الخشب بدقة لتعانق انحناءات الشكل الخارجي.',
        categoryLabel: 'قاعدة نحتية',
        dimensions: '54 × 24 × 24 سم',
      },
    },
  },
  {
    id: 'luxury-11',
    number: '11',
    slug: 'the-spiral-vase',
    plaqueTitle: 'THE SPIRAL VASE',
    category: 'vase',
    image: ASSET_PATHS.handmadeLuxury.spiralVase,
    orientation: 'landscape',
    year: 2024,
    localized: {
      fr: {
        title: 'Le Vase Spiralé',
        material: 'Noyer Sculpté en Ruban Aérien',
        description:
          'Des arêtes sinueuses sculptées comme des rubans de vent montant autour d’un col étiré. Une pièce qui capture l’énergie cinétique du geste de l’artisan.',
        categoryLabel: 'Vase Sculptural',
        dimensions: '48 × 20 × 20 cm',
      },
      en: {
        title: 'The Spiral Vase',
        material: 'Walnut Carved in Aerial Ribbons',
        description:
          'Sinuous ridges sculpted like ribbons of wind swirling around an elongated neck. A piece capturing the kinetic energy of the master craftsman’s gesture.',
        categoryLabel: 'Sculptural Vase',
        dimensions: '48 × 20 × 20 cm',
      },
      de: {
        title: 'Die Spiralvase',
        material: 'Nussbaum in geschwungenen Bändern geschnitzt',
        description:
          'Geschwungene Kanten, die wie Windbänder um einen gestreckten Hals emporsteigen. Ein Werk, das die kinetische Energie des Handwerks einfängt.',
        categoryLabel: 'Skulpturale Vase',
        dimensions: '48 × 20 × 20 cm',
      },
      ar: {
        title: 'المزهرية الحلزونية',
        material: 'خشب جوز منحوت في أشرطة هوائية رشيقة',
        description:
          'حواف انسيابية منحوتة كأشرطة من النسيم تلتف حول عنق ممشوق، في قطعة تجسد الطاقة الحركية ليد الخراط وتنبض بالإبداع.',
        categoryLabel: 'مزهرية نحتية',
        dimensions: '48 × 20 × 20 سم',
      },
    },
  },
] as const;

export function getAllLuxurySculptures(): readonly LuxurySculpture[] {
  return LUXURY_SCULPTURES;
}

export function getLuxurySculptureBySlug(slug: string): LuxurySculpture | undefined {
  return LUXURY_SCULPTURES.find((s) => s.slug === slug);
}

export function getLocalizedLuxuryPiece(sculpture: LuxurySculpture, locale: Locale) {
  const details = sculpture.localized[locale] ?? sculpture.localized.fr;
  return {
    ...sculpture,
    title: details.title,
    material: details.material,
    description: details.description,
    categoryLabel: details.categoryLabel,
    dimensions: details.dimensions,
  };
}
