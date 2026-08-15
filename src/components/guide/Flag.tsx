import type { ReactNode } from "react";

export function Flag({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="my-7 border border-carbon-line border-l-4 border-l-stamp bg-carbon px-5.5 py-5">
      <h4 className="mb-2 font-display text-[17px] font-bold text-carbon-ink">{title}</h4>
      <div className="space-y-2.5 text-[15px] text-carbon-ink [&>p]:mb-0">{children}</div>
    </div>
  );
}
