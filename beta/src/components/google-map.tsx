import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";

const API_KEY = "AIzaSyDuK03Xp4KZdkHVHnsuV0Q46uVR5W7ECcU";

function CustomMap() {
  const map = useMap();
  const position = { lat: 40.157204, lng: -76.988973 };

  if (!map) {
    return null;
  }

  return (
    <Map
      defaultCenter={position}
      defaultZoom={17}
      className="h-dvh"
      disableDefaultUI
      fullscreenControl
      zoomControl
      mapTypeId="satellite"
    >
      <Marker position={position} />
    </Map>
  );
}

function GoogleMap() {
  return (
    <APIProvider apiKey={API_KEY}>
      <CustomMap />
    </APIProvider>
  );
}

export default GoogleMap;
