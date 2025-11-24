"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeCustomizer } from "@/components/patient/theme-customizer";

export default function SettingsPage() {
  const router = useRouter();

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
            Configuración
          </h1>
          <p className="text-gray-600">
            Personaliza tu experiencia en AlivIA
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ThemeCustomizer
            onThemeChange={(theme) => {
              console.log("Theme changed:", theme);
              // In a real app, this would apply the theme globally
            }}
          />
        </div>
      </main>
    </div>
  );
}
