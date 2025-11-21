/**
 * Type definitions for Alivia Healthcare Platform
 * All types are strictly typed - no 'any' types allowed
 */

export interface MedicalService {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  category: ServiceCategory;
  available: boolean;
  badge?: ServiceBadge;
}

export type ServiceCategory = 
  | "general"
  | "specialty"
  | "telemedicine"
  | "checkup";

export type ServiceBadge = 
  | "popular"
  | "recommended"
  | "new"
  | "online"
  | "fast";

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}

export type AppointmentStatus = 
  | "confirmed"
  | "pending"
  | "cancelled"
  | "completed";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  available: boolean;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  appointments: Appointment[];
}

export interface StatCard {
  value: string;
  label: string;
  color: "sky" | "indigo";
}

export type UserType = "patient" | "professional";

export type ProfessionType = 
  | "Médico"
  | "Kinesiólogo"
  | "Psicólogo"
  | "Psiquiatra"
  | "Nutricionista"
  | "Enfermero"
  | "Terapeuta Ocupacional"
  | "Otro";

export interface ProfessionalData {
  professionType: ProfessionType;
  professionalID?: string;
}

export interface RegistrationPayload {
  fullName: string;
  rut: string;
  birthDate: string;
  gender?: string;
  email: string;
  phone: string;
  password: string;
  userType: UserType;
  professionalData: ProfessionalData | null;
  consents: {
    terms: boolean;
    dataUse: boolean;
    notifications: boolean;
  };
}

// Pain Report Types
export type PainLocation = 
  | "head" | "neck" | "shoulders" | "upper-back" | "lower-back"
  | "chest" | "abdomen" | "left-arm" | "right-arm" | "left-hand" | "right-hand"
  | "left-leg" | "right-leg" | "left-foot" | "right-foot" | "joints" | "full-body";

export type PainType = 
  | "electric" | "cold" | "sharp" | "burning" | "throbbing"
  | "dull" | "cramping" | "tingling" | "shooting";

export type PainTemporality = "constant" | "intermittent" | "occasional";

export interface PainReport {
  id: string;
  patientId: string;
  date: string;
  time: string;
  location: PainLocation[];
  intensity: number; // 0-10 scale (EVA/ENA)
  painType: PainType[];
  temporality: PainTemporality;
  startedWhen: string; // e.g., "2 days ago", "1 week ago"
  notes?: string;
}

// Daily Factors Types
export type MoodLevel = 1 | 2 | 3 | 4 | 5;
export type StressLevel = 1 | 2 | 3 | 4 | 5;

export interface DailyFactors {
  id: string;
  patientId: string;
  date: string;
  exerciseMinutes: number;
  laughter: MoodLevel;
  stress: StressLevel;
  sadness: MoodLevel;
  foodQuality: MoodLevel;
  activities: string;
  notes?: string;
}

// PSS-10 Questionnaire Types
export type PSSResponse = 0 | 1 | 2 | 3 | 4; // Never, Almost Never, Sometimes, Fairly Often, Very Often

export interface PSS10Response {
  id: string;
  patientId: string;
  date: string;
  responses: PSSResponse[]; // 10 responses
  totalScore: number; // 0-40
  stressLevel: "low" | "moderate" | "high";
}

export const PSS10Questions = [
  "En el último mes, ¿con qué frecuencia ha estado afectado por algo que ha ocurrido inesperadamente?",
  "En el último mes, ¿con qué frecuencia se ha sentido incapaz de controlar las cosas importantes en su vida?",
  "En el último mes, ¿con qué frecuencia se ha sentido nervioso o estresado?",
  "En el último mes, ¿con qué frecuencia ha manejado con éxito los pequeños problemas irritantes de la vida?",
  "En el último mes, ¿con qué frecuencia ha sentido que ha afrontado efectivamente los cambios importantes que han estado ocurriendo en su vida?",
  "En el último mes, ¿con qué frecuencia ha estado seguro sobre su capacidad para manejar sus problemas personales?",
  "En el último mes, ¿con qué frecuencia ha sentido que las cosas le van bien?",
  "En el último mes, ¿con qué frecuencia ha sentido que no podía afrontar todas las cosas que tenía que hacer?",
  "En el último mes, ¿con qué frecuencia ha podido controlar las dificultades de su vida?",
  "En el último mes, ¿con qué frecuencia se ha sentido que tenía todo bajo control?"
];

