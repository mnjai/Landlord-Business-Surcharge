/**
 * Every published figure on the site, in one place. Nothing here is
 * invented — an unpublished figure is `null`, never a guess, and every
 * consumer must check `publish` before rendering a number.
 *
 * Product B's flat monthly management fee is settled and published, in
 * USD, because the flat-nationwide claim needs the number to land and
 * because transparent pricing is a trust signal for this audience.
 * Product A's percentages and Product B's one-off assessment/restoration
 * fees are not yet settled — leave them unpublished and describe them
 * qualitatively ("quoted on the property", "quoted after assessment")
 * rather than showing a placeholder number.
 */

export interface PublishedPrice {
  publish: true;
  amountUSD: number;
  unit: string;
}

export interface UnpublishedPrice {
  publish: false;
  /** What to say instead of a number. */
  placeholder: string;
}

export type Price = PublishedPrice | UnpublishedPrice;

export const PRICING = {
  /** Product A — Absentee Landlord Service. Charged as a percentage of rent collected; the rate itself isn't settled. */
  productA: {
    managementFee: {
      publish: false,
      placeholder: "Quoted on the property",
    } satisfies UnpublishedPrice,
  },

  /** Product B — Idle Property Care. */
  productB: {
    /** The flat nationwide monthly fee — settled, and worth stating plainly. */
    managementFee: {
      publish: true,
      amountUSD: 65,
      unit: "per month",
    } satisfies PublishedPrice,
    /** One-off, credited against the first month if the owner proceeds — amount not yet settled. */
    siteAssessmentFee: {
      publish: false,
      placeholder: "A modest one-off fee, confirmed when you book",
    } satisfies UnpublishedPrice,
    /** Scoped and quoted only after the site assessment — never estimated in advance. */
    restoration: {
      publish: false,
      placeholder: "Quoted after the site assessment",
    } satisfies UnpublishedPrice,
  },
} as const;

/** Formats a published USD price, e.g. "US$65 per month". Never call on an unpublished price. */
export function formatPublishedUSD(price: PublishedPrice): string {
  return `US$${price.amountUSD.toLocaleString("en-US")} ${price.unit}`;
}
