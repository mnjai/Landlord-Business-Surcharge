import type { Metadata } from "next";
import { Container, Measure } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Stamp } from "@/components/ui/Stamp";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "The quarterly report — a real sample",
  description:
    "See exactly what lands in your inbox every quarter: dated inspection photographs, a condition ledger, rent and surcharge status, set out in full. Nobody else in this market publishes their reporting standard.",
  alternates: { canonical: "/report" },
};

const EXTERIOR_PHOTOS = [
  { key: "roof", label: "ROOF & GUTTERING" },
  { key: "exterior", label: "EXTERIOR — SOUTH WALL" },
  { key: "tank", label: "WATER TANK & PUMP" },
  { key: "gate", label: "PERIMETER & GATE" },
];

const INTERIOR_PHOTOS = [
  { key: "living", label: "INTERIOR — LIVING AREA" },
  { key: "kitchen", label: "INTERIOR — KITCHEN" },
];

const CONDITION_ROWS: [string, string][] = [
  ["Roof & guttering", "Sound"],
  ["Exterior paint", "Fair — south wall"],
  ["Perimeter & gate", "Sound, lock serviced"],
  ["Water tank & pump", "Serviced 12.05"],
  ["WASA account", "Current"],
  ["Interior condition", "No issues noted"],
];

const RENT_ROWS: [string, string, string][] = [
  ["April 2026", "Received 03.04", "TT$8,000"],
  ["May 2026", "Received 02.05", "TT$8,000"],
  ["June 2026", "Received 05.06", "TT$8,000"],
];

export default function ReportPage() {
  return (
    <>
      <div className="bg-card bg-ruled border-b border-rule py-14 sm:py-16">
        <Container>
          <Measure>
            <Eyebrow>The quarterly report</Eyebrow>
            <h1 className="mb-4.5 max-w-[18ch] font-display text-[clamp(30px,5.6vw,50px)] leading-[1.03] font-extrabold tracking-[-0.026em]">
              This is what lands in your inbox every quarter
            </h1>
            <p className="mb-7 text-[clamp(16.5px,2.2vw,19px)] text-ink-2">
              Most owners abroad get a WhatsApp message saying the place looks fine. We publish our reporting
              standard openly so you know exactly what you&apos;re buying — dated photographs, condition notes,
              meter readings, rates and tax status, and the tenant&apos;s payment record set out in full. Nobody
              else in this market publishes theirs.
            </p>
            <WhatsAppButton message="Hi — could you send me a full sample quarterly report?">
              Ask us for the full sample report
            </WhatsAppButton>
          </Measure>
        </Container>
      </div>

      <div className="py-14 sm:py-16">
        <Container>
          <div className="relative mx-auto max-w-[720px] pt-7">
            <span className="absolute top-0 left-6 border border-b-0 border-carbon-line bg-carbon px-5 py-2 font-mono text-[11px] font-semibold tracking-[0.14em] text-carbon-ink uppercase">
              Q2 2026 · Sample
            </span>

            <div className="relative border border-ink bg-card p-6 sm:p-8">
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-4">
                <div>
                  <b className="block font-display text-lg font-extrabold">Property condition report</b>
                  <span className="font-mono text-[12px] text-ink-3">[Property address, Trinidad]</span>
                </div>
                <span className="font-mono text-[11px] tracking-[0.09em] text-ink-3">PREPARED 04.07.2026</span>
              </div>

              <h2 className="mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-3 uppercase">
                Exterior &amp; structural
              </h2>
              <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {EXTERIOR_PHOTOS.map((photo) => (
                  <PlaceholderImage
                    key={photo.key}
                    src={`/assets/report-${photo.key}.jpg`}
                    alt={`${photo.label}, sample report`}
                    aspect="4/3"
                    label={photo.label}
                    sizes="(min-width: 640px) 160px, 45vw"
                  />
                ))}
              </div>

              <h2 className="mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-3 uppercase">
                Interior
              </h2>
              <div className="mb-6 grid grid-cols-2 gap-2">
                {INTERIOR_PHOTOS.map((photo) => (
                  <PlaceholderImage
                    key={photo.key}
                    src={`/assets/report-${photo.key}.jpg`}
                    alt={`${photo.label}, sample report`}
                    aspect="4/3"
                    label={photo.label}
                    sizes="(min-width: 640px) 320px, 45vw"
                  />
                ))}
              </div>

              <h2 className="mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-3 uppercase">
                Condition ledger
              </h2>
              <table className="mb-6 w-full border-collapse font-mono text-[13px] tabular-figures">
                <tbody>
                  {CONDITION_ROWS.map(([label, value]) => (
                    <tr key={label}>
                      <td className="border-b border-dotted border-rule py-2">{label}</td>
                      <td className="border-b border-dotted border-rule py-2 text-right font-medium">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h2 className="mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-3 uppercase">
                Rent received this quarter
              </h2>
              <table className="mb-2 w-full border-collapse font-mono text-[13px] tabular-figures">
                <tbody>
                  {RENT_ROWS.map(([month, status, amount]) => (
                    <tr key={month}>
                      <td className="border-b border-dotted border-rule py-2">
                        {month}
                        <span className="ml-2 font-body text-[12px] text-ink-3">{status}</span>
                      </td>
                      <td className="border-b border-dotted border-rule py-2 text-right font-medium">{amount}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-2 font-medium">Surcharge filed</td>
                    <td className="py-2 text-right font-medium text-ok">Yes — 30.06.2026</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-6 flex justify-end">
                <Stamp variant="ok">
                  Property in
                  <br />
                  good order
                </Stamp>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-ink py-14 text-white sm:py-16">
        <Container className="text-center">
          <h2 className="mx-auto mb-2.5 max-w-[26ch] font-display text-2xl font-extrabold tracking-[-0.015em] text-white sm:text-[28px]">
            This is the standard, every quarter, for every property we manage
          </h2>
          <p className="mx-auto mb-6 max-w-[48ch] text-[15px] text-[#B9C3D2]">
            No exceptions and no upgrade tier for better reporting — it&apos;s the same file whether your property
            rents for two thousand a month or twenty.
          </p>
          <WhatsAppButton message="Hi — I'd like to talk about getting this kind of reporting on my property.">
            Message us on WhatsApp
          </WhatsAppButton>
        </Container>
      </div>
    </>
  );
}
