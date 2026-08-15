import clsx from "clsx";
import type { ReactNode } from "react";
import { RevealHeading } from "./RevealHeading";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={clsx(
        "mb-3.5 font-mono text-[11px] font-semibold tracking-[0.16em] text-ink-3 uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <RevealHeading
      as={Tag}
      className={clsx(
        "mb-3 font-display text-[clamp(26px,4.2vw,38px)] leading-[1.06] font-extrabold tracking-[-0.02em] text-balance",
        className,
      )}
    >
      {children}
    </RevealHeading>
  );
}

export function SectionDek({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={clsx("mb-8 max-w-[58ch] text-[17px] text-ink-2", className)}>{children}</p>;
}
