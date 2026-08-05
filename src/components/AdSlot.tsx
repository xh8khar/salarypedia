"use client";

import { useEffect, useRef, useState } from "react";
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
  const insRef = useRef<HTMLModElement | null>(null);
  // True once Google has injected a real ad. While false we show a labelled
  // placeholder so empty slots don't look broken during review/fill delays.
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (!adsConfig.enabled || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // An ad that fails to render shouldn't break the page.
    }

    // Google's tag loads asynchronously and only injects an <iframe> into the
    // <ins> once a creative is served. Poll that specific element so the
    // placeholder flips off exactly when this slot actually fills.
    const start = Date.now();
    const timer = window.setInterval(() => {
      const el = insRef.current;
      if (el && el.querySelector("iframe")) {
        setFilled(true);
        window.clearInterval(timer);
        return;
      }
      if (Date.now() - start > 8000) {
        window.clearInterval(timer);
      }
    }, 200);

    return () => window.clearInterval(timer);
  }, []);

  if (!adsConfig.enabled) return null;

  return (
    <div
      className={`ad-slot ${className} ${filled ? "" : "ad-slot--placeholder"}`}
      style={minHeight ? { minHeight } : undefined}
    >
      <span className="ad-slot__label">Advertisement</span>
      <span className="ad-slot__placeholder">Ad space</span>
      <ins
        ref={insRef}
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