// CMS "website" fields are plain strings editors type freely (e.g. "gemeinde-seddiner-see.de"
// or "https://gemeinde-seddiner-see.de") — normalize to an absolute, linkable URL without
// forcing https on an editor-supplied http:// link.
export function toAbsoluteUrl(website: string): string {
  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
}
