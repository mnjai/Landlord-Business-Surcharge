"use client";

import { useSyncExternalStore } from "react";
import clsx from "clsx";
import { daysLate } from "@/lib/surcharge";
import { CountUp } from "./CountUp";

/**
 * "Today" is external, client-only state — read through
 * useSyncExternalStore (not an effect + setState) so the server-rendered
 * "—" and the client's first render always match, with no hydration
 * warning and no cascading re-render.
 */
function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 60_000);
  return () => window.clearInterval(id);
}

function getSnapshot(): number {
  return daysLate(new Date());
}

function getServerSnapshot(): number | null {
  return null;
}

export function DaysLateStrip({ className, caption }: { className?: string; caption?: string }) {
  const days = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div
      className={clsx(
        "flex flex-wrap items-baseline gap-3 border border-carbon-line border-l-4 border-l-stamp bg-carbon px-4 py-3",
        className,
      )}
    >
      <span className="font-mono text-[22px] leading-none font-semibold tabular-figures text-stamp">
        {days === null ? "—" : <CountUp value={days} />}
      </span>
      <span className="text-sm text-carbon-ink">
        {caption ?? "days since the registration deadline of 30 June 2026. Penalties accrue in six-month blocks."}
      </span>
    </div>
  );
}
