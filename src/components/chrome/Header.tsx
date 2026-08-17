import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { TransitionLink } from "@/components/chrome/TransitionLink";
import { CJA, NAV_LINKS, SITE } from "@/lib/site";
import { HeaderScroll } from "./HeaderScroll";
import { MobileNav } from "./MobileNav";

// A hand-authored brand mark is a few KB. Anything much larger than this is
// almost always an auto-traced raster (thousands of dense bezier points)
// masquerading as an SVG — Next serves local SVGs as a raw static file with
// no resizing, so a bloated one ships in full on every single page. Prefer
// the (properly next/image-optimized) PNG in that case instead.
const MAX_SVG_LOGO_BYTES = 20_000;
const LOGO_EXTENSIONS = ["svg", "png"] as const;

function findLogoSrc(basename: string): string | null {
  for (const ext of LOGO_EXTENSIONS) {
    const filePath = path.join(process.cwd(), "public", "assets", `${basename}.${ext}`);
    if (!fs.existsSync(filePath)) continue;
    if (ext === "svg" && fs.statSync(filePath).size > MAX_SVG_LOGO_BYTES) continue;
    return `/assets/${basename}.${ext}`;
  }
  return null;
}

export function Header() {
  const brandLogoSrc = findLogoSrc("brand-logo");

  return (
    <HeaderScroll>
      <Container className="relative flex items-center justify-between gap-3 sm:gap-6">
        <TransitionLink href="/" className="flex min-w-0 flex-shrink items-center gap-2 text-ink sm:gap-3">
          {brandLogoSrc ? (
            <Image
              src={brandLogoSrc}
              alt={CJA.tradingName}
              width={32}
              height={32}
              className="h-[32px] w-auto flex-shrink-0 object-contain"
              priority
            />
          ) : (
            <span className="grid h-[32px] w-[32px] flex-shrink-0 place-items-center border border-dashed border-rule text-center font-mono text-[7px] leading-tight text-ink-3">
              LOGO
            </span>
          )}
          <span className="min-w-0 truncate font-display text-[14px] leading-[1.15] font-extrabold tracking-[-0.01em] sm:text-[15.5px]">
            {CJA.tradingName}
            <span className="mt-0.5 hidden truncate font-mono text-[9.5px] font-medium tracking-[0.1em] text-pen uppercase sm:block">
              with {SITE.name} · Trinidad &amp; Tobago
            </span>
          </span>
        </TransitionLink>

        <nav className="hidden shrink-0 items-center gap-4 xl:gap-5 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <TransitionLink key={link.href} href={link.href} className="text-sm whitespace-nowrap text-ink-2 hover:text-pen">
              {link.label}
            </TransitionLink>
          ))}
        </nav>

        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
          <WhatsAppButton className="px-2.5 py-2.5 text-[13px] sm:px-[18px] sm:py-[11px] sm:text-sm" />
          <MobileNav />
        </div>
      </Container>
    </HeaderScroll>
  );
}
