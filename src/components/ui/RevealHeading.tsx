import clsx from "clsx";
import type { ReactNode } from "react";

/**
 * A mask reveal for section headings only — body copy must appear
 * immediately, never staggered. This is a plain CSS animation (see
 * `heading-reveal` in globals.css), not gated behind JavaScript or
 * IntersectionObserver: it starts the instant the browser paints the
 * element, so it can never delay LCP or leave text genuinely unreadable
 * for an unbounded time on a slow device. Opacity is never touched —
 * only clip-path — so at every instant the visible portion of the text
 * is fully legible, never partially transparent.
 *
 * A CSS `animation` (rather than the earlier IntersectionObserver +
 * opacity-0 version) also means this needs no client JS at all, which
 * matters here since SectionHeading is used on nearly every page.
 */
export function RevealHeading({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={clsx(
        className,
        "animate-[heading-reveal_550ms_cubic-bezier(0.22,0.8,0.2,1)_both] motion-reduce:animate-none",
      )}
    >
      {children}
    </Tag>
  );
}
