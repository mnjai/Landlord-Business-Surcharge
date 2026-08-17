"use client";

import { useMemo, useState } from "react";
import { OptionGroup } from "@/components/calculator/OptionGroup";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type Maintained = "recent" | "moderate" | "long";
type Boundary = "clear" | "partial" | "unclear";
type Access = "yes" | "effort" | "no";
type Occupation = "no" | "unsure" | "yes";

const MAINTAINED_LABELS: Record<Maintained, string> = {
  recent: "Within the last few months",
  moderate: "Six months to a couple of years",
  long: "Longer than that, or not sure",
};

const BOUNDARY_LABELS: Record<Boundary, string> = {
  clear: "Yes, clearly",
  partial: "Partly",
  unclear: "No, or there are no recent photos",
};

const ACCESS_LABELS: Record<Access, string> = {
  yes: "Yes",
  effort: "With some effort",
  no: "No",
};

const OCCUPATION_LABELS: Record<Occupation, string> = {
  no: "No",
  unsure: "Not sure",
  yes: "Yes",
};

/**
 * A short, private way to describe an embarrassing situation to a form
 * rather than a person. No score is shown as a judgement — only a band
 * and a next step, and the WhatsApp message it produces is factual, not
 * a confession.
 */
export function RestorationAssessment() {
  const [maintained, setMaintained] = useState<Maintained | null>(null);
  const [boundary, setBoundary] = useState<Boundary | null>(null);
  const [access, setAccess] = useState<Access | null>(null);
  const [occupation, setOccupation] = useState<Occupation | null>(null);

  const allAnswered = maintained && boundary && access && occupation;

  const band = useMemo(() => {
    if (!allAnswered) return null;
    if (maintained === "long" || boundary === "unclear" || access === "no") {
      return {
        title: "Sounds like a full restoration first",
        body: "That's a common starting point, not an unusual one. The next step is a paid site assessment so it can be scoped properly rather than guessed at.",
      };
    }
    if (maintained === "moderate" || boundary === "partial" || access === "effort") {
      return {
        title: "Sounds like a staged restoration",
        body: "Likely starting with the perimeter, boundary line and access, then the rest over following months. A site assessment confirms the order and the cost.",
      };
    }
    return {
      title: "Sounds like it may already be maintainable",
      body: "The monthly service can likely begin directly — a short conversation will confirm, and a site assessment isn't necessarily needed first.",
    };
  }, [allAnswered, maintained, boundary, access]);

  const message = allAnswered
    ? `Hi — I used the property check on your site. Grounds last maintained: ${MAINTAINED_LABELS[maintained]}. Boundary visible: ${BOUNDARY_LABELS[boundary]}. Access to the door: ${ACCESS_LABELS[access]}. Possible occupation: ${OCCUPATION_LABELS[occupation]}.`
    : "Hi — I'd like to talk about an idle property that may need restoration.";

  return (
    <div className="border border-rule bg-card">
      <div className="space-y-6 p-5 sm:p-6">
        <OptionGroup
          name="maintained"
          legend="How long since the grounds were last maintained?"
          options={[
            { value: "recent", label: MAINTAINED_LABELS.recent },
            { value: "moderate", label: MAINTAINED_LABELS.moderate },
            { value: "long", label: MAINTAINED_LABELS.long },
          ]}
          value={maintained ?? ("" as Maintained)}
          onChange={setMaintained}
        />
        <OptionGroup
          name="boundary"
          legend="Can you see the boundary — fence or wall — in recent photos?"
          options={[
            { value: "clear", label: BOUNDARY_LABELS.clear },
            { value: "partial", label: BOUNDARY_LABELS.partial },
            { value: "unclear", label: BOUNDARY_LABELS.unclear },
          ]}
          value={boundary ?? ("" as Boundary)}
          onChange={setBoundary}
        />
        <OptionGroup
          name="access"
          legend="Could someone reach the front door without cutting through vegetation?"
          options={[
            { value: "yes", label: ACCESS_LABELS.yes },
            { value: "effort", label: ACCESS_LABELS.effort },
            { value: "no", label: ACCESS_LABELS.no },
          ]}
          value={access ?? ("" as Access)}
          onChange={setAccess}
        />
        <OptionGroup
          name="occupation"
          legend="As far as you know, is anyone using or living on any part of the land without an arrangement with you?"
          hint="Common, and not something to be embarrassed about — it's exactly what a first assessment is for."
          options={[
            { value: "no", label: OCCUPATION_LABELS.no },
            { value: "unsure", label: OCCUPATION_LABELS.unsure },
            { value: "yes", label: OCCUPATION_LABELS.yes },
          ]}
          value={occupation ?? ("" as Occupation)}
          onChange={setOccupation}
        />
      </div>

      {band ? (
        <div className="border-t border-rule bg-paper p-5 sm:p-6">
          <h4 className="mb-1.5 font-display text-base font-bold tracking-[-0.01em]">{band.title}</h4>
          <p className="mb-4 max-w-[52ch] text-[14px] text-ink-2">{band.body}</p>
          {occupation !== "no" ? (
            <p className="mb-4 max-w-[52ch] text-[14px] text-ink-2">
              On the occupation question — that&apos;s covered in the assessment too, following the same protocol
              described below: documented, not disturbed, reported the same day.
            </p>
          ) : null}
          <WhatsAppButton message={message}>Book a site assessment</WhatsAppButton>
        </div>
      ) : (
        <div className="border-t border-rule p-5 text-[13.5px] text-ink-3 sm:p-6">
          Answer all four to see an indicative next step.
        </div>
      )}
    </div>
  );
}
