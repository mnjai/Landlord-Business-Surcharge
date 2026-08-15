import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "guide");

export interface GuideFrontmatter {
  title: string;
  category: string;
  dek: string;
  /** ISO date string, e.g. "2026-08-01". */
  updated: string;
  /** Only true for articles with a written body; stubs render a "coming soon" notice. */
  published: boolean;
  /** Editorial ordering — lower first. Content-editable, not derived from the filesystem. */
  order: number;
}

export interface GuideArticleSummary extends GuideFrontmatter {
  slug: string;
}

export function getGuideSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getGuideSource(slug: string): { frontmatter: GuideFrontmatter; content: string } {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as GuideFrontmatter, content };
}

/** Every article's frontmatter, editorial order first. */
export function getAllGuideArticles(): GuideArticleSummary[] {
  return getGuideSlugs()
    .map((slug) => ({ slug, ...getGuideSource(slug).frontmatter }))
    .sort((a, b) => a.order - b.order);
}

export function getRelatedArticles(currentSlug: string, count = 3): GuideArticleSummary[] {
  return getAllGuideArticles()
    .filter((a) => a.slug !== currentSlug)
    .slice(0, count);
}
