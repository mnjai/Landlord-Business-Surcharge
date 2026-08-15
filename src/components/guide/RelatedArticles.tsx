import Link from "next/link";
import type { GuideArticleSummary } from "@/lib/guide";

export function RelatedArticles({ articles }: { articles: GuideArticleSummary[] }) {
  if (articles.length === 0) return null;

  return (
    <div className="mt-12 border-t border-rule pt-8">
      <h2 className="mb-4 font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-3 uppercase">
        Also in the guide
      </h2>
      <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/guide/${article.slug}`}
            className="block bg-card p-4.5 text-ink transition-colors hover:bg-pen-soft motion-reduce:transition-none"
          >
            <div className="mb-1.5 font-mono text-[10px] tracking-[0.13em] text-ink-3 uppercase">
              {article.category}
            </div>
            <h3 className="font-display text-[15px] leading-[1.3] font-bold tracking-[-0.005em]">
              {article.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
