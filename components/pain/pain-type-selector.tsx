"use client";

import { PainType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Snowflake, Sword, Flame, Activity, Circle, Wind, Target, Move } from "lucide-react";

interface PainTypeSelectorProps {
  selectedTypes: PainType[];
  onTypeToggle: (type: PainType) => void;
}

interface PainTypeOption {
  type: PainType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const painTypeOptions: PainTypeOption[] = [
  {
    type: "electric",
    label: "Eléctrico",
    description: "Sensación de descarga o choque eléctrico",
    icon: Zap,
    color: "from-yellow-400 to-yellow-600"
  },
  {
    type: "cold",
    label: "Frío",
    description: "Sensación de frío o congelamiento",
    icon: Snowflake,
    color: "from-cyan-400 to-blue-600"
  },
  {
    type: "sharp",
    label: "Punzante",
    description: "Dolor agudo como una puñalada",
    icon: Sword,
    color: "from-gray-400 to-gray-600"
  },
  {
    type: "burning",
    label: "Quemante",
    description: "Sensación de quemazón o ardor",
    icon: Flame,
    color: "from-orange-400 to-red-600"
  },
  {
    type: "throbbing",
    label: "Pulsátil",
    description: "Dolor que late como el pulso",
    icon: Activity,
    color: "from-pink-400 to-pink-600"
  },
  {
    type: "dull",
    label: "Sordo",
    description: "Dolor constante y profundo",
    icon: Circle,
    color: "from-slate-400 to-slate-600"
  },
  {
    type: "cramping",
    label: "Calambre",
    description: "Dolor tipo calambre o espasmo",
    icon: Wind,
    color: "from-purple-400 to-purple-600"
  },
  {
    type: "tingling",
    label: "Hormigueo",
    description: "Sensación de alfileres o agujas",
    icon: Target,
    color: "from-green-400 to-green-600"
  },
  {
    type: "shooting",
    label: "Irradiado",
    description: "Dolor que se extiende a otras áreas",
    icon: Move,
    color: "from-indigo-400 to-indigo-600"
  }
];

export function PainTypeSelector({ selectedTypes, onTypeToggle }: PainTypeSelectorProps) {
  const isSelected = (type: PainType) => selectedTypes.includes(type);

  return (
    <Card className="border-sky-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-sky-900">Tipo de Dolor</CardTitle>
        <CardDescription>
          Selecciona todas las características que describen tu dolor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {painTypeOptions.map((option) => {
            const Icon = option.icon;
            const selected = isSelected(option.type);
            
            return (
              <button
                key={option.type}
                onClick={() => onTypeToggle(option.type)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  selected
                    ? "border-sky-500 bg-sky-50 shadow-md scale-105"
                    : "border-gray-200 bg-white hover:border-sky-300 hover:shadow-sm"
                }`}
              >
                {/* Icon with gradient background */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} mb-3`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Label */}
                <h4 className="font-semibold text-gray-900 mb-1">
                  {option.label}
                </h4>

                {/* Description */}
                <p className="text-xs text-gray-600">
                  {option.description}
                </p>

                {/* Selected indicator */}
                {selected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center">
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
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Types Summary */}
        {selectedTypes.length > 0 && (
          <div className="mt-6 pt-6 border-t border-sky-200">
            <p className="text-sm text-gray-600 mb-2">
              Tipos de dolor seleccionados ({selectedTypes.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedTypes.map((type) => {
                const option = painTypeOptions.find((opt) => opt.type === type);
                return (
                  <Badge
                    key={type}
                    className="bg-sky-100 text-sky-700 hover:bg-sky-200 border-sky-300"
                  >
                    {option?.label || type}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {/* Help text */}
        <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
          <p className="text-xs text-indigo-800">
            <strong>Tip:</strong> Puedes seleccionar múltiples tipos si tu dolor tiene
            diferentes características. Esta información ayuda a tu médico a entender
            mejor tu condición.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
