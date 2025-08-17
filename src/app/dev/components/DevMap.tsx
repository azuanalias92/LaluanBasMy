"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { BusStop } from "../../data/busRoutes";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
mapboxgl.accessToken = MAPBOX_TOKEN;

interface DevMapProps {
  stops: BusStop[];
  onCoordinateSelect: (coordinates: [number, number]) => void;
  selectedStopIndex: number;
  className?: string;
}

export default function DevMap({ 
  stops, 
  onCoordinateSelect, 
  selectedStopIndex, 
  className = "w-full h-[400px] rounded-lg" 
}: DevMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [lng, setLng] = useState(100.367821);
  const [lat, setLat] = useState(6.1248);
  const [zoom, setZoom] = useState(12);

  function initMap() {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      if (map.current) {
        setLng(parseFloat(map.current.getCenter().lng.toFixed(6)));
        setLat(parseFloat(map.current.getCenter().lat.toFixed(6)));
        setZoom(parseFloat(map.current.getZoom().toFixed(2)));
      }
    });

    // Add click handler for coordinate selection
    map.current.on("click", (e) => {
      const coordinates: [number, number] = [
        parseFloat(e.lngLat.lng.toFixed(6)),
        parseFloat(e.lngLat.lat.toFixed(6))
      ];
      onCoordinateSelect(coordinates);
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add geolocate control
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    }), "top-right");
  }

  // Update markers when stops change
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for all stops
    stops.forEach((stop, index) => {
      if (stop.name && stop.coordinates[0] !== 0 && stop.coordinates[1] !== 0) {
        const el = document.createElement("div");
        el.className = "dev-stop-marker";
        el.style.width = "32px";
        el.style.height = "32px";
        el.style.borderRadius = "50%";
        el.style.backgroundColor = index === selectedStopIndex ? "#ef4444" : "#3b82f6";
        el.style.border = "3px solid white";
        el.style.color = "white";
        el.style.fontWeight = "bold";
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
        el.style.fontSize = "12px";
        el.style.cursor = "pointer";
        el.innerHTML = `${index + 1}`;

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(stop.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div style="text-align: center;">
                <div style="font-weight: bold;">${stop.name}</div>
                <div style="font-size: 12px; color: #666;">
                  ${stop.coordinates[0]}, ${stop.coordinates[1]}
                </div>
                ${index === selectedStopIndex ? '<div style="color: #ef4444; font-size: 12px;">Currently selected</div>' : ''}
              </div>`
            )
          )
          .addTo(map.current!);

        markersRef.current.push(marker);
      }
    });

    // Fit bounds to show all stops if there are any
    if (stops.length > 0 && stops.some(stop => stop.coordinates[0] !== 0 && stop.coordinates[1] !== 0)) {
      const bounds = new mapboxgl.LngLatBounds();
      stops.forEach((stop) => {
        if (stop.coordinates[0] !== 0 && stop.coordinates[1] !== 0) {
          bounds.extend(stop.coordinates);
        }
      });

      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
      });
    }
  }, [stops, selectedStopIndex]);

  useEffect(() => {
    initMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
        <div className="flex justify-between">
          <span>Click on map to set coordinates for selected stop</span>
          <span>Lng: {lng}, Lat: {lat}, Zoom: {zoom}</span>
        </div>
      </div>
      <div ref={mapContainer} className={className} />
    </div>
  );
}