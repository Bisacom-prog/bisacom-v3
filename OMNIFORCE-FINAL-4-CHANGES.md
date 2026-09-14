# OmniforceAI final portfolio changes

Applied to the current Bisacom portfolio source.

1. Homepage recruiter flow
   - Selected Work moved directly above Motion and About.
   - New order: Hero → proof strip → Selected Work → Motion → About → Process → Capabilities → Insights → Book → Reviews → Career CTA.

2. Freelance-first messaging removed from homepage
   - Services/pricing section removed from the homepage.
   - Service routes remain available for existing freelance traffic.
   - Closing CTA now targets full-time Product Design / Design Engineering hiring conversations.

3. Brand Systems case study expanded
   - Bisacom, Mall Street Food and Aba's Pie now each include:
     - brief / portfolio framing
     - design idea
     - logo construction
     - typography direction
     - colour palette
     - three application studies
   - Application studies are explicitly framed as portfolio studies rather than shipped client artefacts.

4. Mobile Mechanic motion embedded in the case study
   - The existing MotionPrototype component now renders inside `/projects/mobile-mechanic-app` directly after the case study navigation.
   - The same interaction story is retained on the homepage.

Validation
- Changed TSX files were syntax-checked with TypeScript transpilation successfully.
- Full Next.js build was not run in this container because the local dependency install is incomplete (`next` binary missing). Run `npm install` / `npm ci` and `npm run build` locally before deployment.
