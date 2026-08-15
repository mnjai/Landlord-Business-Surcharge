import { describe, expect, it } from "vitest";
import {
  QUARTERLY_THRESHOLD_TTD,
  REGISTRATION_DEADLINE,
  REGISTRATION_FEE_TTD,
  LATE_REGISTRATION_PENALTY_INDIVIDUAL_TTD,
  LATE_REGISTRATION_PENALTY_COMPANY_TTD,
  aggregateMonthlyRentTTD,
  monthlyToQuarterlyTTD,
  calculateSurchargeBands,
  daysLate,
  penaltyPeriodsElapsed,
  lateRegistrationPenaltyTTD,
  calculateLatePayment,
  isInScope,
  buildSurchargeCheck,
  type RentalUnit,
} from "./surcharge";

describe("aggregateMonthlyRentTTD", () => {
  it("sums every unit — no fresh allowance per property", () => {
    const units: RentalUnit[] = [
      { monthlyRentTTD: 8_000, type: "residential" },
      { monthlyRentTTD: 4_000, type: "residential" },
    ];
    expect(aggregateMonthlyRentTTD(units)).toBe(12_000);
  });

  it("returns 0 for no units", () => {
    expect(aggregateMonthlyRentTTD([])).toBe(0);
  });

  it("treats a negative unit rent as 0 rather than subtracting", () => {
    const units: RentalUnit[] = [
      { monthlyRentTTD: 5_000, type: "residential" },
      { monthlyRentTTD: -1_000, type: "residential" },
    ];
    expect(aggregateMonthlyRentTTD(units)).toBe(5_000);
  });

  it("aggregates residential and commercial units together", () => {
    const units: RentalUnit[] = [
      { monthlyRentTTD: 6_000, type: "residential" },
      { monthlyRentTTD: 9_000, type: "commercial" },
    ];
    expect(aggregateMonthlyRentTTD(units)).toBe(15_000);
  });
});

describe("monthlyToQuarterlyTTD", () => {
  it("multiplies by 3", () => {
    expect(monthlyToQuarterlyTTD(4_000)).toBe(12_000);
    expect(monthlyToQuarterlyTTD(0)).toBe(0);
  });
});

describe("calculateSurchargeBands", () => {
  it("charges nothing on zero rent", () => {
    const result = calculateSurchargeBands(0);
    expect(result.lowBandTaxTTD).toBe(0);
    expect(result.highBandTaxTTD).toBe(0);
    expect(result.totalQuarterlyTaxTTD).toBe(0);
    expect(result.effectiveRate).toBe(0);
  });

  it("taxes everything at the low rate when under the threshold", () => {
    const result = calculateSurchargeBands(15_000);
    expect(result.lowBandAmountTTD).toBe(15_000);
    expect(result.highBandAmountTTD).toBe(0);
    expect(result.lowBandTaxTTD).toBeCloseTo(375, 6); // 15,000 * 2.5%
    expect(result.highBandTaxTTD).toBe(0);
    expect(result.totalQuarterlyTaxTTD).toBeCloseTo(375, 6);
  });

  it("boundary: rent of exactly TT$20,000 is taxed entirely at the low rate", () => {
    const result = calculateSurchargeBands(QUARTERLY_THRESHOLD_TTD);
    expect(result.lowBandAmountTTD).toBe(20_000);
    expect(result.highBandAmountTTD).toBe(0);
    expect(result.lowBandTaxTTD).toBeCloseTo(500, 6); // 20,000 * 2.5%
    expect(result.highBandTaxTTD).toBe(0);
    expect(result.totalQuarterlyTaxTTD).toBeCloseTo(500, 6);
  });

  it("boundary: TT$1 above the threshold puts that TT$1 in the high band", () => {
    const result = calculateSurchargeBands(QUARTERLY_THRESHOLD_TTD + 1);
    expect(result.lowBandAmountTTD).toBe(20_000);
    expect(result.highBandAmountTTD).toBe(1);
    expect(result.lowBandTaxTTD).toBeCloseTo(500, 6);
    expect(result.highBandTaxTTD).toBeCloseTo(0.035, 6);
  });

  it("matches the guide's worked example: two units totalling TT$12,000/mo", () => {
    // House at TT$8,000 + apartment at TT$4,000 = TT$12,000/mo = TT$36,000/quarter.
    // First TT$20,000 at 2.5% = TT$500. Remaining TT$16,000 at 3.5% = TT$560.
    // Due each quarter: TT$1,060. Effective rate ~2.94%.
    const quarterly = monthlyToQuarterlyTTD(12_000);
    const result = calculateSurchargeBands(quarterly);
    expect(quarterly).toBe(36_000);
    expect(result.lowBandTaxTTD).toBeCloseTo(500, 6);
    expect(result.highBandTaxTTD).toBeCloseTo(560, 6);
    expect(result.totalQuarterlyTaxTTD).toBeCloseTo(1_060, 6);
    expect(result.effectiveRate * 100).toBeCloseTo(2.9444, 3);
  });

  it("applies the high rate only to the portion above the threshold on large rent", () => {
    const result = calculateSurchargeBands(100_000);
    expect(result.lowBandAmountTTD).toBe(20_000);
    expect(result.highBandAmountTTD).toBe(80_000);
    expect(result.lowBandTaxTTD).toBeCloseTo(500, 6);
    expect(result.highBandTaxTTD).toBeCloseTo(2_800, 6); // 80,000 * 3.5%
    expect(result.totalQuarterlyTaxTTD).toBeCloseTo(3_300, 6);
  });

  it("rejects negative quarterly rent", () => {
    expect(() => calculateSurchargeBands(-1)).toThrow();
  });
});

