import type { Metadata } from "next";
import Link from "next/link";
import { Container, Measure } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CJA, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The inspection standard",
  description:
    "What we actually check on an idle Trinidad & Tobago property, published openly: the fixed monthly photo schedule and the independent quarterly inspection checklist. Nobody else in this market publishes theirs.",
  alternates: { canonical: "/standard" },
};

const MONTHLY_PHOTO_SCHEDULE = [
  { key: "roof", label: "ROOF & GUTTERING" },
  { key: "exterior", label: "EXTERIOR — SOUTH WALL" },
  { key: "gate", label: "PERIMETER & GATE" },
  { key: "tank", label: "WATER TANK & PUMP" },
  { key: "living", label: "INTERIOR — LIVING AREA" },
  { key: "kitchen", label: "INTERIOR — KITCHEN" },
];

const QUARTERLY_CHECKLIST: [string, string][] = [
  ["Verify all six monthly photo points", "Against the contractor's record, same angles"],
  ["Roof, walls and foundations", "Full structural walk, not a drive-by"],
  ["Boundary and fencing", "Checked for encroachment or damage"],
  ["Drainage and vegetation", "Blocked drains and growth against the structure noted"],
  ["Interior condition, where accessible", "Damp, pests, structural movement"],
  ["WASA / T&TEC account status", "Confirmed current, not assumed"],
  ["Vacancy disclosed to insurer", "Confirmed, not assumed"],
  ["Written report issued", `Compiled and sent by ${CJA.tradingName}`],
];

export default function StandardPage() {
  return (
    <>
      <div className="bg-card bg-ruled border-b border-rule py-14 sm:py-16">
        <Container>
          <Measure>
            <Eyebrow>The inspection standard</Eyebrow>
            <h1 className="mb-4.5 max-w-[20ch] font-display text-[clamp(30px,5.6vw,50px)] leading-[1.03] font-extrabold tracking-[-0.026em]">
              What we actually check, published openly
            </h1>
            <p className="mb-7 text-[clamp(16.5px,2.2vw,19px)] text-ink-2">
              Nobody else in this market publishes what a competent inspection covers. Two people watch an idle
              property: a grounds contractor every month, and an independent inspector every quarter who verifies
              what the contractor has been reporting. Here is exactly what each of them does.
            </p>
            <WhatsAppButton message="Hi — I have a question about your inspection standard.">
              Ask us about this standard
            </WhatsAppButton>
          </Measure>
        </Container>
      </div>

      <div className="py-14 sm:py-16">
        <Container>
          <Measure className="mb-9">
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              Every month: the same six angles
            </h2>
            <p className="text-[15px] text-ink-2">
              The grounds contractor already on site captures a structured photographic record against this fixed
              checklist — same six points, same angles, every single month. That consistency is the whole point:
              it&apos;s what makes twelve months of photographs comparable rather than just twelve separate
              snapshots, so a change is visible the moment it happens.
            </p>
          </Measure>

          <div className="mb-11 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {MONTHLY_PHOTO_SCHEDULE.map((photo) => (
              <PlaceholderImage
                key={photo.key}
                src={`/assets/report-${photo.key}.jpg`}
                alt={`${photo.label}, monthly photo schedule`}
                aspect="4/3"
                label={photo.label}
                sizes="(min-width: 640px) 240px, 45vw"
              />
            ))}
          </div>

          <Measure className="mb-9">
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              Every quarter: someone who isn&apos;t the contractor checks the contractor
            </h2>
            <p className="text-[15px] text-ink-2">
              The person who maintains your property is not the only person who reports on its condition. An
              independent local inspector visits four times a year, verifies the monthly photographic record against
              what&apos;s actually there, and writes a full report — rather than simply repeating what the
              contractor already said.
            </p>
          </Measure>

          <div className="mb-11 border border-rule bg-card">
            <table className="w-full border-collapse text-[13.5px]">
              <tbody>
                {QUARTERLY_CHECKLIST.map(([item, note], i) => (
                  <tr key={item} className={i < QUARTERLY_CHECKLIST.length - 1 ? "border-b border-rule" : ""}>
                    <td className="p-4 font-medium text-ink sm:w-[40%]">{item}</td>
                    <td className="p-4 text-ink-2">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border border-carbon-line border-l-4 border-l-pen bg-carbon px-[18px] py-4">
            <p className="text-[14.5px] text-carbon-ink">
              Twelve dated photographic records a year, plus four independent inspections that verify them — that is
              a stronger claim than a single monthly visit, and it is what actually happens. See it applied to a
              real property in{" "}
              <Link href="/report" className="border-b border-pen pb-px no-underline">
                a sample quarterly report
              </Link>
              , or read what this protects against in{" "}
              <Link href="/guide/vacant-property" className="border-b border-pen pb-px no-underline">
                the guide on squatters and deterioration
              </Link>
              .
            </p>
          </div>

          <p className="mt-7 text-[12.5px] leading-[1.6] text-ink-3">
            {SITE.legalName} sources, supervises and pays the grounds contractor and the independent inspector on
            the ground in Trinidad &amp; Tobago; {CJA.tradingName} compiles and sends the quarterly report. This is
            general information, not legal or insurance advice — confirm your own property&apos;s requirements with
            your insurer and attorney.
          </p>
        </Container>
      </div>

      <div className="bg-ink py-14 text-white sm:py-16">
        <Container className="text-center">
          <h2 className="mx-auto mb-2.5 max-w-[30ch] font-display text-2xl font-extrabold tracking-[-0.015em] text-white sm:text-[28px]">
            This is the standard for every idle property we look after
          </h2>
          <p className="mx-auto mb-6 max-w-[48ch] text-[15px] text-[#B9C3D2]">
            No exceptions, and no lighter tier for a smaller property — the same checklist, the same schedule, every
            time.
          </p>
          <WhatsAppButton message="Hi — I have an empty Trinidad & Tobago property and want to know about Idle Property Care.">
            Ask about Idle Property Care
          </WhatsAppButton>
        </Container>
      </div>
    </>
  );
}
