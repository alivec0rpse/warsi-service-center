---
description: "Use when editing frontend UI in Astro/React, especially responsive layout, spacing, motion, and tap interactions in src/components/ui. Preserve mobile-first behavior and existing breakpoints."
name: "Frontend Mobile UI Guidelines"
applyTo: "src/components/ui/**/*.{ts,tsx,astro}"
---
# Frontend Mobile Guidelines

- Keep mobile-first Tailwind ordering: base classes first, then `sm`, `md`, and `lg` overrides only when needed.
- Preserve existing responsive breakpoints already used in this project (`sm`, `md`, `lg`) unless a change request explicitly requires new breakpoint logic.
- Do not reduce touch target usability on small screens. Keep primary interactive controls easy to tap and avoid cramped horizontal layouts.
- Prefer stacked layouts on small screens and progressively enhance to multi-column at larger breakpoints.
- When changing spacing or typography, verify readability at narrow widths first, then adjust tablet/desktop.
- For animated UI, keep motion lightweight on mobile and avoid introducing effects that block scrolling, tapping, or core content readability.
- Maintain current visual language: mono palette tokens, semantic color variables, and existing component patterns from src/components/ui/button.tsx and src/lib/utils.ts.
- Keep business facts and contact/location details aligned with BUSINESS_REFERENCE.md when UI copy is touched.
- Treat generated outputs as read-only: dist/, dist-*/, and .astro should not be edited directly.

## Quick Checks Before Finishing

- Mobile viewport layout is stable with no clipped text, horizontal overflow, or overlapping controls.
- Action buttons and links remain prominent and accessible on small screens.
- Changes do not regress existing desktop layout behavior.
