"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "lucide-react";
import { todayMeds } from "@/data/dashboard";

export function MedicationToday() {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-900">
          Mi día
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Medicamentos programados para hoy
        </p>
        <div className="space-y-3">
          {todayMeds.map((med, index) => (
            <div
              key={`${med.time}-${med.name}`}
              className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 bg-white transition-all duration-300 opacity-0 translate-y-2 animate-[fadeInUp_0.3s_ease-out_forwards]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0 text-sky-600">
                <Pill className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {med.time}
                  </span>
                  <span className="text-sm text-gray-900">{med.name}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{med.dose}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
