"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PainReportForm } from "@/components/pain/pain-report-form";
import { DailyFactorsForm } from "@/components/daily-tracking/daily-factors-form";
import { PSS10Questionnaire } from "@/components/daily-tracking/pss10-questionnaire";
import { PSSResponse, MoodLevel, StressLevel } from "@/types";

type Step = "pain" | "factors" | "pss10" | "complete";

export default function DailyTrackingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("pain");
  const [showPSS10, setShowPSS10] = useState(false);

  const handlePainComplete = () => {
    setCurrentStep("factors");
  };

  const handleFactorsSubmit = (data: {
    exerciseMinutes: number;
    laughter: MoodLevel;
    stress: StressLevel;
    sadness: MoodLevel;
    foodQuality: MoodLevel;
    activities: string;
    notes?: string;
  }) => {
    console.log("Daily Factors:", data);
    
    // Check if stress is high (4 or 5) to recommend PSS-10
    if (data.stress >= 4) {
      setShowPSS10(true);
    } else {
      setCurrentStep("complete");
    }
  };

  const handlePSS10Complete = (responses: PSSResponse[], score: number, level: "low" | "moderate" | "high") => {
    console.log("PSS-10 Results:", { responses, score, level });
    setCurrentStep("complete");
  };

  const handleSkipPSS10 = () => {
    setCurrentStep("complete");
  };

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
            <div className="text-sm text-gray-600">
              Registro Diario Completo
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentStep === "pain" && (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-sky-900 mb-2">
                Paso 1: Reporte de Dolor
              </h1>
              <p className="text-gray-600">
                Comencemos registrando tu dolor actual
              </p>
            </div>
            <PainReportForm />
            <div className="max-w-4xl mx-auto mt-6">
              <Button
                onClick={handlePainComplete}
                className="w-full bg-gradient-to-r from-sky-600 to-indigo-600"
                size="lg"
              >
                Continuar a Factores del Día →
              </Button>
            </div>
          </>
        )}

        {currentStep === "factors" && !showPSS10 && (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-sky-900 mb-2">
                Paso 2: Factores del Día
              </h1>
              <p className="text-gray-600">
                Registra cómo fue tu día y qué factores podrían afectar tu dolor
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <DailyFactorsForm onSubmit={handleFactorsSubmit} />
              <div className="mt-6 flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep("pain")}
                  className="flex-1"
                >
                  ← Volver
                </Button>
                <Button
                  type="submit"
                  form="daily-factors-form"
                  className="flex-1 bg-gradient-to-r from-sky-600 to-indigo-600"
                >
                  Finalizar Registro ✓
                </Button>
              </div>
            </div>
          </>
        )}

        {showPSS10 && currentStep === "factors" && (
          <>
            <Card className="mb-8 max-w-3xl mx-auto border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold text-yellow-900 mb-2">
                  📊 Evaluación de Estrés Recomendada
                </h2>
                <p className="text-sm text-yellow-800 mb-4">
                  Detectamos un nivel de estrés moderado-alto en tu registro. Te recomendamos
                  completar el cuestionario PSS-10 para una evaluación más detallada. Esto ayudará
                  a tu equipo médico a comprender mejor tu situación.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setCurrentStep("pss10")}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    Completar PSS-10 (5 min)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleSkipPSS10}
                    className="flex-1"
                  >
                    Omitir por ahora
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {currentStep === "pss10" && (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-purple-900 mb-2">
                Cuestionario PSS-10
              </h1>
              <p className="text-gray-600">
                Evaluación del Estrés Percibido
              </p>
            </div>
            <PSS10Questionnaire
              onComplete={handlePSS10Complete}
              onCancel={handleSkipPSS10}
            />
          </>
        )}

        {currentStep === "complete" && (
          <div className="max-w-2xl mx-auto">
            <Card className="border-green-200 shadow-xl">
              <CardContent className="pt-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-green-900 mb-3">
                  ¡Registro Completado!
                </h2>
                <p className="text-gray-600 mb-8">
                  Tu registro diario ha sido guardado exitosamente. Esta información ayudará a tu
                  equipo médico a brindarte el mejor cuidado posible.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => router.push("/dashboard")}
                    className="w-full bg-gradient-to-r from-sky-600 to-indigo-600"
                    size="lg"
                  >
                    Volver al Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentStep("pain");
                      setShowPSS10(false);
                    }}
                    className="w-full"
                  >
                    Hacer Otro Registro
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="mt-6 border-indigo-200 bg-indigo-50">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-indigo-900 mb-2">
                  💡 Recuerda
                </h3>
                <ul className="text-sm text-indigo-800 space-y-1">
                  <li>• Registra tu dolor diariamente para un mejor seguimiento</li>
                  <li>• Los factores del día ayudan a identificar patrones</li>
                  <li>• Si tu dolor aumenta, se activará seguimiento automático</li>
                  <li>• Puedes revisar tu historial en cualquier momento</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
