'use server';

/**
 * @fileOverview Provides a service recommendation flow based on user input.
 *
 * - recommendServices - A function that takes user needs and goals and returns a service recommendation.
 * - ServiceRecommendationInput - The input type for the recommendServices function.
 * - ServiceRecommendationOutput - The return type for the recommendServices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ServiceRecommendationInputSchema = z.object({
  needs: z
    .string()
    .describe('Una descripción detallada de las necesidades y objetivos del cliente.'),
});
export type ServiceRecommendationInput = z.infer<
  typeof ServiceRecommendationInputSchema
>;

const ServiceRecommendationOutputSchema = z.object({
  recommendation: z
    .string()
    .describe(
      'Una recomendación detallada de qué servicios ofrecidos por Nyvara Group se adaptarían mejor a las necesidades del cliente, y por qué.'
    ),
});
export type ServiceRecommendationOutput = z.infer<
  typeof ServiceRecommendationOutputSchema
>;

export async function recommendServices(
  input: ServiceRecommendationInput
): Promise<ServiceRecommendationOutput> {
  return recommendServicesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'serviceRecommendationPrompt',
  input: {schema: ServiceRecommendationInputSchema},
  output: {schema: ServiceRecommendationOutputSchema},
  prompt: `Eres un consultor experto en Nyvara Group, una empresa especializada en Desarrollo de Software, Eventos Corporativos y Formación.

Un cliente potencial ha descrito sus necesidades y objetivos. Basado en su descripción, recomienda los servicios que mejor le ayudarían. Explica por qué cada servicio recomendado es una buena opción.

Necesidades y Objetivos del Cliente: {{{needs}}}`,
});

const recommendServicesFlow = ai.defineFlow(
  {
    name: 'recommendServicesFlow',
    inputSchema: ServiceRecommendationInputSchema,
    outputSchema: ServiceRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
