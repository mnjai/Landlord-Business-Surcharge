import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllGuideArticles } from "@/lib/guide";

const STATIC_ROUTES = [
  "",
  "/check",
  "/services",
  "/services/absentee-landlord-service",
  "/services/absentee-landlord-service/what-youll-need",
  "/services/idle-property-care",
  "/guide",
  "/about",
  "/report",
  "/standard",
  "/contact",
  "/properties",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
  }));

  const guideEntries: MetadataRoute.Sitemap = getAllGuideArticles().map((article) => ({
    url: `${SITE.url}/guide/${article.slug}`,
    lastModified: new Date(article.updated),
  }));

  return [...staticEntries, ...guideEntries];
}
