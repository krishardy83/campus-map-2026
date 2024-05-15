import { useParams, useSearchParams } from "react-router-dom";
import data from "../data.json";
import { getEntriesForCategory, getEntryById } from "../lib/utils";

export default function useMapMarkers() {
  const [searchParams] = useSearchParams();
  const { entryId } = useParams();

  const categories = searchParams.getAll("marker");
  const entry = getEntryById(data, entryId);
  const coords: { lat: number; lng: number; id: string; title: string }[] = [];

  if (categories.length > 0) {
    categories.forEach((category) => {
      const matches = getEntriesForCategory(category, data);

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
