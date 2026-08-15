import clsx from "clsx";
import type { ReactNode } from "react";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("mx-auto max-w-(--container-page) px-[22px]", className)}>{children}</div>;
}

/** The narrower reading measure used for article bodies and standfirsts. */
export function Measure({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("max-w-(--container-measure)", className)}>{children}</div>;
}
