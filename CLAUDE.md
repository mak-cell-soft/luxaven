@AGENTS.md

# LUXAVÉN Brand & Coding Guidelines

## Brand Identity Rules
- **Display Brand:** LUXAVÉN (Always preserve the **É** accent in user-visible text)
- **Technical Identifier / Slug:** `luxaven` (lowercase, no diacritics, for routes, filenames, env vars)
- **Domain:** luxaven.art
- **Contact Email:** contact@luxaven.art
- **Previous Brand:** DARILUX — deprecated, must never be used as current public brand.

## Centralized Brand Abstraction
- All brand values (name, domain, email, tagline, description, atelier details) must be imported from `@/lib/brand.config` (`brandConfig`).
- Do not hardcode the public brand name in UI components when the value can be imported from `brand.config.ts`.

## Architecture & i18n
- Multi-locale App Router structure: `src/app/[locale]/`
- Supported Locales: `fr` (default), `en`, `de`, `ar` (RTL)
- Dictionaries: `src/content/{fr,en,de,ar}/dictionary.ts`
- Product Data: `src/data/products.ts` with stable canonical slugs
- Typography: Cormorant Garamond (display), Tenor Sans (Latin body), Readex Pro (Arabic body)
- Commercial Model: Private concierge & bespoke commission ("Price on request") — no ecommerce cart or checkout.
