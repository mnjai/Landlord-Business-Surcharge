"use client";

import { useFormattedAmount } from "@/lib/currency";

export function PropertyPrice({ ttd, kind }: { ttd: number; kind: "rent" | "sale" }) {
  const { primary, indicative } = useFormattedAmount(ttd);
  return (
    <div className="font-mono text-base font-semibold">
      {primary}
      <span className="mt-0.5 block text-[11.5px] font-normal text-ink-3">
        {kind === "rent" ? "per month" : "for sale"}
        {indicative ? ` · ${indicative}` : ""}
      </span>
    </div>
  );
}
