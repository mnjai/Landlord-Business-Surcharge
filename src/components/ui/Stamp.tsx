import clsx from "clsx";
import type { ReactNode } from "react";

/**
 * The rubber stamp — the identity's signature element. Pass `animate` only
 * where the stamp represents a freshly-computed result (the calculator);
 * everywhere else (report mockups, marketing pages) it stays static, per
 * "once per result, never decorative." The impact animation is a plain
 * CSS keyframe (see globals.css) — no client JS, no animation library —
 * which also means prefers-reduced-motion is handled entirely by the
 * existing global animation-duration override.
 */
export function Stamp({
  children,
  variant = "alert",
  className,
  animate: shouldAnimate = false,
}: {
  children: ReactNode;
  variant?: "alert" | "ok";
  className?: string;
  animate?: boolean;
}) {
  const commonClass = clsx(
    "inline-block max-w-[190px] border-[3px] border-double px-4 py-2.5 text-center font-mono text-[13px] leading-[1.3] font-semibold tracking-[0.1em] uppercase opacity-90",
    variant === "ok" ? "border-ok text-ok" : "border-stamp text-stamp",
    className,
  );

  if (!shouldAnimate) {
    return <div className={clsx(commonClass, "-rotate-4")}>{children}</div>;
  }

  return (
    <div className={clsx(commonClass, "animate-[stamp-impact_340ms_cubic-bezier(0.16,0.9,0.3,1)_both]")}>
      {children}
    </div>
  );
}
