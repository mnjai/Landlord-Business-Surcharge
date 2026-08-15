import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading, SectionDek } from "@/components/ui/SectionHeading";
import { RuledLine } from "@/components/ui/RuledLine";
import { SERVICE_TIERS } from "@/lib/services";

export function ServicesLadder({ headingLevel = "h2" as const }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="services" className="border-b border-rule bg-card">
      <RuledLine />
      <Container className="py-16">
        <Eyebrow>Services</Eyebrow>
        <SectionHeading as={headingLevel}>
          Start with the urgent thing. Add the rest when you&apos;re ready.
        </SectionHeading>
        <SectionDek>
          Most owners come to us for the surcharge and stay for the reporting. Every tier works on its own —
          nothing is bundled to force you upward.
        </SectionDek>

        <div className="border border-rule bg-card">
          {SERVICE_TIERS.map((tier, i) => (
            <div
              key={tier.step}
              className={clsx(
                "grid grid-cols-[40px_1fr] items-start gap-3.5 border-rule p-5 sm:grid-cols-[52px_1fr_200px] sm:gap-5 sm:p-6",
                i < SERVICE_TIERS.length - 1 && "border-b",
                tier.highlighted && "bg-pen-soft",
              )}
            >
              <div className="pt-0.5 font-mono text-xs font-semibold text-pen">{tier.step}</div>
              <div>
                <h3 className="mb-1.5 font-display text-lg font-bold tracking-[-0.012em]">{tier.title}</h3>
                <p className="max-w-[52ch] text-[14.5px] text-ink-2">{tier.description}</p>
              </div>
              <div className="col-span-2 pt-2 font-mono text-[12.5px] leading-[1.5] text-ink-3 sm:col-span-1 sm:pt-1 sm:text-right">
                {tier.modelLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
