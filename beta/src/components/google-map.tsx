import { useNavigate } from "react-router-dom";
import { AdvancedMarker, Map, Pin, useMap } from "@vis.gl/react-google-maps";
import { StarIcon } from "@heroicons/react/24/solid";
import useMapOverlay from "../hooks/use-map-overlay";
import useMapMarkers from "../hooks/use-map-markers";

const INITIAL_CAMERA = {
  center: { lat: 40.157204, lng: -76.988973 },
  zoom: 18,
};

export default function GoogleMap() {
  const navigate = useNavigate();
  const map = useMap();
  const overlay = useMapOverlay();
  const markers = useMapMarkers();

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
    >
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
