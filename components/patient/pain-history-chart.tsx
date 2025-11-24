"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface PainHistoryData {
  date: string;
  intensity: number;
  location: string[];
}

interface PainHistoryChartProps {
  data: PainHistoryData[];
  stressData?: number[];
}

export function PainHistoryChart({ data, stressData }: PainHistoryChartProps) {
  const maxValue = 10;
  const chartHeight = 150;

  // Calculate trend
  const recentData = data.slice(-7);
  const avgFirst = recentData.length >= 3 
    ? recentData.slice(0, 3).reduce((sum, d) => sum + d.intensity, 0) / 3 
    : recentData.length > 0 
    ? recentData.reduce((sum, d) => sum + d.intensity, 0) / recentData.length 
    : 0;
  const avgLast = recentData.length >= 3 
    ? recentData.slice(-3).reduce((sum, d) => sum + d.intensity, 0) / 3 
    : recentData.length > 0 
    ? recentData.reduce((sum, d) => sum + d.intensity, 0) / recentData.length 
    : 0;
  const trend = avgLast > avgFirst + 0.5 ? "increasing" : avgLast < avgFirst - 0.5 ? "decreasing" : "stable";

  const getTrendIcon = () => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-600" />;
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-green-600" />;
      case "stable":
        return <Minus className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "increasing":
        return "bg-red-50 text-red-700 border-red-200";
      case "decreasing":
        return "bg-green-50 text-green-700 border-green-200";
      case "stable":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <Card className="border-sky-200 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-sky-900">Mi Historial de Dolor</CardTitle>
          <Badge className={`flex items-center gap-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-xs">
              {trend === "increasing" ? "En aumento" : trend === "decreasing" ? "Mejorando" : "Estable"}
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Pain Chart */}
        <div className="mb-6">
          <div className="flex items-end justify-between gap-2" style={{ height: chartHeight }}>
            {data.map((point, index) => {
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
                      className={`absolute bottom-0 w-full rounded-t-lg ${barColor} transition-all hover:opacity-80 cursor-pointer group`}
                      style={{ height: `${barHeight}px` }}
                      title={`${point.date}: ${point.intensity}/10`}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-1 text-xs font-bold text-gray-700">
                        {point.intensity}
                      </div>
                      {/* Tooltip on hover */}
                      <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                        {point.location.join(", ")}
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

        {/* Correlation with Stress if available */}
        {stressData && stressData.length === data.length && (
          <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="text-sm font-semibold text-purple-900 mb-3 flex items-center gap-2">
              📊 Correlación: Dolor vs Estrés
            </h4>
            <div className="flex items-center gap-2">
              {data.map((point, index) => {
                const stress = stressData[index];
                const painColor =
                  point.intensity >= 7 ? "bg-red-400" : point.intensity >= 5 ? "bg-orange-400" : point.intensity >= 3 ? "bg-yellow-400" : "bg-green-400";
                const stressColor =
                  stress >= 4 ? "bg-purple-600" : stress >= 3 ? "bg-purple-400" : "bg-purple-200";

                return (
                  <div key={index} className="flex-1 flex flex-col gap-1">
                    <div className={`h-2 rounded ${painColor}`} title={`Dolor: ${point.intensity}`} />
                    <div className={`h-2 rounded ${stressColor}`} title={`Estrés: ${stress}`} />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-400 rounded"></div>
                Dolor
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-purple-600 rounded"></div>
                Estrés
              </span>
            </div>
            <p className="text-xs text-purple-700 mt-3">
              {data.filter((d, i) => d.intensity >= 5 && stressData[i] >= 4).length > 0
                ? "⚠️ Se observa correlación: dolor alto coincide con estrés alto"
                : "✓ No se detecta correlación fuerte entre dolor y estrés"}
            </p>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-sky-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-sky-600">
              {data.length > 0 ? (data.reduce((sum, d) => sum + d.intensity, 0) / data.length).toFixed(1) : "0.0"}
            </div>
            <div className="text-xs text-gray-600">Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {data.length > 0 ? Math.max(...data.map((d) => d.intensity)) : 0}
            </div>
            <div className="text-xs text-gray-600">Pico</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {data.length > 0 ? Math.min(...data.map((d) => d.intensity)) : 0}
            </div>
            <div className="text-xs text-gray-600">Mínimo</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
