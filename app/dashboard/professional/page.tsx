"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertPanel } from "@/components/professional/alert-panel";
import { PainTrendChart } from "@/components/professional/pain-trend-chart";
import { mockPatientAlerts, mockPainTrends, getUnacknowledgedAlerts } from "@/data/professional";
import { PatientAlert } from "@/types";
import { Users, Activity, AlertTriangle, TrendingUp } from "lucide-react";

export default function ProfessionalDashboard() {
  const userName = typeof window !== "undefined" ? localStorage.getItem("userName") || "Usuario" : "Usuario";
  const [alerts, setAlerts] = useState(mockPatientAlerts);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  const handleAcknowledge = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const unacknowledgedCount = getUnacknowledgedAlerts().length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              AlivIA
            </span>
            <span className="text-sm text-gray-600 ml-2">Profesional</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Hola, {userName}</span>
            <Button variant="ghost" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sky-900 mb-2">
            Dashboard Clínico
          </h1>
          <p className="text-gray-600">
            Monitoreo y gestión de pacientes
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-sky-200 hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-sky-600">24</div>
                  <div className="text-sm text-gray-600">Pacientes Activos</div>
                </div>
                <Users className="h-10 w-10 text-sky-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-red-600">
                    {unacknowledgedCount}
                  </div>
                  <div className="text-sm text-gray-600">Alertas Nuevas</div>
                </div>
                <AlertTriangle className="h-10 w-10 text-red-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-indigo-600">12</div>
                  <div className="text-sm text-gray-600">Consultas Hoy</div>
                </div>
                <Activity className="h-10 w-10 text-indigo-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-orange-600">8</div>
                  <div className="text-sm text-gray-600">Dolor Aumentando</div>
                </div>
                <TrendingUp className="h-10 w-10 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Alerts - Takes 2 columns */}
          <div className="lg:col-span-2">
            <AlertPanel
              alerts={alerts}
              onAcknowledge={handleAcknowledge}
            />
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="border-sky-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-sky-900">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-sky-600 to-indigo-600">
                  Nueva Consulta
                </Button>
                <Button variant="outline" className="w-full">
                  Ver Todos los Pacientes
                </Button>
                <Button variant="outline" className="w-full">
                  Indicaciones Médicas
                </Button>
                <Button variant="outline" className="w-full">
                  Notas Clínicas
                </Button>
                <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-50">
                  Registrar Derivación
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pain Trends */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-sky-900 mb-4">
            Tendencias de Dolor - Pacientes Destacados
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mockPainTrends.map((trend) => (
              <PainTrendChart key={trend.patientId} trend={trend} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="border-sky-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-sky-900">Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    María González completó su reporte de dolor diario
                  </p>
                  <p className="text-xs text-gray-500">Hace 15 minutos</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Carlos Ramírez respondió a seguimiento automático
                  </p>
                  <p className="text-xs text-gray-500">Hace 1 hora</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Ana Silva completó cuestionario PSS-10
                  </p>
                  <p className="text-xs text-gray-500">Hace 2 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
