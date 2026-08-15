import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ProblemsSection } from "@/components/home/ProblemsSection";
import { ServicesLadder } from "@/components/home/ServicesLadder";
import { ReportTeaser } from "@/components/home/ReportTeaser";
import { ProofWall } from "@/components/home/ProofWall";
import { GuidePreview } from "@/components/home/GuidePreview";
import { PropertiesTeaser } from "@/components/home/PropertiesTeaser";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemsSection />
      <ServicesLadder />
      <ReportTeaser />
      <ProofWall />
      <GuidePreview />
      <PropertiesTeaser />
      <ContactSection />
    </>
  );
}
