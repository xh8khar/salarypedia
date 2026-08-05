// Google AdSense configuration.
// Change these values any time — no code changes needed.
export const adsConfig = {
  // Master switch. Set to false to remove all ads from every page.
  enabled: true,

  // Your AdSense publisher ID (data-ad-client).
  client: "ca-pub-5525538810839147",

  // One slot per placement so you can swap in distinct ad units later.
  // All reuse the same responsive ad unit; each gets its own fixed-size
  // container so Google can measure a real width and render cleanly.
  slots: {
    // Wide banner under the page header / top of content.
    top: { id: "4345862479", format: "horizontal" as const, width: 728, height: 90 },
    // In-content responsive unit between sections.
    inContent: { id: "4345862479", format: "rectangle" as const, width: 336, height: 280 },
    // Mid-article unit inside long-form content.
    inArticle: { id: "4345862479", format: "rectangle" as const, width: 300, height: 250 },
    // Mid-list unit inside long ranking grids.
    midList: { id: "4345862479", format: "rectangle" as const, width: 300, height: 250 },
    // Above the footer.
    footer: { id: "4345862479", format: "horizontal" as const, width: 728, height: 90 },
  },
} as const;

export type AdSlotName = keyof typeof adsConfig.slots;