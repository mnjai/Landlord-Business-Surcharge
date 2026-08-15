import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import { whatsappUrl } from "@/lib/site";

export function WhatsAppButton({
  message,
  className,
  children = "WhatsApp us",
}: {
  message?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Link
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "inline-block bg-pen px-[18px] py-[11px] font-display text-sm font-bold whitespace-nowrap text-white transition-colors hover:bg-[#1638AD] motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </Link>
  );
}
