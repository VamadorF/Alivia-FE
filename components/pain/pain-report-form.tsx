"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PainLocation, PainType, PainTemporality } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BodyMapSelector } from "./body-map-selector";
import { PainIntensitySlider } from "./pain-intensity-slider";
import { PainTypeSelector } from "./pain-type-selector";

export function PainReportForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  // Form state
  const [locations, setLocations] = useState<PainLocation[]>([]);
  const [intensity, setIntensity] = useState(5);
  const [painTypes, setPainTypes] = useState<PainType[]>([]);
  const [temporality, setTemporality] = useState<PainTemporality>("intermittent");
  const [startedWhen, setStartedWhen] = useState("");
  const [notes, setNotes] = useState("");

  const totalSteps = 5;

  const handleLocationToggle = (location: PainLocation) => {
    setLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const handlePainTypeToggle = (type: PainType) => {
    setPainTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    const report = {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].substring(0, 5),
      locations,
      intensity,
      painTypes,
      temporality,
      startedWhen,
      notes,
    };
    
    console.log("Pain Report:", report);
    
    // Show success message and redirect
    alert("✅ Reporte de dolor guardado exitosamente");
    router.push("/dashboard");
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return locations.length > 0;
      case 2:
        return true; // Intensity always has a value
      case 3:
        return painTypes.length > 0;
      case 4:
        return startedWhen.trim().length > 0;
      case 5:
        return true; // Notes are optional
      default:
        return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <Card className="mb-6 border-sky-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-sky-900">
              Paso {step} de {totalSteps}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((step / totalSteps) * 100)}% completado
            </span>
          </div>
          <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <div className="space-y-6">
        {step === 1 && (
          <BodyMapSelector
            selectedLocations={locations}
            onLocationToggle={handleLocationToggle}
          />
        )}

        {step === 2 && (
          <PainIntensitySlider
            intensity={intensity}
            onIntensityChange={setIntensity}
          />
        )}

        {step === 3 && (
          <PainTypeSelector
            selectedTypes={painTypes}
            onTypeToggle={handlePainTypeToggle}
          />
        )}

        {step === 4 && (
          <Card className="border-sky-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-sky-900">
                Temporalidad del Dolor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* When did it start */}
              <div>
                <Label htmlFor="startedWhen" className="text-base font-semibold mb-2 block">
                  ¿Hace cuánto tiempo inició este dolor?
                </Label>
                <Input
                  id="startedWhen"
                  placeholder='Ej: "2 días", "1 semana", "3 meses"'
                  value={startedWhen}
                  onChange={(e) => setStartedWhen(e.target.value)}
                  className="text-lg"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Describe en palabras simples cuándo comenzó
                </p>
              </div>

              {/* Continuity */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Continuidad del dolor
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setTemporality("constant")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      temporality === "constant"
                        ? "border-sky-500 bg-sky-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-sky-300"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">⚫</div>
                      <div className="font-semibold text-gray-900">Constante</div>
                      <p className="text-xs text-gray-600 mt-1">
                        El dolor está presente todo el tiempo
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setTemporality("intermittent")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      temporality === "intermittent"
                        ? "border-sky-500 bg-sky-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-sky-300"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">◐</div>
                      <div className="font-semibold text-gray-900">Intermitente</div>
                      <p className="text-xs text-gray-600 mt-1">
                        El dolor viene y va durante el día
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setTemporality("occasional")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      temporality === "occasional"
                        ? "border-sky-500 bg-sky-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-sky-300"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">○</div>
                      <div className="font-semibold text-gray-900">Ocasional</div>
                      <p className="text-xs text-gray-600 mt-1">
                        El dolor aparece de vez en cuando
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 5 && (
          <Card className="border-sky-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-sky-900">
                Notas Adicionales (Opcional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="notes" className="text-base font-semibold mb-2 block">
                ¿Algo más que quieras agregar sobre tu dolor?
              </Label>
              <Textarea
                id="notes"
                placeholder="Ej: El dolor empeora al estar sentado por mucho tiempo, mejora con calor..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                className="text-base"
              />
              <p className="text-xs text-gray-500 mt-2">
                Cualquier detalle adicional puede ayudar a tu médico a entender mejor tu situación
              </p>

              {/* Summary */}
              <div className="mt-6 p-4 bg-sky-50 rounded-lg border border-sky-200">
                <h4 className="font-semibold text-sky-900 mb-3">Resumen del reporte:</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Ubicación:</strong> {locations.length} área(s) seleccionada(s)
                  </p>
                  <p>
                    <strong>Intensidad:</strong> {intensity}/10
                  </p>
                  <p>
                    <strong>Tipo:</strong> {painTypes.length} característica(s)
                  </p>
                  <p>
                    <strong>Temporalidad:</strong> {temporality === "constant" ? "Constante" : temporality === "intermittent" ? "Intermitente" : "Ocasional"}
                  </p>
                  <p>
                    <strong>Inició hace:</strong> {startedWhen}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-6 sticky bottom-0 bg-white p-4 border-t border-sky-200 rounded-lg shadow-lg">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard")}
          className="flex-1"
        >
          Cancelar
        </Button>
        {step > 1 && (
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            className="flex-1"
          >
            ← Anterior
          </Button>
        )}
        {step < totalSteps ? (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="flex-1 bg-gradient-to-r from-sky-600 to-indigo-600"
          >
            Siguiente →
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-sky-600 to-indigo-600"
          >
            Guardar Reporte ✓
          </Button>
        )}
      </div>
    </div>
  );
}
