"use client";

import { useEffect, useState, type ReactNode } from "react";
import clsx from "clsx";

/** Wraps the header in a thin client boundary that compresses its padding
 * once the page scrolls, without pulling the (server-rendered) brand and
 * nav content into client JS. */
export function HeaderScroll({ children }: { children: ReactNode }) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    function onScroll() {
      setCompact(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-compact={compact}
      className={clsx(
        "sticky top-0 z-50 border-b-2 border-ink bg-card transition-[padding] duration-200 motion-reduce:transition-none",
        compact ? "py-[10px]" : "py-[14px]",
      )}
    >
      {children}
    </header>
  );
}
