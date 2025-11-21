"use client";

import { Medication, MedicationCategory } from "@/types";
import { CircularMedicationCard } from "./circular-medication-card";
import { sortByNextDose, groupByCategory } from "@/data/medications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface MedicationStackProps {
  medications: Medication[];
  onMedicationClick?: (medication: Medication) => void;
}

const categoryLabels: Record<MedicationCategory, string> = {
  pain: "Dolor",
  mood: "Ánimo",
  chronic: "Crónico",
  supplement: "Suplemento",
  other: "Otro",
};

const categoryColors: Record<MedicationCategory, string> = {
  pain: "from-red-100 to-red-200 text-red-700 border-red-300",
  mood: "from-pink-100 to-pink-200 text-pink-700 border-pink-300",
  chronic: "from-purple-100 to-purple-200 text-purple-700 border-purple-300",
  supplement: "from-amber-100 to-amber-200 text-amber-700 border-amber-300",
  other: "from-gray-100 to-gray-200 text-gray-700 border-gray-300",
};

export function MedicationStack({ medications, onMedicationClick }: MedicationStackProps) {
  const [view, setView] = useState<"proximity" | "category">("proximity");

  const sortedByProximity = sortByNextDose(medications);
  const groupedByCategory = groupByCategory(medications);

  return (
    <Card className="border-sky-200 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl text-sky-900">Mis Medicamentos</CardTitle>
          <div className="flex gap-2">
            <button
              onClick={() => setView("proximity")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                view === "proximity"
                  ? "bg-sky-600 text-white"
                  : "bg-sky-100 text-sky-700 hover:bg-sky-200"
              }`}
            >
              Por Proximidad
            </button>
            <button
              onClick={() => setView("category")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                view === "category"
                  ? "bg-sky-600 text-white"
                  : "bg-sky-100 text-sky-700 hover:bg-sky-200"
              }`}
            >
              Por Categoría
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {view === "proximity" && (
          <div className="space-y-6">
            {sortedByProximity.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No hay medicamentos registrados
              </p>
            ) : (
              <div className="flex flex-wrap gap-6 justify-center">
                {sortedByProximity.map((med, index) => (
                  <div key={med.id} className="flex flex-col items-center gap-2">
                    <CircularMedicationCard
                      medication={med}
                      size="large"
                      onClick={() => onMedicationClick?.(med)}
                    />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{med.name}</p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${categoryColors[med.category]}`}
                      >
                        {categoryLabels[med.category]}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === "category" && (
          <div className="space-y-8">
            {Object.entries(groupedByCategory).length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No hay medicamentos registrados
              </p>
            ) : (
              Object.entries(groupedByCategory).map(([category, meds]) => (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge
                      className={`${categoryColors[category as MedicationCategory]} text-sm px-3 py-1`}
                    >
                      {categoryLabels[category as MedicationCategory]}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {meds.length} {meds.length === 1 ? "medicamento" : "medicamentos"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {meds.map((med) => (
                      <div key={med.id} className="flex flex-col items-center gap-2">
                        <CircularMedicationCard
                          medication={med}
                          size="medium"
                          onClick={() => onMedicationClick?.(med)}
                        />
                        <p className="text-xs font-medium text-gray-700 text-center max-w-[7rem]">
                          {med.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Summary Stats */}
        {medications.length > 0 && (
          <div className="mt-6 pt-6 border-t border-sky-200 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-sky-600">
                {medications.length}
              </div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {medications.filter((m) => m.schedule.every((s) => s.taken)).length}
              </div>
              <div className="text-xs text-gray-600">Completadas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {medications.filter((m) => m.schedule.some((s) => !s.taken)).length}
              </div>
              <div className="text-xs text-gray-600">Pendientes</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
