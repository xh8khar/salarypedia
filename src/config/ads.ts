// Google AdSense configuration.
// Change these values any time — no code changes needed.
export const adsConfig = {
  // Master switch. Set to false to remove all ads from every page.
  enabled: true,

  // Your AdSense publisher ID (data-ad-client).
  client: "ca-pub-5525538810839147",

  // Responsive auto-format units: they stretch to fill the container and
  // Google picks the best size for the viewport. All reuse the same unit.
  slots: {
    top: "4345862479",
    inContent: "4345862479",
    inArticle: "4345862479",
    midList: "4345862479",
    footer: "4345862479",
  },
} as const;

export type AdSlotName = keyof typeof adsConfig.slots;