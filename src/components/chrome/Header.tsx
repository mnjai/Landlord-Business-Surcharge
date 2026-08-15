import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { TransitionLink } from "@/components/chrome/TransitionLink";
import { NAV_LINKS, SITE } from "@/lib/site";
import { HeaderScroll } from "./HeaderScroll";
import { MobileNav } from "./MobileNav";

// A hand-authored brand mark is a few KB. Anything much larger than this is
// almost always an auto-traced raster (thousands of dense bezier points)
// masquerading as an SVG — Next serves local SVGs as a raw static file with
// no resizing, so a bloated one ships in full on every single page. Prefer
// the (properly next/image-optimized) PNG in that case instead.
const MAX_SVG_LOGO_BYTES = 20_000;
const LOGO_EXTENSIONS = ["svg", "png"] as const;

function findLogoSrc(): string | null {
  for (const ext of LOGO_EXTENSIONS) {
    const filePath = path.join(process.cwd(), "public", "assets", `logo.${ext}`);
    if (!fs.existsSync(filePath)) continue;
    if (ext === "svg" && fs.statSync(filePath).size > MAX_SVG_LOGO_BYTES) continue;
    return `/assets/logo.${ext}`;
  }
  return null;
}

export function Header() {
  const logoSrc = findLogoSrc();

  return (
    <HeaderScroll>
      <Container className="relative flex items-center justify-between gap-2 sm:gap-5">
        <TransitionLink href="/" className="flex min-w-0 flex-1 items-center gap-2 text-ink sm:gap-3 lg:flex-none">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={SITE.name}
              width={38}
              height={38}
              className="h-[38px] w-auto flex-shrink-0 object-contain"
              priority
            />
          ) : (
            <span className="grid h-[38px] w-[38px] flex-shrink-0 place-items-center border border-dashed border-rule text-center font-mono text-[8px] leading-tight text-ink-3">
              LOGO
              <br />
              38px
            </span>
          )}
          <span className="min-w-0 truncate font-display text-[14px] leading-[1.15] font-extrabold tracking-[-0.01em] sm:text-[15.5px]">
            <span className="sm:hidden">Ebenezer</span>
            <span className="hidden sm:inline">{SITE.name}</span>
            <span className="mt-0.5 hidden font-mono text-[9.5px] font-medium tracking-[0.13em] text-pen uppercase sm:block">
              FIU Registered · Trinidad &amp; Tobago
            </span>
          </span>
        </TransitionLink>

        <nav className="hidden items-center gap-[22px] lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <TransitionLink key={link.href} href={link.href} className="text-sm text-ink-2 hover:text-pen">
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
