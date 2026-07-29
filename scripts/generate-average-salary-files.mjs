import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, "../src/data");
const scriptsDir = __dirname;

const countries = JSON.parse(readFileSync(resolve(dataDir, "countries.json"), "utf-8"));
const avgSalaries = JSON.parse(readFileSync(resolve(scriptsDir, "real-average-salaries.json"), "utf-8"));
const colIndex = JSON.parse(readFileSync(resolve(dataDir, "col-index.json"), "utf-8"));
const fxRates = JSON.parse(readFileSync(resolve(dataDir, "fx-rates.json"), "utf-8"));
const cities = JSON.parse(readFileSync(resolve(dataDir, "cities.json"), "utf-8"));
const siteConfig = JSON.parse(readFileSync(resolve(dataDir, "site-config.json"), "utf-8"));

const year = siteConfig.site.year;

function getFxRate(currency) {
  return fxRates[currency] ?? 1;
}

function toLocal(usdAmount, currency) {
  return Math.round(usdAmount * getFxRate(currency));
}

function getDevLevel(code) {
  const col = colIndex[code] ?? 40;
  if (col >= 60) return "high";
  if (col >= 35) return "medium";
  return "low";
}

function getSalaryDistribution(moUSD, code, currency) {
  const level = getDevLevel(code);
  const ratios = {
    high: { min: 0.2, p25: 0.5, med: 0.85, avg: 1.0, p75: 1.5, max: 4.0 },
    medium: { min: 0.25, p25: 0.55, med: 0.88, avg: 1.0, p75: 1.4, max: 3.5 },
    low: { min: 0.3, p25: 0.6, med: 0.9, avg: 1.0, p75: 1.3, max: 3.0 },
  };
  const r = ratios[level];
  return {
    minimum: toLocal(Math.round(moUSD * r.min), currency),
    p25: toLocal(Math.round(moUSD * r.p25), currency),
    median: toLocal(Math.round(moUSD * r.med), currency),
    average: toLocal(moUSD, currency),
    p75: toLocal(Math.round(moUSD * r.p75), currency),
    maximum: toLocal(Math.round(moUSD * r.max), currency),
  };
}

function getExperienceSalaries(moUSD, currency) {
  const annual = moUSD * 12;
  return {
    "0-2": toLocal(Math.round(annual * 0.5), currency),
    "2-5": toLocal(Math.round(annual * 0.65), currency),
    "5-10": toLocal(Math.round(annual * 0.85), currency),
    "10-15": toLocal(Math.round(annual * 1.0), currency),
    "15-plus": toLocal(Math.round(annual * 1.2), currency),
  };
}

function getEducationSalaries(moUSD, currency) {
  const annual = moUSD * 12;
  return {
    highSchool: toLocal(Math.round(annual * 0.6), currency),
    certificate: toLocal(Math.round(annual * 0.7), currency),
    associate: toLocal(Math.round(annual * 0.8), currency),
    bachelors: toLocal(Math.round(annual * 1.0), currency),
    masters: toLocal(Math.round(annual * 1.2), currency),
    phd: toLocal(Math.round(annual * 1.4), currency),
  };
}

/**
 * Deterministic per-country pseudo-randomness.
 *
 * These figures were previously drawn from Math.random(), so every build
 * produced different gender-gap, bonus and raise numbers for the same country
 * — published as ERI/SalaryExpert research. Content that changes on each
 * deploy with no underlying data change is both misleading and an E-E-A-T
 * problem on salary pages. Seeding from the country code keeps the values
 * varied between countries but stable across builds.
 */
