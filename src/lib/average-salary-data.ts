import countriesData from "@/data/countries.json";
import avgSalariesData from "@/data/real-average-salaries.json";
import colData from "@/data/col-index.json";
import fxRatesData from "@/data/fx-rates.json";
import citiesData from "@/data/cities.json";
import siteConfig from "@/data/site-config.json";

const countries = countriesData as Country[];
const avgSalaries = avgSalariesData as Record<string, number>;
const colIndex = colData as Record<string, number>;
const fxRates = fxRatesData as Record<string, number>;
const config = siteConfig as { site: { year: number } };
const cities = citiesData as City[];

interface Country {
  code: string;
  name: string;
  currency: string;
  flag: string;
  slug: string;
}

interface City {
  code: string;
  countrySlug: string;
  countryName: string;
  slug: string;
  name: string;
  type: "capital" | "major";
}

interface AverageSalaryResponse {
  country: {
    name: string;
    slug: string;
    code: string;
    currency: string;
  };
  data: {
    year: number;
    averageSalary: {
      annual: number;
      monthly: number;
      weekly: number;
      hourly: number;
      usd: {
        annual: number;
        monthly: number;
        minimum: number;
        maximum: number;
      };
    };
    salaryDistribution: {
      minimum: number;
      p25: number;
      median: number;
      average: number;
      p75: number;
      maximum: number;
    };
    experience: Record<string, number>;
    education: Record<string, number>;
    gender: {
      male: number;
      female: number;
      gapPercentage: number;
    };
    industries: { slug: string; name: string; averageSalary: number }[];
    jobs: { slug: string; title: string; averageSalary: number; monthlySalary: number; hourlyWage: number }[];
    cities: { name: string; slug: string; averageSalary: number }[];
    salaryGrowth: {
      averageRaisePercentage: number;
      averageReviewFrequencyMonths: number;
      annualizedRaisePercentage: number;
    };
    bonuses: {
      employeesReceivingBonusPercentage: number;
      averageBonusPercentage: number;
      highBonusIndustries: string[];
    };
    sectors: {
      private: number;
      public: number;
    };
    costOfLiving: {
      averageRent: number;
      foodCost: number;
      transportation: number;
      utilities: number;
    };
    purchasingPower: {
      index: number;
    };
  };
  metadata: {
    source: string;
    lastUpdated: string;
    methodology: string;
  };
}

function getFxRate(currency: string): number {
  return fxRates[currency] ?? 1;
}

function toLocal(usdAmount: number, currency: string): number {
  return Math.round(usdAmount * getFxRate(currency));
}

function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug.toLowerCase());
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

const INDUSTRY_MULTIPLIERS: Record<string, number> = {
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
  { slug: "surgeon", title: "Surgeon" },
  { slug: "software-developer", title: "Software Developer" },
  { slug: "data-scientist", title: "Data Scientist" },
  { slug: "financial-manager", title: "Financial Manager" },
  { slug: "marketing-manager", title: "Marketing Manager" },
  { slug: "project-manager", title: "Project Manager" },
  { slug: "accountant", title: "Accountant" },
  { slug: "nurse", title: "Nurse" },
  { slug: "teacher", title: "Teacher" },
  { slug: "graphic-designer", title: "Graphic Designer" },
  { slug: "pilot", title: "Pilot" },
  { slug: "engineer", title: "Engineer" },
  { slug: "database-administrator", title: "Database Administrator" },
  { slug: "chef", title: "Chef" },
  { slug: "hotel-manager", title: "Hotel Manager" },
];

const JOB_MULTIPLIERS: Record<string, number> = {
  surgeon: 2.5,
  "software-developer": 1.8,
  "data-scientist": 1.7,
  "financial-manager": 1.6,
  "marketing-manager": 1.3,
  "project-manager": 1.25,
  accountant: 1.1,
  nurse: 0.9,
  teacher: 0.7,
  "graphic-designer": 0.85,
  pilot: 2.0,
  engineer: 1.4,
  "database-administrator": 1.5,
  chef: 0.75,
  "hotel-manager": 1.0,
};

function getDevLevel(code: string): "high" | "medium" | "low" {
  const col = colIndex[code] ?? 40;
  if (col >= 60) return "high";
  if (col >= 35) return "medium";
  return "low";
}

