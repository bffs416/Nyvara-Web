
'use server';

import { surveySchema, generalSurveySchema } from '@/lib/schema';
import { SurveyFormData, GeneralSurveyFormData } from '@/lib/types';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const contactFormSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
    email: z.string().email("Por favor, introduce un email válido."),
    company: z.string().optional(),
    service: z.string().optional(),
    message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export async function handleContactSubmission(input: z.infer<typeof contactFormSchema>) {
    const validatedInput = contactFormSchema.safeParse(input);

    if (!validatedInput.success) {
        return { success: false, error: 'Entrada inválida.' };
    }
    
    console.log("Nuevo envío de contacto:", validatedInput.data);

    return { success: true };
}

export async function summarizeSurveyDataForDownload(data: SurveyFormData): Promise<{ summary?: string; error?: string }> {
    const validatedData = surveySchema.safeParse(data);
    if (!validatedData.success) {
        return { error: "Los datos del formulario son inválidos." };
    }

    const {
        q1_name, q1_location, q1_country, q1_phone, q1_experience, q1_role,
        q2_services, q2_unique, q3_persona, q4_perception, q4_other,
        q5_emotions, q5_other, q6_why, q7_differentiation, q7_why, q7_other,
        q8_value, q8_other, q9_presence, q9_other, q10_rating, q10_challenges, q10_other,
        q11_training, q12_details, q13_colors, q14_hobby, q15_final, competitors
    } = validatedData.data;

    let summary = `RESUMEN DE DIAGNÓSTICO ESTRATÉGICO - SECTOR SALUD\n`;
    summary += `====================================================\n\n`;
    summary += `--- SECCIÓN 1: INFORMACIÓN BÁSICA ---\n`;
    summary += `Nombre: ${q1_name}\n`;
    summary += `Ubicación: ${q1_location}, ${q1_country}\n`;
    summary += `Teléfono: ${q1_phone}\n`;
    summary += `Años de Experiencia: ${q1_experience}\n`;
    summary += `Rol Principal: ${q1_role}\n\n`;

    summary += `--- SECCIÓN 2: OFERTA DE SERVICIOS ---\n`;
    summary += `Servicios Principales: ${q2_services}\n`;
    if (q2_unique) summary += `Servicios Únicos: ${q2_unique}\n`;
    summary += `\n`;

    summary += `--- SECCIÓN 3: IDENTIDAD Y VALORES ---\n`;
    summary += `Persona de la Marca: ${q3_persona}\n`;
    if (q4_perception?.length) summary += `Percepción Deseada: ${q4_perception.join(', ')}${q4_other ? ` (${q4_other})` : ''}\n`;
    if (q5_emotions?.length) summary += `Emociones a Evocar: ${q5_emotions.join(', ')}${q5_other ? ` (${q5_other})` : ''}\n`;
    summary += `Propósito/Impacto: ${q6_why}\n\n`;

    summary += `--- SECCIÓN 4: DIFERENCIACIÓN Y VALOR ---\n`;
    if (q7_differentiation?.length) summary += `Factores de Diferenciación: ${q7_differentiation.join(', ')}${q7_other ? ` (${q7_other})` : ''}\n`;
    summary += `Descripción de la Diferenciación: ${q7_why}\n`;
    if (q8_value?.length) summary += `Propuesta de Valor: ${q8_value.join(', ')}${q8_other ? ` (${q8_other})` : ''}\n\n`;

    summary += `--- SECCIÓN 5: PRESENCIA ONLINE Y MARKETING ---\n`;
    if (q9_presence?.length) summary += `Canales Online: ${q9_presence.join(', ')}${q9_other ? ` (${q9_other})` : ''}\n`;
    summary += `Calificación Presencia Digital: ${q10_rating}/10\n`;
    if (q10_challenges?.length) summary += `Mayores Desafíos: ${q10_challenges.join(', ')}${q10_other ? ` (${q10_other})` : ''}\n\n`;

    summary += `--- SECCIÓN 6: VISIÓN A FUTURO Y PREFERENCIAS ---\n`;
    summary += `Interés en Capacitar a Otros: ${q11_training}\n`;
    if (q12_details) summary += `Temas de Capacitación: ${q12_details}\n`;
    summary += `Paleta de Colores de la Marca: ${q13_colors}\n`;
    if (q14_hobby) summary += `Hobbies/Intereses: ${q14_hobby}\n\n`;

    if (q15_final) {
        summary += `--- REFLEXIÓN FINAL ---\n`;
        summary += `${q15_final}\n\n`;
    }

    if (competitors && competitors.some(c => c.name)) {
        summary += `--- COMPETIDORES CLAVE ---\n`;
        summary += competitors.map(c => `- ${c.name}`).join('\n');
    }

    return { summary };
}

