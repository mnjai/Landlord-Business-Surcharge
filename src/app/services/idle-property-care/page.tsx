import type { Metadata } from "next";
import Link from "next/link";
import { Container, Measure } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { RestorationAssessment } from "@/components/services/RestorationAssessment";
import { RestorationGallery } from "@/components/services/RestorationGallery";
import { PRODUCT_B } from "@/lib/services";
import { PRICING, formatPublishedUSD } from "@/lib/pricing";
import { CJA, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Idle Property Care",
  description:
    "For an empty Trinidad & Tobago property. No rent, no surcharge — but a house left unwatched degrades fast, insurers take a dim view of undisclosed vacancy, and sixteen years of unopposed occupation can extinguish your title. Assessment, restoration where needed, then twelve dated photographic records a year plus four independent inspections.",
  alternates: { canonical: "/services/idle-property-care" },
};

const ZONES: { zone: string; deliveredBy: string }[] = [
  { zone: "Trinidad — core area", deliveredBy: "Ebenezer's own contractor and inspector" },
  { zone: "Tobago", deliveredBy: "Locally based sub-agent" },
  { zone: "Toco", deliveredBy: "Locally based sub-agent" },
  { zone: "Cedros", deliveredBy: "Locally based sub-agent" },
  { zone: "Mayaro", deliveredBy: "Locally based sub-agent" },
];

const PHASES: { step: string; title: string; body: string }[] = [
  {
    step: "1",
    title: "Site assessment",
    body: "A modest one-off fee, credited against your first month of maintenance if you proceed. We visit, produce a written scope and quote, and take a dated photographic record of the property exactly as found — nothing can be scoped from photographs taken years ago.",
  },
  {
    step: "2",
    title: "Restoration, where the assessment finds it's needed",
    body: "Clearing, cutting back, debris removal, boundary and fence reinstatement, securing openings — scoped and quoted after the assessment, not before, because there's no honest range to give until someone has seen it.",
  },
  {
    step: "3",
    title: "Maintenance",
    body: "The recurring monthly service begins once the property is maintainable — whether it always was, or restoration got it there.",
  },
];

