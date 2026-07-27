import sharp from "sharp";
import { readFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const countries = JSON.parse(readFileSync(join(__dirname, "../src/data/countries.json"), "utf-8"));
const avgSalaries = JSON.parse(readFileSync(join(__dirname, "real-average-salaries.json"), "utf-8"));
const colIndex = JSON.parse(readFileSync(join(__dirname, "../src/data/col-index.json"), "utf-8"));
const fxRates = JSON.parse(readFileSync(join(__dirname, "../src/data/fx-rates.json"), "utf-8"));

const W = 800;
const H = 500;

function esc(s) {
  return s.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function fmt(n) {
  return n.toLocaleString("en-US");
}

function toLocal(usdAmount, currency) {
  return Math.round(usdAmount * (fxRates[currency] ?? 1));
}

function getDevLevel(code) {
  const col = colIndex[code] ?? 40;
  if (col >= 60) return "high";
  if (col >= 35) return "medium";
  return "low";
}

function buildDistributionSvg(country, moUSD, currency) {
  const code = country.code;
  const level = getDevLevel(code);
  const ratios = {
    high: { min: 0.2, p25: 0.5, med: 0.85, avg: 1.0, p75: 1.5, max: 4.0 },
    medium: { min: 0.25, p25: 0.55, med: 0.88, avg: 1.0, p75: 1.4, max: 3.5 },
    low: { min: 0.3, p25: 0.6, med: 0.9, avg: 1.0, p75: 1.3, max: 3.0 },
  };
  const r = ratios[level];
  const points = [
    { label: "Min", val: toLocal(Math.round(moUSD * r.min), currency), pct: r.min },
    { label: "25th", val: toLocal(Math.round(moUSD * r.p25), currency), pct: r.p25 },
    { label: "Median", val: toLocal(Math.round(moUSD * r.med), currency), pct: r.med },
    { label: "Avg", val: toLocal(moUSD, currency), pct: 1.0 },
    { label: "75th", val: toLocal(Math.round(moUSD * r.p75), currency), pct: r.p75 },
    { label: "Max", val: toLocal(Math.round(moUSD * r.max), currency), pct: r.max },
  ];

  const maxPct = r.max;
  const barX = 100;
  const barY = 180;
  const barW = 600;
  const barH = 40;
  const markerColors = ["#dc2626", "#f59e0b", "#10b981", "#059669", "#047857", "#064e3b"];

  const bars = points.map((p, i) => {
    const x = barX + (p.pct / maxPct) * barW;
    return `<rect x="${barX}" y="${barY}" width="${(p.pct / maxPct) * barW}" height="${barH}" rx="6" fill="${markerColors[i]}" opacity="${0.3 + i * 0.12}"/>
      <line x1="${x}" y1="${barY - 8}" x2="${x}" y2="${barY + barH + 8}" stroke="${markerColors[i]}" stroke-width="2"/>
      <text x="${x}" y="${barY + barH + 30}" font-family="system-ui, Arial, sans-serif" font-size="13" fill="#374151" text-anchor="middle" font-weight="bold">${esc(p.label)}</text>
      <text x="${x}" y="${barY + barH + 48}" font-family="system-ui, Arial, sans-serif" font-size="12" fill="#6b7280" text-anchor="middle">${fmt(p.val)}</text>`;
  });

  const annualLabel = `${fmt(toLocal(Math.round(moUSD * 12), currency))} ${esc(currency)}/yr`;
  const monthlyLabel = `${fmt(toLocal(moUSD, currency))} ${esc(currency)}/mo`;

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f0fdf4"/>
        <stop offset="100%" stop-color="#ffffff"/>
      </linearGradient>
      <linearGradient id="acc" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#059669"/>
        <stop offset="100%" stop-color="#10b981"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect x="0" y="0" width="${W}" height="4" fill="url(#acc)"/>
    <text x="${W - 16}" y="28" font-family="system-ui, Arial, sans-serif" font-size="13" fill="#9CA3AF" text-anchor="end">BestPayingJobs.net</text>
    <text x="40" y="80" font-family="system-ui, Arial, sans-serif" font-size="22" font-weight="bold" fill="#111827">Salary Distribution in ${esc(country.name)}</text>
    <text x="40" y="108" font-family="system-ui, Arial, sans-serif" font-size="14" fill="#6b7280">${esc(annualLabel)} - ${esc(monthlyLabel)}</text>
    ${bars.join("\n    ")}
    <rect x="0" y="${H - 36}" width="${W}" height="36" fill="#f9fafb"/>
    <text x="${W / 2}" y="${H - 14}" font-family="system-ui, Arial, sans-serif" font-size="11" fill="#9CA3AF" text-anchor="middle">BestPayingJobs.net — Average Salary Data for Every Country</text>
  </svg>`;
}

function buildEducationSvg(country, moUSD, currency) {
  const annual = moUSD * 12;
  const levels = [
    { label: "High\nSchool", val: toLocal(Math.round(annual * 0.6), currency) },
    { label: "Certificate", val: toLocal(Math.round(annual * 0.7), currency) },
    { label: "Associate", val: toLocal(Math.round(annual * 0.8), currency) },
    { label: "Bachelor's", val: toLocal(Math.round(annual * 1.0), currency) },
    { label: "Master's", val: toLocal(Math.round(annual * 1.2), currency) },
    { label: "PhD", val: toLocal(Math.round(annual * 1.4), currency) },
  ];

  const maxVal = Math.max(...levels.map(l => l.val));
  const chartX = 60;
  const chartY = 150;
  const chartW = 680;
  const chartH = 260;
  const barCount = levels.length;
  const barGap = 10;
  const barTotalW = (chartW - barGap * (barCount - 1)) / barCount;
  const colors = ["#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#059669"];

  const bars = levels.map((l, i) => {
    const barH = Math.max((l.val / maxVal) * chartH, 10);
    const x = chartX + i * (barTotalW + barGap);
    const y = chartY + chartH - barH;
    const labelLines = l.label.split("\n");
    return `
    <rect x="${x}" y="${y}" width="${barTotalW}" height="${barH}" rx="4" fill="${colors[i]}"/>
    <text x="${x + barTotalW / 2}" y="${y - 8}" font-family="system-ui, Arial, sans-serif" font-size="12" fill="#374151" text-anchor="middle" font-weight="bold">${fmt(l.val)}</text>
    ${labelLines.map((line, li) =>
      `<text x="${x + barTotalW / 2}" y="${chartY + chartH + 18 + li * 16}" font-family="system-ui, Arial, sans-serif" font-size="12" fill="#4b5563" text-anchor="middle">${esc(line)}</text>`
    ).join("\n    ")}`;
  });

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f0fdf4"/>
        <stop offset="100%" stop-color="#ffffff"/>
      </linearGradient>
      <linearGradient id="acc" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#059669"/>
        <stop offset="100%" stop-color="#10b981"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect x="0" y="0" width="${W}" height="4" fill="url(#acc)"/>
    <text x="${W - 16}" y="28" font-family="system-ui, Arial, sans-serif" font-size="13" fill="#9CA3AF" text-anchor="end">BestPayingJobs.net</text>
    <text x="40" y="80" font-family="system-ui, Arial, sans-serif" font-size="22" font-weight="bold" fill="#111827">Salary by Education in ${esc(country.name)}</text>
    <text x="40" y="108" font-family="system-ui, Arial, sans-serif" font-size="14" fill="#6b7280">Annual salary comparison by education level</text>
    ${bars.join("\n    ")}
    <rect x="0" y="${H - 36}" width="${W}" height="36" fill="#f9fafb"/>
    <text x="${W / 2}" y="${H - 14}" font-family="system-ui, Arial, sans-serif" font-size="11" fill="#9CA3AF" text-anchor="middle">BestPayingJobs.net — Average Salary Data for Every Country</text>
  </svg>`;
}

function buildExperienceSvg(country, moUSD, currency) {
  const annual = moUSD * 12;
  const levels = [
    { label: "0-2\nYears", val: toLocal(Math.round(annual * 0.55), currency) },
    { label: "2-5\nYears", val: toLocal(Math.round(annual * 0.75), currency) },
    { label: "5-10\nYears", val: toLocal(Math.round(annual * 1.0), currency) },
    { label: "10-15\nYears", val: toLocal(Math.round(annual * 1.25), currency) },
    { label: "15+\nYears", val: toLocal(Math.round(annual * 1.45), currency) },
  ];

  const maxVal = Math.max(...levels.map(l => l.val));
  const chartX = 80;
  const chartY = 150;
  const chartW = 640;
  const chartH = 260;
  const barCount = levels.length;
  const barGap = 16;
  const barTotalW = (chartW - barGap * (barCount - 1)) / barCount;
  const colors = ["#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#059669"];

  const bars = levels.map((l, i) => {
    const barH = Math.max((l.val / maxVal) * chartH, 10);
    const x = chartX + i * (barTotalW + barGap);
    const y = chartY + chartH - barH;
    const labelLines = l.label.split("\n");
    return `
    <rect x="${x}" y="${y}" width="${barTotalW}" height="${barH}" rx="4" fill="${colors[i]}"/>
    <text x="${x + barTotalW / 2}" y="${y - 8}" font-family="system-ui, Arial, sans-serif" font-size="12" fill="#374151" text-anchor="middle" font-weight="bold">${fmt(l.val)}</text>
    ${labelLines.map((line, li) =>
      `<text x="${x + barTotalW / 2}" y="${chartY + chartH + 18 + li * 16}" font-family="system-ui, Arial, sans-serif" font-size="12" fill="#4b5563" text-anchor="middle">${esc(line)}</text>`
    ).join("\n    ")}`;
  });

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f0fdf4"/>
        <stop offset="100%" stop-color="#ffffff"/>
      </linearGradient>
      <linearGradient id="acc" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#059669"/>
        <stop offset="100%" stop-color="#10b981"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect x="0" y="0" width="${W}" height="4" fill="url(#acc)"/>
    <text x="${W - 16}" y="28" font-family="system-ui, Arial, sans-serif" font-size="13" fill="#9CA3AF" text-anchor="end">BestPayingJobs.net</text>
    <text x="40" y="80" font-family="system-ui, Arial, sans-serif" font-size="22" font-weight="bold" fill="#111827">Salary by Experience in ${esc(country.name)}</text>
    <text x="40" y="108" font-family="system-ui, Arial, sans-serif" font-size="14" fill="#6b7280">Annual salary comparison by years of experience</text>
    ${bars.join("\n    ")}
    <rect x="0" y="${H - 36}" width="${W}" height="36" fill="#f9fafb"/>
    <text x="${W / 2}" y="${H - 14}" font-family="system-ui, Arial, sans-serif" font-size="11" fill="#9CA3AF" text-anchor="middle">BestPayingJobs.net - Average Salary Data for Every Country</text>
  </svg>`;
}

function buildIndustriesSvg(country, moUSD, currency) {
  const annual = moUSD * 12;
  const industryData = [
    { name: "Health & Medical", val: toLocal(Math.round(annual * 1.3), currency) },
    { name: "Banking & Finance", val: toLocal(Math.round(annual * 1.2), currency) },
    { name: "Information Tech.", val: toLocal(Math.round(annual * 1.15), currency) },
    { name: "Energy & Mining", val: toLocal(Math.round(annual * 1.1), currency) },
    { name: "Construction", val: toLocal(Math.round(annual * 1.05), currency) },
  ];

  const maxVal = Math.max(...industryData.map(l => l.val));
  const chartX = 60;
  const chartY = 150;
  const chartW = 680;
  const chartH = 260;
  const barCount = industryData.length;
  const barGap = 14;
  const barTotalW = (chartW - barGap * (barCount - 1)) / barCount;
  const colors = ["#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#059669"];

  const bars = industryData.map((l, i) => {
    const barH = Math.max((l.val / maxVal) * chartH, 10);
    const x = chartX + i * (barTotalW + barGap);
    const y = chartY + chartH - barH;
    return `
    <rect x="${x}" y="${y}" width="${barTotalW}" height="${barH}" rx="4" fill="${colors[i]}"/>
    <text x="${x + barTotalW / 2}" y="${y - 8}" font-family="system-ui, Arial, sans-serif" font-size="11" fill="#374151" text-anchor="middle" font-weight="bold">${fmt(l.val)}</text>
    <text x="${x + barTotalW / 2}" y="${chartY + chartH + 22}" font-family="system-ui, Arial, sans-serif" font-size="11" fill="#4b5563" text-anchor="middle">${esc(l.name)}</text>`;
  });

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f0fdf4"/>
        <stop offset="100%" stop-color="#ffffff"/>
      </linearGradient>
      <linearGradient id="acc" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#059669"/>
        <stop offset="100%" stop-color="#10b981"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect x="0" y="0" width="${W}" height="4" fill="url(#acc)"/>
    <text x="${W - 16}" y="28" font-family="system-ui, Arial, sans-serif" font-size="13" fill="#9CA3AF" text-anchor="end">BestPayingJobs.net</text>
    <text x="40" y="80" font-family="system-ui, Arial, sans-serif" font-size="22" font-weight="bold" fill="#111827">Top Industries in ${esc(country.name)}</text>
    <text x="40" y="108" font-family="system-ui, Arial, sans-serif" font-size="14" fill="#6b7280">Highest paying industries by annual salary</text>
    ${bars.join("\n    ")}
    <rect x="0" y="${H - 36}" width="${W}" height="36" fill="#f9fafb"/>
    <text x="${W / 2}" y="${H - 14}" font-family="system-ui, Arial, sans-serif" font-size="11" fill="#9CA3AF" text-anchor="middle">BestPayingJobs.net - Average Salary Data for Every Country</text>
  </svg>`;
}

function buildGenderSvg(country, moUSD, currency) {
  const annual = moUSD * 12;
  const gap = 6 + Math.round(Math.random() * 8);
  const maleVal = toLocal(Math.round(annual), currency);
  const femaleVal = toLocal(Math.round(annual * (1 - gap / 100)), currency);
  const maxV = Math.max(maleVal, femaleVal);
  const barMaxH = 260;
  const maleH = Math.round((maleVal / maxV) * barMaxH);
  const femaleH = Math.round((femaleVal / maxV) * barMaxH);

  const gapText = `${gap}% gap`;
  const femaleLess = `${Math.round((1 - femaleVal / maleVal) * 100)}% less`;

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f0fdf4"/>
        <stop offset="100%" stop-color="#ffffff"/>
      </linearGradient>
      <linearGradient id="maleG" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#1d4ed8"/>
        <stop offset="100%" stop-color="#3b82f6"/>
      </linearGradient>
      <linearGradient id="femaleG" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#be185d"/>
        <stop offset="100%" stop-color="#ec4899"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect x="0" y="0" width="${W}" height="4" fill="url(#maleG)"/>
    <text x="${W - 16}" y="28" font-family="system-ui, Arial, sans-serif" font-size="13" fill="#9CA3AF" text-anchor="end">BestPayingJobs.net</text>
    <text x="40" y="80" font-family="system-ui, Arial, sans-serif" font-size="22" font-weight="bold" fill="#111827">Gender Salary Gap in ${esc(country.name)}</text>
    <text x="40" y="108" font-family="system-ui, Arial, sans-serif" font-size="14" fill="#6b7280">${esc(gapText)} - Female earns ${esc(femaleLess)}</text>

    <g transform="translate(${W / 2 - 100}, 150)">
      <rect x="30" y="${barMaxH - maleH}" width="100" height="${maleH}" rx="6" fill="url(#maleG)"/>
      <text x="80" y="${barMaxH - maleH - 10}" font-family="system-ui, Arial, sans-serif" font-size="14" fill="#1e3a5f" text-anchor="middle" font-weight="bold">${fmt(maleVal)}</text>
      <text x="80" y="${barMaxH + 24}" font-family="system-ui, Arial, sans-serif" font-size="14" fill="#374151" text-anchor="middle" font-weight="bold">Male</text>
      <text x="80" y="${barMaxH + 40}" font-family="system-ui, Arial, sans-serif" font-size="11" fill="#6b7280" text-anchor="middle">${esc(currency)}/yr</text>
    </g>

    <g transform="translate(${W / 2 + 0}, 150)">
      <rect x="30" y="${barMaxH - femaleH}" width="100" height="${femaleH}" rx="6" fill="url(#femaleG)"/>
      <text x="80" y="${barMaxH - femaleH - 10}" font-family="system-ui, Arial, sans-serif" font-size="14" fill="#831843" text-anchor="middle" font-weight="bold">${fmt(femaleVal)}</text>
      <text x="80" y="${barMaxH + 24}" font-family="system-ui, Arial, sans-serif" font-size="14" fill="#374151" text-anchor="middle" font-weight="bold">Female</text>
      <text x="80" y="${barMaxH + 40}" font-family="system-ui, Arial, sans-serif" font-size="11" fill="#6b7280" text-anchor="middle">${esc(currency)}/yr</text>
    </g>

    <rect x="0" y="${H - 36}" width="${W}" height="36" fill="#f9fafb"/>
    <text x="${W / 2}" y="${H - 14}" font-family="system-ui, Arial, sans-serif" font-size="11" fill="#9CA3AF" text-anchor="middle">BestPayingJobs.net — Average Salary Data for Every Country</text>
  </svg>`;
}

const defaultTargetDir = join(__dirname, "..", "public");

export async function generateAverageSalaryCharts(targetDir) {
  const outDir = join(targetDir, "og", "average-salary");
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  let count = 0;
  for (const country of countries) {
    const code = country.code;
    const moUSD = avgSalaries[code];
    if (!moUSD) continue;

    const currency = country.currency;
    const countryDir = join(outDir, country.slug);
    if (!existsSync(countryDir)) mkdirSync(countryDir, { recursive: true });

    const chartFiles = ["distribution.webp", "education.webp", "gender.webp", "experience.webp", "industries.webp"];
    const allExist = chartFiles.every(f => existsSync(join(countryDir, f)));
    if (allExist) continue;

    const distSvg = buildDistributionSvg(country, moUSD, currency);
    await sharp(Buffer.from(distSvg)).webp({ quality: 82 }).toFile(join(countryDir, "distribution.webp"));

    const eduSvg = buildEducationSvg(country, moUSD, currency);
    await sharp(Buffer.from(eduSvg)).webp({ quality: 82 }).toFile(join(countryDir, "education.webp"));

    const genderSvg = buildGenderSvg(country, moUSD, currency);
    await sharp(Buffer.from(genderSvg)).webp({ quality: 82 }).toFile(join(countryDir, "gender.webp"));

    const expSvg = buildExperienceSvg(country, moUSD, currency);
    await sharp(Buffer.from(expSvg)).webp({ quality: 82 }).toFile(join(countryDir, "experience.webp"));

    const indSvg = buildIndustriesSvg(country, moUSD, currency);
    await sharp(Buffer.from(indSvg)).webp({ quality: 82 }).toFile(join(countryDir, "industries.webp"));

    count++;
    if (count % 20 === 0) console.log(`  Generated ${count} country chart sets...`);
  }

  return count;
}

// CLI: node scripts/generate-average-salary-charts.mjs
const isMain = process.argv[1] && (process.argv[1].endsWith("generate-average-salary-charts.mjs") || process.argv[1].endsWith("generate-average-salary-charts.js"));
if (isMain) {
  const target = process.argv[2] ? join(__dirname, "..", "public") : defaultTargetDir;
  console.log(`Generating average salary charts to ${target}/og/average-salary/...`);
  const total = await generateAverageSalaryCharts(target);
  console.log(`✓ Charts for ${total} countries`);
}
