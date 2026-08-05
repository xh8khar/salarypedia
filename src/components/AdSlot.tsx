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
  const unit = adsConfig.slots[slot];

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
      style={{
        width: "100%",
        maxWidth: unit.width,
        minHeight: unit.height,
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", minHeight: unit.height }}
        data-ad-client={adsConfig.client}
        data-ad-slot={unit.id}
        data-ad-format={unit.format}
        data-full-width-responsive={unit.format === "rectangle"}
      />
    </div>
  );
}