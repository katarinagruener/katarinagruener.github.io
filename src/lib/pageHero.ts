import { getCollection } from "astro:content";

export async function getPageHero(id: string) {
  const entries = await getCollection("page-hero");
  const entry = entries.find((item) => item.id === id);
  return entry?.data ?? null;
}
