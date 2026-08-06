import { cpSync, existsSync, rmSync } from "node:fs";

const source = "dist/pagefind";
const target = "public/pagefind";

if (!existsSync(source)) {
  console.warn(`Skipping pagefind dev sync: ${source} not found.`);
  process.exit(0);
}

if (existsSync(target)) {
  rmSync(target, { recursive: true, force: true });
}

cpSync(source, target, { recursive: true });

console.log(`Synced ${source} -> ${target} so 'astro dev' can serve search locally.`);
