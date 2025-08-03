/**
 * Utility functions for Mapbox API operations
 */

import { BusStop } from "../data/busRoutes";

// Mapbox SDK for Directions API
import MapboxClient from "@mapbox/mapbox-sdk";
import MapboxDirections from "@mapbox/mapbox-sdk/services/directions";

// Use the environment variable for the Mapbox token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

// Initialize the Mapbox client and directions service
const baseClient = MapboxClient({ accessToken: MAPBOX_TOKEN });
const directionsClient = MapboxDirections(baseClient);

/**
 * Get route coordinates that follow roads between bus stops
 * @param stops Array of bus stops to create a route between
 * @returns Promise that resolves to an array of coordinates that follow roads
 */
export async function getRouteCoordinates(stops: BusStop[]): Promise<[number, number][]> {
  if (!stops || stops.length < 2) {
    return stops.map((stop) => stop.coordinates);
  }

  const routeLegs = [];
  if (stops.length > 24) {
    for (let i = 0; i < stops.length; i += 24) {
      if (i == 0) {
        routeLegs.push(stops.slice(i, i + 24));
      } else {
        routeLegs.push(stops.slice(i - 1, i + 24));
      }
    }
  } else {
    routeLegs.push(stops);
  }

  try {
    let coordinates: [number, number][] | PromiseLike<[number, number][]> = [];
    const geometryCoordinates: any[] = [];
    for (const stops of routeLegs) {
      console.log("stops", stops);
      // Create waypoints from bus stops
      const waypoints = stops.map((stop) => ({
        coordinates: stop.coordinates,
      }));

      // Request directions from Mapbox API
      const response = await directionsClient
        .getDirections({
          profile: "driving",
          waypoints,
          geometries: "geojson",
        })
        .send();

      // Extract the route coordinates from the response
      if (response.body.routes && response.body.routes.length > 0 && response.body.routes[0].geometry.coordinates) {
        for (const coord of response.body.routes[0].geometry.coordinates) {
          geometryCoordinates.push(coord);
        }
      }

      // Fallback to straight lines if no route is found
      coordinates = stops.map((stop) => stop.coordinates);
    }

    if (geometryCoordinates.length > 0) {
      return geometryCoordinates;
    } else {
      return coordinates;
    }
  } catch (error) {
    console.error("Error fetching route directions:", error);
    // Fallback to straight lines if there's an error
    const coordinates = stops.map((stop) => stop.coordinates);
    if (isLoop && coordinates.length > 0) {
      coordinates.push(coordinates[0]); // Add first point again to close the loop
    }
    return coordinates;
  }
}

/**
 * Create a GeoJSON source for a route that follows roads
 * @param map The Mapbox map instance
 * @param sourceId The ID for the GeoJSON source
 * @param stops Array of bus stops to create a route between
 * @param color The color of the route line
 * @param isLoop Whether to create a loop by connecting the last stop back to the first
 * @returns Promise that resolves when the route is added to the map
 */
export async function addRouteToMap(map: mapboxgl.Map, sourceId: string, stops: BusStop[], color: string, geometries: [number, number][]): Promise<void> {
  try {
    // Get route coordinates that follow roads
    const coordinates = geometries ? geometries : await getRouteCoordinates(stops);

    // Add the source if it doesn't exist
    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, {
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
    } else {
      // Update the existing source
      const source = map.getSource(sourceId) as mapboxgl.GeoJSONSource;
      source.setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates,
        },
      });
    }

    // Add the layer if it doesn't exist
    if (!map.getLayer(sourceId)) {
      map.addLayer({
        id: sourceId,
        type: "line",
        source: sourceId,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": color,
          "line-width": 4,
          "line-opacity": 0.8,
        },
      });
    }
  } catch (error) {
    console.error("Error adding route to map:", error);
  }
}