describe("daysLate", () => {
  it("is 0 on the deadline itself", () => {
    expect(daysLate(REGISTRATION_DEADLINE)).toBe(0);
  });

  it("is 0 before the deadline", () => {
    const before = new Date(REGISTRATION_DEADLINE.getTime() - 1);
    expect(daysLate(before)).toBe(0);
  });

  it("is 1 exactly one day after the deadline", () => {
    const after = new Date(REGISTRATION_DEADLINE.getTime() + 86_400_000);
    expect(daysLate(after)).toBe(1);
  });

  it("floors partial days", () => {
    const after = new Date(REGISTRATION_DEADLINE.getTime() + 86_400_000 * 1.9);
    expect(daysLate(after)).toBe(1);
  });
});

describe("penaltyPeriodsElapsed", () => {
  it("is 0 on and before the deadline", () => {
    expect(penaltyPeriodsElapsed(REGISTRATION_DEADLINE)).toBe(0);
    expect(penaltyPeriodsElapsed(new Date(REGISTRATION_DEADLINE.getTime() - 86_400_000))).toBe(0);
  });

  it("boundary: becomes 1 the instant the deadline passes", () => {
    const justAfter = new Date(REGISTRATION_DEADLINE.getTime() + 1);
    expect(penaltyPeriodsElapsed(justAfter)).toBe(1);
  });

  it("stays at 1 for the rest of the first six-month block", () => {
    const fiveMonthsLate = new Date(REGISTRATION_DEADLINE);
    fiveMonthsLate.setUTCMonth(fiveMonthsLate.getUTCMonth() + 5);
    expect(penaltyPeriodsElapsed(fiveMonthsLate)).toBe(1);
  });

  it("boundary: rolls to 2 exactly six calendar months after the deadline", () => {
    const sixMonthsLate = new Date(REGISTRATION_DEADLINE);
    sixMonthsLate.setUTCMonth(sixMonthsLate.getUTCMonth() + 6);
    expect(penaltyPeriodsElapsed(sixMonthsLate)).toBe(2);
  });

  it("is still 1 one day before the six-month boundary", () => {
    const almostSixMonths = new Date(REGISTRATION_DEADLINE);
    almostSixMonths.setUTCMonth(almostSixMonths.getUTCMonth() + 6);
    almostSixMonths.setUTCDate(almostSixMonths.getUTCDate() - 1);
    expect(penaltyPeriodsElapsed(almostSixMonths)).toBe(1);
  });

  it("boundary: rolls to 3 exactly twelve calendar months after the deadline", () => {
    const twelveMonthsLate = new Date(REGISTRATION_DEADLINE);
    twelveMonthsLate.setUTCMonth(twelveMonthsLate.getUTCMonth() + 12);
    expect(penaltyPeriodsElapsed(twelveMonthsLate)).toBe(3);
  });

  it("keeps recurring — it is not a one-off fine", () => {
    const twoYearsLate = new Date(REGISTRATION_DEADLINE);
    twoYearsLate.setUTCMonth(twoYearsLate.getUTCMonth() + 24);
    expect(penaltyPeriodsElapsed(twoYearsLate)).toBe(5);
  });
});

