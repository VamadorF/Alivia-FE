"use client";

import { Button } from "@/components/ui/button";
import { PainReportForm } from "@/components/pain/pain-report-form";
import { useRouter } from "next/navigation";

export default function PainReportPage() {
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
            <div className="text-sm text-gray-600">
              Registro de Dolor
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-sky-900 mb-2">
            Reporte Diario de Dolor
          </h1>
          <p className="text-gray-600">
            Completa este registro para ayudar a tu equipo médico a entender mejor tu condición
          </p>
        </div>

        <PainReportForm />
      </main>
    </div>
  );
}
