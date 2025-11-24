/**
 * Mock data for professional dashboard
 */

import { PatientAlert, PainTrend, PatientCorrelation, MedicalInstruction, ClinicalNote, FollowUpPrompt } from "@/types";

export const mockPatientAlerts: PatientAlert[] = [
  {
    id: "alert-001",
    patientId: "patient-001",
    patientName: "María González",
    type: "high-pain",
    severity: "high",
    message: "Dolor reportado nivel 8/10 en últimas 24 horas",
    createdAt: "2025-11-20T08:30:00",
    acknowledged: false,
    data: { painLevel: 8, location: "lower-back" }
  },
  {
    id: "alert-002",
    patientId: "patient-002",
    patientName: "Carlos Ramírez",
    type: "pain-increase",
    severity: "medium",
    message: "Aumento del 40% en nivel de dolor promedio en última semana",
    createdAt: "2025-11-20T09:15:00",
    acknowledged: false,
    data: { previousAverage: 5, currentAverage: 7 }
  },
  {
    id: "alert-003",
    patientId: "patient-003",
    patientName: "Ana Silva",
    type: "stress-high",
    severity: "medium",
    message: "Nivel de estrés PSS-10: 28 (Alto)",
    createdAt: "2025-11-19T14:20:00",
    acknowledged: true,
    data: { pss10Score: 28 }
  },
  {
    id: "alert-004",
    patientId: "patient-004",
    patientName: "Roberto Fernández",
    type: "risk-flag",
    severity: "high",
    message: "Contenido emocional en foro requiere atención",
    createdAt: "2025-11-18T08:25:00",
    acknowledged: true,
    data: { forumPostId: "post-003", reason: "Sentimientos de soledad y dificultad" }
  },
  {
    id: "alert-005",
    patientId: "patient-005",
    patientName: "Laura Martínez",
    type: "medication-missed",
    severity: "low",
    message: "3 dosis de medicamento no tomadas en últimos 2 días",
    createdAt: "2025-11-19T20:00:00",
    acknowledged: false,
    data: { medicationName: "Gabapentina", missedDoses: 3 }
  }
];

export const mockPainTrends: PainTrend[] = [
  {
    patientId: "patient-001",
    period: "week",
    direction: "increasing",
    averagePain: 6.8,
    peakPain: 8,
    lowPain: 5,
    dataPoints: [
      { date: "2025-11-14", intensity: 5 },
      { date: "2025-11-15", intensity: 6 },
      { date: "2025-11-16", intensity: 6 },
      { date: "2025-11-17", intensity: 7 },
      { date: "2025-11-18", intensity: 8 },
      { date: "2025-11-19", intensity: 7 },
      { date: "2025-11-20", intensity: 7 }
    ]
  },
  {
    patientId: "patient-002",
    period: "week",
    direction: "stable",
    averagePain: 5.2,
    peakPain: 6,
    lowPain: 4,
    dataPoints: [
      { date: "2025-11-14", intensity: 5 },
      { date: "2025-11-15", intensity: 5 },
      { date: "2025-11-16", intensity: 6 },
      { date: "2025-11-17", intensity: 5 },
      { date: "2025-11-18", intensity: 5 },
      { date: "2025-11-19", intensity: 4 },
      { date: "2025-11-20", intensity: 6 }
    ]
  },
  {
    patientId: "patient-003",
    period: "week",
    direction: "decreasing",
    averagePain: 4.1,
    peakPain: 6,
    lowPain: 3,
    dataPoints: [
      { date: "2025-11-14", intensity: 6 },
      { date: "2025-11-15", intensity: 5 },
      { date: "2025-11-16", intensity: 4 },
      { date: "2025-11-17", intensity: 4 },
      { date: "2025-11-18", intensity: 3 },
      { date: "2025-11-19", intensity: 3 },
      { date: "2025-11-20", intensity: 4 }
    ]
  }
];

