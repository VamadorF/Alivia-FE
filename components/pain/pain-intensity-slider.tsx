"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface PainIntensitySliderProps {
  intensity: number;
  onIntensityChange: (intensity: number) => void;
}

const painLevels = [
  { value: 0, label: "Sin dolor", color: "bg-green-500", emoji: "😊" },
  { value: 1, label: "Muy leve", color: "bg-green-400", emoji: "🙂" },
  { value: 2, label: "Leve", color: "bg-lime-400", emoji: "😐" },
  { value: 3, label: "Moderado", color: "bg-yellow-400", emoji: "😕" },
  { value: 4, label: "Moderado+", color: "bg-yellow-500", emoji: "😟" },
  { value: 5, label: "Fuerte", color: "bg-orange-400", emoji: "😣" },
  { value: 6, label: "Fuerte+", color: "bg-orange-500", emoji: "😖" },
  { value: 7, label: "Muy fuerte", color: "bg-red-400", emoji: "😩" },
  { value: 8, label: "Muy fuerte+", color: "bg-red-500", emoji: "😫" },
  { value: 9, label: "Insoportable", color: "bg-red-600", emoji: "😭" },
  { value: 10, label: "El peor", color: "bg-red-700", emoji: "😱" },
];

export function PainIntensitySlider({ intensity, onIntensityChange }: PainIntensitySliderProps) {
  const currentLevel = painLevels[intensity];

  return (
    <Card className="border-sky-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-sky-900">Intensidad del Dolor</CardTitle>
        <CardDescription>
          Escala EVA/ENA: Desliza para indicar tu nivel de dolor (0-10)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Level Display */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="text-6xl">{currentLevel.emoji}</span>
            <div>
              <div className={`text-5xl font-bold ${
                intensity >= 7 ? "text-red-600" :
                intensity >= 5 ? "text-orange-500" :
                intensity >= 3 ? "text-yellow-500" :
                "text-green-500"
              }`}>
                {intensity}
              </div>
              <p className="text-sm text-gray-600">/ 10</p>
            </div>
          </div>
          <p className={`text-lg font-semibold ${
            intensity >= 7 ? "text-red-600" :
            intensity >= 5 ? "text-orange-500" :
            intensity >= 3 ? "text-yellow-500" :
            "text-green-600"
          }`}>
            {currentLevel.label}
          </p>
        </div>

        {/* Slider */}
        <div className="px-2">
          <Slider
            value={intensity}
            onChange={(e) => onIntensityChange(Number(e.target.value))}
            min={0}
            max={10}
            step={1}
            className="w-full"
          />
        </div>

        {/* Visual Scale */}
        <div className="grid grid-cols-11 gap-1">
          {painLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => onIntensityChange(level.value)}
              className={`aspect-square rounded-lg transition-all ${
                level.color
              } ${
                intensity === level.value
                  ? "ring-4 ring-sky-500 scale-110"
                  : "hover:scale-105 opacity-70"
              }`}
              title={`${level.value} - ${level.label}`}
            >
              <span className="text-xs font-bold text-white drop-shadow">
                {level.value}
              </span>
            </button>
          ))}
        </div>

        {/* Reference Guide */}
        <div className="text-xs text-gray-500 space-y-1 pt-4 border-t border-gray-200">
          <p><strong>0-2:</strong> Dolor leve, no interfiere con actividades</p>
          <p><strong>3-4:</strong> Dolor moderado, dificulta algunas actividades</p>
          <p><strong>5-6:</strong> Dolor fuerte, interfiere significativamente</p>
          <p><strong>7-10:</strong> Dolor muy fuerte a insoportable, requiere atención</p>
        </div>

        {/* Alert for high pain */}
        {intensity >= 7 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
            <p className="font-semibold mb-1">⚠️ Nivel de dolor alto</p>
            <p>
              Si tu dolor es severo y persistente, considera contactar a tu médico o
              acudir al servicio de urgencias.
            </p>
          </div>
        )}

        {intensity >= 3 && intensity < 7 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            <p className="font-semibold mb-1">ℹ️ Dolor moderado detectado</p>
            <p>
              Se activará un seguimiento automático para ayudarte a manejar tu dolor.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
