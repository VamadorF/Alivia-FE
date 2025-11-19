import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Appointment } from "@/types";

interface AppointmentCardProps {
  appointment: Appointment;
  onViewDetails?: (id: string) => void;
  onReschedule?: (id: string) => void;
}

const statusVariants: Record<Appointment["status"], { label: string; variant: "default" | "outline" | "secondary" }> = {
  confirmed: { label: "Confirmada", variant: "default" },
  pending: { label: "Pendiente", variant: "outline" },
  cancelled: { label: "Cancelada", variant: "secondary" },
  completed: { label: "Completada", variant: "secondary" },
};

export function AppointmentCard({ 
  appointment, 
  onViewDetails, 
  onReschedule 
}: AppointmentCardProps) {
  const statusConfig = statusVariants[appointment.status];

  return (
    <Card className="border-sky-100 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-lg font-semibold text-sky-900">{appointment.doctorName}</div>
            <div className="text-sm text-muted-foreground">{appointment.specialty}</div>
          </div>
          <Badge variant={statusConfig.variant} className="border-sky-200 text-sky-700">
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 text-sm text-muted-foreground mb-4">
          <span>📅 {appointment.date}</span>
          <span>🕐 {appointment.time}</span>
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onViewDetails?.(appointment.id)}
          >
            Ver Detalles
          </Button>
          {appointment.status === "confirmed" && (
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => onReschedule?.(appointment.id)}
            >
              Reagendar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
