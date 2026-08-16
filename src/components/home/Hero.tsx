import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealHeading } from "@/components/ui/RevealHeading";
import { DaysLateStrip } from "@/components/ui/DaysLateStrip";

const HOME_OPTIONS = [
  { href: "/check?home=US", label: "United States" },
  { href: "/check?home=CA", label: "Canada" },
  { href: "/check?home=UK", label: "United Kingdom" },
  { href: "/check?home=TT", label: "Trinidad & Tobago" },
  { href: "/check?home=OT", label: "Elsewhere" },
];

export function Hero() {
  return (
    <div className="bg-card bg-ruled border-b border-rule">
      <Container className="pt-12 sm:pt-14">
        <Eyebrow>Property management for owners abroad</Eyebrow>
        <RevealHeading
          as="h1"
          className="mb-5 max-w-[23ch] font-display text-[clamp(30px,6.2vw,58px)] leading-[1.03] font-extrabold tracking-[-0.026em] text-balance"
        >
          Do you own property in Trinidad &amp; Tobago and <span className="text-pen">live abroad?</span> Here&apos;s what
          changed on January 1st.
        </RevealHeading>
        <p className="mb-7 max-w-[54ch] text-[clamp(16.5px,2.3vw,19px)] text-ink-2">
          Since 1 January 2026 every landlord collecting rent on Trinidad &amp; Tobago property owes the Landlord
          Business Surcharge — wherever in the world they live, in whatever currency they&apos;re paid. We handle
          it, and everything else the property needs while you&apos;re not here to see it.
        </p>

        <DaysLateStrip className="mb-10 max-w-[640px]" />

        {/* Interaction before persuasion: question one of the calculator, live, right in the hero. */}
        <div className="-mb-px grid grid-cols-1 items-center gap-6 bg-ink p-7 text-white sm:grid-cols-[1.1fr_1fr] sm:p-[30px_28px]">
          <div>
            <h2 className="mb-2 font-display text-[23px] leading-[1.15] font-extrabold tracking-[-0.015em]">
              Find out where you stand in 90 seconds
            </h2>
            <p className="max-w-[42ch] text-[14.5px] text-[#B9C3D2]">
              Six questions. You&apos;ll get your quarterly liability, what registration costs, and what&apos;s
              accruing if you haven&apos;t filed. No email required to see the result.
            </p>
          </div>
          <div>
            <p className="mb-2.5 font-mono text-[11px] tracking-[0.14em] text-[#8E9BB0] uppercase">
              01 — Where do you live?
            </p>
            <div className="flex flex-wrap gap-2">
              {HOME_OPTIONS.map((opt) => (
                <Link
                  key={opt.href}
                  href={opt.href}
                  className="border border-[#35415A] px-[15px] py-2.5 font-mono text-[13px] text-white transition-colors hover:border-pen hover:bg-pen motion-reduce:transition-none"
                >
                  {opt.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
