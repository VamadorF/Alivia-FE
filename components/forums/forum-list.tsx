"use client";

import { Forum } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

interface ForumListProps {
  forums: Forum[];
}

export function ForumList({ forums }: ForumListProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {forums.map((forum) => (
        <Card
          key={forum.id}
          className="border-sky-200 shadow-md hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
          onClick={() => router.push(`/foros/${forum.id}`)}
        >
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <CardTitle className="text-lg text-sky-900 flex-1">
                {forum.name}
              </CardTitle>
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {forum.description}
            </p>
          </CardHeader>
          <CardContent>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {forum.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-sky-100 text-sky-700 text-xs"
                >
                  {tag}
                </Badge>
              ))}
              {forum.tags.length > 3 && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                  +{forum.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{forum.memberCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{forum.postCount.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Button */}
            <Button
              className="w-full bg-gradient-to-r from-sky-600 to-indigo-600"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/foros/${forum.id}`);
              }}
            >
              Entrar al Foro
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
