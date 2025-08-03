"use client";

import React from "react";
import { BusRoute } from "../data/busRoutes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "../context/LanguageContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Clock } from "lucide-react";

interface BusTimetableProps {
  route: BusRoute | null;
  className?: string;
}

// Mock timetable data - in a real app, this would come from an API or database
interface TimetableEntry {
  stopName: string;
  times: string[];
}

const generateMockTimetable = (route: BusRoute): TimetableEntry[] => {
  // Generate mock timetable data for the route
  return route.stops.map((stop) => {
    // Create 5 departure times starting from 7:00 AM with 30-minute intervals
    const times = [];
    for (let i = 0; i < 5; i++) {
      // Calculate hours and minutes
      const hour = 7 + Math.floor(i / 2);
      const minute = (i % 2) * 30;
      
      // Format the time
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      times.push(`${formattedHour}:${formattedMinute}`);
    }
    
    return {
      stopName: stop.name,
      times,
    };
  });
};

export default function BusTimetable({ route, className = "" }: BusTimetableProps) {
  const { t } = useLanguage();

  if (!route) {
    return null;
  }

  const timetableData = generateMockTimetable(route);

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>{t("timetable.title")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          {t("timetable.description")}
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("timetable.stopName")}</TableHead>
                <TableHead>{t("timetable.departureTimes")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timetableData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{entry.stopName}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {entry.times.map((time, timeIndex) => (
                        <span 
                          key={timeIndex} 
                          className="px-2 py-1 bg-muted rounded-md text-xs"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground italic">
          {t("timetable.disclaimer")}
        </div>
      </CardContent>
    </Card>
  );
}