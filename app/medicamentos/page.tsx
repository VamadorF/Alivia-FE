"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MedicationStack } from "@/components/medication/medication-stack";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Medication } from "@/types";
import { mockMedications } from "@/data/medications";
import { Clock, Calendar, User, FileText, X } from "lucide-react";

export default function MedicationsPage() {
  const router = useRouter();
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard")}
                className="text-sky-700"
              >
                ← Volver
              </Button>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600" />
                  <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                    AlivIA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sky-900 mb-2">
            Gestión de Medicamentos
          </h1>
          <p className="text-gray-600">
            Visualiza y gestiona todos tus medicamentos de forma organizada
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <MedicationStack
            medications={mockMedications}
            onMedicationClick={setSelectedMedication}
          />
        </div>
      </main>

      {/* Medication Detail Modal */}
      {selectedMedication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="relative">
              <button
                onClick={() => setSelectedMedication(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: selectedMedication.colorTone }}
                >
                  {selectedMedication.name.substring(0, 2)}
                </div>
                <div>
                  <CardTitle className="text-2xl text-sky-900">
                    {selectedMedication.name}
                  </CardTitle>
                  <p className="text-gray-600">{selectedMedication.dose}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Schedule */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-sky-600" />
                  Horario de Tomas
                </h3>
                <div className="space-y-2">
                  {selectedMedication.schedule.map((sched, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        sched.taken
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="font-mono font-semibold text-gray-900">
                          {sched.time}
                        </div>
                        {sched.taken && sched.takenAt && (
                          <div className="text-xs text-green-700">
                            Tomado a las {sched.takenAt}
                          </div>
                        )}
                      </div>
                      {sched.taken ? (
                        <div className="flex items-center gap-1 text-green-700 text-sm font-medium">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                          Tomado
                        </div>
                      ) : (
                        <Button size="sm" variant="outline">
                          Marcar como tomado
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-sky-600" />
                  Fechas
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Inicio:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(selectedMedication.startDate).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                  {selectedMedication.endDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fin:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(selectedMedication.endDate).toLocaleDateString("es-ES")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Prescribed By */}
              {selectedMedication.prescribedBy && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <User className="h-5 w-5 text-sky-600" />
                    Prescrito por
                  </h3>
                  <p className="text-gray-900">{selectedMedication.prescribedBy}</p>
                </div>
              )}

              {/* Instructions */}
              {selectedMedication.instructions && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-sky-600" />
                    Instrucciones
                  </h3>
                  <p className="text-gray-700 bg-sky-50 p-3 rounded-lg border border-sky-200">
                    {selectedMedication.instructions}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedMedication(null)}
                >
                  Cerrar
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-sky-600 to-indigo-600">
                  Editar Medicamento
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
