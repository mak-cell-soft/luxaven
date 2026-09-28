# Darilux Architecture Audit

> **Document Type:** Technical & Architectural Codebase Audit  
> **Target Project:** Darilux (`darilux`)  
> **Audited By:** Antigravity AI  
> **Date:** September 28, 2026  
> **Status:** Completed (Pre-Implementation Phase)

---

## 1. Current Stack

| Technology | Current Version / Spec | Notes & Observations |
| :--- | :--- | :--- |
| **Framework** | Next.js `16.2.10` (App Router) | Canary/Next 16 release. Note explicit warning in `AGENTS.md`: breaking changes in App Router conventions (`params` and `searchParams` are Promises, React 19 async request APIs). |
| **Core Runtime** | React `19.2.4` / React DOM `19.2.4` | Full React 19 baseline. Requires React 19 compatible dependencies (e.g. Radix UI v1.3+). |
| **Language** | TypeScript `^5.0` (`strict: true`) | Target: `ES2017`, `moduleResolution: "bundler"`, path alias `@/*` -> `./src/*`. Incremental builds enabled. |
| **Styling Engine** | Tailwind CSS `^4.0` (`@tailwindcss/postcss: ^4`) | CSS-first configuration via `@import "tailwindcss";` and `@theme` block in `src/app/globals.css`. **No** `tailwind.config.js` exists. |
| **Component Primitives** | Radix UI Slot (`@radix-ui/react-slot: ^1.3.0`) | Baseline primitive used for polymorphic button component (`asChild`). |
| **Class Utilities** | `clsx: ^2.1.1`, `tailwind-merge: ^2.6.1`, `cva: ^0.7.1` | Used in `src/lib/utils.ts` for the standard `cn(...)` utility and variant orchestration. |
| **Animation Engine** | `framer-motion: ^11.18.2` | **Already installed and actively used** in `hero-section.tsx`, `philosophy-section.tsx`, `collection-section.tsx`, and `featured-section.tsx`. |
| **Iconography** | `lucide-react: ^0.468.0` | **Already installed and actively used** across navigation, process, collection, and footer. |
| **Linter** | ESLint `^9` with Flat Config (`eslint.config.mjs`) | Uses `eslint-config-next/core-web-vitals` & `eslint-config-next/typescript`. Currently reports **48 issues** (see Section 14). |
| **Bundler / Compiler** | Next.js Turbopack | Explicit root configured in `next.config.ts` (`turbopack.root = path.join(__dirname)`). |

---

## 2. Current Project Structure

```text
darilux/
├── .agents/
│   └── skills/                         # Local agent skills (design-system, ui-ux-pro-max, brand, etc.)
├── .git/
├── .gitignore
├── .next/                              # Turbopack build artifact cache
├── AGENTS.md                           # Agent directives (Next.js 16 breaking change warnings)
├── CLAUDE.md                           # Pointer to AGENTS.md
├── docs/                               # Project documentation
│   ├── architecture.md                 # Theoretical architecture doc (Server-First, Zustand, etc.)
│   ├── coding-rules.md                 # TypeScript & component conventions
│   ├── folder-structure.md             # Folder layout spec
│   ├── state-management.md             # State architecture spec (TanStack, Zustand)
│   ├── walkthrough.md                  # Previous UI/UX change log
│   └── DARILUX-ARCHITECTURE-AUDIT.md   # [This Document]
├── eslint.config.mjs                   # ESLint 9 Flat Config
├── next-env.d.ts                       # Next.js TypeScript declarations
├── next.config.ts                      # Next.js configuration (Turbopack root, remotePatterns)
├── node_modules/
├── package-lock.json
├── package.json                        # Dependencies and build scripts
├── postcss.config.mjs                  # PostCSS configuration with @tailwindcss/postcss
├── public/
│   └── images/                         # Static image assets
│       ├── darilux1.jpeg … darilux8.jpeg
│       ├── sarilux2.jpeg               # (Typo in filename for darilux2)
│       └── handmade/                   # High-res authentic product catalog images
│           ├── decor1.jpeg … decor5.jpeg
│           └── luxury/
│               └── handluxury1.jpeg … handluxury11.jpeg
├── src/
│   ├── app/
│   │   ├── globals.css                 # Tailwind v4 theme, keyframes, base styles
│   │   ├── layout.tsx                  # Root HTML layout with Google Font links
│   │   └── page.tsx                    # Landing page composed of 6 sections
│   ├── components/
│   │   ├── sections/                   # Page section components
│   │   │   ├── collection-section.tsx  # Product grid with category tabs
│   │   │   ├── contact-section.tsx     # Inquiries and atelier commission form
│   │   │   ├── featured-section.tsx    # "Piece Maitresse" console table showcase
│   │   │   ├── hero-section.tsx        # Hero banner with editorial typography and offset card
│   │   │   ├── philosophy-section.tsx  # Brand manifesto and clipped media gallery
│   │   │   └── process-section.tsx     # 3-step artisanal crafting process
│   │   ├── shared/
│   │   │   ├── footer.tsx              # 3-column editorial footer
│   │   │   └── navbar.tsx              # Sticky header with desktop links & mobile drawer
│   │   └── ui/
│   │       ├── button.tsx              # CVA-based Button component
│   │       ├── clip-path-image.tsx     # SVG clip-path media gallery
│   │       └── demo.tsx                # Isolated preview component for clip-path gallery
│   ├── hooks/                          # [Empty directory]
│   ├── lib/
│   │   └── utils.ts                    # Class merging utility (clsx + twMerge)
│   ├── services/                       # [Empty directory]
│   └── store/                          # [Empty directory]
└── tsconfig.json                       # TypeScript compiler configuration
```

