import type { ReactNode } from "react";

/** A plain, neutral callout — the flat-toned counterpart to Flag's carbon-alert styling. */
export function Box({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="my-7 border border-rule bg-card p-5.5">
      <h4 className="mb-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-3 uppercase">{title}</h4>
      <div className="space-y-3 text-[15px] text-ink-2 [&>p:last-child]:mb-0">{children}</div>
    </div>
  );
}
