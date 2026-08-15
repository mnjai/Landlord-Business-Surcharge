import type { ReactNode } from "react";

/** The closing citation + legal-boundary paragraph every guide article ends with. */
export function Sources({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 border-t border-rule pt-5.5 text-[13.5px] leading-[1.6] text-ink-3 [&>p]:mb-0">
      {children}
    </div>
  );
}
