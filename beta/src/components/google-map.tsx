import { Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { useParams, useSearchParams } from "react-router-dom";
import { getCoordinates, getEntryById } from "../lib/utils";
import data from "../data.json";

const INITIAL_CAMERA = {
  center: { lat: 40.157204, lng: -76.988973 },
  zoom: 18,
};

export default function GoogleMap() {
  const { entryId } = useParams();
  const map = useMap();
  const [searchParams] = useSearchParams();

  const entry = getEntryById(data, entryId);
  const markers = getCoordinates(data, entry?.location, searchParams.get("markers"));

  map?.setZoom(markers.length === 1 ? 19 : INITIAL_CAMERA.zoom);
  map?.setCenter(markers.length === 1 ? markers[0] : INITIAL_CAMERA.center);

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
        <Marker position={marker} key={marker.lat + marker.lng + Math.random()} />
      ))}
    </Map>
  );
}
