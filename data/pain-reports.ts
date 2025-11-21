/**
 * Mock data for pain reports
 */

import { PainReport, DailyFactors, PSS10Response, PSSResponse } from "@/types";

export const mockPainReports: PainReport[] = [
  {
    id: "pr-001",
    patientId: "patient-001",
    date: "2025-11-20",
    time: "08:30",
    location: ["lower-back", "left-leg"],
    intensity: 7,
    painType: ["sharp", "shooting"],
    temporality: "intermittent",
    startedWhen: "3 días",
    notes: "El dolor aumenta al estar sentado por mucho tiempo"
  },
  {
    id: "pr-002",
    patientId: "patient-001",
    date: "2025-11-19",
    time: "14:00",
    location: ["lower-back"],
    intensity: 5,
    painType: ["dull", "throbbing"],
    temporality: "constant",
    startedWhen: "4 días",
  },
  {
    id: "pr-003",
    patientId: "patient-001",
    date: "2025-11-18",
    time: "09:15",
    location: ["lower-back", "right-leg"],
    intensity: 8,
    painType: ["electric", "sharp"],
    temporality: "intermittent",
    startedWhen: "5 días",
    notes: "Dolor intenso al despertar"
  }
];

export const mockDailyFactors: DailyFactors[] = [
  {
    id: "df-001",
    patientId: "patient-001",
    date: "2025-11-20",
    exerciseMinutes: 30,
    laughter: 3,
    stress: 4,
    sadness: 2,
    foodQuality: 4,
    activities: "Caminata matutina, trabajo en oficina",
    notes: "Día algo estresante por reuniones"
  },
  {
    id: "df-002",
    patientId: "patient-001",
    date: "2025-11-19",
    exerciseMinutes: 0,
    laughter: 2,
    stress: 3,
    sadness: 3,
    foodQuality: 3,
    activities: "Trabajo desde casa, descanso",
  },
  {
    id: "df-003",
    patientId: "patient-001",
    date: "2025-11-18",
    exerciseMinutes: 15,
    laughter: 4,
    stress: 2,
    sadness: 1,
    foodQuality: 5,
    activities: "Estiramientos, tiempo con familia",
    notes: "Buen día en general"
  }
];

export const mockPSS10Response: PSS10Response = {
  id: "pss-001",
  patientId: "patient-001",
  date: "2025-11-20",
  responses: [2, 3, 3, 2, 1, 2, 1, 3, 2, 1] as PSSResponse[],
  totalScore: 20,
  stressLevel: "moderate"
};

// Helper function to calculate PSS-10 score
export function calculatePSS10Score(responses: PSSResponse[]): number {
  if (responses.length !== 10) {
    throw new Error("PSS-10 requires exactly 10 responses");
  }
  
  // Items 4, 5, 6, 7, 9, and 10 are reverse scored
  const reverseItems = [3, 4, 5, 6, 8, 9];
  
  let total = 0;
  responses.forEach((response, index) => {
    if (reverseItems.includes(index)) {
      total += 4 - response; // Reverse score
    } else {
      total += response;
    }
  });
  
  return total;
}

// Helper function to determine stress level
export function getStressLevel(score: number): "low" | "moderate" | "high" {
  if (score <= 13) return "low";
  if (score <= 26) return "moderate";
  return "high";
}
