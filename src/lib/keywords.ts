/**
 * Dynamic keyword generation.
 *
 * Every set is built from the page's own data (country, currency, year, real
 * job titles, category names) rather than a fixed list, so no two pages ship
 * the same keywords. Phrases follow the query patterns people actually type —
 * "highest paying jobs in X", "average salary in X per month" — rather than
 * single words, which nothing searches for.
 *
 * Note on impact: Google has ignored the meta keywords tag for ranking since
 * 2009. These help mildly with Bing/Yandex and, more usefully, they keep a
 * canonical list of target phrases in one place — the same phrases are what
 * titles, headings and opening paragraphs should use, and those do rank.
 */

const dedupe = (list: string[]) => [
  ...new Set(
    list.map((k) => k.replace(/\s+/g, " ").trim().toLowerCase()).filter(Boolean)
  ),
];

/** Country salary pages — 16 phrases, all derived from the page's own data. */
export function countryKeywords(opts: {
  country: string;
  year: number;
  currency: string;
  topJobs?: string[];
  categories?: string[];
}): string[] {
  const { country, year, currency, topJobs = [], categories = [] } = opts;
  const top = topJobs.slice(0, 3);

  return dedupe([
    `best paying jobs in ${country}`,
    `highest paying jobs in ${country}`,
    `highest paying jobs in ${country} ${year}`,
    `top 10 highest paying jobs in ${country}`,
    `average salary in ${country}`,
    `${country} salary`,
    `salary in ${country} per month`,
    `${country} monthly salary`,
    `highest salary job in ${country}`,
    `best career options in ${country}`,
    `${country} job market ${year}`,
    `well paid jobs in ${country}`,
    `${currency} salary ${country}`,
    ...top.map((j) => `${j} salary in ${country}`),
    ...categories.slice(0, 2).map((cat) => `${cat} jobs in ${country}`),
  ]);
}

/** Career category pages — 12+ phrases keyed on the category name. */
export function categoryKeywords(opts: {
  category: string;
  year: number;
  topCountries?: string[];
  topJobs?: string[];
}): string[] {
  const { category, year, topCountries = [], topJobs = [] } = opts;
  const cat = category.toLowerCase();

  return dedupe([
    `highest paying ${cat} jobs`,
    `best paying jobs in ${cat}`,
    `${cat} salary`,
    `${cat} salary ${year}`,
    `average ${cat} salary`,
    `${cat} careers`,
    `top ${cat} jobs`,
    `${cat} jobs by country`,
    `how much do ${cat} jobs pay`,
    `${cat} salary comparison`,
    `best countries for ${cat} jobs`,
    `${cat} job salaries worldwide`,
    ...topJobs.slice(0, 3).map((j) => `${j} salary`),
    ...topCountries.slice(0, 2).map((c) => `${cat} salary in ${c}`),
  ]);
}

/** Average-salary country pages. */
export function averageSalaryKeywords(opts: {
  country: string;
  year: number;
  currency: string;
}): string[] {
  const { country, year, currency } = opts;

  return dedupe([
    `average salary in ${country}`,
    `average salary in ${country} ${year}`,
    `${country} average income`,
    `median salary in ${country}`,
    `${country} monthly salary average`,
    `${country} annual salary`,
    `average wage in ${country}`,
    `salary by experience in ${country}`,
    `salary by education in ${country}`,
    `gender pay gap in ${country}`,
    `${currency} average salary`,
    `what is a good salary in ${country}`,
    `${country} salary distribution`,
    `${country} cost of living and salary`,
  ]);
}

/** Cost-of-living country pages. */
export function costOfLivingKeywords(opts: { country: string; year: number }): string[] {
  const { country, year } = opts;

  return dedupe([
    `cost of living in ${country}`,
    `cost of living in ${country} ${year}`,
    `${country} living expenses`,
    `is ${country} expensive`,
    `rent prices in ${country}`,
    `${country} salary vs cost of living`,
    `how much money do you need to live in ${country}`,
    `${country} monthly expenses`,
    `moving to ${country} cost`,
    `${country} purchasing power`,
    `average rent in ${country}`,
    `living costs ${country} ${year}`,
  ]);
}

/** Take-home pay / salary-after-tax country pages. */
export function takeHomePayKeywords(opts: {
  country: string;
  year: number;
  currency: string;
}): string[] {
  const { country, year, currency } = opts;

  return dedupe([
    `take home pay ${country}`,
    `salary after tax ${country}`,
    `${country} net salary calculator`,
    `${country} income tax on salary`,
    `how much tax do i pay in ${country}`,
    `${country} salary calculator ${year}`,
    `gross to net salary ${country}`,
    `${country} tax rates ${year}`,
    `net pay ${currency}`,
    `${country} payroll deductions`,
    `social security contributions ${country}`,
    `what is my take home pay in ${country}`,
  ]);
}

/** City salary pages. */
export function cityKeywords(opts: {
  city: string;
  country: string;
  year: number;
}): string[] {
  const { city, country, year } = opts;

  return dedupe([
    `salary in ${city}`,
    `average salary in ${city}`,
    `${city} salary ${year}`,
    `highest paying jobs in ${city}`,
    `jobs in ${city} ${country}`,
    `${city} cost of living and salary`,
    `${city} average income`,
    `best paying jobs ${city}`,
    `${city} monthly salary`,
    `working in ${city} ${country}`,
    `${city} job market`,
    `is ${city} a good place to work`,
  ]);
}

/** Part-time job country pages. */
export function partTimeKeywords(opts: { country: string; year: number }): string[] {
  const { country, year } = opts;

  return dedupe([
    `part time jobs in ${country}`,
    `part time jobs in ${country} ${year}`,
    `part time jobs for students in ${country}`,
    `${country} part time salary`,
    `best part time jobs in ${country}`,
    `weekend jobs in ${country}`,
    `student jobs in ${country}`,
    `part time work ${country}`,
    `how much do part time jobs pay in ${country}`,
    `flexible jobs in ${country}`,
    `evening jobs in ${country}`,
    `${country} hourly pay part time`,
  ]);
}

/** Earn-money-online country pages. */
export function earnOnlineKeywords(opts: { country: string; year: number }): string[] {
  const { country, year } = opts;

  return dedupe([
    `earn money online in ${country}`,
    `how to make money online in ${country}`,
    `online jobs in ${country}`,
    `work from home jobs in ${country}`,
    `freelance jobs in ${country}`,
    `earn money online ${country} ${year}`,
    `online income in ${country}`,
    `remote jobs in ${country}`,
    `side hustle in ${country}`,
    `make money from home ${country}`,
    `best online earning platforms in ${country}`,
    `passive income in ${country}`,
  ]);
}

/** Blog articles — derived from title, category and a few salient terms. */
export function blogKeywords(opts: {
  title: string;
  category: string;
  year: number;
  terms?: string[];
}): string[] {
  const { title, category, year, terms = [] } = opts;
  // Strip punctuation, then collapse the gaps it leaves (an em-dash between
  // words would otherwise produce a double space inside the phrase).
  const t = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const cat = category.toLowerCase();

  return dedupe([
    t,
    `${t} ${year}`,
    cat,
    `${cat} tips`,
    `${cat} guide ${year}`,
    "career advice",
    "salary guide",
    "how to increase salary",
    "job search tips",
    "salary negotiation",
    "career development",
    "how much should i be paid",
    ...terms.slice(0, 4),
  ]);
}
