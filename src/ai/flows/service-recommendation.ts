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

const RecommendedServiceSchema = z.object({
  serviceName: z.string().describe('El nombre del servicio recomendado (e.g., "Marketing que Convierte", "Eventos que Impactan", "Tecnología que Impulsa").'),
  justification: z.string().describe('Una explicación detallada de por qué este servicio es una buena opción para el cliente.'),
  suggestedActions: z.array(z.string()).describe('Una lista de acciones o pasos concretos a seguir dentro de este servicio.'),
});

const ServiceRecommendationOutputSchema = z.object({
  title: z.string().describe('Un título atractivo y conciso para la recomendación.'),
  summary: z.string().describe('Un resumen introductorio de la estrategia general recomendada.'),
  recommendedServices: z.array(RecommendedServiceSchema).describe('Una lista de los servicios recomendados.'),
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
  prompt: `Eres un consultor experto en Nyvara, una empresa especializada en Desarrollo de Software, Eventos Corporativos y Formación.

Un cliente potencial ha descrito sus necesidades y objetivos. Basado en su descripción, recomienda los servicios que mejor le ayudarían.

Para cada servicio que recomiendes, proporciona:
1. El nombre del servicio.
2. Una justificación clara y concisa de por qué es relevante para el cliente.
3. Una lista de 3 a 4 acciones sugeridas específicas para ese servicio.

Organiza la respuesta en el formato JSON solicitado, con un título general, un resumen, y una lista de servicios recomendados.

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
