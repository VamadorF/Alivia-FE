"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { recommendedForums } from "@/data/dashboard";
import { useRouter } from "next/navigation";

export function RecommendedForums() {
  const router = useRouter();

  return (
    <Card className="shadow-md hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-900">
          Foros recomendados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendedForums.map((forum) => (
            <div
              key={forum.id}
              className="p-4 rounded-lg border border-gray-200 bg-white hover:border-sky-300 transition-colors"
            >
              <h4 className="font-semibold text-gray-900 mb-2">
                {forum.name}
              </h4>
              <p className="text-sm text-gray-600 mb-3">{forum.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {forum.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-sky-50 text-sky-700 hover:bg-sky-100"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>{forum.members.toLocaleString()} miembros</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-sky-600 border-sky-300 hover:bg-sky-50"
                  onClick={() => router.push(`/foros/${forum.id}`)}
                >
                  Entrar
                </Button>
              </div>
            </div>
          ))}
          <Button
            variant="link"
            className="w-full text-sky-600 hover:text-sky-700"
            onClick={() => router.push("/foros")}
          >
            Explorar foros →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