export const mockPatientCorrelations: PatientCorrelation[] = [
  {
    patientId: "patient-001",
    painVsStress: 0.78,
    painVsActivity: -0.45,
    painVsMedication: -0.62,
    insights: [
      "Fuerte correlación positiva entre estrés y dolor (r=0.78)",
      "El ejercicio moderado se asocia con menor dolor",
      "Adherencia a medicación muestra mejoría en control del dolor"
    ]
  },
  {
    patientId: "patient-002",
    painVsStress: 0.34,
    painVsActivity: -0.23,
    painVsMedication: -0.41,
    insights: [
      "Correlación moderada entre estrés y dolor",
      "Patrón inconsistente entre actividad y dolor",
      "Considerar ajuste en esquema de medicación"
    ]
  },
  {
    patientId: "patient-003",
    painVsStress: 0.89,
    painVsActivity: -0.67,
    painVsMedication: -0.73,
    insights: [
      "Muy fuerte correlación entre estrés y dolor (r=0.89)",
      "Actividad física regular asociada con menor dolor",
      "Excelente respuesta a tratamiento farmacológico",
      "Considerar terapia de manejo de estrés"
    ]
  }
];

export const mockMedicalInstructions: MedicalInstruction[] = [
  {
    id: "instr-001",
    patientId: "patient-001",
    professionalId: "prof-001",
    professionalName: "Dr. Sebastián García",
    type: "medication",
    title: "Tramadol 50mg",
    description: "Tomar 1 cápsula cada 8 horas con alimentos. No exceder 3 dosis diarias.",
    frequency: "Cada 8 horas",
    duration: "30 días",
    createdAt: "2025-10-01T10:00:00",
    updatedAt: "2025-10-01T10:00:00",
    active: true
  },
  {
    id: "instr-002",
    patientId: "patient-001",
    professionalId: "prof-002",
    professionalName: "Dra. Isabel Moreno",
    type: "exercise",
    title: "Ejercicios de estiramiento lumbar",
    description: "Realizar rutina de 15 minutos de estiramientos suaves para espalda baja. Incluir: gato-camello, rodillas al pecho, torsión espinal suave.",
    frequency: "2 veces al día (mañana y noche)",
    duration: "Indefinido",
    createdAt: "2025-10-15T14:30:00",
    updatedAt: "2025-10-15T14:30:00",
    active: true
  },
  {
    id: "instr-003",
    patientId: "patient-001",
    professionalId: "prof-001",
    professionalName: "Dr. Sebastián García",
    type: "lifestyle",
    title: "Higiene del sueño",
    description: "Mantener horario regular de sueño. Dormir 7-8 horas. Evitar pantallas 1 hora antes de dormir. Habitación oscura y fresca.",
    frequency: "Diario",
    duration: "Indefinido",
    createdAt: "2025-11-01T11:00:00",
    updatedAt: "2025-11-01T11:00:00",
    active: true
  },
  {
    id: "instr-004",
    patientId: "patient-001",
    professionalId: "prof-003",
    professionalName: "Lic. Carmen Vega (Psicóloga)",
    type: "other",
    title: "Técnicas de respiración para manejo de dolor",
    description: "Practicar respiración diafragmática: inhalar 4 segundos, sostener 7, exhalar 8. Repetir 5 veces cuando sienta aumento del dolor.",
    frequency: "Según necesidad",
    duration: "Indefinido",
    createdAt: "2025-11-10T16:00:00",
    updatedAt: "2025-11-10T16:00:00",
    active: true
  }
];

