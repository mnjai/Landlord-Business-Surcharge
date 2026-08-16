import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Calculator } from "@/components/calculator/Calculator";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Do you owe the Landlord Business Surcharge? Free check",
  description:
    "Six questions. Get your quarterly Landlord Business Surcharge liability, what registration costs, and what's accruing if you haven't filed yet. No email required to see the result.",
  alternates: { canonical: "/check" },
  openGraph: {
    title: "Do you owe the Landlord Business Surcharge? Free check",
    description:
      "Six questions. Get your quarterly liability, registration cost, and penalty exposure — built for owners who don't live in Trinidad & Tobago.",
    url: "/check",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does living abroad exempt me from the Landlord Business Surcharge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The obligation attaches to the property, not to your address — a property in Trinidad & Tobago creates the same duty whether the owner lives in Trinidad & Tobago, New York, Toronto or London.",
      },
    },
    {
      "@type": "Question",
      name: "Does being paid in US dollars take me out of scope?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Receiving rent in foreign currency for a Trinidad & Tobago property still requires registration and quarterly payment. The rule looks at where the property sits, not where the money lands.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Landlord Business Surcharge a second tax on the same rental income?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. It is creditable against your final annual tax liability — in effect an advance instalment of tax you would owe anyway, collected four times a year instead of once.",
      },
    },
    {
      "@type": "Question",
      name: "Can someone register on my behalf if I can't travel to Trinidad & Tobago?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Registration through an agent is expressly contemplated — the required documents include an authorisation letter for exactly that case, alongside the agent's own identification.",
      },
    },
  ],
};

export default function CheckPage() {
  return (
    <div className="bg-paper py-12 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Container className="max-w-[820px]!">
        <header className="mb-7 border-b-2 border-ink pb-3.5">
          <div className="mb-4.5 flex flex-wrap gap-x-3.5 gap-y-1.5 font-mono text-[11px] font-medium tracking-[0.14em] text-ink-2 uppercase">
            <span>{SITE.legalName}</span>
            <span className="text-pen">FIU Registered Agency</span>
            <span>Trinidad &amp; Tobago</span>
          </div>
          <h1 className="mb-3 max-w-[16ch] font-display text-[clamp(30px,6.4vw,50px)] leading-[1.02] font-extrabold tracking-[-0.022em]">
            Do you owe the Landlord Business Surcharge?
          </h1>
          <p className="max-w-[56ch] text-[clamp(15px,2.4vw,17px)] text-ink-2">
            Six questions. You&apos;ll get your quarterly liability, what registration costs, and what&apos;s
            accruing if you haven&apos;t registered yet. Built for owners who don&apos;t live in Trinidad &amp; Tobago.
          </p>
        </header>

        <Suspense fallback={<div className="h-[600px]" aria-hidden="true" />}>
          <Calculator />
        </Suspense>

        <p className="mt-7 text-[12.5px] leading-[1.6] text-ink-3">
          <strong className="font-semibold text-ink-2">This is an estimate, not tax advice.</strong> It applies the
          Landlord Business Surcharge introduced by the Finance Act 2025 — 2.5% on the first TT$20,000 of rent
          collected each quarter and 3.5% above that, with a one-time TT$2,500 registration fee. A narrow set of
          exemptions exists that this tool does not attempt to assess, and penalty application is ultimately the
          BIR&apos;s determination. {SITE.legalName} is a licensed real estate agency, not a firm of tax
          practitioners; we work alongside T&amp;T accountants and attorneys who sign and file. Confirm your own
          position with a Trinidad &amp; Tobago tax practitioner or attorney before you file.
        </p>
      </Container>
    </div>
  );
}
