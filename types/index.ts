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
