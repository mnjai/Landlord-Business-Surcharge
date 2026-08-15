"use client";

import { useEffect, useId, useState } from "react";
import { TransitionLink } from "./TransitionLink";
import { NAV_LINKS } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] border border-rule"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span className={`block h-px w-4 bg-ink transition-transform motion-reduce:transition-none ${open ? "translate-y-[3px] rotate-45" : ""}`} />
        <span className={`block h-px w-4 bg-ink transition-opacity motion-reduce:transition-none ${open ? "opacity-0" : ""}`} />
        <span className={`block h-px w-4 bg-ink transition-transform motion-reduce:transition-none ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full border-b border-rule bg-card px-[22px] py-4 shadow-[0_8px_16px_rgba(20,28,40,0.08)]"
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-rule py-3 text-[15px] text-ink-2 last:border-b-0 hover:text-pen"
              >
                {link.label}
              </TransitionLink>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
