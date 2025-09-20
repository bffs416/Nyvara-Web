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
  
  // Section 3
  q3_persona: z.string().min(1, "Describe la personalidad de tu marca."),
  
  // Section 4
  q4_perception: z.array(z.string()).max(3, "Selecciona como máximo 3 opciones.").optional(),
  q4_other: z.string().optional(),

  // Section 5
  q5_emotions: z.array(z.string()).max(3, "Selecciona como máximo 3 opciones.").optional(),
  q5_other: z-string().optional(),
  
  // Section 6
  q6_why: z.string().min(1, "Describe el impacto que buscas."),
  
  // Section 7
  q7_differentiation: z.array(z.string()).max(3, "Selecciona como máximo 3 opciones.").optional(),
  q7_why: z.string().min(1, "Describe tu diferenciación."),
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
  q14_hobby: z.string().optional(),

  // Section 13
  q15_final: z.string().optional(),

  // Competitors
  competitors: z.array(z.object({ name: z.string().optional() })).optional(),
});


export const generalSurveySchema = z.object({
  // Contact Info
  name: z.string().min(1, "El nombre es requerido."),
  company: z.string().min(1, "El nombre de la empresa es requerido."),
  role: z.string().min(1, "Tu cargo es requerido."),
  phone: z.string().min(1, "El teléfono es requerido."),
  email: z.string().email("Por favor, introduce un email válido."),

  // About the business
  business_description: z.string().min(10, "Por favor, describe tu negocio en al menos 10 caracteres."),
  main_services: z.string().min(10, "Describe tus servicios o productos principales."),
  target_audience: z.string().min(10, "Describe tu público objetivo."),

  // Goals and Challenges
  goals: z.string().min(10, "Describe tus principales objetivos."),
  challenges: z.string().min(10, "Describe tus mayores desafíos."),

  // Needs
  interested_services: z.array(z.string()).min(1, "Selecciona al menos un servicio de interés."),

  // Final thoughts
  additional_info: z.string().optional(),
});
