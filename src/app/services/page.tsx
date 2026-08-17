import type { Metadata } from "next";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { Container, Measure } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Ledger, LedgerRow } from "@/components/ui/Ledger";
import { CJA, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Two products for Trinidad & Tobago property owners abroad: the Absentee Landlord Service for a rented property, Idle Property Care for an empty one. Plus title & estate readiness and selling or buying as one-off engagements.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesOverview headingLevel="h1" />

      <div className="py-14 sm:py-16">
        <Container>
          <Measure className="mb-7">
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              Who bills you for what
            </h2>
            <p className="text-[15px] text-ink-2">
              For the Absentee Landlord Service, two companies mean two invoices — that&apos;s worth saying upfront
              rather than discovering at signup. {CJA.legalName} is a US company that bills you in USD for
              compliance administration, filing and reporting. {SITE.legalName} is the FIU-registered T&amp;T agency
              that bills you in TTD for letting, rent collection and inspections. Neither substitutes for the other,
              and we state the combined figure as a single percentage of rent so you can compare it to any other
              managing agent&apos;s quote.
            </p>
          </Measure>
          <Ledger className="max-w-[560px]">
            <LedgerRow
              label={CJA.legalName}
              sub="Compliance administration, filing, reporting — bills in USD"
              value="Invoice 1"
            />
            <LedgerRow
              label={SITE.legalName}
              sub="Letting, rent collection, inspections — bills in TTD"
              value="Invoice 2"
            />
          </Ledger>
        </Container>
      </div>

      <div className="bg-ink py-14 text-white sm:py-16">
        <Container className="text-center">
          <h2 className="mx-auto mb-2.5 max-w-[26ch] font-display text-2xl font-extrabold tracking-[-0.015em] text-white sm:text-[28px]">
            Not sure which one fits your situation?
          </h2>
          <p className="mx-auto mb-6 max-w-[48ch] text-[15px] text-[#B9C3D2]">
            Most conversations start with the surcharge and grow from there. Tell us what&apos;s going on and
            we&apos;ll tell you plainly where to start.
          </p>
          <WhatsAppButton
            message="Hi — I'd like to know which of your services fits my situation."
            className="px-6 py-3.5 text-[15px]"
          >
            Message us on WhatsApp
          </WhatsAppButton>
        </Container>
      </div>
    </>
  );
}