export const mockClinicalNotes: ClinicalNote[] = [
  {
    id: "note-001",
    patientId: "patient-001",
    professionalId: "prof-001",
    professionalName: "Dr. Sebastián García",
    type: "consultation",
    content: "Paciente refiere dolor lumbar crónico hace 6 meses. EVA 7/10. Dolor irradiado a pierna izquierda. Examen físico: limitación flexión lumbar, Lasègue (+) izquierdo. Indicación: RNM lumbar, inicio tratamiento con tramadol y gabapentina.",
    createdAt: "2025-10-01T10:00:00",
    isReferral: false
  },
  {
    id: "note-002",
    patientId: "patient-001",
    professionalId: "prof-001",
    professionalName: "Dr. Sebastián García",
    type: "followup",
    content: "Control 2 semanas. Paciente refiere mejoría parcial, dolor EVA 5/10. Buena tolerancia a medicamentos. RNM: hernia discal L5-S1 sin compromiso radicular severo. Plan: continuar tratamiento, agregar kinesiología.",
    createdAt: "2025-10-15T11:30:00",
    isReferral: false
  },
  {
    id: "note-003",
    patientId: "patient-001",
    professionalId: "prof-001",
    professionalName: "Dr. Sebastián García",
    type: "referral",
    content: "Control 1 mes. Dolor persiste EVA 6-7/10 a pesar de tratamiento médico y kinesiología. Componente neuropático claro. Derivación a Especialista en Dolor para evaluación de bloqueo epidural o radiofrecuencia.",
    createdAt: "2025-11-01T14:00:00",
    isReferral: true,
    referralTo: "Dr. Ricardo Molina - Clínica del Dolor",
    referralReason: "Dolor lumbar crónico refractario a tratamiento conservador. Evaluación para procedimientos intervencionistas."
  },
  {
    id: "note-004",
    patientId: "patient-001",
    professionalId: "prof-003",
    professionalName: "Lic. Carmen Vega (Psicóloga)",
    type: "assessment",
    content: "Primera sesión de evaluación psicológica. Paciente presenta síntomas de ansiedad relacionados con dolor crónico. PSS-10: 22 (estrés moderado-alto). Buen insight, motivado para terapia. Plan: 8 sesiones terapia cognitivo-conductual enfocada en manejo de dolor crónico.",
    createdAt: "2025-11-10T16:00:00",
    isReferral: false
  }
];

export const mockFollowUpPrompts: FollowUpPrompt[] = [
  {
    id: "followup-001",
    patientId: "patient-001",
    triggeredBy: "high-pain",
    questions: [
      "¿El dolor ha aumentado gradualmente o fue repentino?",
      "¿Hay algo específico que lo haya desencadenado?",
      "¿Ha tomado su medicación según lo indicado?",
      "¿El dolor le está impidiendo realizar sus actividades diarias?"
    ],
    responses: [
      "Gradualmente en los últimos 2 días",
      "Estuve sentado mucho tiempo trabajando",
      "Sí, he tomado todo según indicación",
      "Sí, me cuesta caminar y estar de pie"
    ],
    createdAt: "2025-11-20T08:30:00",
    completedAt: "2025-11-20T09:00:00"
  },
  {
    id: "followup-002",
    patientId: "patient-003",
    triggeredBy: "pain-decrease",
    questions: [
      "¿Qué hizo diferente hoy que pudo ayudar con el dolor?",
      "¿Realizó alguna actividad nueva?",
      "¿Cambió algo en su rutina de medicamentos?",
      "¿Cómo se siente emocionalmente hoy?"
    ],
    responses: [
      "Hice los estiramientos que me indicó la kinesióloga",
      "Salí a caminar 20 minutos",
      "No, tomé todo igual",
      "Me siento más tranquila y optimista"
    ],
    createdAt: "2025-11-18T15:00:00",
    completedAt: "2025-11-18T15:15:00"
  }
];

// Helper functions
export function getUnacknowledgedAlerts(): PatientAlert[] {
  return mockPatientAlerts.filter(alert => !alert.acknowledged);
}

export function getAlertsByPatient(patientId: string): PatientAlert[] {
  return mockPatientAlerts.filter(alert => alert.patientId === patientId);
}

export function getActiveInstructions(patientId: string): MedicalInstruction[] {
  return mockMedicalInstructions.filter(
    instr => instr.patientId === patientId && instr.active
  );
}

export function getPatientNotes(patientId: string): ClinicalNote[] {
  return mockClinicalNotes
    .filter(note => note.patientId === patientId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getPatientReferrals(patientId: string): ClinicalNote[] {
  return mockClinicalNotes.filter(
    note => note.patientId === patientId && note.isReferral
  );
}
