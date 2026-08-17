import { PRICING, formatPublishedUSD } from "./pricing";

/**
 * Two products, not a ladder — a rented property and an empty property are
 * different clients with different problems, and almost nobody has both.
 * Each product splits cleanly along the CJA/Ebenezer line: CJA holds the
 * client relationship and coordinates compliance and reporting; Ebenezer
 * does everything requiring a licensed agent or physical presence in T&T,
 * including the physical IRD filing itself — CJA never files with or
 * appears before the Inland Revenue Division.
 */
export interface Product {
  slug: string;
  eyebrow: string;
  title: string;
  forWhom: string;
  cjaDoes: string[];
  ebenezerDoes: string[];
  pricingBasis: string;
}

export const PRODUCT_A: Product = {
  slug: "absentee-landlord-service",
  eyebrow: "Product A — the property is rented",
  title: "Absentee Landlord Service",
  forWhom:
    "For owners whose Trinidad & Tobago property has a tenant in it, and therefore a Landlord Business Surcharge liability.",
  cjaDoes: [
    "Registration and quarterly filing coordination",
    "Records maintained to the six-year standard",
    "Annual landlord statement",
    "Quarterly reporting",
    "The client relationship",
  ],
  ebenezerDoes: [
    "Tenant placement and tenancy execution",
    "Rent collection and arrears",
    "The physical IRD registration and quarterly filing",
    "Inspection visits",
    "Contractor supervision",
  ],
  pricingBasis: "Percentage of rent collected",
};

export const PRODUCT_B: Product = {
  slug: "idle-property-care",
  eyebrow: "Product B — the property is empty",
  title: "Idle Property Care",
  forWhom:
    "For owners whose Trinidad & Tobago property has no tenant and no rent — and therefore no surcharge, but a different set of risks entirely.",
  cjaDoes: ["Your point of contact and quarterly written report"],
  ebenezerDoes: [
    "Grounds contractor's monthly photographic record, fixed checklist and angles",
    "Independent quarterly inspection, verifying the contractor's record",
    "Site assessment and restoration first, for properties that aren't maintainable yet",
    "Contractor sourcing, supervision and payment",
    "Rates and utilities kept current",
    "Local sub-agents cover Tobago, Toco, Cedros and Mayaro",
  ],
  pricingBasis: `Contractor at cost + coordination fee + ${
    PRICING.productB.managementFee.publish ? formatPublishedUSD(PRICING.productB.managementFee) : "flat management fee"
  }, nationwide`,
};

export interface Engagement {
  slug: string;
  title: string;
  description: string;
  pricingBasis: string;
}

/**
 * Not subscription tiers — one-off engagements. Ebenezer's work, T&T side,
 * with CJA coordinating the file and correspondence.
 */
export const ENGAGEMENTS: Engagement[] = [
  {
    slug: "title-estate",
    title: "Title & estate readiness",
    description:
      "Deed search, attorney coordination and the legwork of getting inherited property into a state where it can legally be rented or sold. The slowest problem we handle, and the one with the most locked up in it.",
    pricingBasis: "One-off engagement",
  },
  {
    slug: "selling-buying",
    title: "Selling or buying",
    description:
      "When you decide to sell, we already hold the condition record, the tenancy history and the compliance file. Also buy-side, for nationals coming home.",
    pricingBasis: "Commission",
  },
];