describe("lateRegistrationPenaltyTTD", () => {
  it("charges individuals TT$1,000 per period", () => {
    const oneMonthLate = new Date(REGISTRATION_DEADLINE);
    oneMonthLate.setUTCMonth(oneMonthLate.getUTCMonth() + 1);
    expect(lateRegistrationPenaltyTTD(oneMonthLate, "individual")).toBe(
      1 * LATE_REGISTRATION_PENALTY_INDIVIDUAL_TTD,
    );
  });

  it("charges companies TT$2,500 per period — the higher rate", () => {
    const oneMonthLate = new Date(REGISTRATION_DEADLINE);
    oneMonthLate.setUTCMonth(oneMonthLate.getUTCMonth() + 1);
    expect(lateRegistrationPenaltyTTD(oneMonthLate, "company")).toBe(1 * LATE_REGISTRATION_PENALTY_COMPANY_TTD);
  });

  it("compounds across multiple periods for both occupant types", () => {
    const thirteenMonthsLate = new Date(REGISTRATION_DEADLINE);
    thirteenMonthsLate.setUTCMonth(thirteenMonthsLate.getUTCMonth() + 13);
    // 13 months = 3 periods entered (0, 6, 12 month boundaries all passed)
    expect(lateRegistrationPenaltyTTD(thirteenMonthsLate, "individual")).toBe(
      3 * LATE_REGISTRATION_PENALTY_INDIVIDUAL_TTD,
    );
    expect(lateRegistrationPenaltyTTD(thirteenMonthsLate, "company")).toBe(
      3 * LATE_REGISTRATION_PENALTY_COMPANY_TTD,
    );
  });

  it("is 0 if not yet late", () => {
    expect(lateRegistrationPenaltyTTD(REGISTRATION_DEADLINE, "individual")).toBe(0);
  });
});

describe("calculateLatePayment", () => {
  it("charges the flat 5% additional charge regardless of days overdue", () => {
    const result = calculateLatePayment(1_000, 1);
    expect(result.additionalChargeTTD).toBeCloseTo(50, 6);
  });

  it("accrues a full year of 15% interest over 365 days", () => {
    const result = calculateLatePayment(1_000, 365);
    expect(result.interestTTD).toBeCloseTo(150, 6);
    expect(result.totalTTD).toBeCloseTo(200, 6); // 50 additional charge + 150 interest
  });

  it("prorates interest for partial years", () => {
    const result = calculateLatePayment(1_000, 91.25); // ~ one quarter
    expect(result.interestTTD).toBeCloseTo(37.5, 1);
  });

  it("charges nothing overdue for 0 days beyond the flat additional charge", () => {
    const result = calculateLatePayment(1_000, 0);
    expect(result.interestTTD).toBe(0);
    expect(result.additionalChargeTTD).toBeCloseTo(50, 6);
  });

  it("stacks on top of, and is fully separate from, the registration penalty", () => {
    const late = calculateLatePayment(1_060, 30);
    const registrationPenalty = lateRegistrationPenaltyTTD(
      new Date(REGISTRATION_DEADLINE.getTime() + 86_400_000),
      "individual",
    );
    // Neither figure depends on the other — combined exposure is a simple sum.
    expect(late.totalTTD + registrationPenalty).toBeGreaterThan(registrationPenalty);
    expect(registrationPenalty).toBe(LATE_REGISTRATION_PENALTY_INDIVIDUAL_TTD);
  });
});

describe("isInScope", () => {
  it("is out of scope with no T&T rental income", () => {
    expect(isInScope({ receivesRentFromTTProperty: false })).toBe(false);
  });

  it("is in scope for any landlord receiving T&T rent with no exemption", () => {
    expect(isInScope({ receivesRentFromTTProperty: true })).toBe(true);
  });

  it("has no exemption for living abroad, currency, or being a single/small landlord", () => {
    // There is deliberately no parameter for residence or currency —
    // this test documents that scope depends on nothing but the two
    // fields the type actually exposes.
    expect(isInScope({ receivesRentFromTTProperty: true, exemptCategory: null })).toBe(true);
  });

  it("exempts each of the named categories, and only those categories", () => {
    const categories = [
      "state",
      "state_enterprise",
      "hotel_accommodation_tax",
      "religious_charitable_educational",
      "ministerial_order",
    ] as const;
    for (const exemptCategory of categories) {
      expect(isInScope({ receivesRentFromTTProperty: true, exemptCategory })).toBe(false);
    }
  });
});

