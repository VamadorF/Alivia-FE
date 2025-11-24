"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";

export function QuickRegisterCard() {
  const router = useRouter();

  return (
    <Card className="bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all hover:scale-[1.02] p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-sky-500 p-3 text-white">
          <ClipboardList className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-sky-900 mb-1">
            Registrar hoy
          </h3>
          <p className="text-sm text-sky-700 mb-4">
            Dolor y ánimo, en menos de 30 segundos.
          </p>
          <Button
            onClick={() => router.push("/daily-tracking")}
            className="bg-sky-600 hover:bg-sky-700 text-white"
          >
            Empezar
          </Button>
        </div>
      </div>
    </Card>
  );
}
