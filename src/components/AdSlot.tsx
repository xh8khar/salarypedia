"use client";

import { useEffect, useRef } from "react";
import { adsConfig } from "@/config/ads";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type Props = {
  slot: keyof typeof adsConfig.slots;
  className?: string;
  // Reserve vertical space before the ad loads to avoid layout shift.
  minHeight?: number;
};

export default function AdSlot({ slot, className = "", minHeight = 250 }: Props) {
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
    <div
      className={`ad-slot ${className}`}
      style={minHeight ? { minHeight } : undefined}
    >
      <span className="ad-slot__label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={adsConfig.client}
        data-ad-slot={adsConfig.slots[slot]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
