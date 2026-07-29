import { getCountries, getCountryJobs, getCategories } from "@/lib/db";
import colData from "@/data/col-index.json";
import avgData from "@/data/real-average-salaries.json";
import fxData from "@/data/fx-rates.json";

const colIndex = colData as Record<string, number>;
/** Average monthly salary in USD, per country code. */
const avgMonthlyUSD = avgData as Record<string, number>;
const fxRates = fxData as Record<string, number>;

/**
 * Compact payload for the client-side comparison tool.
 *
 * Every country is generated from the same baseline, so all 195 share an
 * identical top-10 job list. Titles are therefore sent once and each country
 * carries only its figures — that keeps the bundle to a fraction of what a
 * naive per-country array of job objects would cost.
 */
export interface CompareCountry {
  /** ISO code */
  c: string;
  /** name */
  n: string;
  /** slug */
  s: string;
  /** currency code */
  cur: string;
  /** cost of living index, US = 100 */
  col: number;
  /** average monthly salary, USD */
  avg: number;
  /** FX rate: 1 USD -> this many units of `cur` */
  fx: number;
  /** [min, max] monthly pay in local currency, aligned to the shared titles */
  j: [number, number][];
}

export interface CompareCategory {
  slug: string;
  name: string;
}

export interface ComparePayload {
  titles: string[];
  countries: CompareCountry[];
  categories: CompareCategory[];
}

/**
 * Shape of /api/jobs/{slug}.json, fetched on demand by the comparison tool.
 * The full per-country job set is 310 roles across 31 categories; embedding
 * that for all 195 countries would be roughly a megabyte, so the client pulls
 * only the two countries actually being compared.
 */
export interface CountryJobsApi {
  currency: string;
  jobs: Record<
    string,
    { rank: number; title: string; salaryMin: number; salaryMax: number }[]
  >;
}

export function buildComparePayload(): ComparePayload {
  const countries = getCountries();
  let titles: string[] = [];

  const rows: CompareCountry[] = [];

  for (const country of countries) {
    const data = getCountryJobs(country.code);
    if (!data) continue;

    if (titles.length === 0) titles = data.top10.map((j) => j.title);

    rows.push({
      c: country.code,
      n: country.name,
      s: country.slug,
      cur: data.currency ?? country.currency,
      col: colIndex[country.code] ?? 0,
      avg: avgMonthlyUSD[country.code] ?? 0,
      fx: fxRates[data.currency ?? country.currency] ?? 1,
      j: data.top10.map((j) => [j.salaryMin, j.salaryMax] as [number, number]),
    });
  }

  return {
    titles,
    countries: rows,
    categories: getCategories().map((c) => ({ slug: c.slug, name: c.name })),
  };
}
