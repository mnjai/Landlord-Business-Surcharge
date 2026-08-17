import type { Metadata } from "next";
import { ProofWall } from "@/components/home/ProofWall";
import { Container, Measure } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CJA, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Who we are",
  description:
    `${CJA.legalName} and ${SITE.legalName} are two independent companies working to a defined split for Trinidad & Tobago property owners abroad. Credentials for both, and how to verify them.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <div className="bg-card bg-ruled border-b border-rule py-14 sm:py-16">
        <Container>
          <Measure>
            <Eyebrow>Who we are</Eyebrow>
            <h1 className="mb-4.5 max-w-[18ch] font-display text-[clamp(30px,5.6vw,50px)] leading-[1.03] font-extrabold tracking-[-0.026em]">
              Two companies, built for owners abroad, from the start
            </h1>
            <p className="text-[clamp(16.5px,2.2vw,19px)] text-ink-2">
              This began because the same request kept arriving from the same kind of person — someone who grew up
              around a Trinidad &amp; Tobago property, moved away, and eventually inherited or kept the
              responsibility for it without the tools to manage it properly from a distance. A US company cannot
              lawfully act as a real estate agent in T&amp;T, so {CJA.tradingName} holds the relationship you deal with
              day to day, and {SITE.name} — the FIU-registered agency on the ground — does everything that requires
              a licensed agent or a physical presence. Neither is a subsidiary, division or agent of the other.
            </p>
          </Measure>
        </Container>
      </div>

      <ProofWall headingLevel="h1" />

      <div className="py-14 sm:py-16">
        <Container>
          <Measure className="mb-9">
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              What each company is, precisely
            </h2>
            <p className="mb-4.5 text-[15px] text-ink-2">
              <strong className="font-semibold text-ink">{CJA.legalName}</strong> is a United States company that
              administers compliance, keeps your filing calendar and produces your reporting. It is not a real
              estate agent, is not licensed or registered in Trinidad &amp; Tobago, and does not let property,
              collect rent, sell property, act as an agent there, or file with or appear before the Inland Revenue
              Division. It does not collect, hold or handle rent or client funds — all client money is handled by{" "}
              {SITE.legalName} in Trinidad &amp; Tobago under its own obligations. It also does not engage, direct
              or pay contractors, inspectors or sub-agents — {SITE.legalName} does, and verifies their liability
              cover.
            </p>
            <p className="mb-4.5 text-[15px] text-ink-2">
              <strong className="font-semibold text-ink">{SITE.legalName}</strong> is a real estate agency,
              registered as a company in Trinidad &amp; Tobago and registered with the Financial Intelligence Unit
              as required of businesses handling property transactions. Neither company is a firm of accountants or
              attorneys, and neither presents itself as one — on anything touching tax or title, filings are
              reviewed and signed by a licensed T&amp;T professional, and we say so on every page that discusses
              either.
            </p>
            <p className="text-[15px] text-ink-2">
              If any of the credentials above don&apos;t check out when you look into them, we&apos;d want to know
              that before you would. Ask us directly, or verify them independently — that&apos;s the point of
              publishing them.
            </p>
          </Measure>

          <div className="mt-9 bg-ink p-6.5 text-white sm:p-[30px_26px]">
            <h3 className="mb-2 font-display text-xl font-extrabold tracking-[-0.015em]">
              Questions about who you&apos;d be working with?
            </h3>
            <p className="mb-5 max-w-[50ch] text-[14.5px] text-[#B9C3D2]">
              Ask us anything about either company&apos;s registration, our process, or how we handle a specific
              property before you commit to anything.
            </p>
            <WhatsAppButton message={`Hi — I have a question about ${CJA.tradingName} and Ebenezer Real Estate Services before I get started.`}>
              Message us on WhatsApp
            </WhatsAppButton>
          </div>
        </Container>
      </div>
    </>
  );
}
