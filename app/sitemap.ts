import type {MetadataRoute} from "next";
import {client} from "@/sanity/lib/client";
import {siteConfig} from "@/lib/site";
import {books} from "@/lib/books";
import {featuredProjects, retiredProjectSlugs} from "@/lib/projects";

type SitemapProject = {
  slug: string;
  updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {url: siteConfig.url, changeFrequency: "weekly", priority: 1},
    {url: `${siteConfig.url}/projects`, changeFrequency: "weekly", priority: 0.9},
    {url: `${siteConfig.url}/projects/cop-norwich`, changeFrequency: "monthly", priority: 0.8},
    {url: `${siteConfig.url}/projects/brand-systems`, changeFrequency: "monthly", priority: 0.6},
    {url: `${siteConfig.url}/services`, changeFrequency: "monthly", priority: 0.8},
    {url: `${siteConfig.url}/services/ux-audit`, changeFrequency: "monthly", priority: 0.8},
    {url: `${siteConfig.url}/services/ui-ux-design`, changeFrequency: "monthly", priority: 0.8},
    {url: `${siteConfig.url}/services/website-design-norwich`, changeFrequency: "monthly", priority: 0.85},
    {url: `${siteConfig.url}/books`, changeFrequency: "monthly", priority: 0.85},
    ...books.map((book) => ({
      url: `${siteConfig.url}/books/${book.slug}`,
      changeFrequency: "monthly" as const,
      priority: book.status === "available" ? 0.9 : 0.5,
    })),
    {url: `${siteConfig.url}/free-planner`, changeFrequency: "monthly", priority: 0.75},
    {url: `${siteConfig.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.2},
    {url: `${siteConfig.url}/terms-of-use`, changeFrequency: "yearly", priority: 0.2},
  ];

  try {
    const projects = await client.fetch<SitemapProject[]>(
      `*[_type == "project" && defined(slug.current) && coalesce(seoNoIndex, false) != true]{
        "slug": slug.current,
        "updatedAt": _updatedAt
      }`,
      {},
        {next: {revalidate: 3600}},
    );

    const live = projects.filter((project) => !retiredProjectSlugs.has(project.slug));
    const sanitySlugs = new Set(live.map((project) => project.slug));
    // Projects with a local case study only (lib/projects.ts) are listed too.
    const localOnly = featuredProjects.filter((project) => !sanitySlugs.has(project.slug)).map((project) => ({slug: project.slug, updatedAt: undefined as string | undefined}));
    const projectRoutes: MetadataRoute.Sitemap = [...live, ...localOnly].map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : undefined,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    return [...staticRoutes, ...projectRoutes];
  } catch {
    // Keep the sitemap available even if Sanity is temporarily unavailable.
    return staticRoutes;
  }
}
