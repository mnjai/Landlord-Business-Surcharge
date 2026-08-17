import type { Metadata } from "next";
import Link from "next/link";
import { Container, Measure } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { REQUIRED_REGISTRATION_DOCUMENTS } from "@/lib/surcharge";
import { CJA, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "What you'll need to register",
  description:
    "The four documents Landlord Business Surcharge registration requires, and an honest timeline — two to six weeks, almost all of it waiting on the documents. Start gathering them before you sign up.",
  alternates: { canonical: "/services/absentee-landlord-service/what-youll-need" },
};

const ITEM_NOTES: Record<number, string> = {
  0: "Yours, and the agent's, since Ebenezer registers on your behalf.",
  1: "Whatever proves the property is legally yours to register.",
  2: "Any recent utility bill showing your current address.",
  3: `We draft this and send it to you to sign — you don't have to produce it yourself.`,
};

export default function WhatYoullNeedPage() {
  return (
    <>
      <div className="bg-card bg-ruled border-b border-rule py-14 sm:py-16">
        <Container>
          <Measure>
            <Eyebrow>Before you sign up</Eyebrow>
            <h1 className="mb-4.5 max-w-[20ch] font-display text-[clamp(30px,5.6vw,50px)] leading-[1.03] font-extrabold tracking-[-0.026em]">
              What you&apos;ll need
            </h1>
            <p className="mb-7 text-[clamp(16.5px,2.2vw,19px)] text-ink-2">
              The single largest delay in onboarding is waiting for documents, not anything we do. Four items —
              start gathering them now and registration moves as fast as it possibly can.
            </p>
            <WhatsAppButton message="Hi — I'm getting my documents together for registration and have a question.">
              Ask us a question
            </WhatsAppButton>
          </Measure>
        </Container>
      </div>

      <div className="py-14 sm:py-16">
        <Container>
          <div className="mb-11 border border-rule bg-card">
            {REQUIRED_REGISTRATION_DOCUMENTS.map((doc, i) => (
              <div
                key={doc}
                className={`flex gap-4 p-5 sm:p-6 ${
                  i < REQUIRED_REGISTRATION_DOCUMENTS.length - 1 ? "border-b border-rule" : ""
                }`}
              >
                <div className="font-mono text-sm font-semibold text-pen">{i + 1}</div>
                <div>
                  <p className="font-display text-base font-bold tracking-[-0.01em]">{doc}</p>
                  <p className="mt-1 text-[14px] text-ink-2">{ITEM_NOTES[i]}</p>
                </div>
              </div>
            ))}
          </div>

          <Measure className="mb-9">
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              The honest timeline: two to six weeks
            </h2>
            <p className="mb-3.5 text-[15px] text-ink-2">
              And almost all of it is waiting for those four documents — the registration filing itself, once
              everything is in hand, is quick. We&apos;d rather tell you that now than let you find out mid-way
              through. An owner who knows the real timeline tends to start looking for the title deed sooner rather
              than later, which is the whole point of saying this plainly.
            </p>
            <p className="text-[15px] text-ink-2">
              If the title turns out to still be in a parent&apos;s name, that timeline changes — see{" "}
              <Link href="/guide/inherited-deeds-transfer" className="border-b border-pen pb-px no-underline">
                the guide on transferring a deed after a death
              </Link>{" "}
              for what that involves instead.
            </p>
          </Measure>

          <div className="border border-ink bg-ink p-6.5 text-white sm:p-[30px_26px]">
            <h3 className="mb-2 font-display text-xl font-extrabold tracking-[-0.015em]">
              Ready to start gathering documents?
            </h3>
            <p className="mb-5 max-w-[54ch] text-[14.5px] text-[#B9C3D2]">
              Message us and we&apos;ll confirm exactly what applies to your property before you send anything.
            </p>
            <WhatsAppButton message="Hi — I'd like to start the Absentee Landlord Service registration process.">
              Message us on WhatsApp
            </WhatsAppButton>
          </div>

          <p className="mt-7 text-[12.5px] leading-[1.6] text-ink-3">
            {CJA.tradingName} coordinates this process and drafts the authorisation letter; {SITE.legalName} is the
            named agent who files, in person, at the Inland Revenue Division. This is general information, not tax
            or legal advice.
          </p>
        </Container>
      </div>
    </>
  );
}
