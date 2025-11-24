"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

interface ThemeCustomizerProps {
  onThemeChange?: (theme: { primary: string; secondary: string; accent: string }) => void;
}

const presetThemes = [
  {
    name: "Cielo y Mar",
    primary: "#0ea5e9",
    secondary: "#0284c7",
    accent: "#06b6d4",
  },
  {
    name: "Bosque Sereno",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
  },
  {
    name: "Lavanda Suave",
    primary: "#a855f7",
    secondary: "#9333ea",
    accent: "#c084fc",
  },
  {
    name: "Rosa Cálido",
    primary: "#ec4899",
    secondary: "#db2777",
    accent: "#f472b6",
  },
  {
    name: "Atardecer",
    primary: "#f97316",
    secondary: "#ea580c",
    accent: "#fb923c",
  },
  {
    name: "Océano Profundo",
    primary: "#3b82f6",
    secondary: "#2563eb",
    accent: "#60a5fa",
  },
];

export function ThemeCustomizer({ onThemeChange }: ThemeCustomizerProps) {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [customColors, setCustomColors] = useState({
    primary: "#0ea5e9",
    secondary: "#0284c7",
    accent: "#06b6d4",
  });

  const applyTheme = (theme: { primary: string; secondary: string; accent: string }) => {
    setCustomColors(theme);
    if (typeof window !== "undefined") {
      localStorage.setItem("userTheme", JSON.stringify(theme));
    }
    onThemeChange?.(theme);
  };

  const handlePresetSelect = (index: number) => {
    setSelectedTheme(index);
    applyTheme(presetThemes[index]);
  };

  return (
    <Card className="border-sky-200 shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-sky-600" />
          <CardTitle className="text-xl text-sky-900">Personalización del Tema</CardTitle>
        </div>
        <CardDescription>
          Elige los colores que mejor se adapten a tu preferencia personal
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Preset Themes */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-semibold text-gray-700">Temas Predefinidos</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {presetThemes.map((theme, index) => (
              <button
                key={index}
                onClick={() => handlePresetSelect(index)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  selectedTheme === index
                    ? "border-sky-500 bg-sky-50 shadow-md"
                    : "border-gray-200 hover:border-sky-300"
                }`}
              >
                <div className="flex gap-2 mb-2">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: theme.secondary }}
                  />
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: theme.accent }}
                  />
                </div>
                <p className="text-xs font-medium text-gray-900">{theme.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Color Picker */}
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700">Personalización Avanzada</h4>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 w-24">
                Color Principal:
              </label>
              <input
                type="color"
                value={customColors.primary}
                onChange={(e) => setCustomColors({ ...customColors, primary: e.target.value })}
                className="w-12 h-10 rounded cursor-pointer"
              />
              <span className="text-xs text-gray-600 font-mono">{customColors.primary}</span>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 w-24">
                Color Secundario:
              </label>
              <input
                type="color"
                value={customColors.secondary}
                onChange={(e) => setCustomColors({ ...customColors, secondary: e.target.value })}
                className="w-12 h-10 rounded cursor-pointer"
              />
              <span className="text-xs text-gray-600 font-mono">{customColors.secondary}</span>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 w-24">
                Color de Acento:
              </label>
              <input
                type="color"
                value={customColors.accent}
                onChange={(e) => setCustomColors({ ...customColors, accent: e.target.value })}
                className="w-12 h-10 rounded cursor-pointer"
              />
              <span className="text-xs text-gray-600 font-mono">{customColors.accent}</span>
            </div>
          </div>

          <Button
            onClick={() => applyTheme(customColors)}
            className="w-full mt-4"
            style={{
              background: `linear-gradient(to right, ${customColors.primary}, ${customColors.secondary})`,
            }}
          >
            Aplicar Colores Personalizados
          </Button>
        </div>

        {/* Preview */}
        <div className="mt-6 p-4 rounded-lg border-2 border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Vista Previa</h4>
          <div className="space-y-2">
            <div
              className="p-3 rounded-lg text-white font-medium"
              style={{ backgroundColor: customColors.primary }}
            >
              Color Principal
            </div>
            <div
              className="p-3 rounded-lg text-white font-medium"
              style={{ backgroundColor: customColors.secondary }}
            >
              Color Secundario
            </div>
            <div
              className="p-3 rounded-lg text-white font-medium"
              style={{ backgroundColor: customColors.accent }}
            >
              Color de Acento
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
          <p className="text-xs text-indigo-800">
            <strong>Nota:</strong> Los colores personalizados se guardan en tu navegador y se
            aplicarán cada vez que inicies sesión.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
