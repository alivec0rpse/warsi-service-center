# Project Guidelines

## Code Style
- Use TypeScript for UI components and keep props explicitly typed.
- Keep interactive React islands in src/components/ui and use "use client" when browser APIs or animation state are required.
- Prefer the @/ path alias for imports from src.
- Reuse utility composition patterns already in the codebase (for example, cn from src/lib/utils.ts and CVA-based variants in src/components/ui/button.tsx).
- Keep Tailwind class naming aligned with the existing semantic tokens and mono palette in tailwind.config.mjs.

## Architecture
- Framework: Astro static site with React components.
- Entry page: src/pages/index.astro.
- Shared layout: src/layouts/BaseLayout.astro.
- UI components: src/components/ui.
- Structured data content: src/data/timeline.ts.
- Global styles: src/styles/global.css.
- Business/source-of-truth content: BUSINESS_REFERENCE.md.

## Build and Test
- Install dependencies: npm install.
- Start development server: npm run dev.
- Build production output: npm run build.
- Preview production build: npm run preview.
- Note: there is currently no automated test script in package.json.

## Conventions
- Prefer existing component patterns over introducing new abstractions for small UI changes.
- Keep business copy and contact/location facts consistent with BUSINESS_REFERENCE.md.
- For style and animation updates, preserve mobile behavior and current responsive breakpoints.
- Treat dist and .astro as generated artifacts; do not hand-edit generated files.

## Pitfalls
- Repository contains multiple historical dist-* folders; use dist/ as the primary build output from npm run build unless told otherwise.
- No environment file is required for local development in current setup.

## References
- Business content: BUSINESS_REFERENCE.md
- Astro configuration: astro.config.mjs
- Tailwind theme: tailwind.config.mjs
- TypeScript paths/options: tsconfig.json
