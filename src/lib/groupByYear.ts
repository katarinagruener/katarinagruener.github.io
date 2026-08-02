interface YearEntry {
  id: string;
}

export function groupByYear<T extends YearEntry>(entries: T[]) {
  const groups = new Map<string, T[]>();

  for (const entry of entries) {
    const year = entry.id.split("/")[0];
    const group = groups.get(year) ?? [];
    group.push(entry);
    groups.set(year, group);
  }

  return [...groups.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, items]) => ({
      year,
      items: items.sort((a, b) => b.id.localeCompare(a.id))
    }));
}

export function getLatestEntry<T extends YearEntry>(entries: T[]) {
  return [...entries].sort((a, b) => b.id.localeCompare(a.id))[0];
}
