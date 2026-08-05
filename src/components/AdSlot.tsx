"use client";

import { useEffect, useRef, useState } from "react";
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
  const insRef = useRef<HTMLModElement | null>(null);
  // True once Google has injected a real ad. Until then the slot stays
  // collapsed so pages don't show big empty boxes while ads are unfilled
  // (e.g. before the AdSense account is approved).
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (!adsConfig.enabled || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // An ad that fails to render shouldn't break the page.
    }

    // Google injects an <iframe> into the <ins> once a creative is served.
    // Poll this specific element so the slot only expands when it fills.
    const start = Date.now();
    const timer = window.setInterval(() => {
      const el = insRef.current;
      if (el && el.querySelector("iframe")) {
        setFilled(true);
        window.clearInterval(timer);
        return;
      }
      // Stop polling after 8s; if an ad fills later Google still renders it
      // and the next scroll/visibility re-measure will show it.
      if (Date.now() - start > 8000) {
        window.clearInterval(timer);
      }
    }, 200);

    return () => window.clearInterval(timer);
  }, []);

  if (!adsConfig.enabled) return null;

  return (
    <div
      className={`ad-slot ${className} ${filled ? "ad-slot--filled" : "ad-slot--empty"}`}
      style={filled ? undefined : { display: "none" }}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", minHeight: 120 }}
        data-ad-client={adsConfig.client}
        data-ad-slot={adsConfig.slots[slot]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}