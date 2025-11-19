import type { Appointment } from "@/types";

/**
 * Mock appointment data for demonstration purposes
 * In a real application, this would come from an API
 */
export const mockAppointments: Appointment[] = [
  {
    id: "apt-001",
    doctorName: "Dr. María González",
    specialty: "Medicina General",
    date: "25 Nov 2025",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: "apt-002",
    doctorName: "Dr. Carlos Ruiz",
    specialty: "Cardiología",
    date: "28 Nov 2025",
    time: "2:30 PM",
    status: "confirmed",
  },
  {
    id: "apt-003",
    doctorName: "Dra. Ana Martínez",
    specialty: "Dermatología",
    date: "30 Nov 2025",
    time: "11:00 AM",
    status: "pending",
  },
];
