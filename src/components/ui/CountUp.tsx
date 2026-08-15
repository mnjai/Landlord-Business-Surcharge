"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Counts up to `value` on mount and animates between values on change.
 * A small hand-rolled requestAnimationFrame tween — no animation library
 * needed for a single interpolated number. Always goes through the same
 * rAF+cleanup path (collapsing duration to 0 under reduced motion) so
 * there's one legitimate subscription, never a bare setState in the
 * effect body.
 */
export function CountUp({
  value,
  durationMs = 560,
  className,
  formatter,
}: {
  value: number;
  durationMs?: number;
  className?: string;
  formatter?: (n: number) => string;
}) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);
  const prevValue = useRef(0);
  const hasMounted = useRef(false);

  useEffect(() => {
    const from = hasMounted.current ? prevValue.current : 0;
    hasMounted.current = true;
    prevValue.current = value;

    const duration = reduced ? 0 : durationMs;
    const start = performance.now();

    let frame = requestAnimationFrame(function tick(now: number) {
      const elapsed = now - start;
      const t = duration === 0 ? 1 : Math.min(1, elapsed / duration);
      setDisplay(from + (value - from) * easeOutCubic(t));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [value, reduced, durationMs]);

  const format = formatter ?? ((n: number) => Math.round(n).toLocaleString("en-US"));
  return <span className={clsx("tabular-figures", className)}>{format(display)}</span>;
}
