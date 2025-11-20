"use client";

import { Card } from "@/components/ui/card";
import { MessageSquare, Pill, Calendar, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

interface Feature {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  bgColor: string;
  iconColor: string;
}

const features: Feature[] = [
  {
    title: "Foros",
    subtitle: "Entrar",
    icon: MessageSquare,
    path: "/foros",
    bgColor: "from-sky-50 to-sky-100",
    iconColor: "text-sky-600",
  },
  {
    title: "Medicamentos",
    subtitle: "Entrar",
    icon: Pill,
    path: "/medicamentos",
    bgColor: "from-teal-50 to-teal-100",
    iconColor: "text-teal-600",
  },
  {
    title: "Calendario",
    subtitle: "Entrar",
    icon: Calendar,
    path: "/calendario",
    bgColor: "from-purple-50 to-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Mi Historia",
    subtitle: "Entrar",
    icon: FileText,
    path: "/historial",
    bgColor: "from-pink-50 to-pink-100",
    iconColor: "text-pink-600",
  },
];

export function FeatureGrid() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <Card
            key={feature.title}
            className={`bg-gradient-to-br ${feature.bgColor} border-0 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] p-6 min-h-[160px] flex flex-col justify-between`}
            onClick={() => router.push(feature.path)}
          >
            <div className="flex flex-col items-start gap-3">
              <div className={`${feature.iconColor}`}>
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{feature.subtitle}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
