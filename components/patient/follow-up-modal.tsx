"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";

interface FollowUpModalProps {
  painLevel: number;
  onComplete: (responses: string[]) => void;
  onDismiss: () => void;
}

export function FollowUpModal({ painLevel, onComplete, onDismiss }: FollowUpModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<string[]>(["", "", "", ""]);

  const questions = [
    "¿El dolor ha aumentado gradualmente o fue repentino?",
    "¿Hay algo específico que lo haya desencadenado?",
    "¿Ha tomado su medicación según lo indicado?",
    "¿El dolor le está impidiendo realizar sus actividades diarias?",
  ];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(responses);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const updateResponse = (value: string) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = value;
    setResponses(newResponses);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="border-b border-orange-200 bg-orange-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <CardTitle className="text-xl text-orange-900">
                Seguimiento Automático Activado
              </CardTitle>
              <p className="text-sm text-orange-700 mt-1">
                Has reportado un nivel de dolor de {painLevel}/10. Por favor responde estas preguntas
                para ayudarnos a entender mejor tu situación.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-900 mb-3">
              {questions[currentQuestion]}
            </label>
            <Textarea
              value={responses[currentQuestion]}
              onChange={(e) => updateResponse(e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
              rows={4}
              className="w-full"
            />
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onDismiss}
              className="flex-1"
            >
              Responder Después
            </Button>
            {currentQuestion > 0 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="flex-1"
              >
                ← Anterior
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!responses[currentQuestion].trim()}
              className="flex-1 bg-gradient-to-r from-orange-600 to-red-600"
            >
              {currentQuestion < questions.length - 1 ? "Siguiente →" : "Finalizar ✓"}
            </Button>
          </div>

          {/* Info */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800">
              <strong>Importante:</strong> Estas preguntas ayudan a tu equipo médico a entender
              mejor tu situación y brindarte el apoyo adecuado. Si experimentas dolor severo o
              emergencia, contacta inmediatamente a tu médico o servicios de urgencia.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