---

## 3. Current Routes

The existing application is strictly a **single-route application**:

| Route Path | File Location | Render Type | Description |
| :--- | :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | Static (`○ prerendered`) | Single page landing site hosting all sections via in-page anchor links (`#philosophy`, `#collection`, `#featured`, `#process`, `#contact`). |
| `/_not-found` | Framework internal | Static (`○ prerendered`) | Default Next.js 404 page. |

**Key Finding:** There are currently **no sub-routes**, **no localized routes** (`/[locale]`), and **no dynamic routes** (e.g. `/collection/[slug]`, `/atelier`, `/journal`). All navigation relies on fragment identifiers.

---

## 4. Current Components

### 4.1 Section Responsibilities & Breakdown

| Component | File Path | Type | Current Responsibilities & Implementation Details |
| :--- | :--- | :--- | :--- |
| **Navbar** | `src/components/shared/navbar.tsx` | `'use client'` | Fixed top bar with scroll detection (`window.scrollY > 50`). Renders brand wordmark `DARILUX`, desktop anchor navigation links, "S'INFORMER" action button, and a mobile hamburger menu drawer with fade-in animation. |
| **Hero Section** | `src/components/sections/hero-section.tsx` | `'use client'` | Asymmetric split layout. Left: brand eyebrow, editorial serif headline, descriptive copy, primary CTA buttons ("EXPLORER LA COLLECTION", "NOTRE PROCÉDÉ"), and 3 workshop statistics. Right: floating image card with decorative offset background and glassmorphic caption card. Uses `framer-motion` for entry transitions. |
| **Philosophy Section** | `src/components/sections/philosophy-section.tsx` | `'use client'` | Two-column layout. Left: manifesto header, body text, pull quote from Master Artisan Marta. Right: rendered instance of `ClippedMediaGallery`. Uses `framer-motion` (`whileInView`). |
| **Collection Section** | `src/components/sections/collection-section.tsx` | `'use client'` | Category filter tab bar (`Toutes`, `Totems`, `Mobilier`, `Vases`) with animated layout underline via `framer-motion`. Inlines a 6-item `PRODUCTS` mock array. Renders 3-column product cards with zoom hover effects and static pagination arrows. |
| **Product Cards** | Inlined inside `collection-section.tsx` (L122–169) | Client-side sub-render | Not currently an independent component. Contains product image, category pill badge, product name, material, dimensions, price on request, and an inquiry button. |
| **Featured ("Masterpiece")** | `src/components/sections/featured-section.tsx` | `'use client'` | Dedicated spotlight for "La Table Console Sphaera". Dark background (`#5C3D2E`) with radial lighting gradient. Left: large image with subtle hover zoom. Right: background story, technical specifications (12-edition limit, Swiss solid walnut), and "Demander une Visite Privée" CTA button. |
| **Process Section** | `src/components/sections/process-section.tsx` | `'use client'` | 3-column card grid explaining the artisanal workflow: 01. Sélection Éthique, 02. Tournage de Précision, 03. Finition Naturelle. Features Lucide icons (`Compass`, `Hammer`, `Flower`). |
| **Contact Section** | `src/components/sections/contact-section.tsx` | `'use client'` | Commission and private inquiry form. Handles client-side submission state toggle (`submitted`). Fields: Full Name, Email, Request Type dropdown, and Message textarea. |
| **Footer** | `src/components/shared/footer.tsx` | Server Component | 3-column layout: brand statement, atelier address (`Marta Atelier, 42 / Genève, Suisse`), social/contact icons (`Compass`, `Mail`, `Shield`), and bottom legal row. |

### 4.2 UI Primitives

