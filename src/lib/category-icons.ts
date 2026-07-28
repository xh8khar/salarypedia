/**
 * Outline icon geometry per career category, as arrays of SVG `d` paths.
 * Drawn on a 24x24 grid for stroke rendering (fill="none").
 */
export const categoryIcons: Record<string, string[]> = {
  "ai-machine-learning": [
    "M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2",
    "M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z",
    "M9.5 9.5h5v5h-5z",
  ],
  "finance-accounting": ["M12 1.5v21", "M17 5.5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"],
  "business-administration": [
    "M3 8.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    "M9 6.5v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2",
    "M3 12.5h18",
  ],
  advertising: [
    "M3 10v4a1 1 0 0 0 1 1h3l5 4V5L7 9H4a1 1 0 0 0-1 1z",
    "M16.5 9.5a4 4 0 0 1 0 5",
    "M19.5 6.5a8 8 0 0 1 0 11",
  ],
  architecture: [
    "M4 21V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15",
    "M14 21V11h4a2 2 0 0 1 2 2v8",
    "M2 21h20",
    "M8 8.5h2M8 12.5h2M8 16.5h2",
  ],
  automotive: [
    "M5 17.5a2 2 0 1 0 4 0 2 2 0 1 0-4 0M15 17.5a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
    "M5 17.5H3v-5l2-5h9l3 5h4v5h-2M9 17.5h6",
  ],
  aviation: ["M22 2L11 13", "M22 2l-7 20-4-9-9-4 20-7z"],
  banking: ["M3 10l9-6 9 6", "M5.5 10v9M9.5 10v9M14.5 10v9M18.5 10v9", "M2 21h20"],
  construction: ["M4 18h16", "M6.5 18v-3.5a5.5 5.5 0 0 1 11 0V18", "M10 5.5V4h4v1.5"],
  counseling: ["M21 12a8 8 0 0 1-8 8H7.5L3 22.5V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"],
  "customer-service": [
    "M3.5 14.5v-2a8.5 8.5 0 0 1 17 0v2",
    "M20.5 15.5a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2z",
    "M3.5 15.5a2 2 0 0 0 2 2h1v-5h-1a2 2 0 0 0-2 2z",
  ],
  "education-teaching": ["M22 9L12 4 2 9l10 5 10-5z", "M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"],
  energy: ["M13 2L4 14h7l-1 8 9-12h-7l1-8z"],
  engineering: [
    "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    "M19.2 15a1.7 1.7 0 0 0 .4 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-2.9-1.1l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1A1.7 1.7 0 0 0 3 14h-.2a2 2 0 1 1 0-4H3a1.7 1.7 0 0 0 1.1-2.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1A1.7 1.7 0 0 0 10 3.2V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 2.9 1.1l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1A1.7 1.7 0 0 0 21 10h.2a2 2 0 1 1 0 4H21a1.7 1.7 0 0 0-1.8 1z",
  ],
  manufacturing: ["M21 16V8l-9-5-9 5v8l9 5 9-5z", "M3.3 7.5L12 12.5l8.7-5M12 22V12.5"],
  "fitness-sports": ["M22 12h-4l-3 9L9 3l-3 9H2"],
  hospitality: [
    "M18 8.5h1a3.5 3.5 0 0 1 0 7h-1",
    "M2.5 8.5H18v8a4 4 0 0 1-4 4H6.5a4 4 0 0 1-4-4z",
    "M6.5 2v3M10.5 2v3M14.5 2v3",
  ],
  healthcare: [
    "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z",
  ],
  "human-resources": [
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
    "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    "M22 21v-2a4 4 0 0 0-3-3.9M16 3.3a4 4 0 0 1 0 7.6",
  ],
  "import-export": ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M2 12h20", "M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"],
  insurance: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "M9 11.5l2 2 4-4"],
  "information-technology": [
    "M3 5.5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z",
    "M8 20.5h8M12 16.5v4",
  ],
  "law-legal": ["M12 3v18M8 21h8", "M3 7.5h18", "M6.5 7.5L3 13.5h7zM17.5 7.5L14 13.5h7z"],
  marketing: ["M23 6l-9.5 9.5-5-5L1 18", "M17 6h6v6"],
  "pharmaceutical-biotech": [
    "M9 2.5V9l-4.5 8.5A2 2 0 0 0 6.3 20.5h11.4a2 2 0 0 0 1.8-3L15 9V2.5",
    "M8 2.5h8",
    "M7.5 14.5h9",
  ],
  "public-relations": [
    "M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z",
    "M19 10v1a7 7 0 0 1-14 0v-1",
    "M12 18v4M8.5 22h7",
  ],
  procurement: [
    "M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
    "M1.5 2.5h3.5l2.7 12.4a2 2 0 0 0 2 1.6h9a2 2 0 0 0 2-1.6L22.5 7H6",
  ],
  "quality-control": ["M22 11.1V12a10 10 0 1 1-5.9-9.1", "M22 4.5L12 14.5l-3-3"],
  "real-estate": ["M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9.5 22V13h5v9"],
  sales: [
    "M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-8-8V3.5h9.2l8.8 8.7a2 2 0 0 1 0 1.2z",
    "M7.5 8h.01",
  ],
  telecommunications: ["M5.5 12.5a9 9 0 0 1 13 0", "M8.5 16a5 5 0 0 1 7 0", "M2.5 9a14 14 0 0 1 19 0", "M12 19.5h.01"],
};

export const defaultCategoryIcon = ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M2 12h20"];

export function iconFor(slug: string): string[] {
  return categoryIcons[slug] ?? defaultCategoryIcon;
}
