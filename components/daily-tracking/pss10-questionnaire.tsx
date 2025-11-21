"use client";

import { useState } from "react";
import { PSSResponse, PSS10Questions } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { calculatePSS10Score, getStressLevel } from "@/data/pain-reports";

interface PSS10QuestionnaireProps {
  onComplete: (responses: PSSResponse[], score: number, level: "low" | "moderate" | "high") => void;
  onCancel?: () => void;
}

const responseOptions: { value: PSSResponse; label: string }[] = [
  { value: 0, label: "Nunca" },
  { value: 1, label: "Casi nunca" },
  { value: 2, label: "A veces" },
  { value: 3, label: "Frecuentemente" },
  { value: 4, label: "Muy frecuentemente" },
];

export function PSS10Questionnaire({ onComplete, onCancel }: PSS10QuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<PSSResponse[]>(Array(10).fill(null));

  const handleResponse = (response: PSSResponse) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = response;
    setResponses(newResponses);

    if (currentQuestion < PSS10Questions.length - 1) {
      // Move to next question after a brief delay
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    }
  };

  const handleSubmit = () => {
    const score = calculatePSS10Score(responses);
    const level = getStressLevel(score);
    onComplete(responses, score, level);
  };

  const canSubmit = responses.every((r) => r !== null);
  const progress = ((currentQuestion + 1) / PSS10Questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <Card className="mb-6 border-sky-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-sky-900">
              Pregunta {currentQuestion + 1} de {PSS10Questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}% completado
            </span>
          </div>
          <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card className="border-purple-200 shadow-lg">
        <CardHeader>
          <CardDescription className="text-xs text-purple-600 font-semibold mb-2">
            CUESTIONARIO PSS-10 - EVALUACIÓN DE ESTRÉS
          </CardDescription>
          <CardTitle className="text-xl text-gray-900 leading-relaxed">
            {PSS10Questions[currentQuestion]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {responseOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleResponse(option.value)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  responses[currentQuestion] === option.value
                    ? "border-purple-500 bg-purple-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      responses[currentQuestion] === option.value
                        ? "border-purple-500 bg-purple-500"
                        : "border-gray-300"
                    }`}
                  >
                    {responses[currentQuestion] === option.value && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                  <span className="font-medium text-gray-900">{option.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            {onCancel && (
              <Button
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancelar
              </Button>
            )}
            {currentQuestion > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="flex-1"
              >
                ← Anterior
              </Button>
            )}
            {currentQuestion < PSS10Questions.length - 1 ? (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                disabled={responses[currentQuestion] === null}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                Siguiente →
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                Finalizar ✓
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Question Navigator */}
      <Card className="mt-6 border-purple-200">
        <CardContent className="pt-6">
          <p className="text-xs text-gray-600 mb-3">Progreso de preguntas:</p>
          <div className="flex flex-wrap gap-2">
            {PSS10Questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                  responses[index] !== null
                    ? "bg-purple-500 text-white shadow-md"
                    : index === currentQuestion
                    ? "border-2 border-purple-500 text-purple-700"
                    : "border border-gray-300 text-gray-400"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="mt-6 border-indigo-200 bg-indigo-50">
        <CardContent className="pt-6">
          <p className="text-xs text-indigo-800">
            <strong>Sobre el PSS-10:</strong> Este cuestionario evalúa tu nivel de estrés percibido
            en el último mes. Responde honestamente según cómo te has sentido realmente. No hay
            respuestas correctas o incorrectas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
