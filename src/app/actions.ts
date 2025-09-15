'use server';

import { recommendServices } from '@/ai/flows/service-recommendation';
import { z } from 'zod';

const serviceRecSchema = z.object({
  needs: z.string().min(50),
});

export async function handleServiceRecommendation(input: z.infer<typeof serviceRecSchema>) {
  const validatedInput = serviceRecSchema.safeParse(input);

  if (!validatedInput.success) {
    return { error: 'Entrada inválida.' };
  }

  try {
    const result = await recommendServices(validatedInput.data);
    return result;
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
    
    // Aquí normalmente enviarías un email, guardarías en una base de datos, etc.
    // Para esta demostración, solo lo registraremos y devolveremos éxito.
    console.log("Nuevo envío de contacto:", validatedInput.data);

    return { success: true };
}
