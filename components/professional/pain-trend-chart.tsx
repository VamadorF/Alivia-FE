"use client";

import { PainTrend } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface PainTrendChartProps {
  trend: PainTrend;
}

export function PainTrendChart({ trend }: PainTrendChartProps) {
  const getTrendIcon = () => {
    switch (trend.direction) {
      case "increasing":
        return <TrendingUp className="h-5 w-5 text-red-600" />;
      case "decreasing":
        return <TrendingDown className="h-5 w-5 text-green-600" />;
      case "stable":
        return <Minus className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getTrendColor = () => {
    switch (trend.direction) {
      case "increasing":
        return "text-red-600 bg-red-50 border-red-200";
      case "decreasing":
        return "text-green-600 bg-green-50 border-green-200";
      case "stable":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
    }
  };

  const getTrendLabel = () => {
    switch (trend.direction) {
      case "increasing":
        return "En Aumento";
      case "decreasing":
        return "En Disminución";
      case "stable":
        return "Estable";
    }
  };

  const maxValue = 10;
  const chartHeight = 120;

  return (
    <Card className="border-sky-200 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-sky-900">
            Tendencia de Dolor - Última Semana
          </CardTitle>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-semibold">{getTrendLabel()}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Chart */}
        <div className="mb-6">
          <div className="flex items-end justify-between gap-2" style={{ height: chartHeight }}>
            {trend.dataPoints.map((point, index) => {
              const barHeight = (point.intensity / maxValue) * chartHeight;
              const barColor =
                point.intensity >= 7
                  ? "bg-red-500"
                  : point.intensity >= 5
                  ? "bg-orange-500"
                  : point.intensity >= 3
                  ? "bg-yellow-500"
                  : "bg-green-500";

              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full" style={{ height: chartHeight }}>
                    <div
                      className={`absolute bottom-0 w-full rounded-t-lg ${barColor} transition-all hover:opacity-80 cursor-pointer`}
                      style={{ height: `${barHeight}px` }}
                      title={`${point.date}: ${point.intensity}/10`}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-1 text-xs font-bold text-gray-700">
                        {point.intensity}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 text-center">
                    {new Date(point.date).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-sky-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-sky-600">
              {trend.averagePain.toFixed(1)}
            </div>
            <div className="text-xs text-gray-600">Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{trend.peakPain}</div>
            <div className="text-xs text-gray-600">Pico</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{trend.lowPain}</div>
            <div className="text-xs text-gray-600">Mínimo</div>
          </div>
        </div>

        {/* Scale Reference */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500"></div>
              0-2: Leve
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-yellow-500"></div>
              3-4: Moderado
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-500"></div>
              5-6: Fuerte
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-500"></div>
              7-10: Muy fuerte
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
