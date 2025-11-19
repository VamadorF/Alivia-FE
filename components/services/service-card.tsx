import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  title: string;
  description: string;
  duration: string;
  price: string;
  badge?: string;
  available?: boolean;
  onBook?: () => void;
}

export function ServiceCard({
  title,
  description,
  duration,
  price,
  badge,
  available = true,
  onBook,
}: ServiceCardProps) {
  return (
    <Card className="border-indigo-100 shadow-lg hover:shadow-xl transition-all hover:scale-105">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-indigo-900">{title}</CardTitle>
          {badge && (
            <Badge className="bg-sky-100 text-sky-700 border-sky-200">
              {badge}
            </Badge>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">⏱️ {duration}</span>
          <span className="text-lg font-bold text-indigo-600">{price}</span>
        </div>
        <Button
          className="w-full bg-gradient-to-r from-sky-500 to-indigo-600"
          disabled={!available}
          onClick={onBook}
        >
          {available ? "Agendar Ahora" : "No Disponible"}
        </Button>
      </CardContent>
    </Card>
  );
}
