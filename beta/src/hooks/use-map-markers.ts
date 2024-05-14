import { useParams, useSearchParams } from "react-router-dom";
import data from "../data.json";
import { getEntriesForCategory, getEntryById } from "../lib/utils";

export default function useMapMarkers() {
  const [searchParams] = useSearchParams();
  const { entryId } = useParams();

  const category = searchParams.get("markers");
  const entry = getEntryById(data, entryId);
  const coords = [];

  if (category) {
    const matches = getEntriesForCategory(category, data);

    coords.push(
      ...matches.map((entry) => {
        const [lat, lng] = entry.location.split(",").map(Number);

        return { lat, lng };
      })
    );
  } else if (entry?.location && entry.location.length > 0) {
    const [lat, lng] = entry.location.split(",").map(Number);

    coords.push({ lat, lng });
  }

  return coords;
}
