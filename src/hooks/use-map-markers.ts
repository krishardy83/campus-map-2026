import { useParams, useSearchParams } from "react-router-dom";
import { getEntriesForCategory, getEntryByShortcut } from "../lib/utils";
import usePageContext from "./use-page-context";

export default function useMapMarkers() {
  const [searchParams] = useSearchParams();
  const { shortcut } = useParams();
  const { entries } = usePageContext();

  const categories = searchParams.get("markers")?.split(",") || [];
  const entry = getEntryByShortcut(entries, shortcut);
  const coords: {
    lat: number;
    lng: number;
    id: string;
    shortcut: string;
    title: string;
  }[] = [];

  if (categories.length > 0) {
    for (const category of categories) {
      const matches = getEntriesForCategory(category, entries);

      coords.push(
        ...matches.map((entry) => {
          const [lat, lng] = entry.location.split(",").map(Number);

          return {
            lat,
            lng,
            id: entry.entry_id,
            shortcut: entry.shortcut,
            title: entry.entry_title,
          };
        }),
      );
    }
  } else if (entry?.location && entry.location.length > 0) {
    const [lat, lng] = entry.location.split(",").map(Number);

    coords.push({
      lat,
      lng,
      id: entry.entry_id,
      shortcut: entry.shortcut,
      title: entry.entry_title,
    });
  }

  return coords;
}
