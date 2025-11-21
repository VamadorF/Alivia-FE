/**
 * Mock data for medications
 */

import { Medication, MedicationDose } from "@/types";

export const mockMedications: Medication[] = [
  {
    id: "med-001",
    patientId: "patient-001",
    name: "Tramadol",
    dose: "50mg",
    category: "pain",
    schedule: [
      { time: "08:00", taken: true, takenAt: "08:05" },
      { time: "20:00", taken: false }
    ],
    startDate: "2025-10-01",
    prescribedBy: "Dr. García",
    colorTone: "#3b82f6", // blue
    instructions: "Tomar con alimentos"
  },
  {
    id: "med-002",
    patientId: "patient-001",
    name: "Gabapentina",
    dose: "300mg",
    category: "chronic",
    schedule: [
      { time: "09:00", taken: true, takenAt: "09:10" },
      { time: "21:00", taken: false }
    ],
    startDate: "2025-09-15",
    prescribedBy: "Dr. García",
    colorTone: "#8b5cf6", // purple
    instructions: "No suspender abruptamente"
  },
  {
    id: "med-003",
    patientId: "patient-001",
    name: "Amitriptilina",
    dose: "25mg",
    category: "mood",
    schedule: [
      { time: "22:00", taken: false }
    ],
    startDate: "2025-11-01",
    prescribedBy: "Dr. López",
    colorTone: "#ec4899", // pink
    instructions: "Tomar antes de dormir"
  },
  {
    id: "med-004",
    patientId: "patient-001",
    name: "Ibuprofeno",
    dose: "400mg",
    category: "pain",
    schedule: [
      { time: "12:00", taken: true, takenAt: "12:15" },
      { time: "18:00", taken: false }
    ],
    startDate: "2025-11-10",
    endDate: "2025-11-25",
    prescribedBy: "Dr. García",
    colorTone: "#06b6d4", // cyan
    instructions: "Tomar después de las comidas"
  },
  {
    id: "med-005",
    patientId: "patient-001",
    name: "Vitamina D",
    dose: "1000 UI",
    category: "supplement",
    schedule: [
      { time: "10:00", taken: true, takenAt: "10:05" }
    ],
    startDate: "2025-10-20",
    colorTone: "#f59e0b", // amber
    instructions: "Tomar con el desayuno"
  }
];

export const mockMedicationDoses: MedicationDose[] = [
  {
    id: "dose-001",
    medicationId: "med-001",
    scheduledTime: "2025-11-20T08:00:00",
    actualTime: "2025-11-20T08:05:00",
    taken: true,
    skipped: false
  },
  {
    id: "dose-002",
    medicationId: "med-001",
    scheduledTime: "2025-11-20T20:00:00",
    taken: false,
    skipped: false
  },
  {
    id: "dose-003",
    medicationId: "med-002",
    scheduledTime: "2025-11-20T09:00:00",
    actualTime: "2025-11-20T09:10:00",
    taken: true,
    skipped: false
  }
];

// Helper function to get next dose time
export function getNextDose(medication: Medication): { time: string; hoursRemaining: number } | null {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const untakenSchedules = medication.schedule
    .filter(s => !s.taken)
    .map(s => {
      const [hours, minutes] = s.time.split(':').map(Number);
      const scheduleTime = hours * 60 + minutes;
      return { time: s.time, minutes: scheduleTime };
    })
    .sort((a, b) => a.minutes - b.minutes);

  if (untakenSchedules.length === 0) return null;

  const nextSchedule = untakenSchedules.find(s => s.minutes > currentTime) || untakenSchedules[0];
  
  let minutesRemaining = nextSchedule.minutes - currentTime;
  if (minutesRemaining < 0) minutesRemaining += 24 * 60; // Next day
  
  const hoursRemaining = minutesRemaining / 60;
  
  return {
    time: nextSchedule.time,
    hoursRemaining: Math.round(hoursRemaining * 10) / 10
  };
}

// Helper function to sort medications by next dose proximity
export function sortByNextDose(medications: Medication[]): Medication[] {
  return [...medications].sort((a, b) => {
    const nextA = getNextDose(a);
    const nextB = getNextDose(b);
    
    if (!nextA && !nextB) return 0;
    if (!nextA) return 1;
    if (!nextB) return -1;
    
    return nextA.hoursRemaining - nextB.hoursRemaining;
  });
}

// Helper function to group medications by category
export function groupByCategory(medications: Medication[]): Record<string, Medication[]> {
  return medications.reduce((acc, med) => {
    if (!acc[med.category]) {
      acc[med.category] = [];
    }
    acc[med.category].push(med);
    return acc;
  }, {} as Record<string, Medication[]>);
}
