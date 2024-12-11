import { useRef, useState } from "react";

const MIN_ZOOM = 16 as const;
const MAX_ZOOM = 20 as const;

function convert(zoom: number = 18) {
  return ((zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100;
}

export default function useMarkerScale(map: google.maps.Map | null) {
  const registered = useRef<boolean>(false);
  const [scale, setScale] = useState<number>(convert);

  function handleZoomChanged() {
    registered.current = true;

    const result = convert(map?.getZoom());

    if (result !== scale && result > 0) {
      setScale(result);
    }
  }

  if (!registered.current) {
    map?.addListener("zoom_changed", handleZoomChanged);
  }

  return scale;
}
