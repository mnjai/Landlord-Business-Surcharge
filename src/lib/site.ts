/**
 * Ebenezer Real Estate Services Ltd — the FIU-registered Trinidad & Tobago
 * agency. Does everything requiring a licensed agent or physical presence:
 * letting, tenant placement, rent collection, IRD filing, inspections,
 * title work, sales. Bills in TTD. Employs a Trinidad-based coordinator who
 * does the physical filing. Never described as a subsidiary, division or
 * agent of CJA — the two are independent companies working together.
 */
export const SITE = {
  name: "Ebenezer Real Estate Services",
  legalName: "Ebenezer Real Estate Services Ltd",
  tagline: "The FIU-registered Trinidad & Tobago agency on the ground for every property.",
  phoneDisplay: "+1 868 299 2295",
  phoneE164: "18682992295",
  email: "ebenezerres@gmail.com",
  // TODO: confirm production domain before launch.
  url: "https://www.ebenezerres.com",
} as const;

/**
 * ClaireJones Advisory LLC ("CJA") — the US company. Holds the client
 * relationship, does compliance administration, coordination and reporting.
 * Bills in USD. Never holds client money, never acts as a letting or sales
 * agent, and never files with or appears before the Inland Revenue Division.
 *
 * `tradingName` is the consumer-facing DBA and is not yet decided — it's
 * kept as a single token here (`[TRADING NAME]`) so every component reads
 * it from this one place, and a single edit here completes the rename
 * later. Never hardcode a brand name for CJA anywhere else; always
 * reference `CJA.tradingName` (brand-forward copy) or `CJA.legalName` /
 * `CJA.shortName` (legal/formal copy — proof wall, disclaimers, JSON-LD).
 */
export const CJA = {
  tradingName: "[TRADING NAME]",
  legalName: "ClaireJones Advisory LLC",
  shortName: "CJA",
  tagline: "The US company that holds your file, your filing calendar and your reporting.",
  phoneDisplay: "+1 347 508-6218",
  phoneE164: "13475086218",
  // TODO: confirm production email before launch.
  email: null as string | null,
} as const;

export const NAV_LINKS = [
  { href: "/check", label: "LBS check" },
  { href: "/services", label: "Services" },
  { href: "/report", label: "The report" },
  { href: "/guide", label: "Guide" },
  { href: "/about", label: "Who we are" },
] as const;

/**
 * Builds a wa.me deep link, optionally pre-filling a message. Defaults to
 * CJA's number since CJA fronts the client relationship for owners abroad —
 * pass `SITE.phoneE164` explicitly for contexts that are Ebenezer's alone
 * (T&T-resident visitors, the on-the-ground contact block).
 */
export function whatsappUrl(message?: string, phoneE164: string = CJA.phoneE164): string {
  const base = `https://wa.me/${phoneE164}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
