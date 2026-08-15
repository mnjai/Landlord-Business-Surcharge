"use client";

import { useEffect, useRef } from "react";

const TICK_COUNT = 24;

/**
 * The signature scroll device — scroll progress rendered as a document
 * margin ruler, styled like the margin of a surveyor's or accountant's
 * ledger. An instrument, not a decoration: a direct, continuous readout
 * of scroll position (like a native scrollbar), so it stays active even
 * under prefers-reduced-motion — it never gates or delays content.
 *
 * Plain scroll listener mutating refs directly, rather than the motion
 * library's useScroll/useTransform — this component sits in the root
 * layout and renders on every page, so its bundle cost is paid site-wide.
 */
export function MarginRuler() {
  const fillRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${progress})`;
      if (indicatorRef.current) indicatorRef.current.style.top = `${progress * 100}%`;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-y-0 left-0 z-40 w-[3px] sm:w-[16px]">
      {/* Thin scroll-fill, always present (mobile gets just this). */}
      <div className="absolute inset-y-0 left-0 w-[3px] bg-rule/70">
        <div
          ref={fillRef}
          className="absolute inset-x-0 top-0 h-full origin-top bg-pen"
          style={{ transform: "scaleY(0)" }}
        />
      </div>

      {/* Full ruled instrument, tick marks and moving marker, sm+ only. */}
      <div className="absolute inset-y-0 left-[3px] hidden w-[13px] border-r border-rule bg-paper/70 sm:block">
        {Array.from({ length: TICK_COUNT + 1 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 h-px bg-rule"
            style={{ top: `${(i / TICK_COUNT) * 100}%`, width: i % 4 === 0 ? "10px" : "5px" }}
          />
        ))}
        <div
          ref={indicatorRef}
          className="absolute left-0 h-[3px] w-[10px] -translate-y-1/2 bg-pen"
          style={{ top: "0%" }}
        />
      </div>
    </div>
  );
}
