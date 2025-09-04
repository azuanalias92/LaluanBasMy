/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState, useImperativeHandle } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { BusRoute, BusStop } from "../data/busRoutes";
import { findNearestBusStop } from "../utils/locationUtils";
// Note: mapboxUtils is imported dynamically in the component to avoid SSR issues

// Use the environment variable for the Mapbox token
// Make sure to add your token to .env.local file
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapProps {
  initialLng?: number;
  initialLat?: number;
  initialZoom?: number;
  className?: string;
  selectedRoute?: BusRoute | null;
  busRoutes: BusRoute[];
  onLocationFound?: (nearest: { stop: BusStop; route: BusRoute; distance: number } | null) => void;
}

const Map = React.forwardRef<
  {
    flyToStop: (coordinates: [number, number]) => void;
  },
  MapProps
>(function Map(
  {
    initialLng = 100.367821, // Default to Alor Setar coordinates
    initialLat = 6.1248,
    initialZoom = 12,
    className = "w-full h-[500px] rounded-lg",
    selectedRoute = null,
    busRoutes = [],
    onLocationFound,
  },
  ref
) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(initialLng);
  const [lat, setLat] = useState(initialLat);
  const [zoom, setZoom] = useState(initialZoom);
  const routeMarkersRef = useRef<mapboxgl.Marker[]>([]);
  const routeLineRef = useRef<string | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  //const [nearestBusStop, setNearestBusStop] = useState<{ stop: BusStop; route: BusRoute; distance: number } | null>(null);

  const geolocateControlRef = useRef<mapboxgl.GeolocateControl | null>(null);

  function addNearestStopLogic() {
    // Remove previous control if exists
    if (geolocateControlRef.current && map.current) {
      map.current.removeControl(geolocateControlRef.current);
      geolocateControlRef.current.off("geolocate", handleGeolocate); // remove old listener
    }

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    });

    geolocateControlRef.current = geolocateControl;
    map.current?.addControl(geolocateControl, "top-right");

    geolocateControl.on("geolocate", handleGeolocate);
  }

  const handleGeolocate = async (e: GeolocationPosition) => {
    const userLat = e.coords.latitude;
    const userLng = e.coords.longitude;

    const filterBusRoutes = selectedRoute ? busRoutes.filter((route) => route.id === selectedRoute.id) : busRoutes;

    const nearest = findNearestBusStop(userLat, userLng, filterBusRoutes);
    //setNearestBusStop(nearest);

    onLocationFound?.(nearest);

    if (!map.current) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setLngLat([userLng, userLat]);
    } else {
      userMarkerRef.current = new mapboxgl.Marker({ color: "#FF0000" }).setLngLat([userLng, userLat]).addTo(map.current);
    }

    if (nearest) {
      const lineSourceId = "nearest-stop-line";

      if (map.current.getSource(lineSourceId)) {
        map.current.removeLayer(lineSourceId);
        map.current.removeSource(lineSourceId);
      }

      try {
        const { getRouteCoordinates } = await import("../utils/mapboxUtils");
        const coordinates = await getRouteCoordinates([{ name: "Your Location", coordinates: [userLng, userLat] }, nearest.stop]);

        map.current.addSource(lineSourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: { type: "LineString", coordinates },
            properties: {},
          },
        });

        map.current.addLayer({
          id: lineSourceId,
          type: "line",
          source: lineSourceId,
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#FF0000", "line-width": 3, "line-dasharray": [2, 1] },
        });
      } catch (err) {
        console.error("Error getting route coordinates", err);
      }
    }
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    flyToStop: (coordinates: [number, number]) => {
      if (map.current) {
        map.current.flyTo({
          center: coordinates,
          zoom: 15,
          essential: true,
        });
      }
    },
  }));

  function initMap() {
    if (map.current) return; // initialize map only once

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });

      map.current.on("move", () => {
        if (map.current) {
          setLng(parseFloat(map.current.getCenter().lng.toFixed(4)));
          setLat(parseFloat(map.current.getCenter().lat.toFixed(4)));
          setZoom(parseFloat(map.current.getZoom().toFixed(2)));
        }
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    }
  }

  useEffect(() => {
    initMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Effect to handle route changes
  useEffect(() => {
    if (!map.current || !map.current.loaded()) return;

    // Clear previous markers
    routeMarkersRef.current.forEach((marker) => marker.remove());
    routeMarkersRef.current = [];

    // Remove previous route line
    if (routeLineRef.current && map.current.getSource(routeLineRef.current)) {
      map.current.removeLayer(routeLineRef.current);
      map.current.removeSource(routeLineRef.current);
      routeLineRef.current = null;
    }

    if (!selectedRoute) return;

    // Add train-style markers for each stop
    selectedRoute.stops.forEach((stop, index) => {
      // Create a custom HTML element for the marker
      const el = document.createElement("div");
      el.className = "train-stop-marker";
      el.style.width = "28px";
      el.style.height = "28px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = "white";
      el.style.border = `2px solid ${selectedRoute.color}`;
      el.style.color = selectedRoute.color;
      el.style.fontWeight = "bold";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.fontSize = "12px";
      el.innerHTML = `${index + 1}`;

      // Create the marker with the custom element
      if (stop.marker != false) {
        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(stop.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div style="text-align: center;">
            <div style="font-weight: bold; color: ${selectedRoute.color};">${stop.name}</div>
          </div>`
            )
          )
          .addTo(map.current!);
        routeMarkersRef.current.push(marker);
      }
    });

    // Add route line that follows roads
    const sourceId = `route-${selectedRoute.id}`;
    routeLineRef.current = sourceId;

    // Import dynamically to avoid server-side rendering issues
    import("../utils/mapboxUtils")
      .then(({ addRouteToMap }) => {
        if (map.current) {
          // Create a loop route by connecting the last stop back to the first
          addRouteToMap(map.current, sourceId, selectedRoute.stops, selectedRoute.color, selectedRoute?.geometries).catch((error) => {
            console.error("Failed to add route to map:", error);

            // Fallback to straight lines if the directions API fails
            if (map.current) {
              // Create coordinates array with the first point repeated at the end to form a loop
              const coordinates = selectedRoute.stops.map((stop) => stop.coordinates);
              if (coordinates.length > 0) {
                coordinates.push(coordinates[0]); // Add first point again to close the loop
              }

              map.current.addSource(sourceId, {
                type: "geojson",
                data: {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates,
                  },
                },
              });

              map.current.addLayer({
                id: sourceId,
                type: "line",
                source: sourceId,
                layout: {
                  "line-join": "round",
                  "line-cap": "round",
                },
                paint: {
                  "line-color": selectedRoute.color,
                  "line-width": 4,
                  "line-opacity": 0.8,
                },
              });
            }
          });
        }
      })
      .catch((error) => {
        console.error("Failed to import mapboxUtils:", error);
      });

    // Fit bounds to show the entire route
    if (selectedRoute.stops.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      selectedRoute.stops.forEach((stop) => {
        bounds.extend(stop.coordinates);
      });

      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
      });
    }

    // Add geolocate control
    addNearestStopLogic();
  }, [selectedRoute, busRoutes]);

  return (
    <div className="map-wrapper">
      <div className="map-info bg-white dark:bg-gray-800 p-2 m-2 rounded shadow  z-10 text-sm">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div id="mapContainer" ref={mapContainer} className={className} />
    </div>
  );
});

export default Map;
