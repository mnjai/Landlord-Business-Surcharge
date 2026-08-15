"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * One of the horizontal ledger rules that structure the page — draws in
 * from the left, once, the first time it enters view. Used sparingly (a
 * handful of section boundaries), not on every divider on the page.
 */
export function RuledLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || drawn) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [drawn]);

  const visible = drawn || reduced;

  return (
    <div
      ref={ref}
      className={clsx(
        "h-px w-full origin-left bg-rule transition-transform duration-[400ms] ease-out motion-reduce:transition-none",
        visible ? "scale-x-100" : "scale-x-0",
        className,
      )}
    />
  );
}
