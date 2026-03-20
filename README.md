# Warsi Service Center Website

A static marketing website for Warsi Service Center built with Astro + React islands + Tailwind CSS.

## Stack

- Astro 4
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion

## Local Development

```bash
npm install
npm run dev
```

Open: `http://localhost:4321`

## Build

```bash
npm run build
npm run preview
```

Production output is generated in `dist/`.

## Project Structure

- `src/pages/index.astro` - Home page
- `src/pages/services.astro` - Services page
- `src/pages/contact.astro` - Contact page
- `src/layouts/BaseLayout.astro` - Shared HTML layout + SEO/meta + JSON-LD
- `src/components/ui/` - React UI components and interactive islands
- `src/styles/global.css` - Global styles and animations

## Key UI Features

- Floating top navigation with quick actions
- Process timeline on home page
- Services bento grid
- Footer with map embed and quick links
- Lightweight loading overlay spinner

## Deployment (GitHub Pages)

A workflow is included at `.github/workflows/deploy-pages.yml`.

Expected repository settings:

1. Go to **Settings > Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` to trigger deployment

## Notes

- This project uses `@` alias for `src` imports.
- UI components live in `src/components/ui`.
- Business facts are managed in a local reference file and reflected in site copy/metadata.
