# Blog Publishing Upgrade

Added:
- `/blog` insights index
- `/blog/[slug]` SEO-ready article template
- Three publish-ready articles
- Homepage Insights section
- Blog routes in sitemap
- BlogPosting structured data
- New Sanity `post` schema
- Blog Posts entry in Sanity Studio
- GROQ queries for future CMS-managed posts

The first three articles are stored in `lib/blog-posts.ts`, so they publish immediately without requiring Sanity content migration.

Future posts can be authored in Sanity using the new Blog Post schema. The included GROQ queries provide the data layer needed when you decide to make the blog routes fully CMS-managed.

After deployment, request indexing in Google Search Console for:
- https://www.bisacom.dev/blog
- https://www.bisacom.dev/blog/ux-problems-small-business-enquiries
- https://www.bisacom.dev/blog/how-to-choose-product-designer-norwich
- https://www.bisacom.dev/blog/good-saas-ux-ui-design
