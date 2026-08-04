import sharp from "sharp";
import { readFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const countries = JSON.parse(
  readFileSync(join(__dirname, "../src/data/countries.json"), "utf-8")
);
const allJobs = JSON.parse(
  readFileSync(join(__dirname, "../src/data/all-jobs.json"), "utf-8")
);
const categories = JSON.parse(
  readFileSync(join(__dirname, "../src/data/categories.json"), "utf-8")
);

const W = 2100;
const H = 3400;

function esc(s) {
  return s.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function fmt(n) {
  return n.toLocaleString("en-US");
}

const gradientDef = `
<defs>
  <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#064E3B"/>
    <stop offset="55%" stop-color="#065F46"/>
    <stop offset="100%" stop-color="#047857"/>
  </linearGradient>
  <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#34D399"/>
    <stop offset="100%" stop-color="#059669"/>
  </linearGradient>
</defs>
`;

function truncate(s, max) {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + "…";
}

function buildPosterSvg(country, data) {
  const currency = data.currency ?? country.currency;

  // Flatten all jobs, dedupe by title, sort by highest salary, take top 60
  const seen = new Set();
  const allJobs = [];
  for (const cat of categories) {
    for (const job of data.jobs[cat.slug] ?? []) {
      if (seen.has(job.title)) continue;
      seen.add(job.title);
      allJobs.push(job);
    }
  }
  allJobs.sort((a, b) => b.salaryMax - a.salaryMax);
  const jobs60 = allJobs.slice(0, 60);

  // Poster layout: header, stats bar, then 2 columns of 30 numbered job cards.
  const COL_COUNT = 2;
  const ENTRY_TOP = 620;
  const FOOTER_TOP = 3290;
  const perCol = 30;
  const ROW_H = 88;
  const colW = 940;
  const colX = [90, 1070];

  const rows = jobs60.map((job, i) => {
    const col = Math.floor(i / perCol);
    const row = i % perCol;
    const y = ENTRY_TOP + row * ROW_H;
    const x = colX[col];
    const rankNum = i + 1;
    const cardH = ROW_H - 6;
    return `
    <rect x="${x}" y="${y}" width="${colW}" height="${cardH}" rx="14" fill="${rankNum % 2 === 0 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)"}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <rect x="${x}" y="${y}" width="78" height="${cardH}" rx="14" fill="rgba(110,231,183,0.12)"/>
    <text x="${x + 39}" y="${y + 52}" font-family="system-ui, Arial, sans-serif" font-size="30" font-weight="bold" fill="#6EE7B7" text-anchor="middle">${rankNum}</text>
    <text x="${x + 102}" y="${y + 42}" font-family="system-ui, Arial, sans-serif" font-size="26" font-weight="bold" fill="#f1f5f9">${esc(truncate(job.title, 34))}</text>
    <text x="${x + 102}" y="${y + 72}" font-family="system-ui, Arial, sans-serif" font-size="21" fill="#A7F3D0">${esc(currency)} ${fmt(job.salaryMin)} – ${fmt(job.salaryMax)} / month</text>`;
  }).join("");

  const totalRoles = allJobs.length;

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    ${gradientDef}
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect x="0" y="0" width="${W}" height="10" fill="url(#accent)"/>

    <text x="90" y="115" font-family="system-ui, Arial, sans-serif" font-size="28" font-weight="bold" fill="rgba(255,255,255,0.5)">singhyogendra.com.np</text>

    <text x="90" y="235" font-family="system-ui, Arial, sans-serif" font-size="58" font-weight="bold" fill="#ffffff">Highest Paying Jobs in ${esc(country.name)}</text>
    <text x="90" y="295" font-family="system-ui, Arial, sans-serif" font-size="30" fill="#6EE7B7">Top 60 careers ranked by monthly salary (${esc(totalRoles)} roles tracked)</text>

    <rect x="90" y="340" width="${W - 180}" height="3" fill="rgba(255,255,255,0.15)"/>

    <rect x="90" y="390" width="330" height="100" rx="14" fill="rgba(255,255,255,0.06)"/>
    <text x="115" y="430" font-family="system-ui, Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.5)">ROLES TRACKED</text>
    <text x="115" y="470" font-family="system-ui, Arial, sans-serif" font-size="32" font-weight="bold" fill="#ffffff">${fmt(totalRoles)}</text>

    <rect x="450" y="390" width="330" height="100" rx="14" fill="rgba(255,255,255,0.06)"/>
    <text x="475" y="430" font-family="system-ui, Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.5)">CATEGORIES</text>
    <text x="475" y="470" font-family="system-ui, Arial, sans-serif" font-size="32" font-weight="bold" fill="#ffffff">${categories.length}</text>

    <rect x="810" y="390" width="${W - 900}" height="100" rx="14" fill="rgba(255,255,255,0.06)"/>
    <text x="835" y="430" font-family="system-ui, Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.5)">TOP PAYING ROLE</text>
    <text x="835" y="470" font-family="system-ui, Arial, sans-serif" font-size="30" font-weight="bold" fill="#A7F3D0">${esc(truncate(allJobs[0]?.title ?? "", 40))}</text>

    ${rows}

    <rect x="0" y="${FOOTER_TOP}" width="${W}" height="${H - FOOTER_TOP}" fill="rgba(0,0,0,0.4)"/>
    <rect x="0" y="${FOOTER_TOP}" width="${W}" height="6" fill="url(#accent)"/>
    <text x="${W / 2}" y="${FOOTER_TOP + 55}" font-family="system-ui, Arial, sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">${esc(country.name)} Salary Guide</text>
    <text x="${W / 2}" y="${FOOTER_TOP + 95}" font-family="system-ui, Arial, sans-serif" font-size="20" fill="rgba(255,255,255,0.55)" text-anchor="middle">singhyogendra.com.np — Average Salaries, Highest Paying Jobs &amp; Career Guides</text>
  </svg>`;
}

const outDir = join(__dirname, "../public/posters");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const target = process.argv[2];
const targets = target ? [target] : countries.filter((c) => allJobs[c.code]).map((c) => c.slug);

let count = 0;
for (const slug of targets) {
  const c = countries.find((x) => x.slug === slug);
  if (!c) { console.error(`Country not found: ${slug}`); continue; }
  const data = allJobs[c.code];
  if (!data) { console.error(`No job data for ${c.name}`); continue; }

  const svg = buildPosterSvg(c, data);
  const file = join(outDir, `${slug}.webp`);
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(file);
  count++;
  if (count % 25 === 0) console.log(`Generated ${count} posters...`);
}
console.log(`✓ Generated ${count} posters → /public/posters/{slug}.webp`);
