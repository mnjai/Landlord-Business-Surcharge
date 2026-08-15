import clsx from "clsx";
import type { ReactNode } from "react";

export function Ledger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <table className={clsx("w-full border-collapse font-mono text-[13.5px] tabular-figures", className)}>
      <tbody>{children}</tbody>
    </table>
  );
}

export function LedgerRow({
  label,
  sub,
  value,
  muted,
}: {
  label: ReactNode;
  sub?: ReactNode;
  value: ReactNode;
  muted?: boolean;
}) {
  return (
    <tr>
      <td className={clsx("border-b border-dotted border-rule py-2.5 pr-3 align-top", muted && "text-ink-2")}>
        {label}
        {sub ? <span className="mt-0.5 block font-body text-[12.5px] font-normal text-ink-3">{sub}</span> : null}
      </td>
      <td
        className={clsx(
          "border-b border-dotted border-rule py-2.5 text-right align-top font-medium whitespace-nowrap",
          muted && "text-ink-2",
        )}
      >
        {value}
      </td>
    </tr>
  );
}

export function LedgerTotal({ label, value, sub }: { label: ReactNode; value: ReactNode; sub?: ReactNode }) {
  return (
    <tr>
      <td className="border-t-2 border-ink pt-3 text-[13.5px] font-semibold">{label}</td>
      <td className="border-t-2 border-ink pt-3 text-right text-[17px] font-semibold whitespace-nowrap">
        {value}
        {sub ? <span className="mt-0.5 block font-body text-xs font-normal text-ink-3">{sub}</span> : null}
      </td>
    </tr>
  );
}
