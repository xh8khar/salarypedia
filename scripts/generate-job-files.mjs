import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, "../src/data");

export function generateJobFiles(targetDir) {
  const countries = JSON.parse(readFileSync(resolve(dataDir, "countries.json"), "utf-8"));
  const allJobs = JSON.parse(readFileSync(resolve(dataDir, "all-jobs.json"), "utf-8"));

  const codeToSlug = {};
  for (const c of countries) {
    codeToSlug[c.code.toLowerCase()] = c.slug;
  }

  mkdirSync(resolve(targetDir, "api/jobs"), { recursive: true });
  let count = 0;
  for (const [code, data] of Object.entries(allJobs)) {
    const slug = codeToSlug[code];
    if (slug) {
      writeFileSync(resolve(targetDir, `api/jobs/${slug}.json`), JSON.stringify(data));
      count++;
    }
  }
  return count;
}
