import usePageContext from "./use-page-context";

export default function useTextMarkers() {
  const { entries } = usePageContext();

  return entries
    .filter((entry) => entry.location.length > 0 && entry.building2 === "yes")
    .map((entry) => {
      const [lat, lng] = entry.location.split(",").map(Number);

      return {
        lat,
        lng,
        id: entry.entry_id,
        shortcut: entry.shortcut,
        name: entry.entry_title,
      };
    });
}