// Medication Types
export type MedicationCategory = "pain" | "mood" | "chronic" | "supplement" | "other";

export interface Medication {
  id: string;
  patientId: string;
  name: string;
  dose: string;
  category: MedicationCategory;
  schedule: MedicationSchedule[];
  startDate: string;
  endDate?: string;
  prescribedBy?: string;
  colorTone: string; // Hex color for circular display
  instructions?: string;
}

export interface MedicationSchedule {
  time: string; // HH:MM format
  taken: boolean;
  takenAt?: string;
}

export interface MedicationDose {
  id: string;
  medicationId: string;
  scheduledTime: string;
  actualTime?: string;
  taken: boolean;
  skipped: boolean;
  notes?: string;
}

// Community/Forum Types
export type PathologyCategory = 
  | "chronic-pain" | "cancer" | "fibromyalgia" | "arthritis" 
  | "neuropathy" | "back-pain" | "migraine" | "other";

export interface Forum {
  id: string;
  name: string;
  description: string;
  pathology: PathologyCategory;
  memberCount: number;
  postCount: number;
  tags: string[];
  moderators: string[];
  createdAt: string;
}

export interface ForumPost {
  id: string;
  forumId: string;
  authorId: string;
  authorName: string;
  authorType: "patient" | "professional" | "ai";
  content: string;
  createdAt: string;
  likes: number;
  replies: ForumReply[];
  flagged: boolean;
  flagReason?: string;
}

export interface ForumReply {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorType: "patient" | "professional" | "ai";
  content: string;
  createdAt: string;
  likes: number;
}

// Professional Dashboard Types
export type AlertType = "high-pain" | "pain-increase" | "medication-missed" | "stress-high" | "risk-flag";
export type TrendDirection = "increasing" | "decreasing" | "stable";

export interface PatientAlert {
  id: string;
  patientId: string;
  patientName: string;
  type: AlertType;
  severity: "low" | "medium" | "high";
  message: string;
  createdAt: string;
  acknowledged: boolean;
  data?: unknown;
}

export interface PainTrend {
  patientId: string;
  period: "week" | "month" | "quarter";
  direction: TrendDirection;
  averagePain: number;
  peakPain: number;
  lowPain: number;
  dataPoints: Array<{ date: string; intensity: number }>;
}

export interface PatientCorrelation {
  patientId: string;
  painVsStress: number; // -1 to 1 correlation coefficient
  painVsActivity: number;
  painVsMedication: number;
  insights: string[];
}

// Medical Instructions Types
export interface MedicalInstruction {
  id: string;
  patientId: string;
  professionalId: string;
  professionalName: string;
  type: "medication" | "exercise" | "diet" | "lifestyle" | "followup" | "other";
  title: string;
  description: string;
  frequency?: string;
  duration?: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

// Clinical Notes Types
export interface ClinicalNote {
  id: string;
  patientId: string;
  professionalId: string;
  professionalName: string;
  type: "consultation" | "followup" | "assessment" | "referral" | "other";
  content: string;
  createdAt: string;
  isReferral: boolean;
  referralTo?: string;
  referralReason?: string;
}

// Follow-up Module Types
export interface FollowUpPrompt {
  id: string;
  patientId: string;
  triggeredBy: "high-pain" | "pain-decrease" | "missed-medication" | "high-stress";
  questions: string[];
  responses?: string[];
  createdAt: string;
  completedAt?: string;
}

// Theme Customization Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface UserPreferences {
  userId: string;
  theme: ThemeColors;
  notificationsEnabled: boolean;
  language: "es" | "en";
}
