import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/services", "/services/ux-audit", "/services/ui-ux-design", "/services/website-design-norwich", "/review", "/privacy-policy", "/terms-of-use"];
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route.includes("services") || route === "/projects" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route.includes("services") ? 0.8 : route === "/projects" ? 0.7 : 0.3,
  }));
}
