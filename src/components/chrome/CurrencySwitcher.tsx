"use client";

import clsx from "clsx";
import { useCurrency } from "@/lib/currency";
import { CURRENCY_CODES } from "@/data/rates";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex border border-[#35415A]" role="group" aria-label="Display currency">
      {CURRENCY_CODES.map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={currency === code}
          onClick={() => setCurrency(code)}
          className={clsx(
            "px-[9px] py-1 font-mono text-[11px] tracking-[0.06em] transition-colors motion-reduce:transition-none",
            currency === code ? "bg-pen text-white" : "text-[#8E9BB0] hover:text-white",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
