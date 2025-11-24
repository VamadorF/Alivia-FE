"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { UserCheck, X } from "lucide-react";

interface ReferralFormProps {
  patientName: string;
  patientId: string;
  onSubmit: (referral: ReferralData) => void;
  onCancel: () => void;
}

interface ReferralData {
  referralTo: string;
  specialty: string;
  reason: string;
  urgency: "low" | "medium" | "high";
  notes?: string;
}

const specialties = [
  "Especialista en Dolor",
  "Anestesiología del Dolor",
  "Neurocirugía",
  "Ortopedia",
  "Reumatología",
  "Neurología",
  "Psiquiatría",
  "Psicología",
  "Fisiatría",
  "Medicina Interna",
  "Oncología",
  "Otro",
];

export function ReferralForm({ patientName, patientId, onSubmit, onCancel }: ReferralFormProps) {
  const [formData, setFormData] = useState<ReferralData>({
    referralTo: "",
    specialty: "",
    reason: "",
    urgency: "medium",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b bg-gradient-to-r from-sky-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-100">
                <UserCheck className="h-6 w-6 text-sky-700" />
              </div>
              <div>
                <CardTitle className="text-xl text-sky-900">
                  Derivación de Paciente
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">Paciente: {patientName}</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Referral To */}
            <div>
              <Label htmlFor="referralTo" className="text-base font-semibold mb-2 block">
                Derivar a:
              </Label>
              <Input
                id="referralTo"
                placeholder="Nombre del especialista o institución"
                value={formData.referralTo}
                onChange={(e) => setFormData({ ...formData, referralTo: e.target.value })}
                required
              />
            </div>

            {/* Specialty */}
            <div>
              <Label htmlFor="specialty" className="text-base font-semibold mb-2 block">
                Especialidad:
              </Label>
              <select
                id="specialty"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              >
                <option value="">Selecciona una especialidad</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Urgency */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Nivel de Urgencia:
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "low" as const, label: "Baja", color: "border-green-500 bg-green-50" },
                  { value: "medium" as const, label: "Media", color: "border-yellow-500 bg-yellow-50" },
                  { value: "high" as const, label: "Alta", color: "border-red-500 bg-red-50" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: option.value })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.urgency === option.value
                        ? option.color + " shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="font-semibold">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reason */}
            <div>
              <Label htmlFor="reason" className="text-base font-semibold mb-2 block">
                Motivo de la Derivación: <span className="text-red-600">*</span>
              </Label>
              <Textarea
                id="reason"
                placeholder="Describe el motivo clínico de la derivación..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                rows={4}
                required
              />
            </div>

            {/* Additional Notes */}
            <div>
              <Label htmlFor="notes" className="text-base font-semibold mb-2 block">
                Notas Adicionales (Opcional):
              </Label>
              <Textarea
                id="notes"
                placeholder="Información adicional relevante para el especialista..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>

            {/* Important Notice */}
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                ⚠️ Importante
              </h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Esta derivación impacta en las listas de espera del sistema</li>
                <li>• El paciente será notificado automáticamente</li>
                <li>• Se generará un documento de derivación en el historial clínico</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-sky-600 to-indigo-600"
              >
                Confirmar Derivación
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
