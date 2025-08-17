"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus, Download, Upload, MapPin } from "lucide-react";
import { BusRoute, BusStop } from "../data/busRoutes";
import DevMap from "./components/DevMap";

interface RouteFormData {
  id: string;
  name: string;
  description: string;
  color: string;
  stops: BusStop[];
  geometries: [number, number][];
}

export default function DevPage() {
  const [formData, setFormData] = useState<RouteFormData>({
    id: "",
    name: "",
    description: "",
    color: "#2BB573",
    stops: [], // Start with empty stops array
    geometries: [],
  });

  const [geometriesText, setGeometriesText] = useState("");
  const [previewJson, setPreviewJson] = useState("");
  const [selectedStopIndex, setSelectedStopIndex] = useState(0);

  const addStop = () => {
    setFormData((prev) => ({
      ...prev,
      stops: [...prev.stops, { name: "", coordinates: [0, 0] }],
    }));
    setSelectedStopIndex(formData.stops.length);
  };

  const removeStop = (index: number) => {
    if (formData.stops.length > 1) {
      setFormData((prev) => ({
        ...prev,
        stops: prev.stops.filter((_, i) => i !== index),
      }));
      if (selectedStopIndex >= index && selectedStopIndex > 0) {
        setSelectedStopIndex(selectedStopIndex - 1);
      }
    }
  };

  const updateStop = (index: number, field: keyof BusStop, value: string | [number, number]) => {
    setFormData((prev) => ({
      ...prev,
      stops: prev.stops.map((stop, i) => (i === index ? { ...stop, [field]: value } : stop)),
    }));
  };

  const handleCoordinateSelect = (coordinates: [number, number]) => {
    setFormData((prev) => {
      const stopNumber = prev.stops.length + 1;
      const newStopName = `Stop ${stopNumber}`;
      const updatedStops = [...prev.stops, { name: newStopName, coordinates }];

      // Select the newly added stop immediately
      setSelectedStopIndex(updatedStops.length - 1);

      return {
        ...prev,
        stops: updatedStops,
      };
    });
  };

  const updateGeometries = (text: string) => {
    setGeometriesText(text);
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        setFormData((prev) => ({ ...prev, geometries: parsed }));
      }
    } catch {
      // Invalid JSON, keep existing geometries
    }
  };

  const generatePreview = () => {
    const route: BusRoute = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
      color: formData.color,
      stops: formData.stops,
      ...(formData.geometries.length > 0 && { geometries: formData.geometries }),
    };
    setPreviewJson(JSON.stringify(route, null, 2));
  };

  const downloadJson = () => {
    const route: BusRoute = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
      color: formData.color,
      stops: formData.stops,
      ...(formData.geometries.length > 0 && { geometries: formData.geometries }),
    };

    const blob = new Blob([JSON.stringify(route, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `route-${formData.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const route = JSON.parse(e.target?.result as string) as BusRoute;
          setFormData({
            id: route.id,
            name: route.name,
            description: route.description,
            color: route.color,
            stops: route.stops,
            geometries: route.geometries || [],
          });
          if (route.geometries) {
            setGeometriesText(JSON.stringify(route.geometries, null, 2));
          }
        } catch {
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  console.log("selectedStopIndex", selectedStopIndex);

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Route Development Tool</h1>
          <p className="text-muted-foreground mt-2">Create and manage bus routes for the application</p>
        </div>

        {/* Interactive Map */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Map</CardTitle>
            <CardDescription>Click on the map to set coordinates for the selected stop (Stop {selectedStopIndex + 1})</CardDescription>
          </CardHeader>
          <CardContent>
            <DevMap stops={formData.stops} onCoordinateSelect={handleCoordinateSelect} selectedStopIndex={selectedStopIndex} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Route Form */}
          <Card>
            <CardHeader>
              <CardTitle>Route Information</CardTitle>
              <CardDescription>Basic route details and configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="routeId">Route ID</Label>
                <Input id="routeId" value={formData.id} onChange={(e) => setFormData((prev) => ({ ...prev, id: e.target.value }))} placeholder="e.g., k10, k100" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="routeName">Route Name</Label>
                <Input id="routeName" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} placeholder="e.g., K10, K100" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="routeDescription">Description</Label>
                <Input
                  id="routeDescription"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="e.g., Shahab Perdana <-> Kuala Kedah"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="routeColor">Route Color</Label>
                <div className="flex gap-2">
                  <Input id="routeColor" type="color" value={formData.color} onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))} className="w-16 h-10" />
                  <Input value={formData.color} onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))} placeholder="#2BB573" className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>File Operations</Label>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => document.getElementById("fileInput")?.click()} className="flex-1">
                    <Upload className="h-4 w-4 mr-2" />
                    Load JSON
                  </Button>
                  <Button variant="outline" onClick={downloadJson} className="flex-1" disabled={!formData.id}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
                <input id="fileInput" type="file" accept=".json" onChange={loadFromFile} className="hidden" />
              </div>
            </CardContent>
          </Card>

          {/* Bus Stops */}
          <Card>
            <CardHeader>
              <CardTitle>Bus Stops</CardTitle>
              <CardDescription>Define the stops along this route</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground mb-3 p-2 bg-muted rounded">
                <strong>Tip:</strong> Click on a stop below to select it, then click on the map above to set its coordinates.
              </div>
              <div className="max-h-96 overflow-y-auto space-y-3">
                {formData.stops.map((stop, index) => (
                  <div
                    key={index}
                    className={`p-3 border rounded-lg space-y-2 cursor-pointer transition-colors ${
                      selectedStopIndex === index ? "border-blue-500 bg-blue-50 dark:bg-blue-950" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedStopIndex(index)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm font-medium">Stop {index + 1}</Label>
                        {selectedStopIndex === index && <MapPin className="h-4 w-4 text-blue-500" />}
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeStop(index);
                        }}
                        disabled={formData.stops.length === 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Input value={stop.name} onChange={(e) => updateStop(index, "name", e.target.value)} placeholder="Stop name" className="mb-2" />

                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="number"
                          step="any"
                          value={stop.coordinates[0]}
                          onChange={(e) => updateStop(index, "coordinates", [parseFloat(e.target.value) || 0, stop.coordinates[1]])}
                          placeholder="Longitude"
                        />
                        <Input
                          type="number"
                          step="any"
                          value={stop.coordinates[1]}
                          onChange={(e) => updateStop(index, "coordinates", [stop.coordinates[0], parseFloat(e.target.value) || 0])}
                          placeholder="Latitude"
                        />
                      </div>
                      {stop.coordinates[0] !== 0 && stop.coordinates[1] !== 0 && (
                        <div className="text-xs text-muted-foreground">
                          Coordinates: {stop.coordinates[0]}, {stop.coordinates[1]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={addStop} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Stop
              </Button>
            </CardContent>
          </Card>

          {/* Geometries */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Route Geometries (Optional)</CardTitle>
              <CardDescription>JSON array of [longitude, latitude] coordinates for route path</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={geometriesText}
                onChange={(e) => updateGeometries(e.target.value)}
                placeholder="[[100.35422, 6.140157], [100.353095, 6.140018], ...]"
                className="min-h-32 font-mono text-sm"
              />
            </CardContent>
          </Card> */}

          {/* JSON Preview */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Route Preview</CardTitle>
              <CardDescription>Generated route object</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={generatePreview} variant="outline" className="w-full">
                Generate Preview
              </Button>

              {previewJson && <Textarea value={previewJson} readOnly className="min-h-32 font-mono text-sm" />}

              <div className="text-sm text-muted-foreground">
                <p>
                  <strong>Instructions:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Fill in the route information and stops</li>
                  <li>Click &quot;Generate Preview&quot; to see the JSON output</li>
                  <li>Copy the JSON and manually add it to src/app/data/busRoutes.ts</li>
                  <li>Use &quot;Download&quot; to save the route as a JSON file</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
