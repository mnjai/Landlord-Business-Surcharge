import type { Metadata } from "next";
import { Container, Measure } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ContactHours } from "@/components/home/ContactHours";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Ebenezer Real Estate Services by WhatsApp, phone or email. We answer across Trinidad & Tobago, US and UK hours — WhatsApp gets to us fastest.",
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

              <div className="grid grid-cols-1 gap-5 p-5.5 sm:grid-cols-2">
                <div>
                  <h2 className="mb-1.5 font-display text-base font-bold tracking-[-0.01em]">Telephone</h2>
                  <p className="font-mono text-sm text-ink-2">{SITE.phoneDisplay}</p>
                </div>
                <div>
                  <h2 className="mb-1.5 font-display text-base font-bold tracking-[-0.01em]">Email</h2>
                  <p className="font-mono text-sm text-ink-2">{SITE.email}</p>
                </div>
                <div className="sm:col-span-2">
                  <h2 className="mb-1.5 font-display text-base font-bold tracking-[-0.01em]">Office</h2>
                  <p className="text-sm text-ink-2">[street address, Trinidad &amp; Tobago]</p>
                </div>
              </div>
            </div>

            <p className="text-[12.5px] leading-[1.6] text-ink-3">
              {SITE.legalName} is a licensed real estate agency, not a firm of tax practitioners or attorneys. We
              work alongside T&amp;T accountants and attorneys who sign and file. Nothing on this page is tax or
              legal advice.
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
