<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# BRAND IDENTITY

- **Public brand:** LUXAVÉN
- **Technical identifier:** luxaven
- **Domain:** luxaven.art
- **Contact email:** contact@luxaven.art
- **Previous brand:** DARILUX (deprecated — never use as the current public brand).
- **Display formatting:** Always preserve the **É** accent when displaying the brand to users (LUXAVÉN).
- **Technical slug formatting:** Use `luxaven` without the accent for technical identifiers, URLs, filenames where required, environment variables, slugs, etc.
- **Single Source of Truth:** Brand values must come from `src/lib/brand.config.ts` instead of being duplicated across components.
- **Rule:** Do not hardcode the public brand name in UI components when the value can be imported from `brand.config.ts`.

# ARCHITECTURE CONVENTIONS (PHASE 1 MIGRATION COMPLETE)

- **Routing:** Next.js 16 App Router native localized subpaths under `src/app/[locale]/`.
- **Supported Locales:** `fr` (default), `en`, `de`, `ar` (RTL). Defined in `src/lib/i18n/config.ts`.
- **Root Redirect:** `/` redirects to `/fr` via server redirects and `src/proxy.ts`.
- **Directionality:** Arabic routes genuinely render `<html dir="rtl" lang="ar">`. Use CSS logical properties (`ms-*`, `me-*`, `inset-inline-*`, etc.).
- **Typography:**
  - Display: Cormorant Garamond (`--font-display`)
  - Latin Body: Tenor Sans (`--font-body`)
  - Arabic Body: Readex Pro (`--font-arabic`)
  - Inter, Roboto, and Arial are strictly forbidden.
- **Content Dictionaries:** Typed per-locale dictionaries in `src/content/{fr,en,de,ar}/dictionary.ts`. Loaded via `getDictionary(locale)` in `src/lib/i18n/dictionaries.ts`.
- **Product Data:** Separated in `src/data/products.ts`. Artworks use stable technical canonical slugs (e.g. `/fr/collection/console-sphaera`). No speculative prices or unverified specs.
- **Commercial Model:** Private concierge / bespoke commission. No cart, no checkout, no payment gateways.
- **Asset Preservation:** Source assets in `public/images/darilux*.jpeg` and `public/images/handmade/**` must NOT be moved or deleted during architectural phases.
