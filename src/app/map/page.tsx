/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { busRoutes, BusRoute, BusStop } from "../data/busRoutes";
import { Navigation, Info } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

import RouteSelector from "../components/RouteSelector";
import TrainStyleRoute from "../components/TrainStyleRoute";
import NearestBusStop from "../components/NearestBusStop";
import BusTimetable from "../components/BusTimetable";

// Dynamically import the Map component with no SSR to avoid mapbox-gl issues
const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-muted animate-pulse rounded-lg flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-primary/20 rounded-full animate-bounce" />
        <div className="w-4 h-4 bg-primary/20 rounded-full animate-bounce [animation-delay:0.1s]" />
        <div className="w-4 h-4 bg-primary/20 rounded-full animate-bounce [animation-delay:0.2s]" />
        <span className="ml-2 text-muted-foreground">Loading Map...</span>
      </div>
    </div>
  ),
});

export default function MapPage() {
  const { t } = useLanguage();
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [nearestBusStop, setNearestBusStop] = useState<{ stop: BusStop; route: BusRoute; distance: number } | null>(null);
  const [showNearestStop, setShowNearestStop] = useState<boolean>(false);
  const mapRef = useRef<any>(null);

  // Function to handle when the user clicks the location button
  const handleLocationFound = (nearest: { stop: BusStop; route: BusRoute; distance: number } | null) => {
    setNearestBusStop(nearest);
    if (nearest) {
      setShowNearestStop(true);
    }
  };

  // Function to navigate to the nearest bus stop and scroll map into view on mobile
  const navigateToStop = () => {
    if (!mapRef.current || !nearestBusStop) return;

    // Move map to nearest bus stop
    mapRef.current.flyToStop(nearestBusStop.stop.coordinates);

    // If on mobile, scroll smoothly to the map container
    if (window.innerWidth <= 768) {
      const mapElement = document.getElementById("mapContainer");
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="container mx-auto p-2 sm:p-4 space-y-2">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          {/* <MapPin className="h-8 w-8 text-primary" /> */}
          <h1 className="text-3xl font-bold tracking-tight">{t("map.title")}</h1>
        </div>
        {/* <p className="text-muted-foreground">
          {t("map.subtitle")}
        </p> */}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Map Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center  justify-between">
                <div className="flex flex-col gap-4">
                  <CardTitle className="flex items-center space-x-2">
                    <Navigation className="h-5 w-5" />
                    <span>{t("map.routeExplorer")}</span>
                  </CardTitle>
                  <CardDescription>{t("map.routeExplorerDesc")}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <RouteSelector routes={busRoutes} onRouteSelect={setSelectedRoute} />
              <div className="rounded-lg overflow-hidden border">
                <Map ref={mapRef} selectedRoute={selectedRoute} busRoutes={busRoutes} onLocationFound={handleLocationFound} />
              </div>
            </CardContent>
          </Card>

          {selectedRoute && (
            <Card>
              <CardContent className="p-4">
                <TrainStyleRoute route={selectedRoute} />
              </CardContent>
            </Card>
          )}

          {/* Bus Timetable */}
          {selectedRoute && <BusTimetable route={selectedRoute} className="mt-6" />}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Route Visualization or Nearest Stop */}
          {showNearestStop && nearestBusStop && (
            <Card>
              <CardContent>
                <NearestBusStop stop={nearestBusStop.stop} route={nearestBusStop.route} distance={nearestBusStop.distance} onNavigate={navigateToStop} />
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span>{t("map.howToUse")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="mt-0.5">
                    1
                  </Badge>
                  <div>
                    <p className="font-medium">{t("map.step1.title")}</p>
                    <p className="text-muted-foreground">{t("map.step1.desc")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="mt-0.5">
                    2
                  </Badge>
                  <div>
                    <p className="font-medium">{t("map.step2.title")}</p>
                    <p className="text-muted-foreground">{t("map.step2.desc")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="mt-0.5">
                    3
                  </Badge>
                  <div>
                    <p className="font-medium">{t("map.step3.title")}</p>
                    <p className="text-muted-foreground">{t("map.step3.desc")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>{t("map.about.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{t("map.about.description")}</p>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">{t("map.features.title")}</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• {t("map.features.item1")}</li>
                  <li>• {t("map.features.item2")}</li>
                  <li>• {t("map.features.item3")}</li>
                  <li>• {t("map.features.item4")}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
