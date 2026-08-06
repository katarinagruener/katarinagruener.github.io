interface DatedEntry {
  data: { date: Date };
}

export function groupByYear<T extends DatedEntry>(entries: T[]) {
  const groups = new Map<number, T[]>();

  for (const entry of entries) {
    const year = entry.data.date.getFullYear();
    const group = groups.get(year) ?? [];
    group.push(entry);
    groups.set(year, group);
  }

  return [...groups.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, items]) => ({
      year: String(year),
      items: items.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    }));
}
