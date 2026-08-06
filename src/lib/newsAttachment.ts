const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];

export type AttachmentType = "pdf" | "image" | undefined;

export function getAttachmentType(file?: string): AttachmentType {
  if (!file) return undefined;

  const lower = file.toLowerCase();

  if (lower.endsWith(".pdf")) return "pdf";
  if (IMAGE_EXTENSIONS.some((ext) => lower.endsWith(ext))) return "image";

  return undefined;
}
