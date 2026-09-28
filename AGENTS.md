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
