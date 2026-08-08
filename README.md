# Bisacom Vercel deployment fix

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
