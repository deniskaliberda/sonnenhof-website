// Tracking parameter persistence (gclid, utm_*) across navigation.
// Google Ads sets ?gclid=... on landing. Without persistence, gclid is lost as
// soon as the user navigates to another page, so form submits arrive without it
// and Ads cannot attribute the conversion. We store the first-seen tracking
// params for 90 days (the default Google Ads click-through lookback window).

const STORAGE_KEY = "sh_tracking";
const TTL_MS = 90 * 24 * 60 * 60 * 1000;

export type TrackingParams = {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

type StoredEntry = TrackingParams & { _savedAt: number };

const TRACKING_KEYS: (keyof TrackingParams)[] = [
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

function safeStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function persistTrackingParams(search?: string): void {
  const store = safeStorage();
  if (!store) return;
  const params = new URLSearchParams(search ?? window.location.search);

  const incoming: TrackingParams = {};
  for (const key of TRACKING_KEYS) {
    const v = params.get(key);
    if (v) incoming[key] = v;
  }
  if (Object.keys(incoming).length === 0) return;

  // First-touch wins: only overwrite if existing entry is missing or expired.
  const existing = getStoredTrackingParams();
  const next: StoredEntry = { ...existing, ...incoming, _savedAt: Date.now() };
  try {
    store.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // quota exceeded or storage unavailable — silently no-op
  }
}

export function getStoredTrackingParams(): TrackingParams {
  const store = safeStorage();
  if (!store) return {};
  try {
    const raw = store.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StoredEntry;
    if (!parsed._savedAt || Date.now() - parsed._savedAt > TTL_MS) {
      store.removeItem(STORAGE_KEY);
      return {};
    }
    const out: TrackingParams = {};
    for (const k of TRACKING_KEYS) {
      const v = parsed[k];
      if (typeof v === "string" && v) out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}
