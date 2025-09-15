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
    .describe('A detailed description of the client’s needs and goals.'),
});
export type ServiceRecommendationInput = z.infer<
  typeof ServiceRecommendationInputSchema
>;

const ServiceRecommendationOutputSchema = z.object({
  recommendation: z
    .string()
    .describe(
      'A detailed recommendation of which services offered by Nyvara Group would best suit the client’s needs, and why.'
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
  prompt: `You are an expert consultant at Nyvara Group, a company specializing in Software Development, Corporate Events, and Training.

A potential client has described their needs and goals. Based on their description, recommend the services that would best help them. Explain why each recommended service is a good fit.

Client Needs and Goals: {{{needs}}}`,
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
