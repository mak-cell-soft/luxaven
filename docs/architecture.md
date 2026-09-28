# LUXAVÉN Architecture Documentation

> **Status:** Phase 1 (Architecture & Foundation Migration) Complete  
> **Brand:** LUXAVÉN  
> **Domain:** https://luxaven.art  
> **Framework:** Next.js 16.2.10 (App Router with Turbopack)  
> **Runtime:** React 19.2.4  
> **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`)  

---

## 1. Architectural Overview

LUXAVÉN is an editorial, cinematic web experience representing a premium handcrafted wood and art-object brand based in Switzerland.

The site is **not** an e-commerce shop:
- No cart
- No online checkout
- No Stripe or Shopify
- Commercial interaction model: **Discover → Explore → Inquire → Private Concierge / Bespoke Commission**
- Artwork pricing model: **"Price on request" / "Tarif sur demande"**

The application uses native Next.js App Router Server-First architecture with typed content dictionaries, static route generation, and zero heavy client-side i18n runtimes.

---

## 2. Route Architecture

All public routes are internationalized with the locale explicitly represented in the URL path segment:

```text
src/app/
├── [locale]/
│   ├── layout.tsx                # Localized root layout (lang, dir, fonts, SEO)
│   ├── page.tsx                  # Immersive editorial homepage
│   ├── not-found.tsx             # Localized 404 handler
│   ├── collection/
│   │   ├── page.tsx              # Curated artwork collection index
│   │   └── [slug]/
│   │       └── page.tsx          # Exhibition detail page per masterpiece
│   ├── atelier/
│   │   └── page.tsx              # Craftsmanship, wood essences & process
│   └── contact/
│       └── page.tsx              # Private concierge & bespoke commission inquiries
├── globals.css                   # Tailwind v4 theme, luxury tokens & keyframes
├── robots.ts                     # Automated Next.js robots configuration
└── sitemap.ts                    # Dynamic multilingual sitemap with alternates
```

### Route Inventory

| Route Pattern | Purpose | SSG / Rendering |
| :--- | :--- | :--- |
| `/[locale]` | Editorial Homepage | SSG (`fr`, `en`, `de`, `ar`) |
| `/[locale]/collection` | Artwork Collection Index | SSG (`fr`, `en`, `de`, `ar`) |
| `/[locale]/collection/[slug]` | Individual Artwork Exhibition Page | SSG (7 artworks × 4 locales = 28 pages) |
| `/[locale]/atelier` | Atelier Philosophy & Process | SSG (`fr`, `en`, `de`, `ar`) |
| `/[locale]/contact` | Concierge & Commission Inquiries | SSG (`fr`, `en`, `de`, `ar`) |
| `/robots.txt` | Crawler Directives & Sitemap reference | Static App Router file convention |
| `/sitemap.xml` | Full index with hreflang alternates | Static App Router file convention |

---

## 3. Locale & Internationalization Architecture

### 3.1 Supported Locales

Defined in `@/lib/i18n/config`:
- **`fr`** — Français (Default Locale)
- **`en`** — English
- **`de`** — Deutsch
- **`ar`** — العربية (RTL)

### 3.2 Root Redirect (`/` → `/fr`)
When visitors request the root path `/`:
1. Server redirects configured in `next.config.ts` issue a 307 temporary redirect to `/fr`.
2. Edge proxy in `src/proxy.ts` (Next 16 proxy convention) normalizes requests and guarantees redirection before page rendering.
3. No client-side JavaScript redirect is executed.

### 3.3 Locale Validation
- Any invalid locale (e.g. `/xx` or `/invalid/path`) is validated in `src/app/[locale]/layout.tsx` via `isLocale(locale)`.
- If invalid, Next.js `notFound()` is invoked immediately, ensuring invalid paths never silently render default French content.

### 3.4 Bidirectional Support (LTR / RTL)
- French, English, and German render with `<html lang="{locale}" dir="ltr">`.
- Arabic renders with `<html lang="ar" dir="rtl">`.
- All styling relies on CSS logical properties (`inset-inline-start`, `border-s-*`, `ps-*`, `pe-*`, `ms-*`, `me-*`) rather than arbitrary physical left/right rules.
- Transform icons (e.g. arrows) utilize Tailwind `rtl:rotate-180` to respect visual reading direction.

---

## 4. Content Dictionaries

Content is segregated into typed TypeScript dictionaries in `src/content/`:
```text
src/content/
├── fr/dictionary.ts
├── en/dictionary.ts
├── de/dictionary.ts
└── ar/dictionary.ts
```

All dictionaries implement the strict interface `Dictionary` from `src/lib/i18n/types.ts`:
- `navigation`: Menu links, action labels
- `hero`: Eyebrow, headings, descriptive copy, workshop statistics
- `philosophy`: Atelier manifesto, artisan quotes, material ethos
- `collection`: Category filters, pricing labels, inquiry actions
- `featured`: Masterpiece spotlights, technical specifications
- `process`: Step-by-step crafting workflow
- `atelier`: Material provenance, wood essences, craftsmanship narrative
- `contact`: Concierge inquiry fields, commission options, confirmation messages
- `footer`: Atelier address, legal links, press kit
- `common`: Reusable brand strings, 404 copy, back-navigation

Loaded server-side with zero client bundle overhead via `getDictionary(locale)` in `src/lib/i18n/dictionaries.ts`.

---

## 5. Product & Artwork Data Architecture

Product/artwork records are separated from UI components into `src/data/products.ts`:
- Each artwork has a **stable technical canonical slug** (e.g. `totem-atelier-1`, `console-sphaera`).
- URLs do not alter slugs across languages (`/fr/collection/console-sphaera`, `/en/collection/console-sphaera`, `/ar/collection/console-sphaera`).
- Technical metadata (dimensions, images, category, year, availability) is shared.
- Linguistic fields (title, material description, provenance notes) are mapped by `Locale`.
- No speculative product data: unverified prices, dimensions, or years remain absent or nullable.

---

## 6. Brand Configuration Single Source of Truth

All brand constants reside in `src/lib/brand.config.ts`:
- **Public Brand Name:** `LUXAVÉN` (always with the **É** accent)
- **Technical Identifier / Slug:** `luxaven`
- **Domain:** `https://luxaven.art`
- **Email:** `contact@luxaven.art`
- **Atelier Address:** Marta Atelier, 42, Genève, Suisse
- Brand values must never be hardcoded into UI components.

