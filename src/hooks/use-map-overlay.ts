import { useMapsLibrary } from "@vis.gl/react-google-maps";

const basename = import.meta.env.VITE_BASE_PATH;

const BOUNDS: { [key: number]: [[number, number], [number, number]] } = {
  15: [
    [9375, 9377],
    [12385, 12387],
  ],
  16: [
    [18750, 18754],
    [24771, 24774],
  ],
  17: [
    [37501, 37509],
    [49542, 49548],
  ],
  18: [
    [75003, 75018],
    [99085, 99097],
  ],
  19: [
    [150007, 150037],
    [198170, 198195],
  ],
  20: [
    [300015, 300075],
    [396340, 396390],
  ],
};

export default function useMapOverlay() {
  const maps = useMapsLibrary("maps");

  if (maps) {
    return new maps.ImageMapType({
      getTileUrl(coords, zoom) {
        if (
          zoom < 15 ||
          zoom > 20 ||
          BOUNDS[zoom][0][0] > coords.x ||
          coords.x > BOUNDS[zoom][0][1] ||
          BOUNDS[zoom][1][0] > coords.y ||
          coords.y > BOUNDS[zoom][1][1]
        ) {
          return null;
        }

        return `${location.origin}${basename}/tiles/${zoom}/tile_${coords.x}x${coords.y}.webp`;
      },
      tileSize: new google.maps.Size(256, 256),
    });
  }

  return null;
}
