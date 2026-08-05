"use client";

import { useEffect, useRef } from "react";
import { adsConfig, type AdSlotName } from "@/config/ads";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type Props = {
  slot: AdSlotName;
  className?: string;
};

export default function AdSlot({ slot, className = "" }: Props) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!adsConfig.enabled || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // An ad that fails to render shouldn't break the page.
    }
  }, []);

  if (!adsConfig.enabled) return null;

  // The container stays visible and reserves standard ad height so Google can
  // measure a real width and render the responsive unit. Ads only appear once
  // the account/domain is approved and the unit ID matches an active unit.
  return (
    <div className={`ad-slot ${className}`} style={{ width: "100%", minHeight: 120 }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", minHeight: 90 }}
        data-ad-client={adsConfig.client}
        data-ad-slot={adsConfig.slots[slot]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}