---

## 7. Typography System

Typography is centrally configured in `src/lib/fonts.ts` via `next/font/google`:
- **Display Typography (Latin & Display):** *Cormorant Garamond* (`--font-display`)
- **Body & UI Typography (Latin):** *Tenor Sans* (`--font-body`)
- **Body & UI Typography (Arabic):** *Readex Pro* (`--font-arabic`)
- Generic fonts (*Inter*, *Roboto*, *Arial*) are strictly disallowed.

---

## 8. SEO & Metadata Strategy

- **Metadata API:** Every page generates metadata via `generatePageMetadata()` in `src/lib/seo/metadata.ts`.
- **Hreflang Alternates:** Automatically generates `canonical`, `fr`, `en`, `de`, `ar`, and `x-default` links with absolute URLs matching `https://luxaven.art`.
- **OpenGraph & Twitter:** Fully localized OG tags, titles, and descriptions.
- **Sitemap & Robots:** `src/app/sitemap.ts` and `src/app/robots.ts` dynamically index all 4 locales and all 28 artwork routes.
- **Structured Data (JSON-LD):** Implemented in `src/components/seo/json-ld.tsx` with Schema.org `Organization` and `VisualArtwork`. Artworks are classified as fine art sculptures with inquiries, avoiding false commercial e-commerce markup.

---

## 9. Asset Preservation

All image assets under `public/images/darilux*.jpeg`, `sarilux2.jpeg`, and `public/images/handmade/**` have been strictly preserved. Asset reorganizations and next/image conversions will occur in a dedicated subsequent phase.
