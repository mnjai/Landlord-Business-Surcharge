import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading, SectionDek } from "@/components/ui/SectionHeading";
import { RuledLine } from "@/components/ui/RuledLine";
import { PRODUCT_A, PRODUCT_B, ENGAGEMENTS, type Product } from "@/lib/services";
import { CJA, SITE } from "@/lib/site";

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col border border-rule bg-card p-6 sm:p-7">
      <div className="mb-2 font-mono text-[11px] font-semibold tracking-[0.1em] text-pen uppercase">
        {product.eyebrow}
      </div>
      <h3 className="mb-2 font-display text-xl font-extrabold tracking-[-0.014em]">{product.title}</h3>
      <p className="mb-4 text-[14.5px] text-ink-2">{product.forWhom}</p>

      <div className="mb-5 grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <div className="mb-1.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-ink-3 uppercase">
            {CJA.tradingName} handles
          </div>
          <ul className="space-y-1 text-[13px] text-ink-2">
            {product.cjaDoes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-1.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-ink-3 uppercase">
            {SITE.name} handles
          </div>
          <ul className="space-y-1 text-[13px] text-ink-2">
            {product.ebenezerDoes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-4">
        <span className="font-mono text-[12.5px] text-ink-3">{product.pricingBasis}</span>
        <Link href={`/services/${product.slug}`} className="border-b border-pen pb-px font-mono text-[12.5px] no-underline">
          See how it works →
        </Link>
      </div>
    </div>
  );
}

export function ServicesOverview({ headingLevel = "h2" as const }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="services" className="border-b border-rule bg-card">
      <RuledLine />
      <Container className="py-16">
        <Eyebrow>Services</Eyebrow>
        <SectionHeading as={headingLevel}>Two products, not a ladder</SectionHeading>
        <SectionDek>
          A rented property and an empty property are different clients with different problems — almost nobody has
          both. Start with the one that describes your property.
        </SectionDek>

        <div className="mb-9 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ProductCard product={PRODUCT_A} />
          <ProductCard product={PRODUCT_B} />
        </div>

        <div id="title-estate" className="border border-rule bg-card">
          <div className="border-b border-rule p-5 sm:p-6">
            <div className="mb-1 font-mono text-[11px] font-semibold tracking-[0.1em] text-pen uppercase">
              It&apos;s more complicated than that
            </div>
            <p className="text-[14.5px] text-ink-2">
              Inherited, disputed title, or you&apos;re not sure who owns what yet — these aren&apos;t either
              product, they&apos;re engagements in their own right.
            </p>
          </div>
          {ENGAGEMENTS.map((e, i) => (
            <div
              key={e.slug}
              className={`flex flex-wrap items-start justify-between gap-4 p-5 sm:p-6 ${
                i < ENGAGEMENTS.length - 1 ? "border-b border-rule" : ""
              }`}
            >
              <div className="max-w-[52ch]">
                <h4 className="mb-1 font-display text-base font-bold tracking-[-0.01em]">{e.title}</h4>
                <p className="text-[13.5px] text-ink-2">{e.description}</p>
              </div>
              <span className="font-mono text-[12.5px] whitespace-nowrap text-ink-3">{e.pricingBasis}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