export async function summarizeGeneralSurveyDataForDownload(data: GeneralSurveyFormData): Promise<{ summary?: string; error?: string }> {
    const validatedData = generalSurveySchema.safeParse(data);
    if (!validatedData.success) {
        return { error: "Los datos del formulario son inválidos." };
    }

    const {
        name, company, role, phone, email,
        business_description, main_services, target_audience,
        goals, challenges, interested_services,
        additional_info,
    } = validatedData.data;

    let summary = `RESUMEN DE DIAGNÓSTICO ESTRATÉGICO - GENERAL\n`;
    summary += `=============================================\n\n`;
    summary += `--- INFORMACIÓN DE CONTACTO ---\n`;
    summary += `Nombre: ${name}\n`;
    summary += `Empresa: ${company}\n`;
    summary += `Rol: ${role}\n`;
    summary += `Teléfono: ${phone}\n`;
    summary += `Email: ${email}\n\n`;

    summary += `--- SOBRE EL NEGOCIO ---\n`;
    summary += `Descripción del Negocio: ${business_description}\n`;
    summary += `Servicios/Productos Principales: ${main_services}\n`;
    summary += `Público Objetivo: ${target_audience}\n\n`;
    
    summary += `--- OBJETIVOS Y DESAFÍOS ---\n`;
    summary += `Principales Objetivos: ${goals}\n`;
    summary += `Mayores Desafíos: ${challenges}\n\n`;

    summary += `--- NECESIDADES ---\n`;
    if (interested_services?.length) summary += `Servicios de Interés: ${interested_services.join(', ')}\n`;
    
    if (additional_info) {
        summary += `\n--- INFORMACIÓN ADICIONAL ---\n`;
        summary += `${additional_info}\n`;
    }

    return { summary };
}


export async function handleSurveySubmission(
  data: SurveyFormData
): Promise<{ success: boolean; error?: string }> {
  console.log('Paso 1: Iniciando el guardado en Supabase (Salud).');
  
  const validatedData = surveySchema.safeParse(data);
  if (!validatedData.success) {
    console.error("Error de validación:", validatedData.error.flatten());
    return { success: false, error: "Los datos del formulario son inválidos." };
  }
  
  console.log('Paso 2: Datos validados.');

  const { competitors, ...restOfData } = validatedData.data;
  const submissionData = {
    ...restOfData,
    competitors: competitors?.map(c => c.name).filter(Boolean) as string[] | undefined,
    q4_perception: restOfData.q4_perception || [],
    q5_emotions: restOfData.q5_emotions || [],
    q7_differentiation: restOfData.q7_differentiation || [],
    q8_value: restOfData.q8_value || [],
    q9_presence: restOfData.q9_presence || [],
    q10_challenges: restOfData.q10_challenges || [],
  };

  try {
    const supabase = createClient();
    console.log('Paso 3: Intentando guardar los datos...');
    
    const { error: dbError } = await supabase
      .from('survey_responses')
      .insert([submissionData]);

    if (dbError) {
      console.error('Error al guardar en Supabase:', dbError.message);
      return { success: false, error: `No se pudieron guardar tus respuestas. Causa: ${dbError.message}` };
    }
    
    console.log('Paso 4: ¡Éxito! Datos guardados en Supabase.');
    return { success: true };

  } catch (error: any) {
    console.error('Error en handleSurveySubmission:', error);
    return { success: false, error: 'Ocurrió un error inesperado en el servidor. ' + (error.message || '') };
  }
}

export async function handleGeneralSurveySubmission(
  data: GeneralSurveyFormData
): Promise<{ success: boolean; error?: string }> {
  console.log('Paso 1: Iniciando el guardado en Supabase (General).');
  
  const validatedData = generalSurveySchema.safeParse(data);
  if (!validatedData.success) {
    console.error("Error de validación (General):", validatedData.error.flatten());
    return { success: false, error: "Los datos del formulario son inválidos." };
  }
  
  console.log('Paso 2: Datos generales validados. Mapeando a la tabla principal.');
  
  const { 
    name, company, role, phone, email, 
    business_description, main_services, target_audience, 
    goals, challenges, interested_services, additional_info 
  } = validatedData.data;

  // Mapear datos del formulario general a la estructura de la encuesta de salud
  const mappedData: Omit<SurveyFormData, 'competitors'> & { q1_email?: string; competitors?: string[] } = {
    q1_name: `${name} (${company})`,
    q1_location: 'N/A',
    q1_country: 'N/A', 
    q1_phone: phone,
    q1_email: email,
    q1_role: role,
    q2_services: business_description,
    q2_unique: `Servicios principales: ${main_services}`,
    q3_persona: `Público objetivo: ${target_audience}`,
    q6_why: `Metas principales: ${goals}`,
    q7_why: `Desafíos principales: ${challenges}`,
    q9_presence: interested_services,
    q13_colors: "No aplica (Formulario General)",
    q15_final: `Información adicional: ${additional_info || 'Ninguna'}`,
    q1_experience: undefined,
    q4_perception: undefined,
    q4_other: undefined,
    q5_emotions: undefined,
    q5_other: undefined,
    q7_differentiation: undefined,
    q7_other: undefined,
    q8_value: undefined,
    q8_other: undefined,
    q9_other: undefined,
    q10_rating: undefined,
    q10_challenges: undefined,
    q10_other: undefined,
    q11_training: undefined,
    q12_details: undefined,
    q14_hobby: undefined
  };

  try {
    const supabase = createClient();
    console.log('Paso 3: Intentando guardar los datos generales mapeados...');
    
    const { error: dbError } = await supabase
      .from('survey_responses')
      .insert([mappedData]);

    if (dbError) {
      console.error('Error al guardar datos generales en Supabase:', dbError.message);
      return { success: false, error: `No se pudieron guardar tus respuestas. Causa: ${dbError.message}` };
    }
    
    console.log('Paso 4: ¡Éxito! Datos generales guardados en la tabla principal.');
    return { success: true };

  } catch (error: any) {
    console.error('Error en handleGeneralSurveySubmission:', error);
    return { success: false, error: 'Ocurrió un error inesperado en el servidor. ' + (error.message || '') };
  }
}
