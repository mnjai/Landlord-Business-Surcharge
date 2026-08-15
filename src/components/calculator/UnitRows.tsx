import type { RefObject } from "react";
import type { RentalUnit, UnitType } from "@/lib/surcharge";

interface UnitRowsProps {
  units: RentalUnit[];
  onAmountChange: (index: number, amount: number) => void;
  onTypeChange: (index: number, type: UnitType) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  firstInputRef?: RefObject<HTMLInputElement | null>;
}

export function UnitRows({ units, onAmountChange, onTypeChange, onAdd, onRemove, firstInputRef }: UnitRowsProps) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        {units.map((unit, index) => (
          <div key={index} className="flex flex-wrap items-center gap-2">
            <span className="w-[26px] shrink-0 font-mono text-[11px] text-ink-3">
              {String(index + 1).padStart(2, "0")}
            </span>
            <label className="relative min-w-[130px] flex-1 basis-[150px]">
              <span className="pointer-events-none absolute top-1/2 left-[11px] -translate-y-1/2 font-mono text-xs text-ink-3">
                TT$
              </span>
              <input
                ref={index === 0 ? firstInputRef : undefined}
                type="number"
                min={0}
                step={50}
                inputMode="decimal"
                placeholder="0"
                aria-label={`Monthly rent for unit ${index + 1}`}
                value={unit.monthlyRentTTD === 0 ? "" : unit.monthlyRentTTD}
                onChange={(e) => onAmountChange(index, e.target.valueAsNumber || 0)}
                className="w-full border border-rule bg-card py-2.5 pr-3 pl-11 font-mono text-sm text-ink focus:border-pen focus:outline-2 focus:outline-offset-[-1px] focus:outline-pen"
              />
            </label>
            <select
              aria-label={`Unit type for unit ${index + 1}`}
              value={unit.type}
              onChange={(e) => onTypeChange(index, e.target.value as UnitType)}
              className="flex-1 basis-[130px] border border-rule bg-card px-3 py-2.5 font-mono text-sm text-ink focus:border-pen focus:outline-2 focus:outline-offset-[-1px] focus:outline-pen"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
            <button
              type="button"
              onClick={() => onRemove(index)}
              disabled={units.length <= 1}
              aria-label={`Remove unit ${index + 1}`}
              className="h-[38px] w-[34px] shrink-0 border border-rule bg-card text-lg leading-none text-ink-3 hover:border-stamp hover:text-stamp disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-rule disabled:hover:text-ink-3"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="mt-2 border border-dashed border-rule bg-transparent px-3.5 py-2.5 font-mono text-[12.5px] text-pen hover:border-pen hover:bg-pen-soft"
      >
        + Add another unit
      </button>
    </div>
  );
}