export default function IdlePropertyCarePage() {
  return (
    <>
      <div className="bg-card bg-ruled border-b border-rule py-14 sm:py-16">
        <Container>
          <Measure>
            <Eyebrow>{PRODUCT_B.eyebrow}</Eyebrow>
            <h1 className="mb-4.5 max-w-[18ch] font-display text-[clamp(30px,5.6vw,50px)] leading-[1.03] font-extrabold tracking-[-0.026em]">
              {PRODUCT_B.title}
            </h1>
            <p className="mb-7 text-[clamp(16.5px,2.2vw,19px)] text-ink-2">{PRODUCT_B.forWhom}</p>
            <WhatsAppButton message="Hi — I have an empty Trinidad & Tobago property and want to know about Idle Property Care.">
              Ask about Idle Property Care
            </WhatsAppButton>
          </Measure>
        </Container>
      </div>

      <div className="py-14 sm:py-16">
        <Container>
          <Measure className="mb-9">
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              Two starting points, depending on the property
            </h2>
            <p className="text-[15px] text-ink-2">
              The monthly service further down this page assumes a property that&apos;s already maintainable. Many
              aren&apos;t. Some have gone years without anyone on site — that&apos;s the ordinary case for an
              inherited or long-distance property, not an unusual one. If yours is one of them, the sequence is
              different: a site assessment first, then restoration, then the same monthly service begins.
            </p>
          </Measure>

          <div className="mb-11 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-3">
            {PHASES.map((phase) => (
              <div key={phase.step} className="bg-card p-5 sm:p-6">
                <div className="mb-2 font-mono text-xs font-semibold text-pen">{phase.step}</div>
                <h3 className="mb-2 font-display text-base font-bold tracking-[-0.01em]">{phase.title}</h3>
                <p className="text-[13.5px] text-ink-2">{phase.body}</p>
              </div>
            ))}
          </div>

          <Measure className="mb-9">
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              What restoration costs
            </h2>
            <p className="text-[15px] text-ink-2">
              Same structure as maintenance, at a different rate: contractor and grounds work at cost, plus a
              coordination percentage — higher than the maintenance rate, because supervising a multi-day clearance
              crew is project management, not a monthly visit. We don&apos;t publish a price range here, because
              there isn&apos;t an honest one to give — every property is quoted after the site assessment, not
              before.
            </p>
          </Measure>

          <Measure className="mb-9">
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              A staged restoration, if a full clearance isn&apos;t practical at once
            </h2>
            <p className="mb-3.5 text-[15px] text-ink-2">
              Some owners would rather not fund a full clearance in one go. The property can be restored in stages
              instead: the perimeter, boundary line and access first, then the interior grounds over the following
              months. That order isn&apos;t arbitrary — it reinstates the boundary and makes the property visibly
              attended, which is what actually protects the asset, before anyone worries about how the middle of the
              lot looks.
            </p>
            <p className="text-[15px] text-ink-2">
              Worth knowing before you start: freshly cleared land regrows quickly in this climate, so the first few
              months after restoration usually need more frequent cutting than the steady state settles into later.
            </p>
          </Measure>

          <Measure className="mb-6">
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              Not sure where yours stands?
            </h2>
            <p className="text-[15px] text-ink-2">
              Four short questions, answered here rather than out loud, with an indicative next step at the end.
            </p>
          </Measure>
          <div className="mb-11">
            <RestorationAssessment />
          </div>

          <Measure className="mb-9">
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              If a clearance finds something
            </h2>
            <p className="mb-3.5 text-[15px] text-ink-2">
              Grounds that have gotten away from an owner are exactly where an occupation problem tends to surface —
              someone has built at the back, fenced off a section, or been cultivating part of the land for years.
              Under the Real Property Limitation Act, sixteen years of open, continuous occupation without your
              permission can extinguish your title, with no compensation paid — covered in full in{" "}
              <Link href="/guide/vacant-property" className="border-b border-pen pb-px no-underline">
                the guide on squatters and deterioration
              </Link>
              .
            </p>
            <p className="text-[15px] text-ink-2">
              A clearance is often the first time in years that anyone has actually seen the whole property. If
              something is found, here is exactly what happens: it&apos;s documented before it&apos;s disturbed,
              reported to you the same day, and referred to an attorney. Nobody on site confronts anyone.
            </p>
          </Measure>

          <Measure className="mb-4">
            <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
              What restoration looks like
            </h2>
            <p className="text-[15px] text-ink-2">
              Real pairs go here as they exist — same framing, same angle, dated, so the change speaks for itself.
            </p>
          </Measure>
          <div className="mb-11">
            <RestorationGallery />
          </div>

          <div className="mb-9 border-t border-rule pt-11">
            <Measure className="mb-9">
              <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
                Twelve records a year. Four independent checks on them.
              </h2>
              <p className="mb-3.5 text-[15px] text-ink-2">
                This is the ongoing service once a property is maintainable — whether it always was, or restoration
                got it there. A grounds contractor already on site captures a structured photographic record every
                month, against a fixed checklist — same angles, every time, so a change is visible the moment it
                happens rather than years later. Four times a year, an independent local inspector — not the
                contractor — visits, conducts a full inspection, and verifies what the contractor has been
                reporting. You get a written report every quarter.
              </p>
              <p className="text-[15px] text-ink-2">
                <strong className="font-semibold text-ink">The person who maintains your property is not the only
                person who reports on its condition.</strong> Owners abroad have usually been burned by exactly
                that — a relative or a caretaker whose word is the only evidence anyone has. This is twelve dated
                records plus four independent checks, not a monthly favour from whoever is already there. See
                exactly what each of them covers in{" "}
                <Link href="/standard" className="border-b border-pen pb-px no-underline">
                  the published inspection standard
                </Link>
                .
              </p>
            </Measure>

            <div className="mb-9 border border-rule bg-card">
              <div className="border-b border-rule p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold tracking-[-0.012em]">How it&apos;s delivered</h3>
              </div>
              <div className="grid grid-cols-1 gap-px border-t border-rule bg-rule sm:grid-cols-2">
                {PRODUCT_B.ebenezerDoes.map((item) => (
                  <div key={item} className="bg-card p-5 text-[14.5px] text-ink-2">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <Measure className="mb-9">
              <h2 className="mb-3 font-display text-[clamp(21px,3.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.018em]">
                The record isn&apos;t only about the roof
              </h2>
              <p className="mb-3.5 text-[15px] text-ink-2">
                An empty property generates no rent, so it generates no Landlord Business Surcharge liability while
                it stays that way. But three risks compound quietly while nobody is watching.
              </p>
              <p className="mb-3.5 text-[15px] text-ink-2">
                <strong className="font-semibold text-ink">
                  Under the Real Property Limitation Act, sixteen years of open, continuous occupation without your
                  permission can extinguish your title
                </strong>{" "}
                — with no compensation paid. A documented, dated record of regular presence is what defeats that
                claim, because it is evidence you never abandoned the land. The monthly photographic record
                isn&apos;t only there to catch a leaking roof early — it is the paper trail that protects your
                ownership if anyone ever tries to claim the property was theirs to take.
              </p>
              <p className="mb-3.5 text-[15px] text-ink-2">
                <strong className="font-semibold text-ink">A house standing empty in this climate degrades faster
                than owners abroad expect</strong> — roofs and guttering go first, then the interior follows once
                water is entering, and a decade of drift often costs more than the land is worth by the end of it.
              </p>
              <p className="text-[15px] text-ink-2">
                <strong className="font-semibold text-ink">Insurers take a dim view of undisclosed vacancy</strong>{" "}
                — cover can lapse or be voided on a property left empty without the insurer being told.
              </p>
            </Measure>

            <div className="mb-9 border border-rule bg-card">
              <div className="border-b border-rule p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold tracking-[-0.012em]">
                  Local presence, everywhere in Trinidad &amp; Tobago
                </h3>
                <p className="mt-1.5 text-[13.5px] text-ink-2">
                  Every property gets the same service — a monthly photographic record, a quarterly independent
                  inspection, a quarterly written report — and the same monthly management fee, no matter where in
                  the country it sits. What changes by area is who&apos;s on the ground: in Tobago, Toco, Cedros and
                  Mayaro, that&apos;s a local sub-agent who already lives there, not someone we&apos;ve sent three
                  hours down the road tired off a ferry. That&apos;s a better inspection, not a lesser one — and
                  covering the distance is our problem to solve, not yours to pay for.
                </p>
              </div>
              <table className="w-full border-collapse text-[13.5px]">
                <thead>
                  <tr className="border-b border-rule">
                    <th className="p-4 text-left font-mono text-[11px] font-semibold tracking-[0.1em] text-ink-3 uppercase">
                      Area
                    </th>
                    <th className="p-4 text-left font-mono text-[11px] font-semibold tracking-[0.1em] text-ink-3 uppercase">
                      On the ground
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ZONES.map((z, i) => (
                    <tr key={z.zone} className={i < ZONES.length - 1 ? "border-b border-rule" : ""}>
                      <td className="p-4 font-medium text-ink sm:w-[45%]">{z.zone}</td>
                      <td className="p-4 text-ink-2">{z.deliveredBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-9 border border-carbon-line border-l-4 border-l-pen bg-carbon px-[18px] py-4">
              <p className="text-[14.5px] text-carbon-ink">
                An idle property is often one tenancy away from becoming an{" "}
                <Link href="/services/absentee-landlord-service" className="border-b border-pen pb-px no-underline">
                  Absentee Landlord Service
                </Link>{" "}
                client. When it starts earning, the surcharge obligation starts too — we&apos;ll tell you the moment
                that happens rather than let it become a filing you find out about later.
              </p>
            </div>

            <div className="border border-ink bg-ink p-6.5 text-white sm:p-[30px_26px]">
              <h3 className="mb-2 font-display text-xl font-extrabold tracking-[-0.015em]">
                What maintenance costs, in three separate lines
              </h3>
              <p className="mb-4 max-w-[54ch] text-[14.5px] text-[#B9C3D2]">
                We don&apos;t bury contractor charges inside a management fee — that&apos;s how property managers
                lose trust, and this audience is already predisposed to suspect it.
              </p>
              <ul className="mb-5 max-w-[54ch] space-y-2 text-[14.5px] text-[#B9C3D2]">
                <li>
                  <strong className="font-semibold text-white">Contractor and grounds work, at cost.</strong> A
                  pass-through — you pay what the contractor is actually paid, nothing added.
                </li>
                <li>
                  <strong className="font-semibold text-white">A stated coordination percentage.</strong> For
                  sourcing, supervising, verifying and paying the contractor and the independent inspector.
                </li>
                <li>
                  <strong className="font-semibold text-white">
                    A management fee, separate again
                    {PRICING.productB.managementFee.publish
                      ? ` — ${formatPublishedUSD(PRICING.productB.managementFee)}.`
                      : "."}
                  </strong>{" "}
                  The same fee anywhere in Trinidad &amp; Tobago — Diego Martin or Cedros, Port of Spain or Tobago.
                  Distance is our problem to solve, not yours to pay for. Most local operators would quietly charge
                  more for a property two hours away; we don&apos;t.
                </li>
              </ul>
              <WhatsAppButton message="Hi — I'd like a quote for Idle Property Care.">Get a quote</WhatsAppButton>
            </div>
          </div>

          <p className="mt-7 text-[12.5px] leading-[1.6] text-ink-3">
            {SITE.legalName} sources, supervises and pays every contractor involved — the grounds contractor, the
            independent inspector, and any restoration crew — on the ground in Trinidad &amp; Tobago, directly or
            through a locally based sub-agent in Tobago, Toco, Cedros or Mayaro, and verifies their liability cover.
            {" "}{CJA.tradingName} does not engage, direct or pay contractors, inspectors or sub-agents, and does not
            perform or supervise clearance work; it remains your point of contact and sends the quarterly report.
            This is general information, not legal advice — take advice on your own facts from a T&amp;T
            Attorney-at-Law before relying on anything above.
          </p>
        </Container>
      </div>
    </>
  );
}
