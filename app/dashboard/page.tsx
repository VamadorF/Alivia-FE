"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { QuickRegisterCard } from "@/components/dashboard/QuickRegisterCard";
import { FeatureGrid } from "@/components/dashboard/FeatureGrid";
import { MedicationToday } from "@/components/dashboard/MedicationToday";
import { RecommendedForums } from "@/components/dashboard/RecommendedForums";

export default function PatientDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check authentication - redirect if not authenticated
    const checkAuth = () => {
      const token = localStorage.getItem("isAuthenticated");
      if (!token || token !== "true") {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                  AlivIA
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1 ml-10">
                Acompañamiento real para dolor crónico
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-sky-300 text-sky-700 hover:bg-sky-50"
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Quick Register Card */}
          <div className="mb-8">
            <QuickRegisterCard />
          </div>

          {/* Feature Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Accesos principales
            </h2>
            <FeatureGrid />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Medication Today */}
            <div className="lg:col-span-2">
              <MedicationToday />
            </div>

            {/* Right Column - Recommended Forums */}
            <div className="lg:col-span-1">
              <RecommendedForums />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
