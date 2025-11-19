import type { MedicalService } from "@/types";

/**
 * Mock medical services data for demonstration purposes
 * In a real application, this would come from an API
 */
export const mockServices: MedicalService[] = [
  {
    id: "srv-001",
    title: "Consulta Médica General",
    description: "Atención médica general para cualquier condición de salud",
    duration: "30 min",
    price: "$45.000",
    category: "general",
    available: true,
    badge: "popular",
  },
  {
    id: "srv-002",
    title: "Control de Especialidad",
    description: "Seguimiento con médicos especialistas",
    duration: "45 min",
    price: "$65.000",
    category: "specialty",
    available: true,
  },
  {
    id: "srv-003",
    title: "Telemedicina",
    description: "Consulta médica online desde tu hogar",
    duration: "20 min",
    price: "$35.000",
    category: "telemedicine",
    available: true,
    badge: "online",
  },
  {
    id: "srv-004",
    title: "Chequeo Médico Anual",
    description: "Evaluación completa de salud con análisis preventivos",
    duration: "60 min",
    price: "$120.000",
    category: "checkup",
    available: true,
    badge: "recommended",
  },
];
