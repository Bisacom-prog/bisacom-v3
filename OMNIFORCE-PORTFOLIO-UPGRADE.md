# OmniforceAI-style Portfolio Upgrade

## Positioning
Homepage is retuned around: Product Designer + Design Engineer, AI products, SaaS workflows, brand systems and React/Next.js implementation.

## Featured work order
1. Ma Adjo's Kitchen — shipped client product
2. Mobile Mechanic — AI-assisted product + motion prototype
3. ShiftFlow — B2B SaaS workflow
4. Selected Brand Systems — Bisacom, Mall Street Food, Aba's Pie

## Motion
- Existing hero particle field/light sweep retained and enhanced with a Figma → Design system → React animated build-flow rail.
- Added a reduced-motion-friendly Mobile Mechanic motion prototype section showing request → mechanic match → live tracking.

## Brand work
- Added `components/BrandShowcasePreview.tsx`.
- Added `/projects/brand-systems` route.
- Added supplied logos to `public/img/`.

## Recruiter-facing changes
- Main CTA is now selected work rather than project quote.
- Hero explicitly signals full-time remote availability.
- About section now connects product thinking, visual craft, design systems and code fluency.
- Capabilities now include Motion & Systems, Brand & Visual Systems and Design Engineering.
- Services remain on the site for freelance work but are removed from the primary navigation to reduce distraction for hiring managers.

## Validation
Changed TSX files were syntax-checked with the TypeScript compiler API. A full Next.js build was not completed in this environment because project dependencies were not installed and dependency installation timed out.
