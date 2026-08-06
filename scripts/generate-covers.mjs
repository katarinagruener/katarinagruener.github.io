import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pdf } from "pdf-to-img";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(rootDir, "public");

const targets = [
  {
    contentDir: path.join(rootDir, "src/content/see-kurier"),
    coverDir: path.join(publicDir, "see-kurier/covers"),
    coverUrlBase: "/see-kurier/covers"
  }
];

async function findJsonFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await findJsonFiles(fullPath)));
    } else if (entry.name.endsWith(".json")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function generateCover(pdfAbsPath, outAbsPath) {
  const doc = await pdf(pdfAbsPath, { scale: 2 });
  const page = await doc.getPage(1);
  await writeFile(outAbsPath, page);
  await doc.destroy();
}

let generated = 0;
let skipped = 0;

for (const target of targets) {
  if (!existsSync(target.contentDir)) continue;

  await mkdir(target.coverDir, { recursive: true });

  const jsonFiles = await findJsonFiles(target.contentDir);

  for (const jsonFile of jsonFiles) {
    const raw = await readFile(jsonFile, "utf-8");
    const data = JSON.parse(raw);

    if (!data.file || !data.file.toLowerCase().endsWith(".pdf")) continue;
    if (data.cover) {
      skipped++;
      continue;
    }

    const pdfAbsPath = path.join(publicDir, data.file);

    if (!existsSync(pdfAbsPath)) {
      console.warn(`PDF fehlt, übersprungen: ${data.file} (${jsonFile})`);
      continue;
    }

    const slug = path.basename(jsonFile, ".json");
    const parentFolder = path.basename(path.dirname(jsonFile));
    const isYearFolder = /^\d{4}$/.test(parentFolder);
    const coverName = isYearFolder ? `${parentFolder}-${slug}.png` : `${slug}.png`;
    const coverAbsPath = path.join(target.coverDir, coverName);

    console.log(`Erzeuge Cover: ${coverName} <- ${data.file}`);
    await generateCover(pdfAbsPath, coverAbsPath);

    data.cover = `${target.coverUrlBase}/${coverName}`;
    await writeFile(jsonFile, `${JSON.stringify(data, null, 2)}\n`);

    generated++;
  }
}

console.log(`\nFertig. ${generated} Cover erzeugt, ${skipped} bereits vorhanden.`);
