'use server';

import { recommendServices, ServiceRecommendationOutput } from '@/ai/flows/service-recommendation';
import { surveySchema } from '@/lib/schema';
import { SurveyFormData } from '@/lib/types';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const serviceRecSchema = z.object({
  needs: z.string().min(50),
});

export async function handleServiceRecommendation(input: z.infer<typeof serviceRecSchema>): Promise<{ recommendation?: ServiceRecommendationOutput; error?: string }> {
  const validatedInput = serviceRecSchema.safeParse(input);

  if (!validatedInput.success) {
    return { error: 'Entrada inválida.' };
  }

  try {
    const result = await recommendServices(validatedInput.data);
    return { recommendation: result };
  } catch (error) {
    console.error('La recomendación de servicio falló:', error);
    return { error: 'No se pudo obtener la recomendación del servicio de IA.' };
  }
}

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

function summarizeSurveyData(data: SurveyFormData): string {
    let summary = `El cliente se llama ${data.q1_name}, desde ${data.q1_location}, ${data.q1_country}. `;
    summary += `Tiene ${data.q1_experience} años de experiencia como ${data.q1_role}. `;
    summary += `Sus servicios principales son: ${data.q2_services}. `;
    if (data.q2_unique) {
        summary += `Se diferencia con: ${data.q2_unique}. `;
    }
    summary += `Describe su marca como: "${data.q3_persona}". `;
    summary += `Quiere que su marca sea percibida como: ${data.q4_perception?.join(', ')}. `;
    summary += `Busca evocar emociones de: ${data.q5_emotions?.join(', ')}. `;
    summary += `Su propósito es: "${data.q6_why}". `;
    summary += `Se diferencia de la competencia por: ${data.q7_differentiation?.join(', ')} (${data.q7_why}). `;
    summary += `Su propuesta de valor es: ${data.q8_value?.join(', ')}. `;
    summary += `Actualmente usa los siguientes canales online: ${data.q9_presence?.join(', ')}. `;
    summary += `Califica su presencia digital con un ${data.q10_rating} de 10. `;
    summary += `Sus mayores desafíos en marketing son: ${data.q10_challenges?.join(', ')}. `;
    if (data.q11_training === "Sí") {
        summary += `Está interesado en capacitar a otros profesionales sobre: ${data.q12_details}.`;
    }
    return summary;
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

    let summary = `RESUMEN DE DIAGNÓSTICO ESTRATÉGICO\n`;
    summary += `=====================================\n\n`;
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


export async function handleSurveySubmission(
  data: SurveyFormData
): Promise<{ success: boolean; error?: string }> {
  console.log('Paso 1: Iniciando el guardado en Supabase.');
  
  const validatedData = surveySchema.safeParse(data);
  if (!validatedData.success) {
    console.error("Error de validación:", validatedData.error.flatten());
    return { success: false, error: "Los datos del formulario son inválidos." };
  }
  
  console.log('Paso 2: Datos validados.');

  try {
    const supabase = createClient();
    console.log('Paso 3: Intentando guardar los datos...');
    
    const { error: dbError } = await supabase
      .from('survey_responses')
      .insert([
          { response_data: validatedData.data }
      ]);

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

export async function handleRecommendationGeneration(
  data: SurveyFormData
): Promise<{ recommendation?: ServiceRecommendationOutput; error?: string }> {
  const validatedData = surveySchema.safeParse(data);
  if (!validatedData.success) {
    return { error: "Los datos del formulario son inválidos." };
  }

  const summary = summarizeSurveyData(validatedData.data);
  console.log('Enviando el resumen al servicio de recomendación de IA...');
  
  try {
    const result = await recommendServices({ needs: summary });
    console.log('¡Recomendación de IA recibida con éxito!');
    return { recommendation: result };
  } catch (error: any) {
    console.error('Error en handleRecommendationGeneration:', error);
    return { error: 'Ocurrió un error al generar la recomendación. ' + (error.message || '') };
  }
}
