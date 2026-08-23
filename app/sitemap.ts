import type {MetadataRoute} from "next";
import {client} from "@/sanity/lib/client";
import {siteConfig} from "@/lib/site";
import {blogPosts} from "@/lib/blog-posts";

type SitemapProject = {
  slug: string;
  updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {url: siteConfig.url, changeFrequency: "weekly", priority: 1},
    {url: `${siteConfig.url}/projects`, changeFrequency: "weekly", priority: 0.9},
    {url: `${siteConfig.url}/services`, changeFrequency: "monthly", priority: 0.8},
    {url: `${siteConfig.url}/services/ux-audit`, changeFrequency: "monthly", priority: 0.8},
    {url: `${siteConfig.url}/services/ui-ux-design`, changeFrequency: "monthly", priority: 0.8},
    {url: `${siteConfig.url}/services/website-design-norwich`, changeFrequency: "monthly", priority: 0.85},
    {url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.8},
    {url: `${siteConfig.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.2},
    {url: `${siteConfig.url}/terms-of-use`, changeFrequency: "yearly", priority: 0.2},
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  try {
    const projects = await client.fetch<SitemapProject[]>(
      `*[_type == "project" && defined(slug.current) && coalesce(seoNoIndex, false) != true]{
        "slug": slug.current,
        "updatedAt": _updatedAt
      }`,
      {},
      {next: {revalidate: 3600}},
    );

    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : undefined,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    return [...staticRoutes, ...blogRoutes, ...projectRoutes];
  } catch {
    // Keep the sitemap available even if Sanity is temporarily unavailable.
    return [...staticRoutes, ...blogRoutes];
  }
}
