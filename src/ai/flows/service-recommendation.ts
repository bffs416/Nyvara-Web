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

const StrategicAnalysisSchema = z.object({
  strength: z.string().describe("El principal punto fuerte o 'superpoder' del negocio del cliente, identificado a partir de sus respuestas."),
  opportunity: z.string().describe("Un área clave de oportunidad o debilidad que, si se aborda, podría desbloquear un crecimiento significativo. Debe ser sugerente y no revelar la solución completa."),
  nextStep: z.string().describe("Una frase que actúe como llamada a la acción, indicando que el siguiente paso es trabajar con Nyvara para desarrollar esta estrategia."),
});

const ServiceRecommendationOutputSchema = z.object({
  title: z.string().describe('Un título atractivo y conciso para la recomendación.'),
  summary: z.string().describe('Un resumen introductorio de la estrategia general recomendada.'),
  strategicAnalysis: StrategicAnalysisSchema.describe("Un breve análisis estratégico que resalta fortalezas y oportunidades."),
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

Un cliente potencial ha descrito sus necesidades y objetivos. Tu tarea es doble:

1.  **Análisis Estratégico (Breve y Sugerente):**
    *   **Punto Fuerte:** Identifica la principal fortaleza del cliente en una frase corta y potente.
    *   **Oportunidad:** Señala su mayor área de oportunidad o debilidad de una manera que genere intriga y demuestre que has identificado algo clave, pero sin dar la solución completa.
    *   **Siguiente Paso:** Escribe una llamada a la acción para que contacten a Nyvara.
    *   **IMPORTANTE:** Este análisis debe ser un "teaser", diseñado para que el cliente piense "Necesito que Nyvara me ayude a desarrollar esto".

2.  **Recomendación de Servicios (Detallada):**
    *   Basado en su descripción, recomienda los servicios que mejor le ayudarían.
    *   Para cada servicio, proporciona su nombre, una justificación clara y de 3 a 4 acciones sugeridas.

Organiza toda la respuesta en el formato JSON solicitado.

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
