export interface ServiceTier {
  step: string;
  title: string;
  description: string;
  modelLines: [string] | [string, string];
  highlighted?: boolean;
}

/** The five-tier service ladder. Shared between the homepage and /services. */
export const SERVICE_TIERS: ServiceTier[] = [
  {
    step: "01",
    title: "Compliance subscription",
    description:
      "BIR registration handled end to end, your quarterly filing calendar kept, records maintained to the six-year standard, and a clean annual landlord statement you can hand to your accountant at home.",
    modelLines: ["Monthly, in USD", "Most owners start here"],
    highlighted: true,
  },
  {
    step: "02",
    title: "Remote landlord management",
    description:
      "Rent collected and remitted, tenants vetted with a proper AML file, quarterly inspection reports with photographs, contractors sourced and supervised when something breaks.",
    modelLines: ["Percentage of rent"],
  },
  {
    step: "03",
    title: "Idle property care",
    description:
      "For property standing empty. Monthly site visit, grounds and security check, rates and utilities kept current, photographic record every time so deterioration is caught early rather than discovered.",
    modelLines: ["Flat monthly, in USD"],
  },
  {
    step: "04",
    title: "Title & estate readiness",
    description:
      "Deed search, attorney coordination and the legwork of getting inherited property into a state where it can legally be rented or sold. The slowest problem we handle, and the one with most locked up in it.",
    modelLines: ["One-off engagement"],
  },
  {
    step: "05",
    title: "Selling or buying",
    description:
      "When you decide to sell, we already hold the condition record, the tenancy history and the compliance file. Also buy-side, for nationals coming home.",
    modelLines: ["Commission"],
  },
];
