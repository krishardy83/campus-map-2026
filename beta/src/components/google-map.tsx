import { Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { useParams } from "react-router-dom";
import { getCoordinates, getEntryById } from "../lib/utils";
import data from "../data.json";

const INITIAL_CAMERA = {
  center: { lat: 40.157204, lng: -76.988973 },
  zoom: 18,
};

export default function GoogleMap() {
  const { entryId } = useParams();
  const map = useMap();
  const position = getCoordinates(getEntryById(data, entryId)?.location);

  map?.setZoom(position ? 19 : INITIAL_CAMERA.zoom);
  map?.setCenter(position || INITIAL_CAMERA.center);

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
      {position ? <Marker position={position} /> : null}
    </Map>
  );
}
