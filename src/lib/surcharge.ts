/**
 * Landlord Business Surcharge — business logic.
 *
 * This is the single source of truth for the tax rules, transcribed
 * verbatim from the brief. Every figure the site shows a visitor (the
 * calculator, the homepage strip, the guide) is derived from this module.
 * If a rule ever needs to change, it changes here and nowhere else.
 *
 * Do not soften, round differently, or "helpfully" adjust any of these
 * figures without checking the source rules again — they came from the
 * Inland Revenue Division's published guidance and the Finance Act 2025,
 * not from judgement calls.
 */

// ---------------------------------------------------------------------------
// Rates and thresholds
// ---------------------------------------------------------------------------

/** TT$ of GROSS QUARTERLY rental income below which the low rate applies. */
export const QUARTERLY_THRESHOLD_TTD = 20_000;

/** Rate on the portion of quarterly rent at or below the threshold. */
export const SURCHARGE_RATE_LOW = 0.025;

/** Rate on the portion of quarterly rent above the threshold. */
export const SURCHARGE_RATE_HIGH = 0.035;

/** One-time registration fee, TT$. */
export const REGISTRATION_FEE_TTD = 2_500;

/** Late-registration penalty, TT$ per six-month period of non-registration. Recurs. */
export const LATE_REGISTRATION_PENALTY_INDIVIDUAL_TTD = 1_000;
export const LATE_REGISTRATION_PENALTY_COMPANY_TTD = 2_500;

/** Late-payment charge: a flat surcharge-on-the-surcharge, plus running interest. */
export const LATE_PAYMENT_SURCHARGE_RATE = 0.05;
export const LATE_PAYMENT_INTEREST_RATE_ANNUAL = 0.15;

/** Days allowed to notify the BIR of a change of registered details. */
export const CHANGE_OF_DETAILS_NOTICE_DAYS = 30;

// ---------------------------------------------------------------------------
// Dates
// ---------------------------------------------------------------------------

/**
 * The surcharge took effect 1 January 2026. Represented at Trinidad
 * midnight (AST, UTC-4, no daylight saving) so day-boundary comparisons
 * are correct regardless of the visitor's own time zone.
 */
export const SURCHARGE_EFFECTIVE_DATE = new Date("2026-01-01T04:00:00.000Z");

/**
 * The registration deadline, at Trinidad midnight. Moved twice before
 * landing here — see REGISTRATION_DEADLINE_HISTORY.
 */
export const REGISTRATION_DEADLINE = new Date("2026-06-30T04:00:00.000Z");

export const REGISTRATION_DEADLINE_HISTORY = [
  { label: "Originally", detail: "3 months after the surcharge took effect (1 April 2026)" },
  { label: "Extended to", detail: "30 May 2026" },
  { label: "Extended again to", detail: "30 June 2026" },
] as const;

export const QUARTERLY_DUE_DATES = [
  { label: "1st quarter", date: "31 March" },
  { label: "2nd quarter", date: "30 June" },
  { label: "3rd quarter", date: "30 September" },
  { label: "4th quarter", date: "31 December" },
] as const;

// ---------------------------------------------------------------------------
// Scope and exemptions
// ---------------------------------------------------------------------------

export type ExemptCategory =
  | "state"
  | "state_enterprise"
  | "hotel_accommodation_tax"
  | "religious_charitable_educational"
  | "ministerial_order";

export const EXEMPT_CATEGORY_LABELS: Record<ExemptCategory, string> = {
  state: "The State",
  state_enterprise: "State-controlled enterprises",
  hotel_accommodation_tax: "Hotels already subject to Hotel Accommodation Tax",
  religious_charitable_educational:
    "Ecclesiastical, charitable or educational institutions of a public character",
  ministerial_order: "Any person or body the Minister adds by Order",
};

export interface ScopeInput {
  receivesRentFromTTProperty: boolean;
  exemptCategory?: ExemptCategory | null;
}

/**
 * Whether the surcharge reaches this person. Deliberately does NOT take
 * residence or currency as inputs — the rule is that neither changes the
 * answer, and encoding that as "there is no parameter for it" is the
 * safest way to make sure nobody adds an exemption that doesn't exist.
 */
export function isInScope(input: ScopeInput): boolean {
  if (!input.receivesRentFromTTProperty) return false;
  if (input.exemptCategory) return false;
  return true;
}

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------

export interface RegistrationOffice {
  city: string;
  address: string;
}

