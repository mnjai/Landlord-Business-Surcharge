import type { Metadata } from "next";
import { ProofWall } from "@/components/home/ProofWall";
import { Container, Measure } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Who we are",
  description:
    "Ebenezer Real Estate Services Ltd is a licensed, FIU-registered real estate agency in Trinidad & Tobago. Real Estate Agents Act credentials, company registration, and how to verify them.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <div className="bg-card bg-ruled border-b border-rule py-14 sm:py-16">
        <Container>
          <Measure>
            <Eyebrow>Who we are</Eyebrow>
            <h1 className="mb-4.5 max-w-[16ch] font-display text-[clamp(30px,5.6vw,50px)] leading-[1.03] font-extrabold tracking-[-0.026em]">
              Built for owners abroad, from the start
            </h1>
            <p className="text-[clamp(16.5px,2.2vw,19px)] text-ink-2">
              {SITE.legalName} began because the same request kept arriving from the same kind of person — someone
              who grew up around a Trinidad property, moved away, and eventually inherited or kept the
              responsibility for it without the tools to manage it properly from a distance. Everything here is
              built around that one relationship.
            </p>
          </Measure>
        </Container>
      </div>

      <ProofWall headingLevel="h1" />

      <div className="py-14 sm:py-16">
        <Container>
          <Measure>
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              What &quot;licensed agency&quot; means here, precisely
            </h2>
            <p className="mb-4.5 text-[15px] text-ink-2">
              {SITE.legalName} is a real estate agency, registered as a company in Trinidad &amp; Tobago and
              registered with the Financial Intelligence Unit as required of businesses handling property
              transactions. We are not a firm of accountants or attorneys, and we don&apos;t present ourselves as
              one — on anything touching tax or title, we work alongside T&amp;T practitioners who sign and file,
              and we say so on every page that discusses either.
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
              Ask us anything about our registration, our process, or how we handle a specific property before you
              commit to anything.
            </p>
            <WhatsAppButton message="Hi — I have a question about Ebenezer Real Estate Services before I get started.">
              Message us on WhatsApp
            </WhatsAppButton>
          </div>
        </Container>
      </div>
    </>
  );
}
