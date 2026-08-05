// Google AdSense configuration.
// Change these values any time — no code changes needed.
export const adsConfig = {
  // Master switch. Set to false to remove all ads from every page.
  enabled: true,

  // Your AdSense publisher ID (data-ad-client).
  client: "ca-pub-5525538810839147",

  // One slot per placement so you can swap in distinct ad units later.
  // Currently all reuse the same responsive ad unit you provided.
  slots: {
    // Wide banner under the page header / top of content.
    top: "4345862479",
    // In-content responsive unit between sections.
    inContent: "4345862479",
    // Mid-article unit inside long-form content.
    inArticle: "4345862479",
    // Mid-list unit inside long ranking grids.
    midList: "4345862479",
    // Above the footer.
    footer: "4345862479",
  },
} as const;

export type AdSlotName = keyof typeof adsConfig.slots;