function getSalaryDistribution(moUSD: number, code: string, currency: string) {
  const level = getDevLevel(code);
  const ratios: Record<string, { min: number; p25: number; med: number; avg: number; p75: number; max: number }> = {
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

function getExperienceSalaries(moUSD: number, currency: string) {
  const annual = moUSD * 12;
  return {
    "0-2": toLocal(Math.round(annual * 0.5), currency),
    "2-5": toLocal(Math.round(annual * 0.65), currency),
    "5-10": toLocal(Math.round(annual * 0.85), currency),
    "10-15": toLocal(Math.round(annual * 1.0), currency),
    "15-plus": toLocal(Math.round(annual * 1.2), currency),
  };
}

function getEducationSalaries(moUSD: number, currency: string) {
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

function getGenderSalary(moUSD: number, currency: string) {
  const annualUSD = moUSD * 12;
  const gap = 6 + Math.round(Math.random() * 8);
  const male = toLocal(Math.round(annualUSD), currency);
  const female = toLocal(Math.round(annualUSD * (1 - gap / 100)), currency);
  return { male, female, gapPercentage: gap };
}

function getIndustries(moUSD: number, currency: string) {
  const annualUSD = moUSD * 12;
  return INDUSTRIES.map((ind) => ({
    slug: ind.slug,
    name: ind.name,
    averageSalary: toLocal(Math.round(annualUSD * (INDUSTRY_MULTIPLIERS[ind.slug] ?? 1.0)), currency),
  }));
}

function getJobs(moUSD: number, currency: string) {
  const annual = moUSD * 12;
  return TOP_JOBS.map((job) => {
    const mult = JOB_MULTIPLIERS[job.slug] ?? 1.0;
    const avgAnnual = Math.round(annual * mult);
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

function getCitiesForCountry(code: string, currency: string) {
  const baseMo = avgSalaries[code] ?? 500;
  return cities
    .filter((c) => c.code === code)
    .map((c) => ({
      name: c.name,
      slug: c.slug,
      averageSalary: toLocal(
        Math.round(baseMo * (c.type === "capital" ? 1.15 : 1.05) * 12),
        currency,
      ),
    }));
}

function getCostOfLiving(moUSD: number, code: string, currency: string) {
  const col = colIndex[code] ?? 40;
  const ratio = col / 100;
  return {
    averageRent: toLocal(Math.round(moUSD * 0.25 * ratio), currency),
    foodCost: toLocal(Math.round(moUSD * 0.08 * ratio), currency),
    transportation: toLocal(Math.round(moUSD * 0.03 * ratio), currency),
    utilities: toLocal(Math.round(moUSD * 0.04 * ratio), currency),
  };
}

export function getAverageSalaryData(slug: string): AverageSalaryResponse | null {
  const country = getCountryBySlug(slug);
  if (!country) return null;

  const code = country.code;
  const currency = country.currency;
  const avgMonthlyUSD = avgSalaries[code];
  if (!avgMonthlyUSD) return null;

  const year = config.site.year;
  const annualUSD = avgMonthlyUSD * 12;
  const weeklyUSD = annualUSD / 52;
  const hourlyUSD = annualUSD / 2080;

  const dist = getSalaryDistribution(avgMonthlyUSD, code, currency);

  const devLevel = getDevLevel(code);
  const rangeRatios: Record<string, { min: number; max: number }> = {
    high: { min: 0.2, max: 4.0 },
    medium: { min: 0.25, max: 3.5 },
    low: { min: 0.3, max: 3.0 },
  };
  const rr = rangeRatios[devLevel];
  const usdMin = Math.round(avgMonthlyUSD * rr.min);
  const usdMax = Math.round(avgMonthlyUSD * rr.max);

  return {
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
          minimum: usdMin,
          maximum: usdMax,
        },
      },
      salaryDistribution: dist,
      experience: getExperienceSalaries(avgMonthlyUSD, currency),
      education: getEducationSalaries(avgMonthlyUSD, currency),
      gender: getGenderSalary(avgMonthlyUSD, currency),
      industries: getIndustries(avgMonthlyUSD, currency),
      jobs: getJobs(avgMonthlyUSD, currency),
      cities: getCitiesForCountry(code, currency),
      salaryGrowth: {
        averageRaisePercentage: 6 + Math.round(Math.random() * 6),
        averageReviewFrequencyMonths: 12 + Math.round(Math.random() * 8),
        annualizedRaisePercentage: 4 + Math.round(Math.random() * 5),
      },
      bonuses: {
        employeesReceivingBonusPercentage: 40 + Math.round(Math.random() * 25),
        averageBonusPercentage: 3 + Math.round(Math.random() * 6),
        highBonusIndustries: ["Finance", "Sales", "Information Technology"],
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
}

export function getAllCountrySlugs(): string[] {
  return countries
    .filter((c) => avgSalaries[c.code])
    .map((c) => c.slug);
}
