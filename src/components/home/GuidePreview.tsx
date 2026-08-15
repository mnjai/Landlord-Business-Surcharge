import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading, SectionDek } from "@/components/ui/SectionHeading";
import { getAllGuideArticles } from "@/lib/guide";

export function GuidePreview() {
  const articles = getAllGuideArticles();

  return (
    <section id="guide" className="py-16">
      <Container>
        <Eyebrow>The overseas owner&apos;s guide</Eyebrow>
        <SectionHeading>The things nobody explains until it&apos;s already a problem</SectionHeading>
        <SectionDek>Written for owners abroad, not for local buyers. Free, no sign-up.</SectionDek>

        <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/guide/${article.slug}`}
              className="block bg-card p-5.5 text-ink transition-colors hover:bg-pen-soft motion-reduce:transition-none"
            >
              <div className="mb-1.5 font-mono text-[10px] tracking-[0.13em] text-ink-3 uppercase">
                {article.category}
              </div>
              <h3 className="font-display text-[16.5px] leading-[1.25] font-bold tracking-[-0.01em]">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
