import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { generateJobFiles } from "./generate-job-files.mjs";
import { generateAverageSalaryFiles } from "./generate-average-salary-files.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public");

const jobCount = generateJobFiles(publicDir);
console.log(`Generated ${jobCount} API job files to public/`);

const avgSalaryCount = generateAverageSalaryFiles(publicDir);
console.log(`Generated ${avgSalaryCount} average salary files to public/`);
