"use client";

import React from "react";
import { BusRoute } from "../data/busRoutes";
import { Badge } from "@/components/ui/badge";

interface TrainStyleRouteProps {
  route: BusRoute | null;
  className?: string;
}

export default function TrainStyleRoute({ route, className = "" }: TrainStyleRouteProps) {
  if (!route) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-bold" style={{ color: route.color }}>
          {route.name}
        </h3>
        <p className="text-sm text-muted-foreground">{route.description}</p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {route.stops.map((stop, index) => (
          <div key={index} className="contents">
            <div className="items-center">
              {/* Bullet */}
              <div className="flex flex-col items-center">
                <Badge
                  variant="outline"
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 bg-background"
                  style={{
                    borderColor: route.color,
                    color: route.color,
                  }}
                >
                  {index + 1}
                </Badge>
              </div>
            </div>
            <div className="col-span-2 items-center">
              <div className="font-medium text-sm leading-tight">{stop.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {stop.coordinates[1].toFixed(4)}, {stop.coordinates[0].toFixed(4)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
