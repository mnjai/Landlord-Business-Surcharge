import type { Metadata } from "next";
import Link from "next/link";
import { Container, Measure } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Ledger, LedgerRow } from "@/components/ui/Ledger";
import { DatesGrid } from "@/components/guide/DatesGrid";
import { PRODUCT_A } from "@/lib/services";
import { REGISTRATION_OFFICES } from "@/lib/surcharge";
import { CJA, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Absentee Landlord Service",
  description:
    `For Trinidad & Tobago property with a tenant already in it. ${CJA.tradingName} coordinates the Landlord Business Surcharge compliance and reporting; Ebenezer handles the tenant, the rent, the physical IRD filing and the inspections. One combined percentage of rent.`,
  alternates: { canonical: "/services/absentee-landlord-service" },
};

export default function AbsenteeLandlordServicePage() {
  return (
    <>
      <div className="bg-card bg-ruled border-b border-rule py-14 sm:py-16">
        <Container>
          <Measure>
            <Eyebrow>{PRODUCT_A.eyebrow}</Eyebrow>
            <h1 className="mb-4.5 max-w-[18ch] font-display text-[clamp(30px,5.6vw,50px)] leading-[1.03] font-extrabold tracking-[-0.026em]">
              {PRODUCT_A.title}
            </h1>
            <p className="mb-7 text-[clamp(16.5px,2.2vw,19px)] text-ink-2">{PRODUCT_A.forWhom}</p>
            <WhatsAppButton message="Hi — my Trinidad & Tobago property is rented and I'd like to know more about the Absentee Landlord Service.">
              Ask about this service
            </WhatsAppButton>
          </Measure>
        </Container>
      </div>

      <div className="py-14 sm:py-16">
        <Container>
          <Measure className="mb-9">
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              One relationship, two companies, one combined fee
            </h2>
            <p className="text-[15px] text-ink-2">
              {CJA.tradingName} holds your file and answers the phone. {SITE.legalName} does the work that requires
              a licensed agent standing in Trinidad &amp; Tobago. You never have to manage the coordination between
              them — that&apos;s the point of the split.
            </p>
          </Measure>

          <div className="mb-9 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2">
            <div className="bg-card p-6">
              <div className="mb-1 font-mono text-[10.5px] font-semibold tracking-[0.12em] text-ink-3 uppercase">
                {CJA.tradingName} — United States — bills in USD
              </div>
              <ul className="mt-3 space-y-2 text-[14.5px] text-ink-2">
                {PRODUCT_A.cjaDoes.map((item) => (
                  <li key={item} className="border-b border-dotted border-rule pb-2 last:border-b-0 last:pb-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card p-6">
              <div className="mb-1 font-mono text-[10.5px] font-semibold tracking-[0.12em] text-ink-3 uppercase">
                {SITE.name} — Trinidad &amp; Tobago — bills in TTD
              </div>
              <ul className="mt-3 space-y-2 text-[14.5px] text-ink-2">
                {PRODUCT_A.ebenezerDoes.map((item) => (
                  <li key={item} className="border-b border-dotted border-rule pb-2 last:border-b-0 last:pb-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Measure className="mb-9">
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              How registration actually works
            </h2>
            <p className="mb-3.5 text-[15px] text-ink-2">
              Registration cannot be done online. It is filed on paper, by hand, at one of four Inland Revenue
              offices — district offices will not accept it.
            </p>
            <ul className="mb-3.5 grid grid-cols-1 gap-2 text-[14.5px] text-ink-2 sm:grid-cols-2">
              {REGISTRATION_OFFICES.map((office) => (
                <li key={office.city} className="border border-rule bg-card px-3.5 py-2.5">
                  <span className="font-semibold text-ink">{office.city}</span> — {office.address}
                </li>
              ))}
            </ul>
            <p className="mb-3.5 text-[15px] text-ink-2">
              <strong className="font-semibold text-ink">This is the legal foundation of the whole service:</strong>{" "}
              the law expressly allows an agent to register on your behalf, on a signed authorisation letter.{" "}
              {SITE.name} is that named agent — a Trinidad-based coordinator on staff does the physical filing, so
              nobody has to fly down to stand in that line.
            </p>
            <p className="text-[15px] text-ink-2">
              Once registered, the surcharge falls due quarterly, on these dates:
            </p>
            <DatesGrid />
            <p className="text-[15px] text-ink-2">
              We work to an internal cut-off a week before each date, so a missed filing doesn&apos;t become a 5%
              charge plus 15% annual interest.
            </p>
          </Measure>

          <div className="mb-9 border border-carbon-line border-l-4 border-l-pen bg-carbon px-[18px] py-4">
            <p className="text-[14.5px] text-carbon-ink">
              Most onboarding delay is waiting on documents, not on us. See exactly{" "}
              <Link
                href="/services/absentee-landlord-service/what-youll-need"
                className="border-b border-pen pb-px no-underline"
              >
                what you&apos;ll need
              </Link>{" "}
              and the honest timeline, so you can start gathering it before you sign up.
            </p>
          </div>

          <Measure className="mb-9">
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              If the deed is still in a parent&apos;s name
            </h2>
            <p className="text-[15px] text-ink-2">
              Common enough that it deserves its own paragraph, not a footnote. If the title is still in the name of
              someone who has died, registration can&apos;t proceed until the estate is administered — that&apos;s a
              separate engagement, not a failure on anyone&apos;s part. For many owners this is the moment they
              discover what&apos;s actually holding things up. Read{" "}
              <Link href="/guide/inherited-deeds-transfer" className="border-b border-pen pb-px no-underline">
                the guide on transferring a deed after a death
              </Link>{" "}
              for what that process involves.
            </p>
          </Measure>

          <Measure className="mb-9">
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              Rent collection is how this works best
            </h2>
            <p className="text-[15px] text-ink-2">
              When {SITE.name} collects the rent directly, the surcharge is simply deducted from what&apos;s held
              before it&apos;s remitted to you — nothing has to be chased quarterly across time zones, and nothing
              depends on you sending a payment on time from abroad. It&apos;s the version of this service that
              actually runs itself.
            </p>
          </Measure>

          <Measure className="mb-9">
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              Two invoices, one combined figure
            </h2>
            <p className="mb-4 text-[15px] text-ink-2">
              You&apos;ll see this in writing before anything is signed, not discover it at billing time: a Product A
              client pays {CJA.tradingName} for compliance and reporting, in USD, and {SITE.name} for letting and
              collection, in TTD. State it as one number and it&apos;s directly comparable to what any other
              managing agent quotes you.
            </p>
            <Ledger>
              <LedgerRow label={`${CJA.tradingName} — compliance, filing coordination, reporting`} value="USD, monthly" />
              <LedgerRow label={`${SITE.name} — letting, collection, IRD filing, inspections`} value="Percentage of rent, TTD" />
            </Ledger>
          </Measure>

          <div className="border border-ink bg-ink p-6.5 text-white sm:p-[30px_26px]">
            <h3 className="mb-2 font-display text-xl font-extrabold tracking-[-0.015em]">
              Compare it to what you&apos;re paying now
            </h3>
            <p className="mb-5 max-w-[54ch] text-[14.5px] text-[#B9C3D2]">
              Whether that&apos;s a relative doing it as a favour, an unaccountable local contact, or another
              managing agent — tell us what&apos;s in place today and we&apos;ll tell you plainly where this fits and
              what it costs against it.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <WhatsAppButton message="Hi — I'd like a quote for the Absentee Landlord Service.">
                Get a quote
              </WhatsAppButton>
              <Link
                href="/check"
                className="inline-block border border-[#4A5768] px-6 py-3.5 font-display text-[15px] font-bold text-white hover:border-white"
              >
                Check your surcharge position
              </Link>
            </div>
          </div>

          <p className="mt-7 text-[12.5px] leading-[1.6] text-ink-3">
            <strong className="font-semibold text-ink-2">This is general information, not tax advice.</strong>{" "}
            {CJA.tradingName} is not a firm of tax practitioners, does not file with or appear before the Inland
            Revenue Division, and does not collect, hold or handle rent or client funds — all client money is
            handled by {SITE.legalName} in Trinidad &amp; Tobago under its own obligations. Surcharge filings are
            reviewed and signed by a licensed T&amp;T professional.
          </p>
        </Container>
      </div>
    </>
  );
}
