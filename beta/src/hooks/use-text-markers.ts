import data from "../data.json";

export default function useTextMarkers() {
  const markers = data
    .filter((entry) => entry?.location.length > 0)
    .map((entry) => {
      const [lat, lng] = entry.location.split(",").map(Number);

      return {
        lat,
        lng,
        id: entry.entry_id,
        name: entry.entry_title,
      };
    });

  return markers;
}
