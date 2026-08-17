import {
  CHANGE_OF_DETAILS_NOTICE_DAYS,
  LATE_REGISTRATION_PENALTY_COMPANY_TTD,
  LATE_REGISTRATION_PENALTY_INDIVIDUAL_TTD,
  QUARTERLY_THRESHOLD_TTD,
  REGISTRATION_OFFICES,
  type SurchargeCheckResult,
} from "@/lib/surcharge";
import type { CheckFormState } from "@/lib/checkUrl";
import { formatCurrency } from "@/data/rates";
import { useAmountParts, useFormattedAmount } from "@/lib/currency";
import { Stamp } from "@/components/ui/Stamp";
import { Ledger, LedgerRow, LedgerTotal } from "@/components/ui/Ledger";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CountUp } from "@/components/ui/CountUp";
import { SITE } from "@/lib/site";

function Amount({ ttd, alarm }: { ttd: number; alarm?: boolean }) {
  const { primary, indicative } = useFormattedAmount(ttd);
  return (
    <>
      <span className={alarm ? "text-stamp" : undefined}>{primary}</span>
      {indicative ? <span className="mt-0.5 block font-body text-xs font-normal text-ink-3">{indicative}</span> : null}
    </>
  );
}

/** Like Amount, but the digits count up on entry — reserved for the one
 * headline figure per section, to stay within the animation budget. */
function AnimatedAmount({ ttd, alarm }: { ttd: number; alarm?: boolean }) {
  const { symbol, amount, indicativeSymbol, indicativeAmount } = useAmountParts(ttd);
  return (
    <>
      <span className={alarm ? "text-stamp" : undefined}>
        {symbol}
        <CountUp value={amount} />
      </span>
      {indicativeAmount !== null ? (
        <span className="mt-0.5 block font-body text-xs font-normal text-ink-3">
          {indicativeSymbol}
          <CountUp value={indicativeAmount} />
        </span>
      ) : null}
    </>
  );
}

function Cell({
  label,
  value,
  note,
  alarm,
}: {
  label: string;
  value: React.ReactNode;
  note?: React.ReactNode;
  alarm?: boolean;
}) {
  return (
    <div className="bg-card p-[15px]">
      <div className="mb-1.5 font-mono text-[10.5px] tracking-[0.12em] text-ink-3 uppercase">{label}</div>
      <div className={`font-mono text-[19px] font-semibold tabular-figures ${alarm ? "text-stamp" : ""}`}>{value}</div>
      {note ? <p className="mt-1 text-[12.5px] leading-[1.4] text-ink-3">{note}</p> : null}
    </div>
  );
}

