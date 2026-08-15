import type { Metadata } from "next";
import { ServicesLadder } from "@/components/home/ServicesLadder";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Five tiers of service for Trinidad & Tobago property owners abroad — compliance subscription, remote landlord management, idle property care, title & estate readiness, and selling or buying. Nothing bundled.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesLadder headingLevel="h1" />
      <div className="bg-ink py-14 text-white sm:py-16">
        <Container className="text-center">
          <h2 className="mx-auto mb-2.5 max-w-[26ch] font-display text-2xl font-extrabold tracking-[-0.015em] text-white sm:text-[28px]">
            Not sure which tier fits your situation?
          </h2>
          <p className="mx-auto mb-6 max-w-[48ch] text-[15px] text-[#B9C3D2]">
            Most conversations start with the surcharge and grow from there. Tell us what&apos;s going on and
            we&apos;ll tell you plainly where to start.
          </p>
          <WhatsAppButton
            message="Hi — I'd like to know which of your services fits my situation."
            className="px-6 py-3.5 text-[15px]"
          >
            Message us on WhatsApp
          </WhatsAppButton>
        </Container>
      </div>
    </>
  );
}
