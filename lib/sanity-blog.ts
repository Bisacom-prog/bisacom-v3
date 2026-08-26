import {client} from "@/sanity/lib/client";
import {
  blogPostBySlugQuery,
  blogPostSlugsQuery,
  blogPostsQuery,
} from "@/sanity/lib/queries";

export type SanityPortableTextChild = {
  _key?: string;
  _type?: string;
  text?: string;
  marks?: string[];
};

export type SanityMarkDef = {
  _key?: string;
  _type?: string;
  href?: string;
  openInNewTab?: boolean;
};

export type SanityPortableTextBlock = {
  _key?: string;
  _type: "block";
  style?: string;
  listItem?: string;
  level?: number;
  children?: SanityPortableTextChild[];
  markDefs?: SanityMarkDef[];
};

export type SanityImageBlock = {
  _key?: string;
  _type: "image";
  url?: string;
  alt?: string;
  caption?: string;
};

export type SanityCalloutBlock = {
  _key?: string;
  _type: "callout";
  tone?: string;
  title?: string;
  text?: string;
};

export type SanityBlogBodyBlock =
  | SanityPortableTextBlock
  | SanityImageBlock
  | SanityCalloutBlock;

export type SanityBlogPost = {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  category?: string;
  categorySlug?: string;
  featured?: boolean;
  tags?: string[];
  readTime?: string;
  body?: SanityBlogBodyBlock[];
  seoTitle?: string;
  seoDescription?: string;
  primaryKeyword?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
  seoNoIndex?: boolean;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
  socialImageUrl?: string;
  featuredImage?: {
    url?: string;
    alt?: string;
    caption?: string;
  };
  author?: {
    name?: string;
    role?: string;
    bio?: string;
    slug?: string;
    linkedin?: string;
    website?: string;
    photo?: {
      url?: string;
      alt?: string;
    };
  };
  relatedPosts?: Array<{
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    category?: string;
    publishedAt?: string;
  }>;
};

export type SanityBlogSlug = {
  slug: string;
  updatedAt?: string;
  publishedAt?: string;
};

export async function getSanityBlogPosts(): Promise<SanityBlogPost[]> {
  try {
    return await client.fetch<SanityBlogPost[]>(blogPostsQuery);
  } catch (error) {
    console.error("Failed to fetch Sanity blog posts:", error);
    return [];
  }
}

export async function getSanityBlogPost(
  slug: string,
): Promise<SanityBlogPost | null> {
  try {
    return await client.fetch<SanityBlogPost | null>(
      blogPostBySlugQuery,
      {slug},
    );
  } catch (error) {
    console.error(`Failed to fetch Sanity blog post "${slug}":`, error);
    return null;
  }
}

export async function getSanityBlogSlugs(): Promise<SanityBlogSlug[]> {
  try {
    return await client.fetch<SanityBlogSlug[]>(blogPostSlugsQuery);
  } catch (error) {
    console.error("Failed to fetch Sanity blog slugs:", error);
    return [];
  }
}