describe("buildSurchargeCheck", () => {
  const twoUnits: RentalUnit[] = [
    { monthlyRentTTD: 8_000, type: "residential" },
    { monthlyRentTTD: 4_000, type: "residential" },
  ];

  it("produces the full guide worked example end to end", () => {
    const result = buildSurchargeCheck({
      units: twoUnits,
      occupant: "individual",
      registered: "yes",
      asOf: REGISTRATION_DEADLINE,
    });
    expect(result.monthlyRentTTD).toBe(12_000);
    expect(result.quarterlyRentTTD).toBe(36_000);
    expect(result.bands.totalQuarterlyTaxTTD).toBeCloseTo(1_060, 6);
    expect(result.annualTaxTTD).toBeCloseTo(4_240, 6);
    expect(result.monthlySetAsideTTD).toBeCloseTo(353.33, 2);
    expect(result.registrationFeeTTD).toBe(REGISTRATION_FEE_TTD);
    expect(result.hasCommercialUnit).toBe(false);
    expect(result.unitCount).toBe(2);
  });

  it("zeroes penalty exposure once registered, even if late", () => {
    const fourMonthsLate = new Date(REGISTRATION_DEADLINE);
    fourMonthsLate.setUTCMonth(fourMonthsLate.getUTCMonth() + 4);
    const result = buildSurchargeCheck({
      units: twoUnits,
      occupant: "individual",
      registered: "yes",
      asOf: fourMonthsLate,
    });
    expect(result.penaltyPeriods).toBe(0);
    expect(result.lateRegistrationPenaltyTTD).toBe(0);
  });

  it("treats 'unsure' the same as 'no' for penalty purposes", () => {
    const oneMonthLate = new Date(REGISTRATION_DEADLINE);
    oneMonthLate.setUTCMonth(oneMonthLate.getUTCMonth() + 1);
    const unsure = buildSurchargeCheck({
      units: twoUnits,
      occupant: "individual",
      registered: "unsure",
      asOf: oneMonthLate,
    });
    const notRegistered = buildSurchargeCheck({
      units: twoUnits,
      occupant: "individual",
      registered: "no",
      asOf: oneMonthLate,
    });
    expect(unsure.lateRegistrationPenaltyTTD).toBe(notRegistered.lateRegistrationPenaltyTTD);
    expect(unsure.penaltyPeriods).toBe(1);
  });

  it("applies the company penalty rate for a company occupant", () => {
    const oneMonthLate = new Date(REGISTRATION_DEADLINE);
    oneMonthLate.setUTCMonth(oneMonthLate.getUTCMonth() + 1);
    const result = buildSurchargeCheck({
      units: twoUnits,
      occupant: "company",
      registered: "no",
      asOf: oneMonthLate,
    });
    expect(result.lateRegistrationPenaltyTTD).toBe(LATE_REGISTRATION_PENALTY_COMPANY_TTD);
  });

  it("flags a commercial unit correctly when mixed with residential", () => {
    const result = buildSurchargeCheck({
      units: [
        { monthlyRentTTD: 5_000, type: "residential" },
        { monthlyRentTTD: 9_000, type: "commercial" },
      ],
      occupant: "individual",
      registered: "yes",
      asOf: REGISTRATION_DEADLINE,
    });
    expect(result.hasCommercialUnit).toBe(true);
  });

  it("handles zero units gracefully with no throw and zero figures", () => {
    const result = buildSurchargeCheck({
      units: [],
      occupant: "individual",
      registered: "no",
      asOf: REGISTRATION_DEADLINE,
    });
    expect(result.monthlyRentTTD).toBe(0);
    expect(result.bands.totalQuarterlyTaxTTD).toBe(0);
    expect(result.annualTaxTTD).toBe(0);
  });

  it("defaults asOf to now without throwing", () => {
    expect(() =>
      buildSurchargeCheck({ units: twoUnits, occupant: "individual", registered: "yes" }),
    ).not.toThrow();
  });
});
