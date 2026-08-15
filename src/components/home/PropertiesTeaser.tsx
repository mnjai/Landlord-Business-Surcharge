import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading, SectionDek } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { MANAGED_PROPERTIES } from "@/data/properties";
import { PropertyPrice } from "./PropertyPrice";

export function PropertiesTeaser({ headingLevel = "h2" as const }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section className="border-t border-b border-rule bg-card py-16">
      <Container>
        <Eyebrow>Properties we manage</Eyebrow>
        <SectionHeading as={headingLevel}>A small book, looked after properly</SectionHeading>
        <SectionDek>
          We&apos;re not a listings portal and don&apos;t try to be. These are properties currently in our care —
          each one inspected, documented and compliant.
        </SectionDek>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {MANAGED_PROPERTIES.map((prop) => (
            <div key={prop.id} className="border border-rule bg-card">
              <PlaceholderImage
                src={prop.imageSrc}
                alt={prop.typeLabel}
                aspect="3/2"
                label="PROPERTY PHOTO"
                sizes="(min-width: 640px) 33vw, 100vw"
                className="border-b border-rule"
              />
              <div className="p-4.5">
                <div className="mb-1.5 font-mono text-[10.5px] tracking-[0.11em] text-ink-3 uppercase">
                  {prop.area}
                </div>
                <h3 className="mb-2.5 font-display text-base font-bold tracking-[-0.01em]">{prop.typeLabel}</h3>
                <PropertyPrice ttd={prop.priceTTD} kind={prop.priceKind} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
