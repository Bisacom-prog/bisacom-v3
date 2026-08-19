# Bisacom freelance portfolio upgrade

## What changed

- Repositioned the homepage around hiring Bisacom for UI/UX design, responsive websites and front-end delivery.
- Reordered featured work so the shipped Ma Adjo's Kitchen client project appears first.
- Added proof points that distinguish real client delivery, design-to-code capability and defined scope.
- Repackaged services into three lower-friction offers with clear starting prices and deliverables.
- Added dedicated SEO pages for UX audits, Figma UI design and Norwich website design.
- Expanded project enquiries to capture business name, current website, service, budget, timeline and goals.
- Added WhatsApp contact alongside email and the existing enquiry workflow.
- Expanded metadata, structured service descriptions and sitemap coverage.
- Added a visible Client Reviews section to Sanity Studio.

## Routes added

- `/services`
- `/services/ux-audit`
- `/services/ui-ux-design`
- `/services/website-design-norwich`

## Before deployment

1. Copy the upgraded files over the matching files in the portfolio repository.
2. Keep the real `.env.local` private and do not commit it.
3. Confirm these Vercel variables remain configured:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_WRITE_TOKEN`
   - `RESEND_API_KEY`
   - `CONTACT_FROM_EMAIL`
4. Use the verified sender address already configured for `CONTACT_FROM_EMAIL`.
5. Install dependencies and run `npm run build` locally before committing.
6. Deploy the separate Sanity Studio folder so the Client Reviews navigation update is available.

## Content actions after deployment

- Approve the Ma Adjo's Kitchen review in Sanity Studio.
- Test the quote form, ordinary contact form, review submission and WhatsApp links.
- Replace starting prices later if project demand or scope changes.
- Add measured outcomes to Ma Adjo's Kitchen when reliable data becomes available.

## Important positioning note

AddoBees should remain described as consultancy and product review work. Do not present its original interface design as Bisacom's visual-design output.
