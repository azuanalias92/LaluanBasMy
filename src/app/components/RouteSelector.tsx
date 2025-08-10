"use client";

import { useState } from "react";
import { BusRoute } from "../data/busRoutes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "../context/LanguageContext";
import { Badge } from "@/components/ui/badge";

interface RouteSelectorProps {
  routes: BusRoute[];
  onRouteSelect: (route: BusRoute | null) => void;
  className?: string;
}

export default function RouteSelector({ routes, onRouteSelect, className = "" }: RouteSelectorProps) {
  const [selectedRouteId, setSelectedRouteId] = useState<string>("");
  const { t } = useLanguage();

  const handleRouteChange = (routeId: string) => {
    setSelectedRouteId(routeId);

    if (routeId === "") {
      onRouteSelect(null);
    } else {
      const selectedRoute = routes.find((route) => route.id === routeId) || null;
      onRouteSelect(selectedRoute);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t("routeSelector.label")}</label>
        <Select value={selectedRouteId} onValueChange={handleRouteChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("routeSelector.placeholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="undefined">{t("routeSelector.placeholder")}</SelectItem>
            {routes.map((route) => (
              <SelectItem key={route.id} value={route.id}>
                <Badge variant="secondary" style={{ backgroundColor: `${route.color}20`, color: route.color }}>
                  {route.name}
                </Badge>
                - {route.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1 italic">{t("routeSelector.comingSoon")}</p>
      </div>
    </div>
  );
}
