'use server';

import { recommendServices } from '@/ai/flows/service-recommendation';
import { z } from 'zod';

const serviceRecSchema = z.object({
  needs: z.string().min(50),
});

export async function handleServiceRecommendation(input: z.infer<typeof serviceRecSchema>) {
  const validatedInput = serviceRecSchema.safeParse(input);

  if (!validatedInput.success) {
    return { error: 'Invalid input.' };
  }

  try {
    const result = await recommendServices(validatedInput.data);
    return result;
  } catch (error) {
    console.error('Service recommendation failed:', error);
    return { error: 'Failed to get recommendation from AI service.' };
  }
}

const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email."),
    message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function handleContactSubmission(input: z.infer<typeof contactFormSchema>) {
    const validatedInput = contactFormSchema.safeParse(input);

    if (!validatedInput.success) {
        return { success: false, error: 'Invalid input.' };
    }
    
    // Here you would typically send an email, save to a database, etc.
    // For this demo, we'll just log it and return success.
    console.log("New contact submission:", validatedInput.data);

    return { success: true };
}
