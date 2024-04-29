import type { Entry } from "../types";

export function getCategories(entries: Entry[]): string[] {
  return Array.from(
    new Set<string>(
      entries
        .filter((entry) => entry.category_name.length > 0 && entry.live === "1")
        .map((entry) => entry.category_name)
    )
  );
}

export function getEntriesForCategory(category: string, entries: Entry[]): Entry[] {
  return entries.filter((entry) => entry.category_name === category);
}
