"use client";

import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { buildSurchargeCheck, type SurchargeCheckResult, type UnitType } from "@/lib/surcharge";
import {
  decodeCheckState,
  encodeCheckState,
  isSharedResultLink,
  type CheckFormState,
  type HomeCode,
  type PaidCurrency,
  type RentsStatus,
} from "@/lib/checkUrl";
import type { Occupant, RegistrationStatus } from "@/lib/surcharge";
import { suggestCurrency, type CurrencyCode } from "@/lib/currency";
import { OptionGroup } from "./OptionGroup";
import { UnitRows } from "./UnitRows";
import { ResultPanel } from "./ResultPanel";
import { DaysLateStrip } from "@/components/ui/DaysLateStrip";

type Action =
  | { type: "SET_HOME"; home: HomeCode }
  | { type: "SET_RENTS"; rents: RentsStatus }
  | { type: "SET_CCY"; ccy: PaidCurrency }
  | { type: "SET_OCCUPANT"; occupant: Occupant }
  | { type: "SET_REGISTERED"; registered: RegistrationStatus }
  | { type: "ADD_UNIT" }
  | { type: "REMOVE_UNIT"; index: number }
  | { type: "SET_UNIT_AMOUNT"; index: number; amount: number }
  | { type: "SET_UNIT_TYPE"; index: number; unitType: UnitType };

function reducer(state: CheckFormState, action: Action): CheckFormState {
  switch (action.type) {
    case "SET_HOME":
      return { ...state, home: action.home };
    case "SET_RENTS":
      return { ...state, rents: action.rents };
    case "SET_CCY":
      return { ...state, paidCurrency: action.ccy };
    case "SET_OCCUPANT":
      return { ...state, occupant: action.occupant };
    case "SET_REGISTERED":
      return { ...state, registered: action.registered };
    case "ADD_UNIT":
      return { ...state, units: [...state.units, { monthlyRentTTD: 0, type: "residential" }] };
    case "REMOVE_UNIT":
      return {
        ...state,
        units: state.units.length > 1 ? state.units.filter((_, i) => i !== action.index) : state.units,
      };
    case "SET_UNIT_AMOUNT":
      return {
        ...state,
        units: state.units.map((u, i) => (i === action.index ? { ...u, monthlyRentTTD: action.amount } : u)),
      };
    case "SET_UNIT_TYPE":
      return {
        ...state,
        units: state.units.map((u, i) => (i === action.index ? { ...u, type: action.unitType } : u)),
      };
    default:
      return state;
  }
}

const HOME_TO_CURRENCY: Partial<Record<HomeCode, CurrencyCode>> = {
  US: "USD",
  CA: "CAD",
  UK: "GBP",
  OT: "USD",
  TT: "TTD",
};

