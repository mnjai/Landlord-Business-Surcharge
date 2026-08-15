import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { getAllGuideArticles } from "@/lib/guide";

export const metadata: Metadata = {
  title: "The overseas owner's guide",
  description:
    "Free guides for Trinidad & Tobago property owners who live abroad — the Landlord Business Surcharge, inherited deeds, selling from abroad, remitting rent, tenancies, the Tobago licence, stamp duty and vacant property.",
  alternates: { canonical: "/guide" },
};

export default function GuideIndexPage() {
  const articles = getAllGuideArticles();

  return (
    <div className="bg-card bg-ruled border-b border-rule py-14 sm:py-16">
      <Container>
        <Eyebrow>The overseas owner&apos;s guide</Eyebrow>
        <h1 className="mb-3 max-w-[18ch] font-display text-[clamp(30px,5.6vw,50px)] leading-[1.03] font-extrabold tracking-[-0.026em]">
          The things nobody explains until it&apos;s already a problem
        </h1>
        <p className="mb-11 max-w-[58ch] text-[clamp(16.5px,2.2vw,19px)] text-ink-2">
          Written for owners abroad, not for local buyers. Free, no sign-up.
        </p>

        <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/guide/${article.slug}`}
              className="block bg-card p-6 text-ink transition-colors hover:bg-pen-soft motion-reduce:transition-none"
            >
              <div className="mb-2 flex items-center gap-2.5 font-mono text-[10px] tracking-[0.13em] text-ink-3 uppercase">
                {article.category}
                {!article.published ? (
                  <span className="border border-rule px-1.5 py-0.5 text-ink-3 normal-case">Coming soon</span>
                ) : null}
              </div>
              <h2 className="mb-2 font-display text-[19px] leading-[1.25] font-bold tracking-[-0.012em]">
                {article.title}
              </h2>
              <p className="text-[14.5px] text-ink-2">{article.dek}</p>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
