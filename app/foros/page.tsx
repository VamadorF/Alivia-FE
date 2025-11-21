"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ForumList } from "@/components/forums/forum-list";
import { mockForums, countAIInterventions } from "@/data/forums";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Bot, Users, MessageSquare } from "lucide-react";

export default function ForumsPage() {
  const router = useRouter();
  const totalAIInterventions = countAIInterventions();

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
            Foros de Apoyo
          </h1>
          <p className="text-gray-600">
            Únete a comunidades de apoyo y comparte experiencias con otras personas
          </p>
        </div>

        {/* Info Banner */}
        <Card className="mb-8 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <Shield className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Foros Moderados</h3>
                  <p className="text-sm text-gray-600">
                    Todos los foros son moderados por profesionales para garantizar un ambiente seguro
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <Bot className="h-5 w-5 text-purple-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Asistencia IA</h3>
                  <p className="text-sm text-gray-600">
                    AlivIA está presente para brindar apoyo y detectar situaciones de riesgo
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Users className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Comunidad Activa</h3>
                  <p className="text-sm text-gray-600">
                    Miles de personas compartiendo experiencias y brindando apoyo mutuo
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center border-sky-200">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-sky-600 mb-1">
                {mockForums.length}
              </div>
              <div className="text-sm text-gray-600">Foros Activos</div>
            </CardContent>
          </Card>
          <Card className="text-center border-indigo-200">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-indigo-600 mb-1">
                {mockForums.reduce((sum, f) => sum + f.memberCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Miembros Total</div>
            </CardContent>
          </Card>
          <Card className="text-center border-purple-200">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {mockForums.reduce((sum, f) => sum + f.postCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Publicaciones</div>
            </CardContent>
          </Card>
          <Card className="text-center border-pink-200">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-pink-600 mb-1">
                {totalAIInterventions}
              </div>
              <div className="text-sm text-gray-600">Intervenciones IA</div>
            </CardContent>
          </Card>
        </div>

        {/* Forums List */}
        <ForumList forums={mockForums} />

        {/* Help Section */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-yellow-100">
                <MessageSquare className="h-5 w-5 text-yellow-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  ¿Necesitas ayuda inmediata?
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Si estás pasando por una crisis o necesitas apoyo urgente, no dudes en contactar
                  a los servicios de emergencia o a tu profesional de la salud.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Ver Recursos de Crisis
                  </Button>
                  <Button variant="outline" size="sm">
                    Contactar a mi Médico
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
