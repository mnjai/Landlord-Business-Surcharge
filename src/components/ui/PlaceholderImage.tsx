import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import clsx from "clsx";

interface PlaceholderImageProps {
  /** Path relative to /public, e.g. "/assets/principal.jpg". */
  src: string;
  alt: string;
  /** CSS aspect-ratio value, e.g. "4/5", "4/3", "3/2". */
  aspect: string;
  /** Short label shown in the placeholder box, e.g. "PRINCIPAL PORTRAIT". */
  label: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Renders the real asset via next/image when it exists in /public, or a
 * labelled placeholder at the correct aspect ratio when it doesn't — so
 * layout never shifts once real photography lands.
 */
export function PlaceholderImage({
  src,
  alt,
  aspect,
  label,
  sizes = "100vw",
  className,
  priority,
}: PlaceholderImageProps) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));

  if (exists) {
    return (
      <div className={clsx("relative overflow-hidden", className)} style={{ aspectRatio: aspect }}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority={priority} />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "relative flex items-center justify-center border border-dashed border-rule bg-paper text-center font-mono text-[10px] leading-tight text-ink-3",
        className,
      )}
      style={{ aspectRatio: aspect }}
      role="img"
      aria-label={alt}
    >
      <span className="px-3">
        {label}
        <br />
        {aspect} · {src}
      </span>
    </div>
  );
}
