import data from "@/data/earn-money-online.json";
import fxRatesData from "@/data/fx-rates.json";
import colData from "@/data/col-index.json";

const fxRates = fxRatesData as Record<string, number>;
const colIndex = colData as Record<string, number>;

export interface EarnMoneyMethod {
  rank: number;
  title: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeToFirstPayout: string;
  timeToFullIncome: string;
  skills: string[];
  platforms: string[];
  hourlyRate: number;
  potentialMin: number;
  potentialMax: number;
  description: string;
  pros: string[];
  cons: string[];
}

interface EarnMoneyMethodDef {
  rank: number;
  title: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeToFirstPayout: string;
  timeToFullIncome: string;
  skills: string[];
  platforms: string[];
  multiplier: number;
  potentialMinMultiplier: number;
  potentialMaxMultiplier: number;
  description: string;
  pros: string[];
  cons: string[];
}

interface EarnMoneyConfig {
  baseUsdHourly: number;
  usColIndex: number;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  sectionTitle: string;
  sectionSubtitle: string;
  breadcrumbLabel: string;
}

interface EarnMoneyData {
  config: EarnMoneyConfig;
  methods: EarnMoneyMethodDef[];
}

const emData = data as unknown as EarnMoneyData;
const cfg = emData.config;

export function getConfig() {
  return cfg;
}

export function getEarnMoneyMethods(
  countryCode: string,
  currency: string
): EarnMoneyMethod[] {
  const col = colIndex[countryCode.toLowerCase()];
  if (!col) return [];

  const fxRate = fxRates[currency];
  if (!fxRate) return [];

  const colFactor = col / cfg.usColIndex;
  const baseLocal = Math.round(cfg.baseUsdHourly * colFactor * fxRate);

  return emData.methods.map((method) => ({
    rank: method.rank,
    title: method.title,
    category: method.category,
    difficulty: method.difficulty,
    timeToFirstPayout: method.timeToFirstPayout,
    timeToFullIncome: method.timeToFullIncome,
    skills: method.skills,
    platforms: method.platforms,
    hourlyRate: Math.round(baseLocal * method.multiplier),
    potentialMin: Math.round(baseLocal * method.potentialMinMultiplier),
    potentialMax: Math.round(baseLocal * method.potentialMaxMultiplier),
    description: method.description,
    pros: method.pros,
    cons: method.cons,
  }));
}

export function getEarnMoneyMethodByRank(
  countryCode: string,
  currency: string,
  rank: number
): EarnMoneyMethod | undefined {
  return getEarnMoneyMethods(countryCode, currency).find(
    (m) => m.rank === rank
  );
}