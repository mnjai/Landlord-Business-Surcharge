"use client";

import { useRouter } from "next/navigation";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

/**
 * Resolves once the main content area actually mutates (i.e. the new
 * route has rendered), rather than guessing with a fixed number of
 * animation frames — under real navigation latency (dev compiles, slow
 * networks) a frame-count guess resolves the transition before the DOM
 * has updated, which the browser reports as a timed-out transition. The
 * setTimeout is only a safety net, well under the browser's own internal
 * view-transition timeout.
 */
function waitForMainContentUpdate(): Promise<void> {
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      observer.disconnect();
      window.clearTimeout(safety);
      resolve();
    };
    const target = document.getElementById("main") ?? document.body;
    const observer = new MutationObserver(finish);
    observer.observe(target, { childList: true, subtree: true });
    const safety = window.setTimeout(finish, 1500);
  });
}

/**
 * A Link that uses the View Transitions API where the browser supports it
 * — a short cross-fade with a slight vertical offset (see globals.css),
 * never a full-screen wipe. Falls back to an ordinary Next.js navigation
 * everywhere else, including under prefers-reduced-motion.
 */
export function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  const router = useRouter();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    if (typeof document.startViewTransition !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    e.preventDefault();
    document.startViewTransition(async () => {
      router.push(href.toString());
      await waitForMainContentUpdate();
    });
  }

  return (
    <Link href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
