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

export function getCoordinates(
  entries: Entry[],
  coordinates?: string,
  category?: string | null
): { lat: number; lng: number }[] {
  const coords = [];

  if (category) {
    const matches = getEntriesForCategory(category, entries);

    coords.push(
      ...matches.map((entry) => {
        const [lat, lng] = entry.location.split(",").map(Number);

        return { lat, lng };
      })
    );
  } else if (coordinates && coordinates.length > 0) {
    const [lat, lng] = coordinates.split(",").map(Number);

    coords.push({ lat, lng });
  }

  return coords;
}
