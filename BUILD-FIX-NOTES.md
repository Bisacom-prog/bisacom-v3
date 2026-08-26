# Build fix notes

- Fixed Portable Text TypeScript narrowing by aligning `SanityBlogBodyBlock` with the actual Sanity `post.body` schema (`block`, `image`, `callout`).
- Removed stale duplicate `lib/lib/sanity-blog.ts` so `@/lib/sanity-blog` has a single source of truth.
- Synced the embedded portfolio Sanity blog schema with the standalone Studio schema: `post`, `seo`, `author`, and `blogCategory`.
- Synced Sanity Studio structure so Categories and Authors are available under Insights / Blog.
- Removed stale `sanity/lib/queries.ts.tmp`.
