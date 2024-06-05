import { useParams, useSearchParams } from "react-router-dom";
import { getEntriesForCategory, getEntryById, parseSlug } from "../lib/utils";
import usePageContext from "./use-page-context";

export default function useMapMarkers() {
  const [searchParams] = useSearchParams();
  const { entryId } = useParams();
  const { entries } = usePageContext();

  const categories = searchParams.get("markers")?.split(",") || [];
  const entry = getEntryById(entries, parseSlug(entryId));
  const coords: { lat: number; lng: number; id: string; title: string }[] = [];

  if (categories.length > 0) {
    categories.forEach((category) => {
      const matches = getEntriesForCategory(category, entries);

      coords.push(
        ...matches.map((entry) => {
          const [lat, lng] = entry.location.split(",").map(Number);

          return { lat, lng, id: entry.entry_id, title: entry.entry_title };
        })
      );
    });
  } else if (entry?.location && entry.location.length > 0) {
    const [lat, lng] = entry.location.split(",").map(Number);

    coords.push({ lat, lng, id: entry.entry_id, title: entry.entry_title });
  }

  return coords;
}
