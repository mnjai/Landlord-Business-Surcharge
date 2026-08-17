import type { Metadata } from "next";
import { Container, Measure } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ContactHours } from "@/components/home/ContactHours";
import { CJA, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    `Reach ${CJA.tradingName} on a US number for calls and WhatsApp, or ${SITE.name} directly in Trinidad & Tobago. We answer across Trinidad & Tobago, US and UK hours — WhatsApp gets to us fastest.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="bg-card bg-ruled py-14 sm:py-16">
      <Container>
        <Measure>
          <Eyebrow>Get in touch</Eyebrow>
          <h1 className="mb-4.5 max-w-[16ch] font-display text-[clamp(30px,5.6vw,50px)] leading-[1.03] font-extrabold tracking-[-0.026em]">
            Talk to someone who&apos;s awake when you are
          </h1>
          <p className="mb-8 text-[clamp(16.5px,2.2vw,19px)] text-ink-2">
            Trinidad &amp; Tobago runs four hours behind London and level with New York for half the year. We answer
            across all three, and WhatsApp gets to us fastest.
          </p>
        </Measure>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px] lg:gap-11">
          <div>
            <div className="mb-5 border border-rule bg-card">
              <div className="border-b border-rule p-5.5">
                <h2 className="mb-1.5 font-display text-lg font-bold tracking-[-0.01em]">WhatsApp</h2>
                <p className="mb-4 text-sm text-ink-2">
                  Our primary channel — fastest reply, and where most conversations with owners abroad actually
                  happen.
                </p>
                <WhatsAppButton message="Hi — I own property in Trinidad & Tobago and live abroad.">
                  Message us on WhatsApp
                </WhatsAppButton>
              </div>

              <div className="border-b border-rule p-5.5">
                <h2 className="mb-1.5 font-display text-lg font-bold tracking-[-0.01em]">Call a US number</h2>
                <p className="mb-4 text-sm text-ink-2">
                  {CJA.tradingName} holds your file and is reachable on a number in your own country — not a
                  Trinidad &amp; Tobago long-distance call.
                </p>
                <a
                  href={`tel:+${CJA.phoneE164}`}
                  className="font-mono text-lg font-semibold text-ink hover:text-pen"
                >
                  {CJA.phoneDisplay}
                </a>
              </div>

              <div className="border-b border-rule p-5.5">
                <h2 className="mb-1.5 font-display text-lg font-bold tracking-[-0.01em]">Book a call</h2>
                <p className="mb-4 text-sm text-ink-2">
                  Tell us a couple of times that work for you and your time zone — we&apos;ll confirm by WhatsApp
                  or email.
                </p>
                <WhatsAppButton
                  message="Hi — I'd like to book a call. Here are a couple of times that work for me:"
                  className="bg-transparent px-[18px] py-[11px] text-ink-2 border border-rule hover:bg-pen-soft hover:text-pen"
                >
                  Request a call
                </WhatsAppButton>
              </div>

              <div className="p-5.5">
                <h2 className="mb-1.5 font-display text-base font-bold tracking-[-0.01em]">
                  Prefer to reach {SITE.name} in Trinidad &amp; Tobago directly?
                </h2>
                <p className="mb-4 text-sm text-ink-2">
                  For letting, inspections, title work or anything that needs someone on the ground, {SITE.name} is
                  the FIU-registered agency that does it — reachable directly, not only through {CJA.tradingName}.
                </p>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-1.5 font-mono text-[10.5px] font-semibold tracking-[0.12em] text-ink-3 uppercase">
                      WhatsApp / telephone
                    </h3>
                    <a
                      href={`tel:+${SITE.phoneE164}`}
                      className="font-mono text-sm text-ink-2 hover:text-pen"
                    >
                      {SITE.phoneDisplay}
                    </a>
                  </div>
                  <div>
                    <h3 className="mb-1.5 font-mono text-[10.5px] font-semibold tracking-[0.12em] text-ink-3 uppercase">
                      Email
                    </h3>
                    <p className="font-mono text-sm text-ink-2">{SITE.email}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="mb-1.5 font-mono text-[10.5px] font-semibold tracking-[0.12em] text-ink-3 uppercase">
                      Office
                    </h3>
                    <p className="text-sm text-ink-2">[street address, Trinidad &amp; Tobago]</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[12.5px] leading-[1.6] text-ink-3">
              {CJA.legalName} and {SITE.legalName} are two independent companies working to a defined split — see
              our <a href="/about" className="border-b border-ink-3 pb-px no-underline hover:text-pen">who we are</a>{" "}
              page for the detail. Neither is a firm of tax practitioners or attorneys; filings are reviewed and
              signed by a licensed T&amp;T professional. Nothing on this page is tax or legal advice.
            </p>
          </div>

          <div className="border border-ink bg-ink p-1">
            <ContactHours />
          </div>
        </div>
      </Container>
    </div>
  );
}