- `src/components/ui/button.tsx`: CVA button variant implementation (`default`, `outline`, `secondary`, `ghost`, `link`). However, variant classes reference undefined Tailwind tokens (`bg-walnut`, `text-cream`, `hover:bg-terracotta`).
- `src/components/ui/clip-path-image.tsx`: Renders 3 items masked by inline SVG `<clipPath>` definitions (`#clip-squiggle`, `#clip-rect`, `#clip-another`). Uses raw HTML `<img>` elements.
- `src/components/ui/demo.tsx`: Standalone wrapper component demonstrating `ClippedMediaGallery`. Not imported in the main application flow.

---

## 5. Current Asset Architecture

### 5.1 Asset Inventory

All static media files reside under `public/images/`:

```text
public/images/
├── darilux1.jpeg           (101 KB)  - Exhibition piece (currently unused)
├── darilux3.jpeg           (142 KB)  - Used: Collection (Totem Sculptural N°3)
├── darilux4.jpeg           (50 KB)   - Used: Collection (Piliers Totémiques)
├── darilux5.jpeg           (67 KB)   - Used: Hero, Collection, Clipped Gallery
├── darilux6.jpeg           (42 KB)   - Used: Collection, Clipped Gallery
├── darilux7.jpeg           (49 KB)   - Used: Collection (Table Monolithe)
├── darilux8.jpeg           (31 KB)   - Used: Collection, Clipped Gallery
├── sarilux2.jpeg           (61 KB)   - Used: Featured Section (Console Sphaera) [TYPO]
├── handmade/                         - High-Resolution Studio Catalog (Completely Unused)
│   ├── decor1.jpeg         (268 KB)
│   ├── decor2.jpeg         (164 KB)
│   ├── decor3.jpeg         (228 KB)
│   ├── decor4.jpeg         (195 KB)
│   └── decor5.jpeg         (239 KB)
│   └── luxury/                       - Premium Wooden Sculptures & Art Objects (Completely Unused)
│       ├── handluxury1.jpeg  (139 KB)
│       ├── handluxury2.jpeg  (150 KB)
│       ├── handluxury3.jpeg  (141 KB)
│       ├── handluxury4.jpeg  (135 KB)
│       ├── handluxury5.jpeg  (122 KB)
│       ├── handluxury6.jpeg  (135 KB)
│       ├── handluxury7.jpeg  (114 KB)
│       ├── handluxury8.jpeg  (129 KB)
│       ├── handluxury9.jpeg  (142 KB)
│       ├── handluxury10.jpeg (137 KB)
│       └── handluxury11.jpeg (103 KB)
```

### 5.2 Image Referencing & Optimization Deficiencies

1. **Raw `<img>` Elements:** Throughout `hero-section.tsx`, `featured-section.tsx`, `collection-section.tsx`, and `clip-path-image.tsx`, images are rendered via unoptimized `<img src="..." />` tags instead of Next.js `<Image />`.
2. **Missing Next.js Optimization:** No WebP/AVIF generation, no responsive `srcset`, no lazy loading placeholders, and no dimension containment. This directly triggers `@next/next/no-img-element` ESLint warnings and compromises mobile LCP (Largest Contentful Paint).
3. **Asset Naming Inconsistency:** `sarilux2.jpeg` is misspelled with an `s` instead of a `d`. Any rename must be coordinated with the code to avoid 404s.
4. **Rich Untapped Catalog:** 16 authentic, high-quality images in `handmade/` and `handmade/luxury/` represent actual luxury handcrafted wood sculptures, vases, and organic decorative pieces. **None of these are currently referenced anywhere in the application.**

---

## 6. Current Styling System

### 6.1 Tailwind CSS v4 Architecture

