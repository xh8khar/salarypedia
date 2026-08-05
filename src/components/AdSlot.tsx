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
  // Reserve a minimum height to avoid layout shift while a responsive ad loads.
  minHeight?: number;
};

export default function AdSlot({ slot, className = "", minHeight = 120 }: Props) {
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

  return (
    <div className={`ad-slot ${className}`} style={{ width: "100%", minHeight }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", minHeight }}
        data-ad-client={adsConfig.client}
        data-ad-slot={adsConfig.slots[slot]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}