export function Calculator() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [state, dispatch] = useReducer(reducer, undefined, () =>
    decodeCheckState(new URLSearchParams(searchParams.toString())),
  );
  const [submitted, setSubmitted] = useState(() => isSharedResultLink(new URLSearchParams(searchParams.toString())));
  const [error, setError] = useState("");
  // Bumped only when a genuinely new result is computed, so the stamp's
  // impact animation replays on a new answer, but not on incidental
  // re-renders (e.g. switching the display currency).
  const [resultVersion, setResultVersion] = useState(0);

  const firstRentInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // A visitor arriving with ?home=US and nothing else is a homepage deep
  // link, not a shared result — suggest (never force) a matching display
  // currency. This only touches the external currency store, not this
  // component's own state, so it's a legitimate effect rather than one
  // that should be derived during render.
  useEffect(() => {
    const suggested = HOME_TO_CURRENCY[state.home];
    if (suggested) suggestCurrency(suggested);
    // Only ever run this against the state present on first mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Purely derived from state + submitted — no effect needed. Recomputes
  // automatically whenever the form's inputs or submit status change.
  const result: SurchargeCheckResult | null = useMemo(() => {
    if (!submitted || state.rents === "no") return null;
    return buildSurchargeCheck({ units: state.units, occupant: state.occupant, registered: state.registered });
  }, [submitted, state]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (state.rents === "yes") {
      const total = state.units.reduce((sum, u) => sum + Math.max(0, u.monthlyRentTTD), 0);
      if (total <= 0) {
        setError("Enter the monthly rent for at least one unit.");
        firstRentInputRef.current?.focus();
        return;
      }
    }

    setSubmitted(true);
    setResultVersion((v) => v + 1);

    const params = encodeCheckState(state);
    router.replace(`/check?${params.toString()}`, { scroll: false });

    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const owns = state.rents !== "no";
  const lets = state.rents === "yes";

  return (
    <div>
      <DaysLateStrip
        className="mb-7"
        caption="days since the registration deadline of 30 June 2026. The surcharge itself took effect 1 January 2026."
      />

      <form onSubmit={handleSubmit} noValidate className="border border-rule bg-card">
        <div className="border-b border-rule p-6">
          <OptionGroup
            name="home"
            legend={
              <>
                <span className="mr-3 font-mono text-[11px] font-semibold tracking-[0.1em] text-pen">01</span>
                Where do you live?
              </>
            }
            hint="The surcharge follows the property, not the owner — but where you live decides how hard filing is."
            options={[
              { value: "TT", label: "Trinidad & Tobago" },
              { value: "US", label: "United States" },
              { value: "CA", label: "Canada" },
              { value: "UK", label: "United Kingdom" },
              { value: "OT", label: "Somewhere else" },
            ]}
            value={state.home}
            onChange={(home) => dispatch({ type: "SET_HOME", home })}
          />
        </div>

        <div className="border-b border-rule p-6">
          <OptionGroup
            name="rents"
            legend={
              <>
                <span className="mr-3 font-mono text-[11px] font-semibold tracking-[0.1em] text-pen">02</span>
                Do you receive rent from property in T&amp;T?
              </>
            }
            hint="Residential or commercial. Include a single room, a downstairs apartment, or an office unit."
            options={[
              { value: "yes", label: "Yes" },
              { value: "vacant", label: "I own, but it's vacant" },
              { value: "no", label: "No property in T&T" },
            ]}
            value={state.rents}
            onChange={(rents) => dispatch({ type: "SET_RENTS", rents })}
          />
        </div>

        {lets ? (
          <div className="border-b border-rule p-6">
            <div className="mb-1 flex items-baseline gap-3">
              <span className="font-mono text-[11px] font-semibold tracking-[0.1em] text-pen">03</span>
              <span className="font-display text-lg font-bold tracking-[-0.01em]">
                What does each unit bring in per month?
              </span>
            </div>
            <p className="mt-0.5 mb-3.5 text-[13.5px] text-ink-3">
              In TT dollars. Add every unit — they&apos;re added together before the rate bands are applied, so
              listing them separately matters.
            </p>
            <UnitRows
              units={state.units}
              firstInputRef={firstRentInputRef}
              onAmountChange={(index, amount) => dispatch({ type: "SET_UNIT_AMOUNT", index, amount })}
              onTypeChange={(index, unitType) => dispatch({ type: "SET_UNIT_TYPE", index, unitType })}
              onAdd={() => dispatch({ type: "ADD_UNIT" })}
              onRemove={(index) => dispatch({ type: "REMOVE_UNIT", index })}
            />
          </div>
        ) : null}

        {lets ? (
          <div className="border-b border-rule p-6">
            <OptionGroup
              name="ccy"
              legend={
                <>
                  <span className="mr-3 font-mono text-[11px] font-semibold tracking-[0.1em] text-pen">04</span>
                  What currency is the rent paid in?
                </>
              }
              hint="Being paid in foreign currency does not take you out of scope. It's a common misunderstanding."
              options={[
                { value: "TTD", label: "TT dollars" },
                { value: "USD", label: "US dollars" },
                { value: "MIX", label: "A mix / other" },
              ]}
              value={state.paidCurrency}
              onChange={(ccy) => dispatch({ type: "SET_CCY", ccy })}
            />
          </div>
        ) : null}

        {owns ? (
          <div className="border-b border-rule p-6">
            <OptionGroup
              name="who"
              legend={
                <>
                  <span className="mr-3 font-mono text-[11px] font-semibold tracking-[0.1em] text-pen">05</span>
                  Do you hold the property personally or through a company?
                </>
              }
              hint="Companies carry a higher penalty for late registration."
              options={[
                { value: "individual", label: "Personally" },
                { value: "company", label: "Through a company" },
              ]}
              value={state.occupant}
              onChange={(occupant) => dispatch({ type: "SET_OCCUPANT", occupant })}
            />
          </div>
        ) : null}

        {owns ? (
          <div className="border-b border-rule p-6">
            <OptionGroup
              name="reg"
              legend={
                <>
                  <span className="mr-3 font-mono text-[11px] font-semibold tracking-[0.1em] text-pen">06</span>
                  Have you registered with the BIR?
                </>
              }
              hint="Registration is separate from paying. It's a one-time process with its own fee."
              options={[
                { value: "no", label: "Not yet" },
                { value: "yes", label: "Yes, registered" },
                { value: "unsure", label: "I'm not sure" },
              ]}
              value={state.registered}
              onChange={(registered) => dispatch({ type: "SET_REGISTERED", registered })}
            />
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3.5 p-6">
          <button
            type="submit"
            className="bg-ink px-[30px] py-[15px] font-display text-base font-bold tracking-[-0.01em] text-white hover:bg-pen focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-pen"
          >
            Check my position
          </button>
          <span className="font-mono text-[12.5px] text-stamp" role="alert">
            {error}
          </span>
        </div>
      </form>

      <div ref={resultRef} aria-live="polite" aria-atomic="false" className="mt-9 scroll-mt-6">
        {submitted ? <ResultPanel state={state} result={result} resultKey={resultVersion} /> : null}
      </div>
    </div>
  );
}
