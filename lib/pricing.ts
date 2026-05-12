// Estimated booking value calculator for Google Ads conversion-value tracking.
// Based on website pricing (lib/mock-data.ts priceInfo + per-unit rates).
// Used by the inquiry form: when the form is submitted, we estimate the
// booking value so Google Ads can optimize for high-value bookings instead
// of treating every inquiry as a flat lead.

// Averaged across 5 FeWo (100/106/108/106/112) and 3 Zimmer (117/107/85)
const FEWO_AVG_HIGH = 106.4;
const FEWO_AVG_LOW = 96.4;
const ZIMMER_AVG_HIGH = 103;
const ZIMMER_AVG_LOW = 93;

const HUND_PRO_NACHT = 10;
const ZUSATZ_ERWACHSENER_PRO_NACHT = 23;
const KIND_BIS_10_PRO_NACHT = 15;
const KIND_AB_10_PRO_NACHT = 20;

export type EstimatedValueInput = {
  accommodation: "ferienwohnung" | "zimmer";
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  childrenAges?: (number | undefined)[];
  hasDog: boolean;
  dogCount?: number;
};

export function isHauptsaison(date: Date): boolean {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  if (m >= 6 && m <= 9) return true; // June-September
  if (m === 10 && d <= 15) return true; // until October 15
  return false;
}

function nights(checkIn: Date, checkOut: Date): number {
  const ms = checkOut.getTime() - checkIn.getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export function calculateEstimatedValue(input: EstimatedValueInput): number {
  const n = nights(input.checkIn, input.checkOut);
  if (n <= 0) return 0;

  const isHigh = isHauptsaison(input.checkIn);
  const isFeWo = input.accommodation === "ferienwohnung";

  const perNight = isFeWo
    ? isHigh
      ? FEWO_AVG_HIGH
      : FEWO_AVG_LOW
    : isHigh
      ? ZIMMER_AVG_HIGH
      : ZIMMER_AVG_LOW;

  const base = n * perNight;

  const dogFee =
    input.hasDog && input.dogCount && input.dogCount > 0
      ? input.dogCount * HUND_PRO_NACHT * n
      : 0;

  const extraAdults = Math.max(0, input.adults - 2);
  const extraAdultsFee = extraAdults * ZUSATZ_ERWACHSENER_PRO_NACHT * n;

  let kidsFee = 0;
  if (input.children > 0) {
    const ages = input.childrenAges ?? [];
    for (let i = 0; i < input.children; i++) {
      const age = ages[i];
      if (typeof age !== "number") {
        // No age provided — assume conservative middle bracket
        kidsFee += KIND_BIS_10_PRO_NACHT * n;
        continue;
      }
      if (age < 3) continue; // free
      if (age < 11) kidsFee += KIND_BIS_10_PRO_NACHT * n;
      else kidsFee += KIND_AB_10_PRO_NACHT * n;
    }
  }

  return Math.round(base + dogFee + extraAdultsFee + kidsFee);
}
