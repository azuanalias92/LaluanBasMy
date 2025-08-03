'use client';

import React from 'react';
import { BusRoute, BusStop } from '../data/busRoutes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NearestBusStopProps {
  stop: BusStop;
  route: BusRoute;
  distance: number;
  onNavigate?: () => void;
  className?: string;
}

export default function NearestBusStop({
  stop,
  route,
  distance,
  onNavigate,
  className = '',
}: NearestBusStopProps) {
  const { t } = useLanguage();

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-bold flex items-center justify-center gap-2">
          <MapPin className="h-5 w-5" style={{ color: route.color }} />
          <span style={{ color: route.color }}>{t('map.nearestStop')}</span>
        </h3>
        <p className="text-sm text-muted-foreground">{t('map.nearestStopDesc')}</p>
      </div>

      <div className="space-y-4 p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="font-medium">{stop.name}</div>
            <div className="text-xs text-muted-foreground">
              {stop.coordinates[1].toFixed(4)}, {stop.coordinates[0].toFixed(4)}
            </div>
          </div>
          <Badge
            variant="outline"
            className="h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 bg-background"
            style={{
              borderColor: route.color,
              color: route.color,
            }}
          >
            {distance.toFixed(2)} km
          </Badge>
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className="h-6 flex items-center justify-center"
              style={{ backgroundColor: `${route.color}20`, color: route.color }}
            >
              <Navigation className="h-3 w-3 mr-1" />
              {route.name}
            </Badge>
          </div>
        </div>

        {onNavigate && (
          <Button
            onClick={onNavigate}
            className="w-full mt-2"
            style={{
              backgroundColor: route.color,
              color: '#fff',
              border: 'none',
            }}
          >
            {t('map.navigateToStop')}
          </Button>
        )}
      </div>
    </div>
  );
}