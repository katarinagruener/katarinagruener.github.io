// For embedding data in `<script type="application/json" set:html={...}>`.
// Plain JSON.stringify leaves "<" untouched, so CMS-editable text containing
// "</script>" (e.g. an event title or image alt text) would close the tag
// early and let the rest be parsed as live HTML — a stored-XSS path. "<"
// is a valid JSON string escape, so this is transparent to JSON.parse.
export function toJsonScript(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
