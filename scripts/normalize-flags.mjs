/**
 * Re-fetches every country flag from flagcdn at a single consistent aspect.
 *
 * The previous mix of sources left some flags as 500x500 canvases with
 * transparent padding around the flag itself. Those look wrong once the UI
 * crops flags into circles: `object-cover` fills the square, so the padding
 * stays visible as a gap inside the circle. flagcdn images are edge-to-edge,
 * so a circular crop lands on the flag.
 *
 * Existing files are only replaced when a download fully succeeds.
 *
 *   node scripts/normalize-flags.mjs
 */
import https from "https";
import fs from "fs";
import path from "path";

const countries = JSON.parse(fs.readFileSync("src/data/countries.json", "utf-8"));
const outDir = "public/images/country";
const WIDTH = "w320"; // largest on-screen flag is 80px, so this covers 2x displays

function fetchBuffer(url, redirectsLeft = 3) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 20000 }, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location && redirectsLeft > 0) {
        res.resume();
        return resolve(fetchBuffer(res.headers.location, redirectsLeft - 1));
      }
      const ct = res.headers["content-type"] || "";
      if (res.statusCode !== 200 || !ct.startsWith("image/")) {
        res.resume();
        return resolve(null);
      }
      const chunks = [];
      res.on("data", (d) => chunks.push(d));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", () => resolve(null));
    });
    req.on("timeout", () => { req.destroy(); resolve(null); });
    req.on("error", () => resolve(null));
  });
}

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
const PNG_END = Buffer.from("IEND");

// Plain tricolours compress to only a few hundred bytes, so size is a poor
// integrity signal. Check the PNG header and terminating chunk instead.
function isCompletePng(buf) {
  return (
    Buffer.isBuffer(buf) &&
    buf.length > 67 &&
    buf.subarray(0, 4).equals(PNG_MAGIC) &&
    buf.subarray(-8).includes(PNG_END)
  );
}

let replaced = 0;
let kept = 0;
const failures = [];

for (const c of countries) {
  const dest = path.join(outDir, `${c.slug}.png`);
  const buf = await fetchBuffer(`https://flagcdn.com/${WIDTH}/${c.code}.png`);

  // Guard against truncated or non-PNG responses overwriting a good file.
  if (!isCompletePng(buf)) {
    failures.push(`${c.slug} (${c.code})`);
    kept++;
    continue;
  }

  fs.writeFileSync(dest, buf);
  replaced++;
  process.stdout.write(".");
}

console.log(`\nReplaced ${replaced}, kept ${kept} of ${countries.length}.`);
if (failures.length) console.log("Kept existing file for:", failures.join(", "));
