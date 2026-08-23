import type {MetadataRoute} from "next";
import {client} from "@/sanity/lib/client";

type SitemapProject = {
  slug: string;
  updatedAt?: string;
};

const SITE_URL = "https://www.bisacom.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {url: SITE_URL, changeFrequency: "weekly", priority: 1},
    {url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.9},
    {url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.8},
    {url: `${SITE_URL}/services/ux-audit`, changeFrequency: "monthly", priority: 0.8},
    {url: `${SITE_URL}/services/ui-ux-design`, changeFrequency: "monthly", priority: 0.8},
    {url: `${SITE_URL}/services/website-design-norwich`, changeFrequency: "monthly", priority: 0.85},
    {url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2},
    {url: `${SITE_URL}/terms-of-use`, changeFrequency: "yearly", priority: 0.2},
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

    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
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
