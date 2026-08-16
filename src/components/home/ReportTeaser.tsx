import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Stamp } from "@/components/ui/Stamp";

const CONDITION_ROWS: [string, string][] = [
  ["Roof & guttering", "Sound"],
  ["Exterior paint", "Fair — south wall"],
  ["Water tank & pump", "Serviced 12.05"],
  ["WASA account", "Current"],
  ["Rent received, quarter", "3 of 3 months"],
  ["Surcharge filed", "Yes — 30.06.2026"],
];

export function ReportTeaser() {
  return (
    <section id="report" className="py-16">
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-11">
          <div>
            <Eyebrow>The quarterly report</Eyebrow>
            <SectionHeading className="mb-3">This is what lands in your inbox every quarter</SectionHeading>
            <p className="mb-5 max-w-[58ch] text-[17px] text-ink-2">
              Most owners abroad get a WhatsApp message saying the place looks fine. We publish our reporting
              standard openly so you know exactly what you&apos;re buying — dated photographs, condition notes,
              meter readings, rates and tax status, and the tenant&apos;s payment record set out in full.
            </p>
            <Link
              href="/report"
              className="inline-block bg-pen px-[18px] py-[11px] font-display text-sm font-bold text-white hover:bg-[#8F4000]"
            >
              See a full sample report
            </Link>
          </div>

          <div className="relative pt-6">
            <span className="absolute top-0 left-6 border border-b-0 border-carbon-line bg-carbon px-4.5 py-1.5 font-mono text-[10.5px] font-semibold tracking-[0.14em] text-carbon-ink uppercase">
              Q2 2026 · Sample
            </span>
            <div className="relative border border-ink bg-card p-5.5">
              <div className="mb-4 flex items-baseline justify-between border-b-2 border-ink pb-3">
                <b className="font-display text-[15px] font-extrabold">Property condition report</b>
                <span className="font-mono text-[10.5px] tracking-[0.09em] text-ink-3">PREPARED 04.07.2026</span>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-1.5">
                <PlaceholderImage
                  src="/assets/report-1.jpg"
                  alt="Inspection photograph, sample report"
                  aspect="4/3"
                  label="INSPECTION PHOTO"
                  sizes="(min-width: 1024px) 240px, 45vw"
                />
                <PlaceholderImage
                  src="/assets/report-2.jpg"
                  alt="Inspection photograph, sample report"
                  aspect="4/3"
                  label="INSPECTION PHOTO"
                  sizes="(min-width: 1024px) 240px, 45vw"
                />
              </div>

              <table className="w-full border-collapse font-mono text-xs tabular-figures">
                <tbody>
                  {CONDITION_ROWS.map(([label, value]) => (
                    <tr key={label}>
                      <td className="border-b border-dotted border-rule py-1.5">{label}</td>
                      <td className="border-b border-dotted border-rule py-1.5 text-right font-medium">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Stamp variant="ok" className="absolute right-4.5 bottom-4 bg-white/70">
                Property in
                <br />
                good order
              </Stamp>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
