/**
 * Structured data builders.
 *
 * Salary pages must use schema.org `Occupation`, not `JobPosting`. JobPosting
 * describes a specific open vacancy and Google requires datePosted,
 * validThrough, hiringOrganization and identifier on it — marking up salary
 * aggregates as JobPosting breaks those guidelines and risks a structured data
 * manual action. `Occupation` is the type Google reads for salary rich results.
 *
 * https://developers.google.com/search/docs/appearance/structured-data/occupation
 */

export interface OccupationInput {
  title: string;
  description?: string;
  salaryMin: number;
  salaryMax: number;
}

/**
 * `unitText` follows what the page states visibly. If the stored figures are
 * ever reinterpreted (see formatAnnual in lib/salary), this must move with them
 * — structured data that contradicts the visible page is a guidelines breach.
 */
export function occupationSchema(
  job: OccupationInput,
  currency: string,
  countryName: string,
  unitText: "YEAR" | "MONTH" = "YEAR"
) {
  return {
    "@type": "Occupation",
    name: job.title,
    ...(job.description ? { description: job.description } : {}),
    occupationLocation: {
      "@type": "Country",
      name: countryName,
    },
    estimatedSalary: {
      "@type": "MonetaryAmount",
      currency,
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salaryMin,
        maxValue: job.salaryMax,
        unitText,
      },
    },
  };
}

/** ItemList of occupations — the salary equivalent of a ranked results list. */
export function occupationListSchema(
  jobs: (OccupationInput & { rank?: number })[],
  currency: string,
  countryName: string,
  unitText: "YEAR" | "MONTH" = "YEAR"
) {
  return {
    "@type": "ItemList",
    name: `Highest paying jobs in ${countryName}`,
    numberOfItems: jobs.length,
    itemListElement: jobs.map((job, i) => ({
      "@type": "ListItem",
      position: job.rank ?? i + 1,
      item: occupationSchema(job, currency, countryName, unitText),
    })),
  };
}

export interface FaqEntry {
  q: string;
  a: string;
}

/**
 * Build a FAQPage from the same array the page renders, so the markup can never
 * drift from the visible questions — Google requires them to match.
 */
export function faqPageSchema(entries: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.q,
      acceptedAnswer: { "@type": "Answer", text: e.a },
    })),
  };
}
