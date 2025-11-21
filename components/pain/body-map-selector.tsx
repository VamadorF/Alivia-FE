"use client";

import { useState } from "react";
import { PainLocation } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BodyMapSelectorProps {
  selectedLocations: PainLocation[];
  onLocationToggle: (location: PainLocation) => void;
}

interface BodyPart {
  location: PainLocation;
  label: string;
  position: { x: number; y: number };
}

const bodyParts: BodyPart[] = [
  { location: "head", label: "Cabeza", position: { x: 50, y: 10 } },
  { location: "neck", label: "Cuello", position: { x: 50, y: 18 } },
  { location: "shoulders", label: "Hombros", position: { x: 50, y: 26 } },
  { location: "chest", label: "Pecho", position: { x: 50, y: 34 } },
  { location: "upper-back", label: "Espalda Alta", position: { x: 50, y: 42 } },
  { location: "abdomen", label: "Abdomen", position: { x: 50, y: 50 } },
  { location: "lower-back", label: "Espalda Baja", position: { x: 50, y: 58 } },
  { location: "left-arm", label: "Brazo Izq.", position: { x: 30, y: 35 } },
  { location: "right-arm", label: "Brazo Der.", position: { x: 70, y: 35 } },
  { location: "left-hand", label: "Mano Izq.", position: { x: 25, y: 50 } },
  { location: "right-hand", label: "Mano Der.", position: { x: 75, y: 50 } },
  { location: "left-leg", label: "Pierna Izq.", position: { x: 43, y: 75 } },
  { location: "right-leg", label: "Pierna Der.", position: { x: 57, y: 75 } },
  { location: "left-foot", label: "Pie Izq.", position: { x: 43, y: 90 } },
  { location: "right-foot", label: "Pie Der.", position: { x: 57, y: 90 } },
];

const specialLocations: BodyPart[] = [
  { location: "joints", label: "Articulaciones", position: { x: 20, y: 10 } },
  { location: "full-body", label: "Cuerpo Completo", position: { x: 20, y: 20 } },
];

export function BodyMapSelector({ selectedLocations, onLocationToggle }: BodyMapSelectorProps) {
  const [view, setView] = useState<"front" | "back" | "list">("list");

  const isSelected = (location: PainLocation) => selectedLocations.includes(location);

  return (
    <Card className="border-sky-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-sky-900">Localización del Dolor</CardTitle>
        <CardDescription>Selecciona todas las áreas donde sientes dolor</CardDescription>
      </CardHeader>
      <CardContent>
        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView("front")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === "front"
                ? "bg-sky-600 text-white"
                : "bg-sky-100 text-sky-700 hover:bg-sky-200"
            }`}
          >
            Vista Frontal
          </button>
          <button
            onClick={() => setView("back")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === "back"
                ? "bg-sky-600 text-white"
                : "bg-sky-100 text-sky-700 hover:bg-sky-200"
            }`}
          >
            Vista Posterior
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === "list"
                ? "bg-sky-600 text-white"
                : "bg-sky-100 text-sky-700 hover:bg-sky-200"
            }`}
          >
            Lista
          </button>
        </div>

        {/* Body Map View */}
        {(view === "front" || view === "back") && (
          <div className="relative w-full max-w-md mx-auto">
            {/* Simple body silhouette */}
            <div className="relative w-full h-96 bg-gradient-to-b from-sky-50 to-indigo-50 rounded-2xl border-2 border-sky-200 overflow-hidden">
              {/* Body Parts */}
              {bodyParts.map((part) => (
                <button
                  key={part.location}
                  onClick={() => onLocationToggle(part.location)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-110 ${
                    isSelected(part.location)
                      ? "bg-red-500 text-white shadow-lg"
                      : "bg-white text-sky-700 border border-sky-300 hover:bg-sky-100"
                  }`}
                  style={{
                    left: `${part.position.x}%`,
                    top: `${part.position.y}%`,
                  }}
                >
                  {part.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* List View */}
        {view === "list" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {bodyParts.map((part) => (
                <button
                  key={part.location}
                  onClick={() => onLocationToggle(part.location)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isSelected(part.location)
                      ? "bg-red-500 text-white shadow-md"
                      : "bg-white text-sky-700 border border-sky-300 hover:bg-sky-100"
                  }`}
                >
                  {part.label}
                </button>
              ))}
            </div>
            
            {/* Special Locations */}
            <div className="mt-4 pt-4 border-t border-sky-200">
              <p className="text-sm text-gray-600 mb-2">Ubicaciones especiales:</p>
              <div className="flex gap-2 flex-wrap">
                {specialLocations.map((part) => (
                  <button
                    key={part.location}
                    onClick={() => onLocationToggle(part.location)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isSelected(part.location)
                        ? "bg-red-500 text-white shadow-md"
                        : "bg-white text-sky-700 border border-sky-300 hover:bg-sky-100"
                    }`}
                  >
                    {part.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Selected Locations Summary */}
        {selectedLocations.length > 0 && (
          <div className="mt-6 pt-6 border-t border-sky-200">
            <p className="text-sm text-gray-600 mb-2">Áreas seleccionadas:</p>
            <div className="flex flex-wrap gap-2">
              {selectedLocations.map((location) => {
                const part = [...bodyParts, ...specialLocations].find(p => p.location === location);
                return (
                  <Badge
                    key={location}
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-600"
                  >
                    {part?.label || location}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
