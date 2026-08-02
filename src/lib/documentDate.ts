import { statSync } from "node:fs";
import path from "node:path";

export function getDocumentDate(file?: string): Date {
  if (!file) return new Date();

  try {
    return statSync(path.resolve(process.cwd(), "public", file.replace(/^\//, ""))).mtime;
  } catch {
    return new Date();
  }
}

const LEADING_DATE_RE = /^(\d{2})\.(\d{2})\.(\d{4})\s*-\s*/;
const PREP_DATE_RE = /\b(?:vom|ab|zum|seit|am)\s+(\d{2})\.(\d{2})\.(\d{4})\b/i;
const FULL_DATE_RE = /(\d{2})\.(\d{2})\.(\d{4})/;

// Bare years like "Kalenderjahr 2026" or "Haushaltssatzung 2026" name *which* year
// something concerns, not when the document was published, so leave those intact.
const YEAR_RE = /(?<!Kalenderjahr\s)(?<!Haushaltsjahr\s)(?<!Haushaltssatzung\s)\b(19|20)\d{2}\b/;

// "Stand"/"Start" followed by an (optional month +) date or year is just restating
// the document's date inline, which is now shown separately as metadata anyway.
const MONTH_NAMES = "Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember";
const STAND_COMBO_RE = new RegExp(
  `\\s*[-–]?\\s*\\b(?:Stand|Start)\\s*:?\\s*(?:(?:${MONTH_NAMES})\\s+)?(?:\\d{2}\\.\\d{2}\\.\\d{4}|(?:19|20)\\d{2})\\b`,
  "gi"
);

/**
 * Extracts a date out of a document title (a leading "03.03.2026 - " label, a date
 * mentioned elsewhere like "vom 25.02.2025", or a bare year for older archival
 * documents) and strips all such date noise from the returned title, since the
 * date is shown separately as metadata. Falls back to today when no date can be
 * found in the title at all.
 */
export function parseDocumentTitle(rawTitle: string): { title: string; date: Date } {
  const leadingMatch = rawTitle.match(LEADING_DATE_RE);
  const prepMatch = !leadingMatch ? rawTitle.match(PREP_DATE_RE) : null;
  const fullDateMatch = !leadingMatch && !prepMatch ? rawTitle.match(FULL_DATE_RE) : null;
  const yearMatch = !leadingMatch && !prepMatch && !fullDateMatch ? rawTitle.match(YEAR_RE) : null;

  const match = leadingMatch ?? prepMatch ?? fullDateMatch;
  const date = match
    ? new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]))
    : yearMatch
      ? new Date(Number(yearMatch[0]), 0, 1)
      : new Date();

  const cleanedTitle = rawTitle
    .replace(LEADING_DATE_RE, "")
    .replace(STAND_COMBO_RE, "")
    .replace(PREP_DATE_RE, "")
    .replace(FULL_DATE_RE, "")
    .replace(YEAR_RE, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\(\s*\)/g, "")
    .replace(/\s*-\s*-\s*/g, " - ")
    .replace(/\s+-\s*$/, "")
    .replace(/^\s*-\s+/, "")
    .trim();

  return { title: cleanedTitle || rawTitle, date };
}
