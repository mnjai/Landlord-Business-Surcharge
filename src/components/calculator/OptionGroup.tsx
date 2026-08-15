import clsx from "clsx";
import type { ReactNode } from "react";

export interface RadioOption<T extends string> {
  value: T;
  label: string;
}

interface OptionGroupProps<T extends string> {
  name: string;
  legend: ReactNode;
  hint?: ReactNode;
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

/**
 * A pill-style radio group. Uses real <input type="radio"> elements
 * (visually hidden, not display:none) under the styled labels, so the
 * whole thing stays fully keyboard- and screen-reader-operable — arrow
 * keys move between options, space/click selects, and each option
 * announces its checked state natively.
 */
export function OptionGroup<T extends string>({ name, legend, hint, options, value, onChange }: OptionGroupProps<T>) {
  return (
    <div>
      <div className="mb-1 flex items-baseline gap-3">
        <span className="font-display text-lg leading-none font-bold tracking-[-0.01em]">{legend}</span>
      </div>
      {hint ? <p className="mt-0.5 mb-3.5 text-[13.5px] text-ink-3">{hint}</p> : null}
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={typeof legend === "string" ? legend : undefined}>
        {options.map((opt) => (
          <label key={opt.value} className="group relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="peer sr-only"
            />
            <span
              className={clsx(
                "block border border-rule bg-card px-[15px] py-[9px] font-mono text-[13px] text-ink-2 transition-colors",
                "peer-checked:border-pen peer-checked:bg-pen peer-checked:text-white",
                "group-hover:border-pen peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pen",
                "motion-reduce:transition-none",
              )}
            >
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
