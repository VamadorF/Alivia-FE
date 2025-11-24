/**
 * Mock data for community forums
 */

import { Forum, ForumPost, ForumReply } from "@/types";

export const mockForums: Forum[] = [
  {
    id: "forum-001",
    name: "Dolor Crónico General",
    description: "Espacio para compartir experiencias y apoyo mutuo sobre dolor crónico",
    pathology: "chronic-pain",
    memberCount: 2547,
    postCount: 8934,
    tags: ["dolor crónico", "apoyo", "experiencias"],
    moderators: ["mod-001", "mod-002"],
    createdAt: "2024-01-15"
  },
  {
    id: "forum-002",
    name: "Dolor Oncológico",
    description: "Comunidad de apoyo para pacientes con dolor relacionado con cáncer",
    pathology: "cancer",
    memberCount: 1234,
    postCount: 4567,
    tags: ["cáncer", "dolor", "oncología", "quimioterapia"],
    moderators: ["mod-003", "mod-004"],
    createdAt: "2024-02-10"
  },
  {
    id: "forum-003",
    name: "Fibromialgia",
    description: "Espacio para personas que viven con fibromialgia",
    pathology: "fibromyalgia",
    memberCount: 3421,
    postCount: 12890,
    tags: ["fibromialgia", "dolor muscular", "fatiga"],
    moderators: ["mod-005"],
    createdAt: "2023-11-20"
  },
  {
    id: "forum-004",
    name: "Artritis y Dolor Articular",
    description: "Comunidad para personas con artritis y problemas articulares",
    pathology: "arthritis",
    memberCount: 1876,
    postCount: 6543,
    tags: ["artritis", "articulaciones", "inflamación"],
    moderators: ["mod-006"],
    createdAt: "2024-03-05"
  },
  {
    id: "forum-005",
    name: "Dolor de Espalda",
    description: "Foro dedicado al dolor de espalda y problemas relacionados",
    pathology: "back-pain",
    memberCount: 4123,
    postCount: 15678,
    tags: ["espalda", "lumbar", "cervical", "hernias"],
    moderators: ["mod-007", "mod-008"],
    createdAt: "2023-10-12"
  },
  {
    id: "forum-006",
    name: "Migraña y Dolor de Cabeza",
    description: "Comunidad para personas que sufren de migrañas y cefaleas",
    pathology: "migraine",
    memberCount: 2890,
    postCount: 9876,
    tags: ["migraña", "cefalea", "dolor de cabeza"],
    moderators: ["mod-009"],
    createdAt: "2024-01-20"
  },
  {
    id: "forum-007",
    name: "Neuropatía",
    description: "Espacio para compartir sobre dolor neuropático y tratamientos",
    pathology: "neuropathy",
    memberCount: 1543,
    postCount: 5432,
    tags: ["neuropatía", "dolor neuropático", "nervios"],
    moderators: ["mod-010"],
    createdAt: "2024-04-15"
  }
];

