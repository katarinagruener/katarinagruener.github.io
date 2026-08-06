export function groupBy<T>(entries: T[], keyFn: (entry: T) => string) {
  const groups = new Map<string, T[]>();

  for (const entry of entries) {
    const key = keyFn(entry);
    const group = groups.get(key) ?? [];
    group.push(entry);
    groups.set(key, group);
  }

  return [...groups.entries()].map(([key, items]) => ({ key, items }));
}
