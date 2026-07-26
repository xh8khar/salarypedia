import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { generateJobFiles } from "./generate-job-files.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public");

const count = generateJobFiles(publicDir);
console.log(`Generated ${count} API job files to public/`);
