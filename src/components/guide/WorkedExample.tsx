import { calculateSurchargeBands, monthlyToQuarterlyTTD } from "@/lib/surcharge";
import { formatCurrency } from "@/data/rates";
import { Ledger, LedgerRow, LedgerTotal } from "@/components/ui/Ledger";

/**
 * The guide's own worked example — two units, TT$12,000/mo combined.
 * Computed live from lib/surcharge.ts rather than hand-typed, so it can
 * never drift from the calculator's own arithmetic.
 */
export function WorkedExample() {
  const quarterly = monthlyToQuarterlyTTD(12_000);
  const bands = calculateSurchargeBands(quarterly);

  return (
    <div className="my-7 border border-rule bg-card p-5.5">
      <h4 className="mb-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-3 uppercase">
        Worked example — two units, TT$12,000 a month combined
      </h4>
      <Ledger>
        <LedgerRow
          label="Rent collected per month"
          sub="a house at TT$8,000 and an apartment at TT$4,000"
          value={formatCurrency(12_000, "TTD")}
        />
        <LedgerRow label="Rent collected per quarter" value={formatCurrency(quarterly, "TTD")} />
        <LedgerRow label="First TT$20,000 at 2.5%" value={formatCurrency(bands.lowBandTaxTTD, "TTD")} muted />
        <LedgerRow
          label="Remaining TT$16,000 at 3.5%"
          value={formatCurrency(bands.highBandTaxTTD, "TTD")}
          muted
        />
        <LedgerTotal label="Due each quarter" value={formatCurrency(bands.totalQuarterlyTaxTTD, "TTD")} />
      </Ledger>
      <p className="mt-3.5 text-sm text-ink-2">
        That is an effective rate of {(bands.effectiveRate * 100).toFixed(2)}%, or about{" "}
        {formatCurrency(bands.totalQuarterlyTaxTTD / 3, "TTD")} to set aside from each month&apos;s rent. Over a
        year, {formatCurrency(bands.totalQuarterlyTaxTTD * 4, "TTD")}.
      </p>
    </div>
  );
}
