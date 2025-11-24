"use client";

import { useState } from "react";
import { MoodLevel, StressLevel } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Frown, Meh, Activity, Apple } from "lucide-react";

interface DailyFactorsFormProps {
  onSubmit: (data: {
    exerciseMinutes: number;
    laughter: MoodLevel;
    stress: StressLevel;
    sadness: MoodLevel;
    foodQuality: MoodLevel;
    activities: string;
    notes?: string;
  }) => void;
}

const moodEmojis = ["😢", "😔", "😐", "🙂", "😄"];
const stressEmojis = ["😌", "😊", "😐", "😰", "😫"];

export function DailyFactorsForm({ onSubmit }: DailyFactorsFormProps) {
  const [exerciseMinutes, setExerciseMinutes] = useState(0);
  const [laughter, setLaughter] = useState<MoodLevel>(3);
  const [stress, setStress] = useState<StressLevel>(3);
  const [sadness, setSadness] = useState<MoodLevel>(3);
  const [foodQuality, setFoodQuality] = useState<MoodLevel>(3);
  const [activities, setActivities] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      exerciseMinutes,
      laughter,
      stress,
      sadness,
      foodQuality,
      activities,
      notes: notes || undefined,
    });
  };

  const renderMoodSelector = (
    title: string,
    description: string,
    value: MoodLevel,
    onChange: (value: MoodLevel) => void,
    emojis: string[],
    icon: React.ComponentType<{ className?: string }>
  ) => {
    const Icon = icon;
    return (
      <div>
        <Label className="text-base font-semibold mb-3 flex items-center gap-2">
          <Icon className="h-5 w-5 text-sky-600" />
          {title}
        </Label>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => onChange(level as MoodLevel)}
              className={`flex-1 aspect-square rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                value === level
                  ? "border-sky-500 bg-sky-50 shadow-md scale-105"
                  : "border-gray-200 hover:border-sky-300"
              }`}
            >
              <span className="text-3xl">{emojis[level - 1]}</span>
              <span className="text-xs font-medium text-gray-600">{level}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <form id="daily-factors-form" onSubmit={handleSubmit} className="space-y-6">
      {/* Exercise */}
      <Card className="border-sky-200">
        <CardHeader>
          <CardTitle className="text-lg text-sky-900 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Ejercicio Físico
          </CardTitle>
          <CardDescription>
            ¿Cuántos minutos de ejercicio o actividad física realizaste hoy?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              min="0"
              max="300"
              value={exerciseMinutes}
              onChange={(e) => setExerciseMinutes(Number(e.target.value))}
              className="text-2xl font-bold text-center"
            />
            <span className="text-gray-600 font-medium">minutos</span>
          </div>
          <div className="mt-3 flex gap-2">
            {[0, 15, 30, 45, 60].map((minutes) => (
              <button
                key={minutes}
                type="button"
                onClick={() => setExerciseMinutes(minutes)}
                className="px-3 py-1 rounded-lg text-sm border border-sky-300 hover:bg-sky-50 transition-colors"
              >
                {minutes}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mood Factors */}
      <Card className="border-sky-200">
        <CardHeader>
          <CardTitle className="text-lg text-sky-900">Estado de Ánimo</CardTitle>
          <CardDescription>
            Evalúa cómo te has sentido hoy en una escala del 1 al 5
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderMoodSelector(
            "Risa y alegría",
            "¿Cuánto reíste o te sentiste alegre hoy?",
            laughter,
            setLaughter,
            moodEmojis,
            Smile
          )}

          {renderMoodSelector(
            "Nivel de estrés",
            "¿Qué tan estresado te sentiste hoy?",
            stress,
            setStress,
            stressEmojis,
            Activity
          )}

          {renderMoodSelector(
            "Tristeza o pena",
            "¿Cuánta tristeza o pena sentiste hoy?",
            sadness,
            setSadness,
            moodEmojis.slice().reverse(),
            Frown
          )}

          {renderMoodSelector(
            "Calidad de alimentación",
            "¿Qué tan bien te alimentaste hoy?",
            foodQuality,
            setFoodQuality,
            ["😞", "😕", "😐", "🙂", "😋"],
            Apple
          )}
        </CardContent>
      </Card>

      {/* Activities */}
      <Card className="border-sky-200">
        <CardHeader>
          <CardTitle className="text-lg text-sky-900">
            Actividades del Día
          </CardTitle>
          <CardDescription>
            Describe brevemente las actividades relevantes que realizaste
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
            placeholder="Ej: Trabajo en oficina, caminata por el parque, tiempo con familia..."
            rows={3}
            required
          />
        </CardContent>
      </Card>

      {/* Optional Notes */}
      <Card className="border-sky-200">
        <CardHeader>
          <CardTitle className="text-lg text-sky-900">
            Notas Adicionales (Opcional)
          </CardTitle>
          <CardDescription>
            Cualquier otra observación sobre tu día
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Algo más que quieras agregar..."
            rows={3}
          />
        </CardContent>
      </Card>
    </form>
  );
}
