import { useNavigate } from "react-router-dom";
import { Map, Marker, useMap } from "@vis.gl/react-google-maps";
import useMapOverlay from "../hooks/use-map-overlay";
import useMapMarkers from "../hooks/use-map-markers";
import { getBaseUrl } from "../lib/utils";

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
  map?.overlayMapTypes.push(overlay);

  return (
    <Map
      defaultCenter={INITIAL_CAMERA.center}
      defaultZoom={INITIAL_CAMERA.zoom}
      className="h-dvh"
      disableDefaultUI
      fullscreenControl
      zoomControl
      mapTypeId="satellite"
    >
      {markers.map((marker) => (
        <Marker
          position={marker}
          key={marker.lat + marker.lng + Math.random()}
          onClick={() => navigate(marker.id)}
          icon={getBaseUrl("images/marker-light.png")}
        />
      ))}
    </Map>
  );
}
