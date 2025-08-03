"use client";

import React from "react";
import { BusRoute } from "../data/busRoutes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "../context/LanguageContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Clock } from "lucide-react";
import { busTimeTables } from "../data/busTimeTable";

interface BusTimetableProps {
  route: BusRoute | null;
  className?: string;
}

// Mock timetable data - in a real app, this would come from an API or database
interface TimetableEntry {
  stopName: string;
  times: string[];
  addTime?: number;
}

const colors = [
  "bg-red-200",
  "bg-orange-200",
  "bg-amber-200",
  "bg-yellow-200",
  "bg-lime-200",
  "bg-green-200",
  "bg-emerald-200",
  "bg-teal-200",
  "bg-cyan-200",
  "bg-sky-200",
  "bg-blue-200",
  "bg-indigo-200",
  "bg-violet-200",
  "bg-purple-200",
  "bg-fuchsia-200",
  "bg-pink-200",
  "bg-rose-200",
  "bg-slate-200",
  "bg-gray-200",
  "bg-zinc-200",
  "bg-neutral-200",
  "bg-stone-200",
];

const getTimetable = (route: BusRoute): TimetableEntry[] => {
  const busTimeTable = busTimeTables.find((item) => item.id === route.id) || { timeTable: [{ name: route.name, time: ["7:00"], addTime: 0 }] };
  return busTimeTable.timeTable.map((stop) => {
    return {
      stopName: stop.name || route.name,
      times: stop.time || ["7:00"],
      addTime: stop.addTime || 0,
    };
  });
};

const addMinutes = (timeStr: string, minutesToAdd: number): string => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes + minutesToAdd);

  // Format to HH:mm without leading 0 in hour
  const resultHour = date.getHours();
  const resultMinute = date.getMinutes().toString().padStart(2, "0");

  return `${resultHour}:${resultMinute}`;
};

export default function BusTimetable({ route, className = "" }: BusTimetableProps) {
  const { t } = useLanguage();

  if (!route) {
    return null;
  }

  const timetableData = busTimeTables ? getTimetable(route) : null;

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>{t("timetable.title")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">{t("timetable.description")}</div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("timetable.stopName")}</TableHead>
                <TableHead>{t("timetable.departureTimes")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timetableData?.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{entry.stopName}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {timetableData[0].times.map((time, timeIndex) => {
                        console.log("entry", entry);
                        const colorClass = colors[timeIndex % colors.length];
                        const timeToDisplay = entry.addTime ? addMinutes(time, entry.addTime) : time;
                        return (
                          <span key={timeIndex} className={`px-2 py-1 ${colorClass} rounded-md text-xs`}>
                            {timeToDisplay}
                          </span>
                        );
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-xs text-muted-foreground italic">{t("timetable.disclaimer")}</div>
      </CardContent>
    </Card>
  );
}
