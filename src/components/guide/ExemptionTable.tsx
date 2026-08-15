import { Ledger, LedgerRow } from "@/components/ui/Ledger";

/** The stamp-duty exemption thresholds — its own component since, unlike WorkedExample, these are fixed statutory figures rather than something computed from lib/surcharge. */
export function ExemptionTable() {
  return (
    <Ledger>
      <LedgerRow
        label="First-time homeowners"
        sub="deed executed on or after 01.01.2019"
        value="up to TT$1,500,000"
      />
      <LedgerRow label="Everyone else" value="up to TT$850,000" />
      <LedgerRow
        label="Residential land only, no house"
        sub="where criteria are met and application made"
        value="up to TT$450,000"
      />
    </Ledger>
  );
}