The project runs on **Tailwind CSS v4** (`@tailwindcss/postcss`). In Tailwind v4, configuration is declared directly in CSS rather than in a JavaScript/TypeScript config file:

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-bg-primary: #F7F5F3;
  --color-bg-dark: #5C3D2E;
  --color-text-primary: #3B2F2F;
  --color-text-accent: #C0784A;
  --color-text-light: #F7F5F3;
  --color-border-subtle: #E8E4E0;
  --color-card-bg: #FFFFFF;

  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
}
```

### 6.2 Design System Audit & Token Gaps

| Dimension | Declared Tokens | Actual Usage in Code | Status / Issue |
| :--- | :--- | :--- | :--- |
| **Palette** | `--color-bg-primary`: `#F7F5F3`<br>`--color-bg-dark`: `#5C3D2E`<br>`--color-text-primary`: `#3B2F2F`<br>`--color-text-accent`: `#C0784A`<br>`--color-border-subtle`: `#E8E4E0` | Scattered arbitrary hex classes (`bg-[#F7F5F3]`, `text-[#3B2F2F]`, `border-[#E8E4E0]`, `bg-[#5C3D2E]`). `button.tsx` uses undeclared `bg-walnut`, `text-cream`, `bg-sand`. | **Fragmented:** High duplication of arbitrary hex codes. Theme tokens are bypassed. |
| **Typography** | Display: `Cormorant Garamond`<br>Body: `Inter` | Loaded via `<link>` tags in `layout.tsx`. | **Rule Violation:** Global rules forbid Inter/Roboto/Arial. Body typography must be upgraded to a refined luxury typeface. Must migrate to `next/font/google`. |
| **Spacing** | Default Tailwind scale | Heavy use of fixed arbitrary pixel values: `py-[120px]`, `min-h-[500px]`, `py-28`. | Lacks fluid clamp-based vertical pacing (`clamp(4rem, 8vw, 8rem)`). |
| **Border Radius** | Default Tailwind scale | Inconsistent: `rounded-none` on buttons & inputs, `rounded-[16px]` in hero, `rounded-[12px]` in collection, `rounded-xl` in featured, `rounded-full` for badges. | No coherent corner hierarchy. |
| **Shadows** | Default Tailwind scale | Custom inline arbitrary shadows: `shadow-[0_20px_60px_rgba(0,0,0,0.08)]`, `shadow-[0_10px_30px_rgba(0,0,0,0.02)]`. | Needs unified elevation system. |
| **Breakpoints** | Standard Tailwind (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`) | Breakpoints are respected (`hidden md:flex`, `grid-cols-1 md:grid-cols-3`). | Sound baseline. |
| **Containers** | None declared in `@theme` | `max-w-7xl mx-auto px-6 md:px-12` manually repeated on every section wrapper. | Should be abstracted into a unified container utility. |

---

## 7. Current Animation System

1. **Framer Motion (`^11.18.2`):**
   - Active in `hero-section.tsx`: Staggered entry transitions (`opacity`, `scale`, `y` translation) with custom cubic bezier easing `[0.22, 1, 0.36, 1]`.
   - Active in `philosophy-section.tsx`: Scroll-triggered viewport reveals (`whileInView`, `viewport={{ once: true, margin: "-100px" }}`).
   - Active in `collection-section.tsx`: Smooth animated tab underline via `layoutId="activeFilterUnderline"` with spring physics (`stiffness: 380, damping: 30`), plus `layout` animations on product grid items.
   - Active in `featured-section.tsx`: Scroll-triggered reveal animations.
2. **CSS Animations:**
   - Keyframe animation `fadeInUp` in `globals.css` applied to `.animate-fade-in-up` (used in mobile navigation drawer).
   - Custom hover underline expansion via `.nav-link::after` transform scale.
3. **Motion Readiness:** The project already has a solid technical foundation with Framer Motion. The upcoming redesign does **not** need package installation for Framer Motion, but rather architectural elevation (e.g. smooth scroll choreography, staggered editorial text reveals, parallax effects on imagery, and micro-interactions).

---

## 8. Current Content Architecture

- **Hardcoded in JSX:** 100% of website copy is hardcoded directly inside component JSX files.
- **In-file Data Arrays:**
  - `collection-section.tsx`: Inlines `const PRODUCTS: ProductItem[] = [...]` containing 6 items with hardcoded French titles, materials, dimensions, and prices.
  - `process-section.tsx`: Inlines `const steps = [...]` containing 3 artisanal step descriptions.
- **Zero Content Separation:** There is no separate content layer, no Markdown/MDX parser, no JSON dictionary files, and no CMS integration. Any copy update requires modifying React component code.

---

## 9. Current SEO Architecture

### 9.1 Metadata Audit (`src/app/layout.tsx`)

```typescript
export const metadata: Metadata = {
  title: "Darilux — Sculptures et Mobilier d'Art en Bois",
  description: "Darilux conçoit des objets décoratifs rares...",
  keywords: ["objets décoratifs de luxe", "mobilier sculptural", ...],
  openGraph: {
    title: "Darilux — Sculptures et Mobilier d'Art en Bois",
    description: "Des objets qui portent le temps et l'espace.",
    type: "website",
  },
};
```

### 9.2 SEO Deficiencies & Gaps

1. **Static & Monolingual:** Only French metadata is provided.
2. **Missing OpenGraph Assets:** No `og:image`, `og:image:width`, `og:image:height`, or `og:locale`.
3. **Missing Twitter Metadata:** No `twitter:card`, `twitter:title`, `twitter:description`, or `twitter:image`.
4. **Missing Technical SEO Files:**
   - No `src/app/robots.ts` (or `public/robots.txt`).
   - No `src/app/sitemap.ts` (or `public/sitemap.xml`).
   - No canonical URL tag (`metadataBase` is not defined).
   - No `alternates` declaration with `hreflang` attributes for future multilingual routes.
5. **No Structured Data (JSON-LD):** Missing Schema.org markup for `Organization`, `LocalBusiness` / `ArtGallery`, and `Product`.

---

## 10. Current Responsive Architecture

- **Mobile Viewport (< 768px):**
  - Navbar collapses to a hamburger button with a slide/fade-down drawer.
  - Hero section inverts column order (`order-first lg:order-last`) so the primary visual appears on top.
  - Multi-column grids (`collection`, `process`, `featured`, `footer`) collapse gracefully to single-column layouts (`grid-cols-1`).
  - Hero statistics switch to a horizontally scrollable container (`overflow-x-auto snap-x`).
- **Tablet Viewport (768px – 1024px):**
  - Collection displays 2 columns (`md:grid-cols-2`).
  - Contact form fields display 2 columns (`md:grid-cols-2`).
- **Desktop Viewport (> 1024px):**
  - Standard 3-column collection grid, 12-column split layouts for hero, philosophy, and featured showcase.
  - Fixed maximum content container of `max-w-7xl` (1280px).

---

## 11. Current Accessibility

| Area | Current State | Deficiencies & Remediation Required |
| :--- | :--- | :--- |
| **Document Language** | Hardcoded `<html lang="fr">` | Must dynamically reflect the active locale (`fr`, `en`, `de`, `ar`). Must add `dir="rtl"` for Arabic. |
| **Interactive Controls** | Basic `<button>` and `<a>` | Mobile menu toggle lacks `aria-expanded`, `aria-label`, and `aria-controls`. Focus ring styles are inconsistently applied. |
| **Images & Media** | Basic `alt` attributes present | SVG clip-paths use inline clipping without fallback masks. Some alt texts are generic. |
| **Links as Buttons** | `<a href="#">` and `<a href="#contact">` | Links without valid targets or dummy pagination buttons (`<button>` with empty click handlers) hinder screen readers. |
| **Color Contrast** | High contrast on primary text (`#3B2F2F` on `#F7F5F3` is 9.5:1) | Subtle text elements (`text-[#3B2F2F]/45` and `text-[#F7F5F3]/50`) fall below WCAG AA 4.5:1 minimums. |
| **Keyboard Navigation** | Smooth scrolling via CSS | No "Skip to main content" link. Mobile menu drawer does not trap focus when open. |

---

## 12. Current Multilingual Readiness

### 12.1 Evaluation of Current Codebase

- Current Readiness Score: **0%**
- Every route, layout, component, form label, validation response, and metadata string is tightly bound to French.
- No locale routing exists in `src/app`.
- Directionality is hardcoded LTR.

### 12.2 Architectural Strategy Comparison for Darilux

| Strategy | Pros | Cons | Verdict for Darilux |
| :--- | :--- | :--- | :--- |
| **1. Next.js App Router Native Subpaths (`/[locale]`) + Typed Dictionaries** | • Zero external dependencies.<br>• Immune to Next 16 / React 19 canary peer-dependency breakages.<br>• Full Server Component (RSC) performance: translations loaded server-side with zero client JS overhead.<br>• Direct control over `dir="rtl"` for Arabic.<br>• Simple JSON/TS dictionaries. | • Pluralization and complex ICU formatting require custom helper if needed. | **RECOMMENDED & SAFEST** |
| **2. `next-intl`** | • Full-featured ICU message formatting.<br>• Rich ecosystem with hooks (`useTranslations`) and middleware routing. | • Next.js version in project is `16.2.10` and React is `19.2.4`. External i18n packages often lag behind canary/pre-release Next versions with peer dependency conflicts. | Viable alternative once dependencies are validated. |
| **3. Client-Side Context (`i18next` / React Context)** | • Easy client-side switching without route change. | • Disables Server-Side Rendering (SSR) for translated text.<br>• Severe SEO penalty for multilingual indexing.<br>• Violates Next.js App Router best practices. | **REJECTED** |

**Multilingual Conclusion:** The recommended path is **Next.js App Router Native `/[locale]` Routing with Typed Dictionaries** (`src/content/{fr,en,de,ar}/*.json`). A lightweight middleware inspects the URL, cookies, and `Accept-Language` headers, redirecting `/` to `/[locale]`. This guarantees zero dependency bloat, 100% RSC compatibility, instant TTFB, and flawless Arabic RTL layout handling.

---

## 13. 21st.dev Compatibility

Compatibility with modern 21st.dev / shadcn-style component libraries was rigorously evaluated:

| Prerequisite | Status | Details |
| :--- | :--- | :--- |
| **TypeScript** | **Compatible** | Full TypeScript 5 strict environment with `@/*` path mapping. |
| **Tailwind CSS** | **Needs Token Alignment** | Project uses Tailwind CSS v4. Many 21st.dev components assume Tailwind v3 CSS variable conventions (`--background`, `--foreground`, `--primary`, `--border`, etc.). In Tailwind v4, these must be explicitly registered under `@theme` in `globals.css`. |
| **`@/components/ui`** | **Partial** | Directory exists, but currently contains only `button.tsx`, `clip-path-image.tsx`, and `demo.tsx`. Full shadcn primitives (dialog, sheet, dropdown, tooltip, badge) are not yet present. |
| **`lucide-react`** | **Compatible** | Installed (`^0.468.0`) and ready for immediate consumption. |
| **`framer-motion`** | **Compatible** | Installed (`^11.18.2`) and actively utilized. |
| **React 19 Readiness** | **Compatible with Care** | React 19 is running. Any component using `React.FC` or legacy `ref` passing must use React 19 patterns (ref as a prop, modern hooks). `@radix-ui/react-slot` is already on v1.3.0. |

---

## 14. Technical Risks

1. **Next.js 16.2.10 & React 19 Bleeding-Edge Foundation:**
   - In Next.js 15/16, page and layout props (`params`, `searchParams`) are asynchronous Promises:
     ```typescript
     // Required Next.js 15/16 pattern:
     export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
       const { locale } = await params;
     }
     ```
   - Treating `params` as a synchronous object will trigger runtime warnings or build failures.
2. **ESLint Validation Failure (48 Problems):**
   - Running `npm run lint` fails with exit code 1.
   - **41 errors:** `react/no-unescaped-entities` caused by unescaped single quotes (`'`) in French text strings across JSX.
   - **7 warnings:** `@next/next/no-img-element` because raw `<img>` is used everywhere.
   - Forbidden `require()` imports flagged inside `.agents/skills/design-system/scripts/`. `.agents/**` must be excluded in `eslint.config.mjs`.
3. **Typography Rule Violation:**
   - Current codebase uses Inter (`--font-body: 'Inter'`), directly conflicting with the user's global rule forbidding generic fonts (Inter, Roboto, Arial).
4. **Arabic (RTL) Layout Complications:**
   - Arabic script requires font switching (e.g. Amiri / Noto Naskh + Readex Pro).
   - Layout directional classes must use logical properties (`ms-`, `me-`, `start-`, `end-`) instead of physical properties (`ml-`, `mr-`, `left-`, `right-`).
5. **Asset Typo:**
   - `sarilux2.jpeg` must either be aliased or carefully updated to avoid broken images.
6. **Mismatches in Theoretical Docs vs Actual Code:**
   - `docs/state-management.md` and `docs/architecture.md` claim Zustand, TanStack Query, and `next-safe-action` are configured. In reality, `src/store/`, `src/services/`, and `src/hooks/` are completely empty, and none of those packages are in `package.json`.

---

## 15. Recommended Target Architecture

The target architecture adapts the user's vision to the Next.js 16 App Router, incorporating native i18n, typed content dictionaries, design tokens, and modular feature components:

```text
darilux/
├── docs/
│   └── DARILUX-ARCHITECTURE-AUDIT.md
├── public/
│   ├── favicon.ico
│   └── images/
│       ├── brand/                     # Wordmark, crest, hallmarks
│       ├── collections/               # Curated collection imagery
│       ├── atelier/                   # Craftsmanship, tools, wood essences
│       ├── products/                  # High-resolution catalog (migrated from handmade/luxury)
│       └── hero/                      # Cinematic hero background & featured art objects
├── src/
│   ├── app/
│   │   ├── [locale]/                  # Dynamic locale segment (fr, en, de, ar)
│   │   │   ├── layout.tsx             # Localized root layout (sets lang, dir, fonts, metadata)
│   │   │   ├── page.tsx               # Cinematic editorial homepage
│   │   │   ├── collection/
│   │   │   │   ├── page.tsx           # Full museum-grade collection gallery
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx       # Individual masterpiece exhibition page
│   │   │   ├── atelier/
│   │   │   │   └── page.tsx           # Craftsmanship, philosophy & wood sourcing
│   │   │   ├── contact/
│   │   │   │   └── page.tsx           # Private visits & bespoke commissions
│   │   │   └── not-found.tsx          # Localized 404 experience
│   │   ├── globals.css                # Tailwind v4 @theme, luxury color system, typography tokens
│   │   ├── robots.ts                  # Dynamic SEO robots configuration
│   │   └── sitemap.ts                 # Dynamic multilingual sitemap with alternates
│   ├── components/
│   │   ├── ui/                        # 21st.dev / Radix primitives (button, dialog, drawer, badge)
│   │   ├── layout/                    # Page wrappers, smooth scroll container, section frames
│   │   ├── navigation/                # Localized luxury navbar, language switcher, mobile drawer
│   │   ├── hero/                      # Cinematic hero section with video/staggered typography
│   │   ├── collection/                # Product grid, filter controls, product card
│   │   ├── product/                   # Detail views, specification tables, dimension schematics
│   │   ├── gallery/                   # Museum lightbox, organic clipped image choreography
│   │   ├── storytelling/              # Atelier manifesto, artisan quotes, material showcases
│   │   ├── atelier/                   # Workshop process steps, wood essences guide
│   │   ├── contact/                   # Commission inquiry form, concierge dialog
│   │   ├── footer/                    # Multi-column editorial footer with locale links
│   │   └── motion/                    # Reusable Framer Motion wrappers (Reveal, Parallax, Stagger)
│   ├── content/                       # Static typed dictionaries per locale
│   │   ├── fr/                        # { common.json, home.json, collection.json, atelier.json }
│   │   ├── en/                        # { common.json, home.json, collection.json, atelier.json }
│   │   ├── de/                        # { common.json, home.json, collection.json, atelier.json }
│   │   └── ar/                        # { common.json, home.json, collection.json, atelier.json }
│   ├── data/                          # Structured catalog datasets
│   │   ├── collections.ts             # Series metadata (Totems, Monolithes, Vases, Sphaera)
│   │   └── products.ts                # Master product catalogue linking images, specs, editions
│   ├── lib/
│   │   ├── i18n/                      # Locale definitions, dictionary loader, RTL helpers
│   │   │   ├── config.ts              # Supported locales: ['fr', 'en', 'de', 'ar'], default: 'fr'
│   │   │   └── get-dictionary.ts      # Type-safe dictionary loader function
│   │   └── utils.ts                   # cn() class merge helper
│   ├── proxy.ts                       # Next.js 16 edge proxy / middleware locale router
│   └── types/                         # Shared TypeScript interfaces (Product, Locale, Dictionary)
```

---

## 16. Recommended Migration Strategy

To guarantee zero regression and seamless evolution, the redesign should follow a 6-phase plan:

```
[Phase 1: Foundation & Tokens]
       │
       ▼
[Phase 2: Multilingual Infrastructure]
       │
       ▼
[Phase 3: Catalog Data & Asset Organization]
       │
       ▼
[Phase 4: Component Primitives & Motion System]
       │
       ▼
[Phase 5: Page Assembly & Editorial Design]
       │
       ▼
[Phase 6: Polish, SEO & Accessibility Audit]
```

1. **Phase 1: Foundation, Tokens & Lint Resolution**
   - Update `eslint.config.mjs` to ignore `.agents/**` and configure rule adjustments for Next.js.
   - Define the complete luxury color system in `src/app/globals.css` using Tailwind v4 `@theme`.
   - Setup distinctive typography via `next/font/google` (e.g. *Cormorant Garamond* display + *Plus Jakarta Sans* / *Tenor Sans* body for Latin; *Amiri* / *Noto Naskh* + *Readex Pro* for Arabic).
   - Resolve button variant token references.
2. **Phase 2: Multilingual Infrastructure**
   - Establish `src/lib/i18n/config.ts` (`locales: ['fr', 'en', 'de', 'ar']`, `defaultLocale: 'fr'`).
   - Create typed JSON dictionary templates in `src/content/{fr,en,de,ar}/`.
   - Move `src/app/page.tsx` and `src/app/layout.tsx` into `src/app/[locale]/`.
   - Implement localized layout handling `lang={locale}` and `dir={locale === 'ar' ? 'rtl' : 'ltr'}`.
   - Add Next.js middleware / proxy routing for automatic locale detection and URL normalization.
3. **Phase 3: Catalog Data & Asset Organization**
   - Move the 16 untapped high-res images from `handmade/` and `handmade/luxury/` into structured paths (`public/images/products/`).
   - Consolidate all product records into `src/data/products.ts` with multi-essence specifications, limited edition counters, dimensions, and locale-agnostic keys.
4. **Phase 4: Component Primitives & Motion System**
   - Establish reusable motion primitives (`<FadeIn>`, `<ScrollReveal>`, `<ParallaxImage>`) wrapping `framer-motion`.
   - Build accessible language switcher component with active state indicators.
   - Build modular `<ProductCard />`, `<SectionHeading />`, and `<LuxuryContainer />`.
5. **Phase 5: Page Assembly & Editorial Design**
   - Assemble the new luxury experience:
     - Hero: Large immersive imagery, cinematic typography, warm wood accents.
     - Philosophy & Atelier: Editorial gallery storytelling, craftsmanship focus.
     - Collections: Filterable gallery with product inspection modal or dedicated detail pages.
     - Masterpiece Showcase: Cinematic spotlight on featured limited series.
     - Contact & Private Concierge: Luxury inquiry flow for architects and collectors.
6. **Phase 6: Polish, SEO & Accessibility Audit**
   - Implement `src/app/sitemap.ts` and `src/app/robots.ts` with multi-language alternate links.
   - Add Schema.org JSON-LD structured data.
   - Full keyboard navigation and screen-reader audit.
   - Verify production build and zero ESLint errors.

---

## 17. Files That Should Be Protected

During future agent tasks and redesign steps, the following files should **NOT** be blindly overwritten or deleted:

1. **`AGENTS.md` & `CLAUDE.md`:** Must be preserved and enriched. They contain critical project-specific directives regarding Next.js 16 conventions.
2. **`next.config.ts`:** Contains required Turbopack workspace root configuration (`turbopack.root = path.join(__dirname)`) and image domain whitelist.
3. **`public/images/handmade/**`:** The 16 raw product images (`decor1`–`decor5`, `handluxury1`–`handluxury11`) are authentic handcrafted studio photography. They must be preserved and utilized as primary catalog assets.
4. **`package.json` Core Architecture:** Do not downgrade Next.js from `16.2.10`, React from `19.2.4`, or Tailwind from `v4`. Maintain the forward-looking stack.

---

## 18. Ratified Architectural Decisions & Pre-Implementation Directives

The following architectural and design decisions have been ratified by the project owner:

### 18.1 Information Architecture & Routing
- **Architecture Model:** Multi-page architecture paired with a cinematic editorial homepage.
- **Required Localized Routes:**
  - `/[locale]` — Immersive editorial homepage (primary showcase)
  - `/[locale]/collection` — Curated artwork catalog & series index
  - `/[locale]/collection/[slug]` — Dedicated exhibition / detail page per artwork
  - `/[locale]/atelier` — Craftsmanship, material provenance & philosophy
  - `/[locale]/contact` — Private visits, concierge & bespoke commission inquiries
- **Artwork Detail Pages:** Every masterpiece receives a dedicated URL with high-fidelity imagery, dimensional schematics, and provenance narrative.

### 18.2 Typography System
- **Display Typography (Latin):** *Cormorant Garamond* (loaded via `next/font/google`).
- **Body & Interface Typography (Latin):** *Tenor Sans* (replaces forbidden *Inter*; provides refined, museum-grade editorial character).
- **Interface & Body Typography (Arabic):** *Readex Pro* (contemporary luxury grotesk, optimized for high legibility on screens).
- **Directionality & Layout:** Full RTL support (`dir="rtl"`) for Arabic locale (`ar`). All CSS layout rules must prioritize logical properties (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) over physical left/right.

### 18.3 Commercial & Inquiry Model
- **Model:** Exclusive Private Concierge / Bespoke Commission model.
- **Explicit Exclusions:** No e-commerce cart, checkout, Stripe, or Shopify integration.
- **Pricing:** Masterpieces are classified strictly as "Price on request" / "Tarif sur demande".

### 18.4 Asset Migration & Preservation Plan
- **Target Asset Directories:**
  - `public/images/products/`
  - `public/images/collections/`
  - `public/images/atelier/`
  - `public/images/hero/`
- **Typo Normalization:** `sarilux2.jpeg` → `darilux2.jpeg` (normalized during asset organization).
- **Preservation Directive:** Original source assets under `public/images/handmade/` must **not** be deleted until all references in code and data dictionaries have been fully migrated and verified.

### 18.5 Finalized Brand Identity: LUXAVÉN
- **Final Public Brand:** **LUXAVÉN** (preserves the **É** accent in all public-facing text)
- **Technical Identifier / Slug:** `luxaven`
- **Domain:** `luxaven.art`
- **Contact Email:** `contact@luxaven.art`
- **Previous Brand:** DARILUX — fully deprecated as a public brand.
- **Implemented Abstraction:** `src/lib/brand.config.ts` is now the single source of truth for all public-facing brand parameters.
- **Rule:** Never hardcode the public brand name in UI components when the value can be imported from `brandConfig`.

### 18.6 Current Status
- **Foundation State:** Brand abstraction established in `src/lib/brand.config.ts`.
- **Holding State:** Visual redesign, hero re-creation, asset moves, and multilingual routes remain paused until Phase 1 implementation begins.


