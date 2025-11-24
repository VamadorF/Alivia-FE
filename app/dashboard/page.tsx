"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { QuickRegisterCard } from "@/components/dashboard/QuickRegisterCard";
import { FeatureGrid } from "@/components/dashboard/FeatureGrid";
import { MedicationToday } from "@/components/dashboard/MedicationToday";
import { RecommendedForums } from "@/components/dashboard/RecommendedForums";
import { PainHistoryChart } from "@/components/patient/pain-history-chart";
import { FollowUpModal } from "@/components/patient/follow-up-modal";
import { Settings } from "lucide-react";

export default function PatientDashboard() {
  const router = useRouter();
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [painLevel, setPainLevel] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  // Mock pain history data
  const painHistoryData = [
    { date: "2025-11-17", intensity: 5, location: ["Espalda Baja"] },
    { date: "2025-11-18", intensity: 8, location: ["Espalda Baja", "Pierna Izq."] },
    { date: "2025-11-19", intensity: 7, location: ["Espalda Baja"] },
    { date: "2025-11-20", intensity: 7, location: ["Espalda Baja", "Pierna Izq."] },
    { date: "2025-11-21", intensity: 6, location: ["Espalda Baja"] },
    { date: "2025-11-22", intensity: 5, location: ["Espalda Baja"] },
    { date: "2025-11-23", intensity: 4, location: ["Espalda Baja"] },
  ];

  const stressHistoryData = [3, 4, 4, 4, 3, 2, 2];

  useEffect(() => {
    // Check authentication - redirect if not authenticated
    const checkAuth = () => {
      const token = localStorage.getItem("isAuthenticated");
      if (!token || token !== "true") {
        router.push("/login");
      }
    };

    checkAuth();

    // Check if there's a recent high pain report that needs follow-up
    const lastPainReport = localStorage.getItem("lastPainReport");
    if (lastPainReport) {
      const painData = JSON.parse(lastPainReport);
      if (painData.intensity >= 3 && !localStorage.getItem("followUpCompleted")) {
        setPainLevel(painData.intensity);
        setShowFollowUp(true);
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const handleFollowUpComplete = (responses: string[]) => {
    console.log("Follow-up responses:", responses);
    localStorage.setItem("followUpCompleted", "true");
    setShowFollowUp(false);
  };

  const handleFollowUpDismiss = () => {
    setShowFollowUp(false);
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
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/settings")}
                className="text-sky-700 hover:bg-sky-50"
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-sky-300 text-sky-700 hover:bg-sky-50"
              >
                Cerrar sesión
              </Button>
            </div>
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

          {/* Pain History Chart */}
          <div className="mb-8">
            <PainHistoryChart data={painHistoryData} stressData={stressHistoryData} />
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

      {/* Follow-up Modal */}
      {showFollowUp && (
        <FollowUpModal
          painLevel={painLevel}
          onComplete={handleFollowUpComplete}
          onDismiss={handleFollowUpDismiss}
        />
      )}
    </div>
  );
}
