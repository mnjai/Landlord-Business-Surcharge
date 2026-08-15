import type { Metadata } from "next";
import { PropertiesTeaser } from "@/components/home/PropertiesTeaser";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Properties we manage",
  description:
    "A small book of Trinidad & Tobago properties currently in our care — each one inspected, documented and compliant. Not a listings portal.",
  alternates: { canonical: "/properties" },
};

export default function PropertiesPage() {
  return (
    <>
      <PropertiesTeaser headingLevel="h1" />
      <div className="bg-ink py-14 text-white sm:py-16">
        <Container className="text-center">
          <h2 className="mx-auto mb-2.5 max-w-[30ch] font-display text-2xl font-extrabold tracking-[-0.015em] text-white sm:text-[28px]">
            Looking for something specific, or want your own property looked after this way?
          </h2>
          <p className="mx-auto mb-6 max-w-[48ch] text-[15px] text-[#B9C3D2]">
            We don&apos;t run a search portal, so the fastest way to ask is directly.
          </p>
          <WhatsAppButton message="Hi — I have a question about a property you manage." className="px-6 py-3.5 text-[15px]">
            Message us on WhatsApp
          </WhatsAppButton>
        </Container>
      </div>
    </>
  );
}