/** In-person only. District offices will not accept the form. */
export const REGISTRATION_OFFICES: RegistrationOffice[] = [
  { city: "Port of Spain", address: "IRD Tower, 2–4 Ajax Street" },
  { city: "San Fernando", address: "52 Cipero Street" },
  { city: "Tunapuna", address: "Tunapuna Administrative Complex" },
  { city: "Scarborough, Tobago", address: "Wilson Road" },
];

export const REQUIRED_REGISTRATION_DOCUMENTS = [
  "Photo identification for the landlord (and for the agent, if one is acting)",
  "The title deed or certificate for the property",
  "A utility bill as proof of address",
  "An authorisation letter, if registering through an agent",
] as const;

// ---------------------------------------------------------------------------
// Rental units and aggregation
// ---------------------------------------------------------------------------

export type UnitType = "residential" | "commercial";

export interface RentalUnit {
  monthlyRentTTD: number;
  type: UnitType;
}

/**
 * Sums every unit's monthly rent. There is no fresh allowance per
 * property — everything is added together before the rate bands are
 * applied, which is what makes the threshold bite at a combined portfolio
 * level rather than per unit.
 */
export function aggregateMonthlyRentTTD(units: RentalUnit[]): number {
  return units.reduce((sum, unit) => sum + Math.max(0, unit.monthlyRentTTD), 0);
}

export function monthlyToQuarterlyTTD(monthlyRentTTD: number): number {
  return monthlyRentTTD * 3;
}

// ---------------------------------------------------------------------------
// The two-band calculation
// ---------------------------------------------------------------------------

export interface SurchargeBandBreakdown {
  quarterlyRentTTD: number;
  /** Portion of the quarterly rent taxed at the low rate (at most the threshold). */
  lowBandAmountTTD: number;
  /** Portion of the quarterly rent taxed at the high rate (above the threshold). */
  highBandAmountTTD: number;
  lowBandTaxTTD: number;
  highBandTaxTTD: number;
  totalQuarterlyTaxTTD: number;
  /** totalQuarterlyTaxTTD / quarterlyRentTTD, or 0 when there is no rent. */
  effectiveRate: number;
}

/**
 * Applies the two rate bands to a quarter's gross rent. Rent at exactly
 * the threshold is taxed entirely at the low rate — the high rate only
 * touches the amount ABOVE TT$20,000, per "3.5% above that".
 */
export function calculateSurchargeBands(quarterlyRentTTD: number): SurchargeBandBreakdown {
  if (quarterlyRentTTD < 0) {
    throw new Error("quarterlyRentTTD cannot be negative");
  }

  const lowBandAmountTTD = Math.min(quarterlyRentTTD, QUARTERLY_THRESHOLD_TTD);
  const highBandAmountTTD = Math.max(0, quarterlyRentTTD - QUARTERLY_THRESHOLD_TTD);
  const lowBandTaxTTD = lowBandAmountTTD * SURCHARGE_RATE_LOW;
  const highBandTaxTTD = highBandAmountTTD * SURCHARGE_RATE_HIGH;
  const totalQuarterlyTaxTTD = lowBandTaxTTD + highBandTaxTTD;
  const effectiveRate = quarterlyRentTTD > 0 ? totalQuarterlyTaxTTD / quarterlyRentTTD : 0;

  return {
    quarterlyRentTTD,
    lowBandAmountTTD,
    highBandAmountTTD,
    lowBandTaxTTD,
    highBandTaxTTD,
    totalQuarterlyTaxTTD,
    effectiveRate,
  };
}

// ---------------------------------------------------------------------------
// Late registration — days late and recurring six-month penalty periods
// ---------------------------------------------------------------------------

/** Whole days between the deadline and asOf. Zero if not yet late. */
export function daysLate(asOf: Date, deadline: Date = REGISTRATION_DEADLINE): number {
  const ms = asOf.getTime() - deadline.getTime();
  return Math.max(0, Math.floor(ms / 86_400_000));
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date.getTime());
  d.setUTCMonth(d.getUTCMonth() + months);
  return d;
}

/**
 * How many six-month non-registration periods have been entered as of
 * `asOf`. The penalty recurs — it is not a one-off fine — so this is
 * always at least 1 for anyone past the deadline, and increments every
 * six calendar months after that.
 *
 * Period boundaries are calendar-month based (deadline, +6mo, +12mo, ...)
 * rather than a fixed 182.5-day approximation, so leap years and
 * different month lengths don't drift the count. A visitor landing
 * exactly ON a six-month boundary is treated as having just entered the
 * next period, since that instant is when the new period's liability
 * begins.
 */
