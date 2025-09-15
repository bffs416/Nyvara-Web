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
    summary += `Quiere que su marca sea percibida como: ${data.q4_perception.join(', ')}. `;
    summary += `Busca evocar emociones de: ${data.q5_emotions.join(', ')}. `;
    summary += `Su propósito es: "${data.q6_why}". `;
    summary += `Se diferencia de la competencia por: ${data.q7_differentiation.join(', ')} (${data.q7_why}). `;
    summary += `Su propuesta de valor es: ${data.q8_value.join(', ')}. `;
    summary += `Actualmente usa los siguientes canales online: ${data.q9_presence.join(', ')}. `;
    summary += `Califica su presencia digital con un ${data.q10_rating} de 10. `;
    summary += `Sus mayores desafíos en marketing son: ${data.q10_challenges.join(', ')}. `;
    if (data.q11_training === "Sí") {
        summary += `Está interesado en capacitar a otros profesionales sobre: ${data.q12_details}.`;
    }
    return summary;
}

export async function handleSurveyAndRecommend(
  data: SurveyFormData
): Promise<{ recommendation?: ServiceRecommendationOutput; error?: string }> {
  const validatedData = surveySchema.safeParse(data);
  if (!validatedData.success) {
    console.error("Validation failed", validatedData.error.flatten());
    return { error: "Los datos del formulario son inválidos." };
  }

  const supabase = createClient();
  const { error: dbError } = await supabase
    .from('survey_responses')
    .insert([
        { response_data: validatedData.data }
    ]);

  if (dbError) {
    console.error('Error al guardar en Supabase:', dbError);
    return { error: 'No se pudieron guardar tus respuestas. Inténtalo de nuevo.' };
  }
  
  const summary = summarizeSurveyData(validatedData.data);

  try {
    const result = await recommendServices({ needs: summary });
    return { recommendation: result };
  } catch (error) {
    console.error('La recomendación de servicio de IA falló:', error);
    return { error: 'No se pudo obtener la recomendación del servicio de IA.' };
  }
}
