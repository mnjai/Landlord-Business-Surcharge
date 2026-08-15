import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-card py-[30px] text-[13px] text-ink-3">
      <Container className="flex flex-wrap justify-between gap-5">
        <span>© {new Date().getFullYear()} {SITE.legalName}. Registered in Trinidad &amp; Tobago.</span>
        <span className="font-mono text-[11.5px]">
          Nothing here is tax or legal advice. Confirm your position with a T&amp;T practitioner.
        </span>
      </Container>
    </footer>
  );
}
