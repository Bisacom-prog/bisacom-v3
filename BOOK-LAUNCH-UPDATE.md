# From Beginner to Hired — Website Launch Update

This project has been updated for the live Amazon launch of **From Beginner to Hired**.

## Changes completed

- Added/retained the dedicated `/from-beginner-to-hired` landing page.
- Connected live Amazon UK purchase links:
  - Paperback: `https://www.amazon.co.uk/BEGINNER-HIRED-Landing-Product-Design/dp/B0HJDGLJJM`
  - Kindle: `https://www.amazon.co.uk/dp/B0HJLM25GV`
- Added current UK prices to Book structured data (£19.99 paperback / £7.99 Kindle).
- Added ISBN `9798172735790` to Book structured data.
- Corrected the book-cover asset path for Linux/Vercel case sensitivity.
- Replaced the old homepage waitlist section with the live book launch section.
- Added **Book** to desktop/mobile homepage navigation and the footer.
- Updated the free planner page so it is a standalone lead-generation page rather than a launch waitlist.
- Added a planner-to-book upsell on `/free-planner`.
- Updated planner signup emails and consent copy now that the book is live.
- Updated privacy-policy wording for planner signups.
- Added `/from-beginner-to-hired` and `/free-planner` to the sitemap.
- Removed stale public-facing “coming soon”, “launch list”, and “book available later” messaging.

## Local check before deployment

```bash
npm install
npm run dev
```

Review:

- `http://localhost:3000/`
- `http://localhost:3000/from-beginner-to-hired`
- `http://localhost:3000/free-planner`

Then run:

```bash
npm run build
```

## Deploy

If the project is already connected to Vercel through GitHub:

```bash
git add .
git commit -m "Launch From Beginner to Hired book page"
git push origin main
```

Vercel should deploy automatically.


## 13 September fixes
- Fixed CTA label contrast on the book/free-planner pages by moving global anchor/font resets into Tailwind's base layer so `text-white` and other utilities can override them.
- Added a scoped `book-cta-dark` contrast fallback for the two affected dark CTA buttons.
- Corrected the Paperback Amazon ASIN/link to `B0HJDGLJJM`.
- Canonical Paperback URL now used: `https://www.amazon.co.uk/BEGINNER-HIRED-Landing-Product-Design/dp/B0HJDGLJJM`.
