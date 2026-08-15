import Link from "next/link";
import type { ReactNode } from "react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

interface CtaProps {
  heading: string;
  children: ReactNode;
  whatsappMessage: string;
  whatsappLabel?: string;
  secondaryHref: string;
  secondaryLabel: string;
}

/** The per-article closing CTA — tailored WhatsApp message and secondary link, embedded directly in each article's MDX. */
export function Cta({
  heading,
  children,
  whatsappMessage,
  whatsappLabel = "Message us on WhatsApp",
  secondaryHref,
  secondaryLabel,
}: CtaProps) {
  return (
    <div className="mt-10 bg-ink p-6.5 text-white sm:p-[30px_26px]">
      <h3 className="mb-2 font-display text-[22px] font-extrabold tracking-[-0.016em]">{heading}</h3>
      <div className="mb-5 max-w-[50ch] text-[15px] text-[#B9C3D2] [&>p]:mb-0">{children}</div>
      <div className="flex flex-wrap gap-2.5">
        <WhatsAppButton message={whatsappMessage}>{whatsappLabel}</WhatsAppButton>
        <Link
          href={secondaryHref}
          className="inline-block border border-[#4A5768] px-6 py-3.5 font-display text-[15px] font-bold text-white hover:border-white"
        >
          {secondaryLabel}
        </Link>
      </div>
    </div>
  );
}