export const mockForumPosts: ForumPost[] = [
  {
    id: "post-001",
    forumId: "forum-001",
    authorId: "patient-123",
    authorName: "María González",
    authorType: "patient",
    content: "Hola a todos. Llevo 3 años lidiando con dolor crónico en la espalda baja. ¿Alguien tiene consejos sobre cómo manejar los días difíciles?",
    createdAt: "2025-11-20T10:30:00",
    likes: 12,
    replies: [
      {
        id: "reply-001",
        postId: "post-001",
        authorId: "patient-456",
        authorName: "Carlos Ramírez",
        authorType: "patient",
        content: "Hola María. Yo también tengo dolor crónico. Lo que me ha ayudado es establecer una rutina de estiramientos suaves por la mañana.",
        createdAt: "2025-11-20T11:15:00",
        likes: 5
      },
      {
        id: "reply-002",
        postId: "post-001",
        authorId: "ai-001",
        authorName: "AlivIA Asistente",
        authorType: "ai",
        content: "Hola María. Es importante recordar que cada persona es diferente. Algunas estrategias que otros pacientes han encontrado útiles incluyen: técnicas de relajación, ejercicio moderado adaptado, y mantener un diario del dolor. Te recomiendo hablar con tu médico sobre opciones de tratamiento personalizadas.",
        createdAt: "2025-11-20T11:20:00",
        likes: 8
      }
    ],
    flagged: false
  },
  {
    id: "post-002",
    forumId: "forum-001",
    authorId: "patient-789",
    authorName: "Ana Silva",
    authorType: "patient",
    content: "¿Alguien ha probado la terapia de frío/calor? Mi fisioterapeuta me lo recomendó pero no estoy segura de cómo aplicarlo correctamente.",
    createdAt: "2025-11-19T15:45:00",
    likes: 8,
    replies: [
      {
        id: "reply-003",
        postId: "post-002",
        authorId: "prof-001",
        authorName: "Dr. Sebastián Torres",
        authorType: "professional",
        content: "Hola Ana. La terapia de contraste puede ser muy efectiva. Generalmente se recomienda: frío para inflamación aguda (15-20 min), y calor para dolor muscular crónico (20-30 min). Siempre protege tu piel con una toalla.",
        createdAt: "2025-11-19T16:30:00",
        likes: 15
      }
    ],
    flagged: false
  },
  {
    id: "post-003",
    forumId: "forum-002",
    authorId: "patient-321",
    authorName: "Roberto Fernández",
    authorType: "patient",
    content: "Estoy en mi tercer ciclo de quimioterapia y el dolor está siendo muy difícil de manejar. Me siento muy solo en esto.",
    createdAt: "2025-11-18T08:20:00",
    likes: 23,
    replies: [
      {
        id: "reply-004",
        postId: "post-003",
        authorId: "ai-001",
        authorName: "AlivIA Asistente",
        authorType: "ai",
        content: "⚠️ ALERTA: Este mensaje ha sido marcado para revisión por un profesional de la salud mental debido al contenido emocional. Roberto, no estás solo. Es completamente normal sentirse así durante el tratamiento.",
        createdAt: "2025-11-18T08:25:00",
        likes: 5
      },
      {
        id: "reply-005",
        postId: "post-003",
        authorId: "patient-654",
        authorName: "Laura Martínez",
        authorType: "patient",
        content: "Roberto, estoy contigo. Yo pasé por lo mismo. Los grupos de apoyo me ayudaron mucho. ¿Has considerado unirte a alguno? También hablar con tu equipo médico sobre el manejo del dolor es fundamental.",
        createdAt: "2025-11-18T09:10:00",
        likes: 18
      }
    ],
    flagged: true,
    flagReason: "Contenido emocional que requiere atención profesional"
  },
  {
    id: "post-004",
    forumId: "forum-003",
    authorId: "patient-987",
    authorName: "Claudia Vargas",
    authorType: "patient",
    content: "Buenos días a todos. ¿Alguien ha notado que el clima afecta sus síntomas de fibromialgia? En mi caso, los días fríos y húmedos son terribles.",
    createdAt: "2025-11-17T07:00:00",
    likes: 34,
    replies: [
      {
        id: "reply-006",
        postId: "post-004",
        authorId: "patient-147",
        authorName: "Patricia Rojas",
        authorType: "patient",
        content: "¡Sí! A mí también me pasa. He notado que mantenerme abrigada y hacer ejercicio suave ayuda. También llevo un registro en mi app de Alivia para ver los patrones.",
        createdAt: "2025-11-17T08:30:00",
        likes: 12
      },
      {
        id: "reply-007",
        postId: "post-004",
        authorId: "prof-002",
        authorName: "Dra. Isabel Moreno",
        authorType: "professional",
        content: "Hola Claudia. Efectivamente, muchos pacientes con fibromialgia reportan sensibilidad a cambios climáticos. Esto puede estar relacionado con cambios en la presión barométrica. Mantener una rutina de autocuidado es clave.",
        createdAt: "2025-11-17T10:15:00",
        likes: 20
      }
    ],
    flagged: false
  }
];

// Helper function to get posts for a specific forum
export function getForumPosts(forumId: string): ForumPost[] {
  return mockForumPosts.filter(post => post.forumId === forumId);
}

// Helper function to get flagged posts
export function getFlaggedPosts(): ForumPost[] {
  return mockForumPosts.filter(post => post.flagged);
}

// Helper function to count AI interventions
export function countAIInterventions(forumId?: string): number {
  const posts = forumId ? getForumPosts(forumId) : mockForumPosts;
  
  let count = 0;
  posts.forEach(post => {
    if (post.authorType === "ai") count++;
    post.replies.forEach(reply => {
      if (reply.authorType === "ai") count++;
    });
  });
  
  return count;
}
