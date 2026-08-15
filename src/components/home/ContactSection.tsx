import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SITE } from "@/lib/site";
import { ContactHours } from "./ContactHours";

export function ContactSection() {
  return (
    <div id="talk" className="bg-ink py-14 text-white sm:py-16">
      <Container>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_320px] lg:gap-11">
          <div>
            <h2 className="mb-3 font-display text-[clamp(26px,4.2vw,38px)] leading-[1.06] font-extrabold tracking-[-0.02em] text-white">
              Talk to someone who&apos;s awake when you are
            </h2>
            <p className="mb-8 max-w-[52ch] text-[17px] text-[#B9C3D2]">
              Trinidad runs four hours behind London and level with New York for half the year. We answer across
              all three, and WhatsApp gets to us fastest.
            </p>
            <div className="mb-5.5 flex flex-wrap gap-2.5">
              <WhatsAppButton
                message="Hi — I own property in Trinidad and live abroad."
                className="px-6 py-3.5 text-[15px]"
              >
                Message us on WhatsApp
              </WhatsAppButton>
              <a
                href="/contact"
                className="inline-block border border-[#4A5768] px-6 py-3.5 font-display text-[15px] font-bold text-white hover:border-white"
              >
                Book a call
              </a>
            </div>
            <p className="text-[13px] text-[#8E9BB0]">
              {SITE.legalName} · FIU-registered agency · {SITE.phoneDisplay} · {SITE.email}
            </p>
          </div>

          <ContactHours />
        </div>
      </Container>
    </div>
  );
}
