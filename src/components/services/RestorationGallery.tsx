import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface RestorationPair {
  key: string;
  caption: string;
}

const PAIRS: RestorationPair[] = [
  { key: "1", caption: "[Property, area — same angle, dated]" },
  { key: "2", caption: "[Property, area — same angle, dated]" },
  { key: "3", caption: "[Property, area — same angle, dated]" },
];

/**
 * Placeholder-driven so real before/after pairs drop in as they exist —
 * same framing, same angle, dated, no captions that editorialise.
 */
export function RestorationGallery() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {PAIRS.map((pair) => (
          <div key={pair.key} className="border border-rule bg-card p-2.5">
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <PlaceholderImage
                  src={`/assets/restoration-${pair.key}-before.jpg`}
                  alt="Property before restoration"
                  aspect="4/3"
                  label="BEFORE"
                  sizes="(min-width: 640px) 160px, 45vw"
                />
                <p className="mt-1 text-center font-mono text-[10px] tracking-[0.1em] text-ink-3 uppercase">Before</p>
              </div>
              <div>
                <PlaceholderImage
                  src={`/assets/restoration-${pair.key}-after.jpg`}
                  alt="Property after restoration"
                  aspect="4/3"
                  label="AFTER"
                  sizes="(min-width: 640px) 160px, 45vw"
                />
                <p className="mt-1 text-center font-mono text-[10px] tracking-[0.1em] text-ink-3 uppercase">After</p>
              </div>
            </div>
            <p className="mt-2.5 px-0.5 font-mono text-[11px] leading-[1.4] text-ink-3">{pair.caption}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[12.5px] leading-[1.6] text-ink-3">
        Photographs from the site assessment may be used here with the owner&apos;s consent — asked for separately,
        and never required to proceed.
      </p>
    </div>
  );
}
