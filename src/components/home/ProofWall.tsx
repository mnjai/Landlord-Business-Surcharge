import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading, SectionDek } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { RuledLine } from "@/components/ui/RuledLine";
import { CJA, SITE } from "@/lib/site";

interface Credential {
  label: string;
  value: string;
  todo?: boolean;
}

const CJA_CREDENTIALS: Credential[] = [
  { label: "Legal entity", value: CJA.legalName },
  { label: "State of registration", value: "[state]", todo: true },
  { label: "CPA / CMA credential", value: "[credential no. & issuing board]", todo: true },
  { label: "Business address", value: "[street address, United States]", todo: true },
  { label: "Professional indemnity", value: "[insurer & cover]", todo: true },
  { label: "Telephone", value: CJA.phoneDisplay },
];

const EBENEZER_CREDENTIALS: Credential[] = [
  { label: "FIU registration", value: "[registration no.]", todo: true },
  { label: "Company registration", value: "[company no.]", todo: true },
  { label: "Professional indemnity", value: "[insurer & cover]", todo: true },
  { label: "AML compliance officer", value: "[named officer]", todo: true },
  { label: "Office", value: "[street address, Trinidad & Tobago]", todo: true },
  { label: "Telephone", value: SITE.phoneDisplay },
  { label: "Trading since", value: "[year]", todo: true },
];

function CredentialColumn({
  companyLabel,
  principalRole,
  portraitSrc,
  credentials,
}: {
  companyLabel: string;
  principalRole: string;
  portraitSrc: string;
  credentials: Credential[];
}) {
  return (
    <div>
      <div className="mb-3 font-mono text-[10.5px] font-semibold tracking-[0.14em] text-pen uppercase">
        {companyLabel}
      </div>
      <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-[140px_1fr]">
        <div className="max-w-[160px] border border-ink bg-card p-2">
          <PlaceholderImage
            src={portraitSrc}
            alt={`Principal, ${companyLabel}`}
            aspect="4/5"
            label="PRINCIPAL PORTRAIT"
            sizes="140px"
          />
          <p className="px-0.5 pt-2 font-mono text-[10.5px] leading-[1.5] text-ink-2">
            [Full name]
            <br />
            {principalRole}
          </p>
        </div>

        <div className="border border-rule bg-card">
          {credentials.map((cred, i) => (
            <div
              key={cred.label}
              className={`flex flex-wrap justify-between gap-3 px-4.5 py-3 text-[13.5px] ${
                i < credentials.length - 1 ? "border-b border-rule" : ""
              }`}
            >
              <span className="text-ink-2">{cred.label}</span>
              <span className={`font-mono text-[12.5px] font-medium ${cred.todo ? "text-stamp" : ""}`}>
                {cred.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProofWall({ headingLevel = "h2" as const }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="about" className="border-b border-rule bg-card">
      <RuledLine />
      <Container className="py-16">
        <Eyebrow>Who you&apos;re dealing with</Eyebrow>
        <SectionHeading as={headingLevel}>
          Two independent companies, working to a defined split. Full papers on both.
        </SectionHeading>
        <SectionDek>
          Trinidad &amp; Tobago&apos;s Real Estate Agents Act is passed but not yet proclaimed, which means anyone
          can call themselves an agent here — verifiable credentials are the only thing separating a real agency
          from a phone number. {CJA.tradingName} is never a subsidiary, division or agent of {SITE.name}, or the reverse —
          check either set of credentials below independently.
        </SectionDek>

        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <CredentialColumn
            companyLabel={`${CJA.tradingName} — United States`}
            principalRole={`Principal, ${CJA.legalName}`}
            portraitSrc="/assets/cja-principal.jpg"
            credentials={CJA_CREDENTIALS}
          />
          <CredentialColumn
            companyLabel={`${SITE.name} — Trinidad & Tobago`}
            principalRole={`Principal & Licensed Agent, ${SITE.legalName}`}
            portraitSrc="/assets/principal.jpg"
            credentials={EBENEZER_CREDENTIALS}
          />
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border border-dashed border-rule bg-paper px-4.5 py-3.5">
          <span className="text-[13.5px] text-ink-2">Licensed T&amp;T accountant / attorney who reviews and signs filings</span>
          <span className="font-mono text-[12.5px] font-medium text-stamp">[reserved — not yet named]</span>
        </div>
      </Container>
    </section>
  );
}
