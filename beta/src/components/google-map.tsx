import { useNavigate } from "react-router-dom";
import { AdvancedMarker, Map, Pin, useMap } from "@vis.gl/react-google-maps";
import { StarIcon } from "@heroicons/react/24/solid";
import useMapOverlay from "../hooks/use-map-overlay";
import useMapMarkers from "../hooks/use-map-markers";
import useTextMarkers from "../hooks/use-text-markers";

const INITIAL_CAMERA = {
  center: { lat: 40.157204, lng: -76.988973 },
  zoom: 18,
};

// const MIN_ZOOM = 16 as const;
// const MAX_ZOOM = 20 as const;

// function convert(zoom: number = 18) {
//   const result = Math.round(((zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100);

//   return result > 0 ? result : 0;
// }

export default function GoogleMap() {
  const navigate = useNavigate();
  const map = useMap();
  const overlay = useMapOverlay();
  const markers = useMapMarkers();
  const textMarkers = useTextMarkers();

  map?.setZoom(markers.length === 1 ? 19 : INITIAL_CAMERA.zoom);
  map?.setCenter(markers.length === 1 ? markers[0] : INITIAL_CAMERA.center);

  if (map?.overlayMapTypes.getLength() === 0) {
    map?.overlayMapTypes.push(overlay);
  }

  return (
    <Map
      defaultCenter={INITIAL_CAMERA.center}
      defaultZoom={INITIAL_CAMERA.zoom}
      className="h-dvh"
      disableDefaultUI
      fullscreenControl
      zoomControl
      mapId="bf51a910020fa25a"
      mapTypeId="satellite"
      // onZoomChanged={handleZoomChanged}
    >
      {textMarkers.map((marker) => (
        <AdvancedMarker
          position={marker}
          key={`text-markers-${marker.id}`}
          onClick={() => navigate(marker.id)}
          collisionBehavior="OPTIONAL_AND_HIDES_LOWER_PRIORITY"
          className="relative top-5"
        >
          <p className="text-white text-base [text-shadow:_2px_2px_1px_rgb(0_0_0_/_50%)] font-bold">
            {marker.name}
          </p>
        </AdvancedMarker>
      ))}

      {markers.map((marker) => (
        <AdvancedMarker
          position={marker}
          key={marker.id}
          onClick={() => navigate(marker.id)}
          title={marker.title}
        >
          <Pin scale={1.5} background="#00698B" borderColor="#fff" glyphColor="#fff">
            <StarIcon className="w-6 h-6" />
          </Pin>
        </AdvancedMarker>
      ))}
    </Map>
  );
}
