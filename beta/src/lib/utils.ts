import type { Entry } from "../types";

export function getBaseUrl(path: string): string {
  return `${import.meta.env.BASE_URL}/${path}`;
}

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
  return entries.filter((entry) => entry.category_name === category && entry.live === "1");
}

export function getEntryByShortcut(entries: Entry[], shortcut?: string): Entry | undefined {
  return entries.find((entry) => entry.shortcut === shortcut);
}

export function removeDuplicates(entries: Entry[]): Entry[] {
  const selected: Entry[] = [];

  entries.forEach((entry) => {
    if (!selected.find((t) => t.entry_title === entry.entry_title)) {
      selected.push(entry);
    }
  });

  return selected;
}

export function getEntriesFromSearch(search: string, entries: Entry[]) {
  const searchable: (keyof Entry)[] = ["category_name", "keywords", "entry_title", "description"];
  const query = search.toLowerCase().trim();

  if (query.length === 0) {
    return entries;
  }

  return removeDuplicates(
    entries.filter((entry) => {
      let match = false;

      searchable.forEach((key) => {
        if (entry[key].toLowerCase().includes(query)) {
          match = true;
        }
      });

      return match;
    })
  );
}

export function getEntriesInThisBuilding(entry: Entry, entries: Entry[]): Entry[] {
  return entries.filter(({ parent_building }) => parent_building === entry.entry_id);
}

export function getCoverImageUrl(image?: string): string {
  if (image) {
    return `http://www.messiah.edu/images/${image}`;
  }

  return getBaseUrl("images/location-image-placeholder.png");
}

export function getGoogleMapsUrl(coordinates: string): string {
  return `https://maps.google.com?saddr=Current+Location&daddr=${coordinates}`;
}

export function getGalleryImages(entry: Entry): string[] {
  const properties = [
    "image_1_required",
    "image_2_optional",
    "image_3_optional",
    "image_4_optional",
  ] as const;

  return properties.map((property) => entry[property]).filter((image) => image.length > 0);
}

export function setPageTitle(title?: string): void {
  const base = "Messiah University Campus Map";

  if (title) {
    document.title = `${title} - ${base}`;
  } else {
    document.title = base;
  }
}