export function ResultPanel({
  state,
  result,
  resultKey,
}: {
  state: CheckFormState;
  result: SurchargeCheckResult | null;
  resultKey: number;
}) {
  const abroad = state.home !== "TT";

  if (state.rents === "no") {
    return (
      <div className="border border-ink bg-card">
        <div className="flex flex-wrap items-start justify-between gap-5 border-b-2 border-ink p-[22px]">
          <div>
            <h2 className="mb-1 font-display text-[23px] font-extrabold tracking-[-0.015em]">Nothing to file</h2>
            <p className="max-w-[44ch] text-sm text-ink-2">
              The surcharge applies to rent received from property located in Trinidad &amp; Tobago. With no T&amp;T
              property, it doesn&apos;t reach you.
            </p>
          </div>
          <Stamp key={resultKey} variant="ok" animate>
            Out of
            <br />
            scope
          </Stamp>
        </div>
        <div className="p-[22px]">
          <h3 className="mb-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-3 uppercase">
            Worth knowing
          </h3>
          <p className="text-[14.5px] text-ink-2">
            If you inherit or buy property here, the clock starts quickly — a new owner has {CHANGE_OF_DETAILS_NOTICE_DAYS}{" "}
            days to notify the BIR and register. Inherited property with an untransferred deed is the case we see
            stall longest.
          </p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const lets = state.rents === "yes";
  const registered = state.registered === "yes";

  let stampText: React.ReactNode;
  let head: string;
  let lede: string;

  if (state.rents === "vacant") {
    stampText = (
      <>
        Register
        <br />
        anyway
      </>
    );
    head = "Vacant today, in scope the moment it earns";
    lede =
      "The surcharge is charged on rent actually received, so a genuinely empty property generates nothing right now. But registration attaches to being a landlord, and the property is one tenancy away from a filing obligation.";
  } else if (registered) {
    stampText = (
      <>
        In scope
        <br />
        registered
      </>
    );
    head = "You're registered. Here's what you owe each quarter.";
    lede =
      "Registration is done. What remains is paying on the BIR's prescribed quarterly dates and keeping records that support the figures.";
  } else {
    stampText = (
      <>
        In scope
        <br />
        not registered
      </>
    );
    head = "You're in scope, and the deadline has passed";
    lede =
      "Rent from a property on T&T soil is caught by the surcharge regardless of where you live or what currency you're paid in. The registration deadline was 30 June 2026.";
  }

  const penaltyRateTTD =
    state.occupant === "company" ? LATE_REGISTRATION_PENALTY_COMPANY_TTD : LATE_REGISTRATION_PENALTY_INDIVIDUAL_TTD;

  return (
    <div className="border border-ink bg-card">
      <div className="flex flex-wrap items-start justify-between gap-5 border-b-2 border-ink p-[22px]">
        <div>
          <h2 className="mb-1 font-display text-[23px] font-extrabold tracking-[-0.015em]">{head}</h2>
          <p className="max-w-[44ch] text-sm text-ink-2">{lede}</p>
        </div>
        <Stamp key={resultKey} variant={registered ? "ok" : "alert"} animate>
          {stampText}
        </Stamp>
      </div>

      {lets ? (
        <>
          <div className="border-b border-rule p-[22px]">
            <h3 className="mb-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-3 uppercase">
              Your quarterly surcharge
            </h3>
            <Ledger>
              <LedgerRow
                label="Rent collected per month"
                sub={result.unitCount > 1 ? `${result.unitCount} units, added together` : undefined}
                value={<Amount ttd={result.monthlyRentTTD} />}
              />
              <LedgerRow label="Rent collected per quarter" value={<Amount ttd={result.quarterlyRentTTD} />} />
              <LedgerRow
                label={`First ${formatCurrency(QUARTERLY_THRESHOLD_TTD, "TTD")} at 2.5%`}
                sub={`${formatCurrency(result.bands.lowBandAmountTTD, "TTD")} of your quarterly rent`}
                value={<Amount ttd={result.bands.lowBandTaxTTD} />}
                muted
              />
              <LedgerRow
                label="Remainder at 3.5%"
                sub={
                  result.bands.highBandAmountTTD > 0
                    ? `${formatCurrency(result.bands.highBandAmountTTD, "TTD")} above the threshold`
                    : "you are under the threshold"
                }
                value={<Amount ttd={result.bands.highBandTaxTTD} />}
                muted
              />
              <LedgerTotal
                label="Due each quarter"
                value={<AnimatedAmount ttd={result.bands.totalQuarterlyTaxTTD} />}
              />
            </Ledger>
          </div>

          <div className="border-b border-rule p-[22px]">
            <h3 className="mb-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-3 uppercase">
              What that means month to month
            </h3>
            <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2">
              <Cell
                label="Set aside monthly"
                value={<AnimatedAmount ttd={result.monthlySetAsideTTD} />}
                note={`Roughly ${(result.bands.effectiveRate * 100).toFixed(1)}% of the rent you collect.`}
              />
              <Cell
                label="Full year"
                value={<AnimatedAmount ttd={result.annualTaxTTD} />}
                note="Creditable against your annual income tax, so it isn't a second tax on the same income."
              />
            </div>
          </div>
        </>
      ) : null}

      {!registered ? (
        <div className="border-b border-rule p-[22px]">
          <h3 className="mb-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-3 uppercase">
            Registration and what&apos;s accruing
          </h3>
          <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2">
            <Cell
              label="One-time registration fee"
              value={<Amount ttd={result.registrationFeeTTD} />}
              note="Paid once, when you register."
            />
            <Cell
              label="Late-registration exposure"
              value={<AnimatedAmount ttd={result.lateRegistrationPenaltyTTD} alarm />}
              alarm
              note={`${result.daysLate} days past the deadline. ${formatCurrency(penaltyRateTTD, "TTD")} applies to ${
                state.occupant === "company" ? "companies" : "individuals"
              } for each six-month period of non-registration.`}
            />
          </div>
          {state.registered === "unsure" ? (
            <p className="mt-3.5 text-sm text-ink-2">
              If you&apos;re unsure whether you registered, treat that as unregistered until confirmed. A relative or
              agent may have filed on your behalf, but the obligation sits with you.
            </p>
          ) : null}
        </div>
      ) : null}

      {abroad ? (
        <div className="border-b border-rule p-[22px]">
          <div className="border border-carbon-line border-l-4 border-l-stamp bg-carbon px-[18px] py-4">
            <h4 className="mb-1.5 font-display text-base font-bold text-carbon-ink">
              Here&apos;s the part you can&apos;t solve from where you are
            </h4>
            <p className="mb-2 text-[14.5px] text-carbon-ink">
              The registration form is not filed online. It has to be completed and physically dropped off, with
              supporting documents, at one of four regional Inland Revenue offices:
            </p>
            <ul className="m-0 list-none p-0 font-mono text-[12.5px] text-carbon-ink">
              {REGISTRATION_OFFICES.map((office) => (
                <li key={office.city} className="relative py-0.5 pl-3.5">
                  <span className="absolute left-0 text-stamp">—</span>
                  {office.city} — {office.address}
                </li>
              ))}
            </ul>
            <p className="mt-2.5 text-[14.5px] text-carbon-ink">
              District offices will not accept it. Someone has to stand in that line in Trinidad &amp; Tobago, and
              then keep filing every quarter after that.
            </p>
          </div>
        </div>
      ) : null}

      {state.paidCurrency !== "TTD" && lets ? (
        <div className="border-b border-rule p-[22px]">
          <h3 className="mb-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-3 uppercase">
            On being paid in foreign currency
          </h3>
          <p className="text-[14.5px] text-ink-2">
            Collecting rent in US dollars or into an overseas account does not put you outside the rule. The
            legislation draws the line at where the property sits, not where the money lands or where you live.
          </p>
        </div>
      ) : null}

      {result.hasCommercialUnit ? (
        <div className="border-b border-rule p-[22px]">
          <h3 className="mb-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-3 uppercase">
            On your commercial units
          </h3>
          <p className="text-[14.5px] text-ink-2">
            Commercial premises — offices, retail, warehousing — are caught on the same basis as residential, and
            they sit in the same aggregate when the rate bands are applied.
          </p>
        </div>
      ) : null}

      <div className="bg-ink p-[26px_22px] text-white">
        <h3 className="mb-2 font-display text-xl font-extrabold tracking-[-0.015em]">We can do this part for you</h3>
        <p className="mb-4.5 max-w-[50ch] text-[14.5px] text-[#B9C3D2]">
          {abroad
            ? "We register you with the BIR, hand-deliver the forms, keep you on the quarterly calendar, and send you a statement you can hand straight to your accountant at home."
            : `You're based in Trinidad & Tobago, so this is ${SITE.name}'s territory directly — the licensed agency on the ground handles your registration, filing calendar and records.`}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {abroad ? (
            <>
              <WhatsAppButton message="Hi — I used the LBS check on your site. I'd like help with my registration.">
                Message us on WhatsApp
              </WhatsAppButton>
              <a
                href="/contact"
                className="inline-block border border-[#4A5768] px-6 py-3.5 font-display text-[15px] font-bold text-white hover:border-white"
              >
                Book a call — US, UK &amp; T&amp;T hours
              </a>
            </>
          ) : (
            <>
              <WhatsAppButton
                phone={SITE.phoneE164}
                message="Hi — I used the LBS check on your site. I'm in Trinidad & Tobago and would like help with my registration."
              >
                WhatsApp {SITE.name}
              </WhatsAppButton>
              <a
                href={`tel:+${SITE.phoneE164}`}
                className="inline-block border border-[#4A5768] px-6 py-3.5 font-display text-[15px] font-bold text-white hover:border-white"
              >
                Call {SITE.phoneDisplay}
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