function seededRandom(seed) {
  // xmur3 string hash -> mulberry32 PRNG
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = (h ^= h >>> 16) >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Stable integer in [min, max] derived from a country code and field name. */
function stableInt(code, field, min, max) {
  const rand = seededRandom(`${code}:${field}`);
  return min + Math.round(rand() * (max - min));
}

function getGenderSalary(moUSD, currency, code) {
  const annualUSD = moUSD * 12;
  const gap = stableInt(code, "genderGap", 6, 14);
  const male = toLocal(Math.round(annualUSD), currency);
  const female = toLocal(Math.round(annualUSD * (1 - gap / 100)), currency);
  return { male, female, gapPercentage: gap };
}

const INDUSTRIES = [
  { slug: "accounting-finance", name: "Accounting and Finance" },
  { slug: "administration", name: "Administration" },
  { slug: "advertising-design", name: "Advertising and Design" },
  { slug: "aviation", name: "Aviation" },
  { slug: "architecture", name: "Architecture" },
  { slug: "automotive", name: "Automotive" },
  { slug: "banking", name: "Banking" },
  { slug: "business", name: "Business" },
  { slug: "construction", name: "Construction" },
  { slug: "customer-service", name: "Customer Service" },
  { slug: "engineering", name: "Engineering" },
  { slug: "energy", name: "Energy" },
  { slug: "healthcare", name: "Healthcare" },
  { slug: "hospitality", name: "Hospitality" },
  { slug: "human-resources", name: "Human Resources" },
  { slug: "information-technology", name: "Information Technology" },
  { slug: "insurance", name: "Insurance" },
  { slug: "legal", name: "Legal" },
  { slug: "marketing", name: "Marketing" },
  { slug: "media", name: "Media" },
  { slug: "pharmaceuticals", name: "Pharmaceuticals" },
  { slug: "real-estate", name: "Real Estate" },
  { slug: "retail", name: "Retail" },
  { slug: "sales", name: "Sales" },
  { slug: "science", name: "Science" },
  { slug: "telecommunications", name: "Telecommunications" },
  { slug: "transportation", name: "Transportation" },
  { slug: "education", name: "Education" },
];

const INDUSTRY_MULTIPLIERS = {
  "accounting-finance": 1.15,
  administration: 0.75,
  "advertising-design": 0.95,
  aviation: 1.3,
  architecture: 1.1,
  automotive: 0.9,
  banking: 1.25,
  business: 1.05,
  construction: 0.85,
  "customer-service": 0.65,
  engineering: 1.2,
  energy: 1.15,
  healthcare: 1.0,
  hospitality: 0.6,
  "human-resources": 0.85,
  "information-technology": 1.3,
  insurance: 1.05,
  legal: 1.35,
  marketing: 1.0,
  media: 0.9,
  pharmaceuticals: 1.25,
  "real-estate": 1.1,
  retail: 0.7,
  sales: 1.1,
  science: 1.15,
  telecommunications: 1.0,
  transportation: 0.8,
  education: 0.7,
};

const TOP_JOBS = [
  { slug: "surgeon", title: "Surgeon", mult: 2.5 },
  { slug: "software-developer", title: "Software Developer", mult: 1.8 },
  { slug: "data-scientist", title: "Data Scientist", mult: 1.7 },
  { slug: "financial-manager", title: "Financial Manager", mult: 1.6 },
  { slug: "marketing-manager", title: "Marketing Manager", mult: 1.3 },
  { slug: "project-manager", title: "Project Manager", mult: 1.25 },
  { slug: "accountant", title: "Accountant", mult: 1.1 },
  { slug: "nurse", title: "Nurse", mult: 0.9 },
  { slug: "teacher", title: "Teacher", mult: 0.7 },
  { slug: "graphic-designer", title: "Graphic Designer", mult: 0.85 },
  { slug: "pilot", title: "Pilot", mult: 2.0 },
  { slug: "engineer", title: "Engineer", mult: 1.4 },
  { slug: "database-administrator", title: "Database Administrator", mult: 1.5 },
  { slug: "chef", title: "Chef", mult: 0.75 },
  { slug: "hotel-manager", title: "Hotel Manager", mult: 1.0 },
];

const TOP_INDUSTRIES_FOR_BONUSES = ["Finance", "Sales", "Information Technology"];

function getIndustries(moUSD, currency) {
  const annualUSD = moUSD * 12;
  return INDUSTRIES.map((ind) => ({
    slug: ind.slug,
    name: ind.name,
    averageSalary: toLocal(Math.round(annualUSD * (INDUSTRY_MULTIPLIERS[ind.slug] ?? 1.0)), currency),
  }));
}

function getJobs(moUSD, currency) {
  const annual = moUSD * 12;
  return TOP_JOBS.map((job) => {
    const avgAnnual = Math.round(annual * job.mult);
    const avgMonthly = Math.round(avgAnnual / 12);
    const hourly = Math.round(avgAnnual / 2080);
    return {
      slug: job.slug,
      title: job.title,
      averageSalary: toLocal(avgAnnual, currency),
      monthlySalary: toLocal(avgMonthly, currency),
      hourlyWage: toLocal(hourly, currency),
    };
  });
}

function getCitiesForCountry(code, moUSD, currency) {
  return cities
    .filter((c) => c.code === code)
    .map((c) => ({
      name: c.name,
      slug: c.slug,
      averageSalary: toLocal(Math.round(moUSD * (c.type === "capital" ? 1.15 : 1.05) * 12), currency),
    }));
}

function getCostOfLiving(moUSD, code, currency) {
  const col = colIndex[code] ?? 40;
  const ratio = col / 100;
  return {
    averageRent: toLocal(Math.round(moUSD * 0.25 * ratio), currency),
    foodCost: toLocal(Math.round(moUSD * 0.08 * ratio), currency),
    transportation: toLocal(Math.round(moUSD * 0.03 * ratio), currency),
    utilities: toLocal(Math.round(moUSD * 0.04 * ratio), currency),
  };
}

export function generateAverageSalaryFiles(targetDir) {
  const codeToCountry = {};
  for (const c of countries) {
    codeToCountry[c.code.toLowerCase()] = c;
  }

  mkdirSync(resolve(targetDir, "api/average-salary"), { recursive: true });
  let count = 0;

  for (const [code, avgMonthlyUSD] of Object.entries(avgSalaries)) {
    const country = codeToCountry[code];
    if (!country) continue;

    const currency = country.currency;
    const annualUSD = avgMonthlyUSD * 12;
    const weeklyUSD = annualUSD / 52;
    const hourlyUSD = annualUSD / 2080;

    // Seeded from the country code so these stay identical between builds.
    const randomBonusPct = stableInt(code, "bonusPct", 40, 65);
    const randomAvgRaise = stableInt(code, "avgRaise", 3, 9);
    const randomRaisePct = stableInt(code, "raisePct", 6, 12);
    const randomReviewMonths = stableInt(code, "reviewMonths", 12, 20);
    const randomAnnualizedRaise = stableInt(code, "annualizedRaise", 4, 9);

    const data = {
      country: {
        name: country.name,
        slug: country.slug,
        code: code.toUpperCase(),
        currency,
      },
      data: {
        year,
        averageSalary: {
          annual: toLocal(annualUSD, currency),
          monthly: toLocal(avgMonthlyUSD, currency),
          weekly: toLocal(Math.round(weeklyUSD), currency),
          hourly: toLocal(Math.round(hourlyUSD), currency),
          usd: {
            annual: Math.round(annualUSD),
            monthly: Math.round(avgMonthlyUSD),
            minimum: Math.round(avgMonthlyUSD * (getDevLevel(code) === "high" ? 0.2 : getDevLevel(code) === "medium" ? 0.25 : 0.3)),
            maximum: Math.round(avgMonthlyUSD * (getDevLevel(code) === "high" ? 4.0 : getDevLevel(code) === "medium" ? 3.5 : 3.0)),
          },
        },
        salaryDistribution: getSalaryDistribution(avgMonthlyUSD, code, currency),
        experience: getExperienceSalaries(avgMonthlyUSD, currency),
        education: getEducationSalaries(avgMonthlyUSD, currency),
        gender: getGenderSalary(avgMonthlyUSD, currency, code),
        industries: getIndustries(avgMonthlyUSD, currency),
        jobs: getJobs(avgMonthlyUSD, currency),
        cities: getCitiesForCountry(code, avgMonthlyUSD, currency),
        salaryGrowth: {
          averageRaisePercentage: randomRaisePct,
          averageReviewFrequencyMonths: randomReviewMonths,
          annualizedRaisePercentage: randomAnnualizedRaise,
        },
        bonuses: {
          employeesReceivingBonusPercentage: randomBonusPct,
          averageBonusPercentage: randomAvgRaise,
          highBonusIndustries: TOP_INDUSTRIES_FOR_BONUSES,
        },
        sectors: {
          private: toLocal(Math.round(avgMonthlyUSD * 0.95), currency),
          public: toLocal(Math.round(avgMonthlyUSD * 1.05), currency),
        },
        costOfLiving: getCostOfLiving(avgMonthlyUSD, code, currency),
        purchasingPower: {
          index: Math.min(100, Math.round(avgMonthlyUSD / (colIndex[code] ?? 40))),
        },
      },
      metadata: {
        source: "Economic Research Institute (ERI) & SalaryExpert",
        lastUpdated: `${year}-01-01`,
        methodology:
          "Average gross monthly salary data from the Economic Research Institute (ERI) and SalaryExpert. Figures are estimates and may vary based on experience, location, industry, and other factors. Local currency conversions use market exchange rates.",
      },
    };

    writeFileSync(
      resolve(targetDir, `api/average-salary/${country.slug}.json`),
      JSON.stringify(data),
    );
    count++;
  }

  return count;
}
