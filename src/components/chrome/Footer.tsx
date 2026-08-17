import { Container } from "@/components/ui/Container";
import { CJA, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-card py-[30px] text-[13px] text-ink-3">
      <Container className="flex flex-wrap justify-between gap-5">
        <span>
          © {new Date().getFullYear()} {CJA.legalName} (US) and {SITE.legalName} (Trinidad &amp; Tobago) — two
          independent companies working together, neither a subsidiary of the other.
        </span>
        <span className="font-mono text-[11.5px]">
          Nothing here is tax or legal advice. Confirm your position with a T&amp;T practitioner.
        </span>
      </Container>
    </footer>
  );
}
