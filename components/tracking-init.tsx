"use client";

import { useEffect } from "react";
import { persistTrackingParams } from "@/lib/tracking";

// Runs once per page load to capture gclid + utm_* from the URL into
// localStorage. Mounted in the root layout so it covers every entry point.
export function TrackingInit() {
  useEffect(() => {
    persistTrackingParams();
  }, []);
  return null;
}
