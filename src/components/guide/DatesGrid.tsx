import { QUARTERLY_DUE_DATES } from "@/lib/surcharge";

export function DatesGrid() {
  return (
    <div className="my-7 grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-4">
      {QUARTERLY_DUE_DATES.map((q) => (
        <div key={q.label} className="bg-card p-4">
          <div className="mb-1.5 font-mono text-[10.5px] tracking-[0.12em] text-ink-3 uppercase">{q.label}</div>
          <div className="font-mono text-base font-semibold">{q.date}</div>
        </div>
      ))}
    </div>
  );
}
