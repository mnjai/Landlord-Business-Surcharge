export const SITE = {
  name: "Ebenezer Real Estate Services",
  legalName: "Ebenezer Real Estate Services Ltd",
  tagline: "The only Trinidad & Tobago agency built for owners who don't live here.",
  phoneDisplay: "+1 868 299 2295",
  phoneE164: "18682992295",
  email: "ebenezerres@gmail.com",
  // TODO: confirm production domain before launch.
  url: "https://www.ebenezerres.com",
} as const;

export const NAV_LINKS = [
  { href: "/check", label: "LBS check" },
  { href: "/services", label: "Services" },
  { href: "/report", label: "The report" },
  { href: "/guide", label: "Guide" },
  { href: "/about", label: "Who we are" },
] as const;

/** Builds a wa.me deep link, optionally pre-filling a message. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${SITE.phoneE164}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
