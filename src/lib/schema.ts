
import { z } from "zod";

export const surveySchema = z.object({
  // Section 1
  q1_name: z.string().min(1, "El nombre es requerido."),
  q1_location: z.string().min(1, "La ubicación es requerida."),
  q1_country: z.string().min(1, "El país es requerido."),
  q1_phone: z.string().min(1, "El número de contacto es requerido."),
  q1_experience: z.number().nullable().optional(),
  q1_role: z.array(z.string()).optional(),
  q1_role_other: z.string().optional(),
  
  // Section 2
  q2_services: z.array(z.string()).optional(),
  q2_unique: z.string().optional(),
  q2_other: z.string().optional(),
  
  // Section 3
  q3_persona: z.string().optional(),
  
  // Section 4
  q4_perception: z.array(z.string()).max(3, "Selecciona como máximo 3 opciones.").optional(),
  q4_other: z.string().optional(),

  // Section 5
  q5_emotions: z.array(z.string()).max(3, "Selecciona como máximo 3 opciones.").optional(),
  q5_other: z.string().optional(),
  
  // Section 6
  q6_why: z.string().optional(),
  
  // Section 7
  q7_differentiation: z.array(z.string()).max(3, "Selecciona como máximo 3 opciones.").optional(),
  q7_why: z.string().optional(),
  q7_other: z.string().optional(),
  
  // Section 8
  q8_value: z.array(z.string()).max(3, "Selecciona como máximo 3 opciones.").optional(),
  q8_other: z.string().optional(),
  
  // Section 9
  q9_presence: z.array(z.string()).optional(),
  q9_other: z.string().optional(),
  
  // Section 10
  q10_rating: z.number().optional().default(5),
  q10_challenges: z.array(z.string()).max(3, "Selecciona como máximo 3 desafíos.").optional(),
  q10_other: z.string().optional(),
  
  // Section 11
  q11_training: z.string().optional(),
  q12_details: z.string().optional(),
  
  // Section 12
  q13_colors: z.array(z.string()).optional(),
  q13_other: z.string().optional(),
  q14_hobby: z.string().optional(),

  // Section 13
  q15_final: z.string().optional(),

  // Competitors
  competitors: z.array(z.object({ name: z.string().optional() })).optional(),
});


export const generalSurveySchema = z.object({
  // Pilar 1: Datos Fundamentales
  name: z.string().min(1, "El nombre es requerido."),
  company: z.string().min(1, "El nombre de la empresa es requerido."),
  role: z.string().min(1, "Tu cargo es requerido."),
  phone: z.string().min(1, "El teléfono es requerido."),
  email: z.string().email("Por favor, introduce un email válido."),

  // Pilar 2: Claridad de Marca y Conexión Emocional
  target_audience: z.string().min(10, "Describe tu público objetivo."),
  business_description: z.string().min(10, "Por favor, describe tu negocio y propósito."),

  // Pilar 3: Ventaja Competitiva
  main_services: z.string().min(10, "Describe tus servicios o productos principales."),
  value_proposition: z.string().min(10, "Por favor, resume tu propuesta de valor en una frase."),
  
  // Pilar 4: Diagnóstico de Eficacia Digital
  marketing_rating: z.number().min(1).max(10).default(5),
  challenges: z.array(z.string()).max(3, "Selecciona como máximo 3 desafíos.").min(1, "Selecciona al menos un desafío."),
  challenges_cost: z.string().min(10, "Describe el costo de no resolver tu principal desafío."),

  // Pilar 5: Visión y Recursos
  goals: z.string().min(10, "Describe tus principales objetivos."),
  growth_expectation: z.number({invalid_type_error: "Debe ser un número"}).min(0, "El crecimiento no puede ser negativo.").optional(),
  avg_customer_value: z.number({invalid_type_error: "Debe ser un número"}).min(0, "El valor no puede ser negativo.").optional(),

  // Pilar 6: Entorno Competitivo
  competitors: z.string().optional(),

  // Final
  interested_services: z.array(z.string()).min(1, "Selecciona al menos un servicio de interés."),
  additional_info: z.string().optional(),
});

export const briefFormSchema = z.object({
    clientName: z.string().min(1, "El nombre del cliente es requerido."),
    consecutive: z.string().min(1, "El consecutivo es requerido."),
    projectName: z.string().min(1, "El nombre de la pieza es requerido."),
    deadline: z.string().min(1, "La fecha límite es requerida."),
    format: z.string(),
    goal: z.string(),
    headline: z.string().min(1, "El titular es requerido."),
    bodyText: z.string().min(1, "La información detallada es requerida."),
    cta: z.string().optional(),
    references: z.string().optional(),
    otherFormat: z.string().optional(),
});

const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  reason: z.string(),
  imageUrl: z.string().optional(),
  dueDate: z.string(),
  createdAt: z.string(),
  status: z.enum(['pending', 'completed', 'archived', 'urgent']),
});

export const projectArraySchema = z.array(projectSchema);
