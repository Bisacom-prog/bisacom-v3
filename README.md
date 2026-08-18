# Bisacom Vercel deployment fix

## Portfolio form setup

Copy `.env.example` to `.env.local` and provide the environment values before deploying.

- `RESEND_API_KEY` sends contact and quote requests to `hello@bisacom.dev`.
- `CONTACT_FROM_EMAIL` should use a sender/domain verified in Resend for production.
- `SANITY_API_WRITE_TOKEN` needs create permission so reviews can be saved for moderation.
- Reviews only appear after **Approved for website** is enabled in Sanity Studio.

Add the same values to the hosting provider's environment settings. Never commit private keys.

The Vercel/production build was failing on:

`Property 'listItem' does not exist on type 'RichContentItem'.`

The uploaded portfolio archive shows that `RichContentItem` is a union of
`PortableTextBlock | CaseStudyImage`, but `_type` was optional on both types.
That prevented TypeScript from reliably narrowing the union before reading
`listItem`.

This package fixes the issue in two ways:

1. `components/case-study/types.ts`
   - Makes `_type` required for `PortableTextBlock` and `CaseStudyImage`.
   - This turns `RichContentItem` into a proper discriminated union.

2. `app/projects/[slug]/page.tsx`
   - Adds an explicit `isPortableTextBlock()` type guard before reading
     block-only properties such as `listItem`, `style`, and `children`.

## Important: eslint.config.zip

The uploaded ESLint config belongs to the standalone Sanity Studio and imports
`@sanity/eslint-config-studio`. Do NOT copy that config into the Next.js
portfolio project. It is unrelated to the Vercel TypeScript build failure and
could introduce a missing dependency in the portfolio.

## Replace these files

In `C:\Dev\bisacom-v3` replace:

- `components/case-study/types.ts`
- `app/projects/[slug]/page.tsx`

Then run:

```bash
cd /c/Dev/bisacom-v3
rm -rf .next
npm run build
```

If the build succeeds:

```bash
git add components/case-study/types.ts app/projects/[slug]/page.tsx
git commit -m "Fix case study TypeScript narrowing for Vercel"
git push
```

Vercel should redeploy from the new commit.


---

## 2026 Portfolio Update

This project has been updated to:
- use the current Sanity V2 project schema with Overview, Discovery, Research, Architecture, Design, Final UI, Edge Cases, Implementation, Prototype, Outcomes, Reflection, Links and Flexible Sections;
- add Team and Responsibilities to project overview;
- support hero-image captions;
- support Client Project as a project type;
- render V2 implementation, outcomes, reflection and proposed edge-case states;
- remove the Cleaning Website and Aba's Pie from featured portfolio work;
- remove fabricated customer testimonials and client-avatar social proof;
- replace that area with an upgraded Core Capabilities / Skills section;
- show only Mobile Mechanic and Ma Adjo's Kitchen as selected projects;
- exclude Cleaning Website and Aba's Pie from the Sanity Studio project list;
- fix case-study image alt/caption fetching for the Sanity image object shape.

### Important after replacing the project

Keep your existing `.env.local` file.

Run:

```bash
npm install
npm run dev:clean
```

The `dev:clean` command clears `.next` before starting the app. This matters because a stale compiled Studio build can continue showing the previous schema tabs even after `project.ts` has been replaced.

Open:
- Portfolio: `http://localhost:3000`
- Sanity Studio: `http://localhost:3000/studio`

The returned ZIP intentionally excludes `.next` and `.env.local`.
