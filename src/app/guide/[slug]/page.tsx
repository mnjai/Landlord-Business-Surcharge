import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container, Measure } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { mdxComponents } from "@/components/guide/mdxComponents";
import { RelatedArticles } from "@/components/guide/RelatedArticles";
import { getAllGuideArticles, getGuideSlugs, getGuideSource, getRelatedArticles } from "@/lib/guide";
import { SITE } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getAllGuideArticles().find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.dek,
    alternates: { canonical: `/guide/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.dek,
      url: `/guide/${slug}`,
    },
  };
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const all = getAllGuideArticles();
  const article = all.find((a) => a.slug === slug);
  if (!article) notFound();

  const { content } = getGuideSource(slug);
  const related = getRelatedArticles(slug);

  const dateLabel = new Date(article.updated).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.dek,
    datePublished: article.updated,
    dateModified: article.updated,
    author: { "@type": "Organization", name: SITE.legalName },
    publisher: { "@type": "Organization", name: SITE.legalName },
    mainEntityOfPage: `${SITE.url}/guide/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="bg-card bg-ruled border-b border-rule pt-11 pb-10">
        <Container>
          <Measure>
            <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">
              <Link href="/guide" className="no-underline hover:text-pen">
                The overseas owner&apos;s guide
              </Link>{" "}
              · {article.category}
            </p>
            <h1 className="mb-4.5 max-w-[19ch] font-display text-[clamp(30px,5.6vw,50px)] leading-[1.03] font-extrabold tracking-[-0.026em]">
              {article.title}
            </h1>
            <p className="mb-6 text-[clamp(16.5px,2.2vw,19px)] text-ink-2">{article.dek}</p>
            <p className="border-t border-rule pt-3.5 font-mono text-[11.5px] tracking-[0.06em] text-ink-3">
              {SITE.name} · Updated {dateLabel}
              {!article.published ? " · Coming soon" : ""}
            </p>
          </Measure>
        </Container>
      </div>

      <article className="py-11">
        <Container>
          <Measure>
            <div className="text-[16px] leading-[1.6] text-ink">
              <MDXRemote source={content} components={mdxComponents} />
            </div>

            {article.published ? (
              <div className="mt-10 bg-ink p-6.5 text-white sm:p-[30px_26px]">
                <h3 className="mb-2 font-display text-[22px] font-extrabold tracking-[-0.016em]">
                  Find out what you owe in 90 seconds
                </h3>
                <p className="mb-5 max-w-[50ch] text-[15px] text-[#B9C3D2]">
                  Six questions. Your quarterly liability, the registration cost, and what&apos;s accruing if you
                  haven&apos;t filed yet. No email required to see the result.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    href="/check"
                    className="inline-block bg-pen px-6 py-3.5 font-display text-[15px] font-bold text-white hover:bg-[#1638AD]"
                  >
                    Run the check
                  </Link>
                  <WhatsAppButton
                    message="Hi — I read your surcharge guide and need help registering."
                    className="border border-[#4A5768] bg-transparent px-6 py-3.5 text-[15px] hover:border-white hover:bg-transparent"
                  >
                    Ask us a question
                  </WhatsAppButton>
                </div>
              </div>
            ) : null}

            <RelatedArticles articles={related} />
          </Measure>
        </Container>
      </article>
    </>
  );
}
