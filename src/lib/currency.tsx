"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { CURRENCIES, formatCurrency, fromTTD, type CurrencyCode } from "@/data/rates";

const STORAGE_KEY = "ebenezer-currency";

/**
 * A tiny external store for the persisted currency choice. Using
 * useSyncExternalStore (rather than reading localStorage in an effect and
 * calling setState) keeps server and first-client-render output identical
 * — the browser's stored preference is only ever applied through the
 * documented external-store sync path, never a synchronous effect.
 */
type Listener = () => void;
const listeners = new Set<Listener>();

function isValidCode(value: string | null): value is CurrencyCode {
  return !!value && value in CURRENCIES;
}

let cached: CurrencyCode =
  typeof window !== "undefined" && isValidCode(window.localStorage.getItem(STORAGE_KEY))
    ? (window.localStorage.getItem(STORAGE_KEY) as CurrencyCode)
    : "TTD";

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): CurrencyCode {
  return cached;
}

function getServerSnapshot(): CurrencyCode {
  return "TTD";
}

function setStoredCurrency(code: CurrencyCode) {
  cached = code;
  window.localStorage.setItem(STORAGE_KEY, code);
  listeners.forEach((listener) => listener());
}

export function hasStoredCurrencyPreference(): boolean {
  if (typeof window === "undefined") return false;
  return isValidCode(window.localStorage.getItem(STORAGE_KEY));
}

/** Sets the display currency, but only if the visitor hasn't already chosen one themselves. */
export function suggestCurrency(code: CurrencyCode) {
  if (hasStoredCurrencyPreference()) return;
  setStoredCurrency(code);
}

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const currency = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: setStoredCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within a CurrencyProvider");
  return ctx;
}

/** A TTD amount, formatted in the visitor's chosen currency, with the TTD
 * figure kept alongside whenever the choice isn't TTD itself. */
export function useFormattedAmount(ttd: number): { primary: string; indicative: string | null } {
  const { currency } = useCurrency();
  if (currency === "TTD") {
    return { primary: formatCurrency(ttd, "TTD"), indicative: null };
  }
  return {
    primary: formatCurrency(ttd, currency),
    indicative: formatCurrency(ttd, "TTD"),
  };
}

/** Same as useFormattedAmount, but with the numeric amounts kept apart from
 * their currency symbols — for count-up animation, where only the digits
 * should animate while the symbol stays fixed. */
export function useAmountParts(ttd: number): {
  symbol: string;
  amount: number;
  indicativeSymbol: string | null;
  indicativeAmount: number | null;
} {
  const { currency } = useCurrency();
  const symbol = CURRENCIES[currency].symbol;
  const amount = fromTTD(ttd, currency);
  if (currency === "TTD") {
    return { symbol, amount, indicativeSymbol: null, indicativeAmount: null };
  }
  return { symbol, amount, indicativeSymbol: CURRENCIES.TTD.symbol, indicativeAmount: ttd };
}

export { fromTTD, formatCurrency };
export type { CurrencyCode };
