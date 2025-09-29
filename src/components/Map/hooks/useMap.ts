import { useEffect, useRef } from "react";
import { MapboxOverlay } from "@deck.gl/mapbox";
import maplibregl from "maplibre-gl";
import mapDarkStyles from "../constants/dark-map-style.json";

export function useMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<MapboxOverlay | null>(null);

  // Setup map + overlay
  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      // @ts-expect-error: custom styling
      style: mapDarkStyles,
      center: [11.0, 48.0],
      zoom: 8,
      maplibreLogo: false,
      attributionControl: false,
    });

    const overlay = new MapboxOverlay({ layers: [] });
    overlayRef.current = overlay;
    map.addControl(overlay);

    return () => {
      overlay.finalize();
      map.remove();
    };
  }, []);

  return { mapContainer, overlayRef };
}
