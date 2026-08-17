import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import { whatsappUrl } from "@/lib/site";

export function WhatsAppButton({
  message,
  className,
  children = "WhatsApp us",
  phone,
}: {
  message?: string;
  className?: string;
  children?: ReactNode;
  /** E.164 number to message. Defaults to CJA's — pass SITE.phoneE164 for Ebenezer-specific contexts. */
  phone?: string;
}) {
  return (
    <Link
      href={whatsappUrl(message, phone)}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "inline-block bg-pen px-[18px] py-[11px] font-display text-sm font-bold whitespace-nowrap text-white transition-colors hover:bg-[#8F4000] motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </Link>
  );
}
