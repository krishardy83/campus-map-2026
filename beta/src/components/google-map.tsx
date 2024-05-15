import { useNavigate } from "react-router-dom";
import { AdvancedMarker, Map, Pin, useMap } from "@vis.gl/react-google-maps";
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
  map?.overlayMapTypes.push(overlay);

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
          key={marker.lat + marker.lng + Math.random()}
          onClick={() => navigate(marker.id)}
          title={marker.title}
        >
          <Pin scale={1.5} background="#00698B" borderColor="#fff" glyphColor="#fff">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
          </Pin>
        </AdvancedMarker>
      ))}
    </Map>
  );
}
