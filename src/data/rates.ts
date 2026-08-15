/**
 * Currency configuration. TTD is always the source of truth — converted
 * figures shown elsewhere in the app are labelled indicative and the TTD
 * figure stays visible alongside them, per the brief.
 *
 * REVIEW PERIODICALLY. These are manually-set indicative rates, not a
 * live feed. Last checked: August 2026. Revisit every few months or when
 * TTD moves meaningfully against these currencies.
 */

export type CurrencyCode = "TTD" | "USD" | "CAD" | "GBP";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  label: string;
  /** How many TTD one unit of this currency buys. TTD itself is 1. */
  ttdPerUnit: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  TTD: { code: "TTD", symbol: "TT$", label: "Trinidad & Tobago dollar", ttdPerUnit: 1 },
  USD: { code: "USD", symbol: "US$", label: "US dollar", ttdPerUnit: 6.77 },
  CAD: { code: "CAD", symbol: "CA$", label: "Canadian dollar", ttdPerUnit: 4.92 },
  GBP: { code: "GBP", symbol: "£", label: "British pound", ttdPerUnit: 9.07 },
};

export const CURRENCY_CODES = Object.keys(CURRENCIES) as CurrencyCode[];

/** Convert a TTD amount into the given display currency. */
export function fromTTD(ttd: number, code: CurrencyCode): number {
  return ttd / CURRENCIES[code].ttdPerUnit;
}

/** Format a TTD amount as the given display currency, rounded to whole units. */
export function formatCurrency(ttd: number, code: CurrencyCode): string {
  const amount = fromTTD(ttd, code);
  return CURRENCIES[code].symbol + Math.round(amount).toLocaleString("en-US");
}
