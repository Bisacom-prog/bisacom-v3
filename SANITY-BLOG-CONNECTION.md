# Sanity → Next.js Blog Connection

This upgrade connects future published Sanity `post` documents to the live Bisacom Insights section.

## What happens now

- The existing three articles remain available from `lib/blog-posts.ts`.
- New Sanity posts are fetched on `/blog` automatically.
- A new Sanity post is rendered at `/blog/[slug]` without creating a new code file.
- Sanity SEO fields feed Next.js metadata, Open Graph and Twitter metadata.
- `BlogPosting` JSON-LD is generated for Sanity posts.
- Featured images and article images from Sanity are supported.
- Rich article content supports headings, paragraphs, bullet/numbered lists, quotes, links, images and callouts.
- Related posts selected in Sanity appear below the article.
- Future published Sanity posts are added to `sitemap.xml` automatically.
- Posts marked `noIndex` or scheduled for a future `publishedAt` date are excluded from the public query and sitemap.

## Publishing workflow

1. In Sanity Studio, create the Author record first.
2. Create the reusable Categories you want to use.
3. Go to Insights / Blog → All Posts → New Blog Post.
4. Complete the Content, Publishing and SEO groups.
5. Set `Published At` to now or an earlier time.
6. Publish the document in Sanity.
7. The article will be available at:
   `https://www.bisacom.dev/blog/<slug>`
8. `/blog` and the sitemap revalidate approximately hourly.

## Recommended starter categories

- Product Design
- UX for Business
- SaaS Design
- Design Systems

## Existing articles

If a Sanity post is later created with the same slug as one of the existing local articles, the `/blog` index will avoid showing a duplicate. The current local article route remains authoritative until you deliberately migrate that article to Sanity.

## Deployment

Run locally:

```bash
npm install
npm run build
```

Then push the updated portfolio to GitHub/Vercel.

No Sanity API write token is required for the website to read published posts from a public Sanity dataset.
