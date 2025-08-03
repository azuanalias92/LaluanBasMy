/**
 * Utility functions for location-based operations
 */

import { BusRoute, BusStop } from '../data/busRoutes';

/**
 * Calculate the distance between two coordinates using the Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Find the nearest bus stop from a given location
 * @param userLat User's latitude
 * @param userLng User's longitude
 * @param routes Array of bus routes to search through
 * @returns Object containing the nearest stop and its route
 */
export function findNearestBusStop(
  userLat: number,
  userLng: number,
  routes: BusRoute[]
): { stop: BusStop; route: BusRoute; distance: number } | null {
  if (!routes || routes.length === 0) return null;

  let nearestStop: BusStop | null = null;
  let nearestRoute: BusRoute | null = null;
  let minDistance = Infinity;

  routes.forEach((route) => {
    route.stops.forEach((stop) => {
      // stop.coordinates is [longitude, latitude]
      const distance = calculateDistance(
        userLat,
        userLng,
        stop.coordinates[1],
        stop.coordinates[0]
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestStop = stop;
        nearestRoute = route;
      }
    });
  });

  if (nearestStop && nearestRoute) {
    return {
      stop: nearestStop,
      route: nearestRoute,
      distance: minDistance,
    };
  }

  return null;
}