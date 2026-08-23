# Bisacom SEO Upgrade

This version adds a stronger technical SEO baseline for bisacom.dev without changing the overall case-study structure.

## Implemented

- Improved global metadata and Norwich/Product Designer keyword targeting.
- Improved homepage H1 and supporting copy for search intent.
- Added Person, WebSite and ProfessionalService JSON-LD structured data.
- Added dynamic Sanity-powered sitemap entries for published case studies.
- Improved robots.txt rules and excluded `/studio/` and `/api/`.
- Added Sanity SEO fields per project: SEO title, description, keywords and no-index toggle.
- Upgraded case-study metadata with canonical URLs, Open Graph, Twitter cards and robots directives.
- Added CreativeWork structured data to case studies.
- Added richer service-page metadata and Service structured data.
- Added Open Graph metadata to Projects and Services index pages.
- Added canonical URLs to legal pages.
- Set the review form page to `noindex` and removed it from the sitemap.

## After deployment

1. Deploy the project to Vercel.
2. Confirm these URLs load successfully:
   - https://bisacom.dev/robots.txt
   - https://bisacom.dev/sitemap.xml
3. In Google Search Console, submit `https://bisacom.dev/sitemap.xml`.
4. Request indexing for the homepage, Projects page and your three strongest case studies.
5. In Sanity Studio, open each Project and complete the new SEO group where useful. If left blank, the site automatically falls back to the existing project title and summary.
6. Do not enable **Hide from search engines** for public portfolio case studies.

## Suggested SEO fields for your strongest projects

### Mobile Mechanic App
SEO title: `Mobile Mechanic App UX/UI Case Study – AI Roadside Assistance`

SEO description: `UX/UI case study for an AI-assisted roadside assistance app designed to help stranded drivers diagnose issues, request help and track mechanics.`

Keywords: `mobile app UX design`, `roadside assistance app`, `AI product design`, `Figma case study`, `mobile UX`

### Short-Notice Shift Coverage
SEO title: `Shift Coverage SaaS UX/UI Case Study – Workforce Scheduling`

SEO description: `B2B SaaS product design case study simplifying short-notice shift coverage, staff matching, manager approval and rota updates.`

Keywords: `SaaS UX design`, `workforce scheduling`, `shift management`, `B2B product design`, `Figma case study`

### Ma Adjo's Kitchen
SEO title: `Restaurant Website UX/UI Case Study – Ma Adjo's Kitchen`

SEO description: `Responsive restaurant website case study covering menu browsing, WhatsApp ordering, allergen information, catering enquiries and Sanity CMS.`

Keywords: `restaurant website design`, `UX UI case study`, `Norwich web design`, `Next.js website`, `Sanity CMS`

## Verification note

A full local Next.js build could not be completed in the sandbox because the uploaded archive did not contain `node_modules`, and dependency installation exceeded the available execution window. The code changes were therefore reviewed structurally, but you should run `npm install` followed by `npm run build` locally before deployment.

## Security reminder

Keep `.env.local` private and never commit it to a public GitHub repository. The existing `.gitignore` should continue to exclude environment files.
