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
  return entries.filter((entry) => entry.category_name === category && entry.live === "1");
}

export function getEntryById(entries: Entry[], id?: string): Entry | undefined {
  return entries.find((entry) => entry.entry_id === id);
}

export function getEntriesFromSearch(search: string, entries: Entry[]) {
  const searchable: (keyof Entry)[] = ["category_name", "keywords", "entry_title", "description"];
  const query = search.toLowerCase().trim();

  if (query.length === 0) {
    return entries;
  }

  return entries.filter((entry) => {
    let match = false;

    searchable.forEach((key) => {
      if (entry[key].toLowerCase().includes(query)) {
        match = true;
      }
    });

    return match;
  });
}

export function getCoverImageUrl(image?: string): string {
  if (image) {
    return `http://www.messiah.edu/images/${image}`;
  }

  return "./images/location-image-placeholder.png";
}

export function getGoogleMapsUrl(coordinates: string): string {
  return `https://maps.google.com?saddr=Current+Location&daddr=${coordinates}`;
}

export function getCoordinates(coordinates?: string): { lat: number; lng: number } | null {
  if (!coordinates || coordinates.length === 0) {
    return null;
  }

  const [lat, lng] = coordinates.split(",").map(Number);

  return { lat, lng };
}
