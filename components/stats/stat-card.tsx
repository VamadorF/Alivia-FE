import { Card, CardHeader } from "@/components/ui/card";
import type { StatCard as StatCardType } from "@/types";
import { cn } from "@/lib/utils";

interface StatCardProps extends StatCardType {
  className?: string;
}

const colorVariants = {
  sky: "border-sky-100 text-sky-600",
  indigo: "border-indigo-100 text-indigo-600",
} as const;

export function StatCard({ value, label, color, className }: StatCardProps) {
  return (
    <Card className={cn("text-center", colorVariants[color], className)}>
      <CardHeader>
        <div className={cn("text-4xl font-bold", colorVariants[color])}>
          {value}
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          {label}
        </div>
      </CardHeader>
    </Card>
  );
}
