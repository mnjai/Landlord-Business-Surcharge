import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading, SectionDek } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { RuledLine } from "@/components/ui/RuledLine";
import { SITE } from "@/lib/site";

const CREDENTIALS: { label: string; value: string; todo?: boolean }[] = [
  { label: "FIU registration", value: "[registration no.]", todo: true },
  { label: "Company registration", value: "[company no.]", todo: true },
  { label: "Professional indemnity", value: "[insurer & cover]", todo: true },
  { label: "AML compliance officer", value: "[named officer]", todo: true },
  { label: "Office", value: "[street address, Trinidad & Tobago]" },
  { label: "Telephone", value: SITE.phoneDisplay },
  { label: "Trading since", value: "[year]" },
];

export function ProofWall({ headingLevel = "h2" as const }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="about" className="border-b border-rule bg-card">
      <RuledLine />
      <Container className="py-16">
        <Eyebrow>Who you&apos;re dealing with</Eyebrow>
        <SectionHeading as={headingLevel}>
          Trinidad &amp; Tobago has no real estate licensing regime yet. So we show our papers.
        </SectionHeading>
        <SectionDek>
          The Real Estate Agents Act is passed but not yet proclaimed, which means anyone can call themselves an
          agent here. Until that changes, verifiable credentials are the only thing separating a real agency from a
          phone number. Ours are below — check any of them.
        </SectionDek>

        <div className="grid grid-cols-1 items-start gap-7 sm:grid-cols-[280px_1fr] sm:gap-9">
          <div className="max-w-[300px] border border-ink bg-card p-2.5">
            <PlaceholderImage
              src="/assets/principal.jpg"
              alt="Principal, Ebenezer Real Estate Services"
              aspect="4/5"
              label="PRINCIPAL PORTRAIT"
              sizes="(min-width: 640px) 280px, 60vw"
            />
            <p className="px-0.5 pt-2.5 font-mono text-[11px] leading-[1.5] text-ink-2">
              [Full name]
              <br />
              Principal &amp; Licensed Agent
              <br />
              {SITE.legalName}
            </p>
          </div>

          <div className="border border-rule bg-card">
            {CREDENTIALS.map((cred, i) => (
              <div
                key={cred.label}
                className={`flex flex-wrap justify-between gap-4.5 px-5 py-3.5 text-[14.5px] ${
                  i < CREDENTIALS.length - 1 ? "border-b border-rule" : ""
                }`}
              >
                <span className="text-ink-2">{cred.label}</span>
                <span className={`font-mono text-[13px] font-medium ${cred.todo ? "text-stamp" : ""}`}>
                  {cred.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
