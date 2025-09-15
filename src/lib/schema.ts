import { z } from "zod";

export const surveySchema = z.object({
  // Section 1
  q1_name: z.string().min(1, "El nombre es requerido."),
  q1_location: z.string().min(1, "La ubicación es requerida."),
  q1_country: z.string().min(1, "El país es requerido."),
  q1_phone: z.string().min(1, "El número de contacto es requerido."),
  q1_experience: z.number().nullable().optional(),
  q1_role: z.string().min(1, "Tu cargo o rol es requerido."),
  
  // Section 2
  q2_services: z.string().min(1, "Describe al menos un servicio principal."),
  q2_unique: z.string().optional(),
  
  // Section 3
  q3_persona: z.string().min(1, "Describe la personalidad de tu marca."),
  
  // Section 4
  q4_perception: z.array(z.string()).max(3, "Selecciona como máximo 3 opciones."),
  q4_other: z.string().optional(),

  // Section 5
  q5_emotions: z.array(z.string()).max(3, "Selecciona como máximo 3 opciones."),
  q5_other: z.string().optional(),
  
  // Section 6
  q6_why: z.string().min(1, "Describe el impacto que buscas."),
  
  // Section 7
  q7_differentiation: z.array(z.string()).max(3, "Selecciona como máximo 3 opciones."),
  q7_why: z.string().min(1, "Describe tu diferenciación."),
  q7_other: z.string().optional(),
  
  // Section 8
  q8_value: z.array(z.string()).max(3, "Selecciona como máximo 3 opciones."),
  q8_other: z.string().optional(),
  
  // Section 9
  q9_presence: z.array(z.string()),
  q9_other: z.string().optional(),
  
  // Section 10
  q10_rating: z.number(),
  q10_challenges: z.array(z.string()).max(3, "Selecciona como máximo 3 desafíos."),
  q10_other: z.string().optional(),
  
  // Section 11
  q11_training: z.string().optional(),
  q12_details: z.string().optional(),
  
  // Section 12
  q13_colors: z.string().min(1, "Describe tu paleta de colores."),
  q14_hobby: z.string().optional(),

  // Section 13
  q15_final: z.string().optional(),

  // Competitors
  competitors: z.array(z.object({ name: z.string().optional() })).optional(),
});
