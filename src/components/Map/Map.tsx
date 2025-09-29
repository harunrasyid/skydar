import "maplibre-gl/dist/maplibre-gl.css";
import { useMap } from "./hooks/useMap";
import { Stack } from "@chakra-ui/react";
import { styles } from "./Map.style";
import { useData } from "@/hooks/useData";
import { useEffect } from "react";
import { ScenegraphLayer } from "deck.gl";

type Aircraft = {
  icao24: string;
  callsign: string | null;
  origin_country: string;
  time_position: number | null;
  last_contact: number;
  longitude: number | null;
  latitude: number | null;
  baro_altitude: number | null; // meters
  on_ground: boolean;
  velocity: number | null; // m/s
  true_track: number | null; // degrees
  vertical_rate: number | null; // m/s
};

export const Map = () => {
  const { mapContainer, overlayRef } = useMap();
  const { data } = useData();

  const modelUrl = "/vehicle.glb";

  useEffect(() => {
    if (mapContainer.current && overlayRef.current && data) {
      const states = data?.states || [];
      const parsed: Aircraft[] = states
        .map((s: any) => ({
          icao24: s[0],
          callsign: s[1] ? s[1].trim() : null,
          origin_country: s[2],
          time_position: s[3],
          last_contact: s[4],
          longitude: s[5],
          latitude: s[6],
          baro_altitude: s[7],
          on_ground: s[8],
          velocity: s[9],
          true_track: s[10],
          vertical_rate: s[11],
        }))
        .filter((a: Aircraft) => a.latitude !== null && a.longitude !== null);

      const markers = parsed.map((a) => ({
        position: [a.longitude as number, a.latitude as number],
        icao24: a.icao24,
        callsign: a.callsign,
        altitude: a.baro_altitude,
        speed: a.velocity,
        heading: a.true_track,
        on_ground: a.on_ground,
      }));

      const vehicleLayer = new ScenegraphLayer({
        id: "aircraft-scenegraph",
        data: markers,
        scenegraph: modelUrl,
        getPosition: (d: any) => [
          d.position[0],
          d.position[1],
          d.altitude ?? 1000,
        ],
        getOrientation: (d: any) => [0, d.heading ?? 0, 90],
        getScale: [10000, 10000, 10000],
        sizeScale: 1,
        pickable: true,
      });

      overlayRef.current.setProps({
        layers: [vehicleLayer],
      });
    }
  }, [data, mapContainer, overlayRef]);

  return <Stack ref={mapContainer} css={styles.map} />;
};
