import { client } from "@/sanity/lib/client";

type SanityBlogSlug = {
  slug: string;
  updatedAt?: string;
};

export async function getSanityBlogSlugs(): Promise<SanityBlogSlug[]> {
  try {
    const posts = await client.fetch<
      Array<{
        slug?: string;
        updatedAt?: string;
      }>
    >(
      `*[
        _type == "post" &&
        defined(slug.current)
      ]{
        "slug": slug.current,
        "updatedAt": coalesce(_updatedAt, publishedAt)
      }`
    );

    return posts
      .filter((post): post is { slug: string; updatedAt?: string } =>
        Boolean(post.slug)
      )
      .map((post) => ({
        slug: post.slug,
        updatedAt: post.updatedAt,
      }));
  } catch (error) {
    console.error("Failed to fetch Sanity blog slugs:", error);
    return [];
  }
}