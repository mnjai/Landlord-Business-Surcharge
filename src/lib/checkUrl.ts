import type { Occupant, RegistrationStatus, RentalUnit, UnitType } from "@/lib/surcharge";

export type HomeCode = "TT" | "US" | "CA" | "UK" | "OT";
export type RentsStatus = "yes" | "vacant" | "no";
export type PaidCurrency = "TTD" | "USD" | "MIX";

export interface CheckFormState {
  home: HomeCode;
  rents: RentsStatus;
  units: RentalUnit[];
  paidCurrency: PaidCurrency;
  occupant: Occupant;
  registered: RegistrationStatus;
}

export const DEFAULT_CHECK_STATE: CheckFormState = {
  home: "US",
  rents: "yes",
  units: [{ monthlyRentTTD: 0, type: "residential" }],
  paidCurrency: "TTD",
  occupant: "individual",
  registered: "no",
};

const HOME_CODES: HomeCode[] = ["TT", "US", "CA", "UK", "OT"];
const RENTS_STATUSES: RentsStatus[] = ["yes", "vacant", "no"];
const PAID_CURRENCIES: PaidCurrency[] = ["TTD", "USD", "MIX"];

function asHomeCode(value: string | null): HomeCode | null {
  return value && (HOME_CODES as string[]).includes(value) ? (value as HomeCode) : null;
}

function asRentsStatus(value: string | null): RentsStatus | null {
  return value && (RENTS_STATUSES as string[]).includes(value) ? (value as RentsStatus) : null;
}

function asPaidCurrency(value: string | null): PaidCurrency | null {
  return value && (PAID_CURRENCIES as string[]).includes(value) ? (value as PaidCurrency) : null;
}

function parseUnits(raw: string): RentalUnit[] {
  const units = raw
    .split(",")
    .map((part): RentalUnit | null => {
      const [amountStr, typeCode] = part.split("_");
      const amount = Number(amountStr);
      if (!Number.isFinite(amount)) return null;
      const type: UnitType = typeCode === "c" ? "commercial" : "residential";
      return { monthlyRentTTD: Math.max(0, amount), type };
    })
    .filter((u): u is RentalUnit => u !== null);
  return units.length > 0 ? units : DEFAULT_CHECK_STATE.units;
}

/** Encodes the calculator's inputs into a shareable, deep-linkable query string. */
export function encodeCheckState(state: CheckFormState): URLSearchParams {
  const params = new URLSearchParams();
  params.set("home", state.home);
  params.set("rents", state.rents);
  if (state.rents === "yes") {
    params.set("units", state.units.map((u) => `${u.monthlyRentTTD}_${u.type === "commercial" ? "c" : "r"}`).join(","));
    params.set("ccy", state.paidCurrency);
  }
  params.set("who", state.occupant === "company" ? "co" : "ind");
  params.set("reg", state.registered === "yes" ? "yes" : state.registered === "unsure" ? "idk" : "no");
  return params;
}

/** Decodes a query string back into calculator inputs, falling back to defaults for anything missing or malformed. */
export function decodeCheckState(params: URLSearchParams): CheckFormState {
  const unitsRaw = params.get("units");
  const regRaw = params.get("reg");

  return {
    home: asHomeCode(params.get("home")) ?? DEFAULT_CHECK_STATE.home,
    rents: asRentsStatus(params.get("rents")) ?? DEFAULT_CHECK_STATE.rents,
    units: unitsRaw ? parseUnits(unitsRaw) : DEFAULT_CHECK_STATE.units,
    paidCurrency: asPaidCurrency(params.get("ccy")) ?? DEFAULT_CHECK_STATE.paidCurrency,
    occupant: params.get("who") === "co" ? "company" : "individual",
    registered: regRaw === "yes" ? "yes" : regRaw === "idk" ? "unsure" : "no",
  };
}

/** A link carries a full, previously-submitted result (not just a homepage preselect) once it has a `rents` value. */
export function isSharedResultLink(params: URLSearchParams): boolean {
  return params.has("rents");
}
