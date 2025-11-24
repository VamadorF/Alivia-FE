"use client";

import { PatientAlert } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, Pill, Activity, Flag } from "lucide-react";

interface AlertPanelProps {
  alerts: PatientAlert[];
  onAlertClick?: (alert: PatientAlert) => void;
  onAcknowledge?: (alertId: string) => void;
}

const alertIcons = {
  "high-pain": AlertTriangle,
  "pain-increase": TrendingUp,
  "medication-missed": Pill,
  "stress-high": Activity,
  "risk-flag": Flag,
};

const alertColors = {
  high: "bg-red-100 text-red-700 border-red-300",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
  low: "bg-blue-100 text-blue-700 border-blue-300",
};

export function AlertPanel({ alerts, onAlertClick, onAcknowledge }: AlertPanelProps) {
  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged);

  return (
    <Card className="border-sky-200 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl text-sky-900">Alertas Activas</CardTitle>
          {unacknowledgedAlerts.length > 0 && (
            <Badge variant="destructive" className="text-sm">
              {unacknowledgedAlerts.length} nueva(s)
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No hay alertas en este momento</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => {
              const Icon = alertIcons[alert.type];
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    alert.acknowledged
                      ? "bg-gray-50 border-gray-200 opacity-60"
                      : alertColors[alert.severity]
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">
                          {alert.patientName}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            alert.severity === "high"
                              ? "border-red-300 text-red-700"
                              : alert.severity === "medium"
                              ? "border-yellow-300 text-yellow-700"
                              : "border-blue-300 text-blue-700"
                          }`}
                        >
                          {alert.severity === "high"
                            ? "Alta"
                            : alert.severity === "medium"
                            ? "Media"
                            : "Baja"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                      <div className="text-xs text-gray-500">
                        {new Date(alert.createdAt).toLocaleString("es-ES")}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onAlertClick?.(alert)}
                      className="flex-1"
                    >
                      Ver Detalles
                    </Button>
                    {!alert.acknowledged && onAcknowledge && (
                      <Button
                        size="sm"
                        onClick={() => onAcknowledge(alert.id)}
                        className="flex-1 bg-sky-600 hover:bg-sky-700"
                      >
                        Reconocer
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
