/**
 * Merges expanded article content into src/data/blog-posts.json.
 *
 * Batch files live in scripts/blog-content/ and default-export an object keyed
 * by post id. Only the fields present in a batch are replaced, so a batch can
 * rewrite the body while leaving title/category/summary untouched.
 *
 *   node scripts/apply-blog-content.mjs
 */
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

const POSTS_PATH = "src/data/blog-posts.json";
const BATCH_DIR = "scripts/blog-content";

const posts = JSON.parse(fs.readFileSync(POSTS_PATH, "utf-8"));
const byId = new Map(posts.map((p) => [p.id, p]));

if (!fs.existsSync(BATCH_DIR)) {
  console.error(`No batch directory at ${BATCH_DIR}`);
  process.exit(1);
}

const batchFiles = fs.readdirSync(BATCH_DIR).filter((f) => f.endsWith(".mjs")).sort();

let updated = 0;
const unknown = [];

for (const file of batchFiles) {
  const mod = await import(pathToFileURL(path.resolve(BATCH_DIR, file)).href);
  const batch = mod.default;
  for (const [id, content] of Object.entries(batch)) {
    const post = byId.get(id);
    if (!post) {
      unknown.push(`${file}: ${id}`);
      continue;
    }
    Object.assign(post, content);
    updated++;
  }
}

// Recompute readTime from the actual body so the listing cards never advertise
// a duration that contradicts the article.
function wordsIn(p) {
  return [
    ...(p.intro ?? []),
    ...(p.takeaways ?? []),
    ...p.sections.flatMap((s) => [s.h, s.b, ...(s.list ?? [])]),
    ...(p.faq ?? []).flatMap((f) => [f.q, f.a]),
    p.conclusion ?? "",
  ]
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

for (const post of posts) {
  post.readTime = `${Math.max(1, Math.round(wordsIn(post) / 225))} min read`;
}

fs.writeFileSync(POSTS_PATH, JSON.stringify(posts, null, 2) + "\n");

const words = posts.reduce((sum, p) => sum + wordsIn(p), 0);

const expanded = posts.filter((p) => p.intro?.length).length;
console.log(`Applied ${updated} post updates from ${batchFiles.length} batch file(s).`);
console.log(`Expanded ${expanded}/${posts.length} posts. Total words: ${words.toLocaleString()}.`);
if (unknown.length) console.log("Unknown post ids:", unknown.join(", "));