export function penaltyPeriodsElapsed(asOf: Date, deadline: Date = REGISTRATION_DEADLINE): number {
  if (asOf.getTime() <= deadline.getTime()) return 0;

  let periods = 1;
  let boundary = addMonths(deadline, 6);
  while (boundary.getTime() <= asOf.getTime()) {
    periods += 1;
    boundary = addMonths(boundary, 6);
  }
  return periods;
}

export type Occupant = "individual" | "company";

export function lateRegistrationPenaltyTTD(
  asOf: Date,
  occupant: Occupant,
  deadline: Date = REGISTRATION_DEADLINE,
): number {
  const periods = penaltyPeriodsElapsed(asOf, deadline);
  const perPeriod =
    occupant === "company" ? LATE_REGISTRATION_PENALTY_COMPANY_TTD : LATE_REGISTRATION_PENALTY_INDIVIDUAL_TTD;
  return periods * perPeriod;
}

// ---------------------------------------------------------------------------
// Late payment on a missed quarterly due date — separate from, and
// stacking with, the late-registration penalty above.
// ---------------------------------------------------------------------------

export interface LatePaymentCharge {
  /** The flat 5%-of-surcharge-payable charge. */
  additionalChargeTTD: number;
  /** Interest at 15% per annum, prorated by days overdue (simple, non-compounding). */
  interestTTD: number;
  totalTTD: number;
}

export function calculateLatePayment(surchargePayableTTD: number, daysOverdue: number): LatePaymentCharge {
  const additionalChargeTTD = surchargePayableTTD * LATE_PAYMENT_SURCHARGE_RATE;
  const interestTTD = surchargePayableTTD * LATE_PAYMENT_INTEREST_RATE_ANNUAL * (Math.max(0, daysOverdue) / 365);
  return {
    additionalChargeTTD,
    interestTTD,
    totalTTD: additionalChargeTTD + interestTTD,
  };
}

// ---------------------------------------------------------------------------
// The full check — what the /check calculator renders
// ---------------------------------------------------------------------------

export type RegistrationStatus = "yes" | "no" | "unsure";

export interface SurchargeCheckInput {
  units: RentalUnit[];
  occupant: Occupant;
  registered: RegistrationStatus;
  /** Injectable for deterministic tests; defaults to now. */
  asOf?: Date;
}

export interface SurchargeCheckResult {
  monthlyRentTTD: number;
  quarterlyRentTTD: number;
  bands: SurchargeBandBreakdown;
  annualTaxTTD: number;
  monthlySetAsideTTD: number;
  registrationFeeTTD: number;
  daysLate: number;
  penaltyPeriods: number;
  lateRegistrationPenaltyTTD: number;
  hasCommercialUnit: boolean;
  unitCount: number;
}

/**
 * Builds the complete calculator result from raw form input. Treats
 * "unsure" whether registered the same as "no" for penalty purposes —
 * per the rule that the obligation sits with the owner regardless of who
 * may have filed on their behalf.
 */
export function buildSurchargeCheck(input: SurchargeCheckInput): SurchargeCheckResult {
  const asOf = input.asOf ?? new Date();
  const monthlyRentTTD = aggregateMonthlyRentTTD(input.units);
  const quarterlyRentTTD = monthlyToQuarterlyTTD(monthlyRentTTD);
  const bands = calculateSurchargeBands(quarterlyRentTTD);

  const isRegistered = input.registered === "yes";
  const periods = isRegistered ? 0 : penaltyPeriodsElapsed(asOf);
  const penalty = isRegistered ? 0 : lateRegistrationPenaltyTTD(asOf, input.occupant);

  return {
    monthlyRentTTD,
    quarterlyRentTTD,
    bands,
    annualTaxTTD: bands.totalQuarterlyTaxTTD * 4,
    monthlySetAsideTTD: bands.totalQuarterlyTaxTTD / 3,
    registrationFeeTTD: REGISTRATION_FEE_TTD,
    daysLate: daysLate(asOf),
    penaltyPeriods: periods,
    lateRegistrationPenaltyTTD: penalty,
    hasCommercialUnit: input.units.some((unit) => unit.type === "commercial"),
    unitCount: input.units.length,
  };
}
