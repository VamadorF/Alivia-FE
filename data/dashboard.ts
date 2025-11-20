/**
 * Mock data for patient dashboard
 * In a real application, this would come from an API
 */

export interface TodayMedication {
  time: string;
  name: string;
  dose: string;
}

export interface RecommendedForum {
  id: string;
  name: string;
  description: string;
  tags: string[];
  members: number;
}

export const todayMeds: TodayMedication[] = [
  { time: "06:00", name: "Omeprazol", dose: "20mg" },
  { time: "07:00", name: "Furosemida", dose: "40mg" },
  { time: "07:30", name: "Sertralina", dose: "50mg" },
  { time: "12:00", name: "Paracetamol", dose: "500mg" },
  { time: "14:00", name: "Ibuprofeno", dose: "400mg" },
  { time: "20:00", name: "Omeprazol", dose: "20mg" },
];

export const recommendedForums: RecommendedForum[] = [
  {
    id: "forum-001",
    name: "Cardiopatías",
    description: "Comunidad de apoyo para personas con enfermedades cardíacas",
    tags: ["#corazón", "#cardiopatía", "#salud"],
    members: 1234,
  },
  {
    id: "forum-002",
    name: "Dolor Oncológico",
    description: "Espacio de apoyo para manejo del dolor relacionado con cáncer",
    tags: ["#cáncer", "#dolor", "#oncología"],
    members: 856,
  },
  {
    id: "forum-003",
    name: "Dolor Crónico",
    description: "Comunidad para compartir experiencias sobre dolor crónico",
    tags: ["#dolor", "#crónico", "#fibromialgia"],
    members: 2103,
  },
];
