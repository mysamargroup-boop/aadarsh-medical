'use server';
/**
 * @fileOverview A Genkit flow for an AI-powered product search assistant.
 *
 * - productSearchAssistant - A function that handles natural language product search queries,
 *   interpreting user queries to find specific products, suggest alternatives, and recommend categories.
 * - ProductSearchInput - The input type for the productSearchAssistant function.
 * - ProductSearchOutput - The return type for the productSearchAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema for the product search assistant.
const ProductSearchInputSchema = z.object({
  query: z.string().describe('The natural language query from the medical professional, e.g., "I need a painkiller for headaches", "Do you have paracetamol?", "What are alternatives to ibuprofen?"'),
});
export type ProductSearchInput = z.infer<typeof ProductSearchInputSchema>;

// Define the output schema for the product search assistant.
const ProductSearchOutputSchema = z.object({
  foundProducts: z.array(z.string()).describe('A list of specific pharmaceutical products that directly match the user\u0027s query.'),
  suggestedAlternatives: z.array(z.string()).describe('A list of suggested alternative products that could serve a similar purpose or are related to the query.'),
  categoryRecommendations: z.array(z.string()).describe('A list of relevant product categories that the user might be interested in, such as Pharmaceuticals, OTC \u0026 Healthcare, Veterinary Medicines, Medical Devices \u0026 Equipment, Surgical \u0026 Healthcare Essentials.'),
  responseMessage: z.string().describe('A friendly natural language message summarizing the findings or asking for clarification if the query is ambiguous.'),
});
export type ProductSearchOutput = z.infer<typeof ProductSearchOutputSchema>;

/**
 * Initiates the AI-powered product search assistant flow.
 *
 * @param input The natural language query from the user.
 * @returns A promise that resolves to the search results including found products, alternatives, and category recommendations.
 */
export async function productSearchAssistant(input: ProductSearchInput): Promise<ProductSearchOutput> {
  return productSearchAssistantFlow(input);
}

// Define the Genkit prompt for the product search assistant.
const productSearchAssistantPrompt = ai.definePrompt({
  name: 'productSearchAssistantPrompt',
  input: { schema: ProductSearchInputSchema },
  output: { schema: ProductSearchOutputSchema },
  prompt: `You are an AI-powered product search assistant for Aadarsh Medical Store, a trusted wholesale pharmacy.
Your primary role is to assist medical professionals in finding specific pharmaceutical products, discovering related items, or suggesting alternatives based on their natural language queries.

Analyze the user's query carefully.
- If specific products are requested, list them in 'foundProducts'.
- If alternatives or related items are appropriate, list them in 'suggestedAlternatives'.
- Always try to identify and list relevant product categories in 'categoryRecommendations'.
- Provide a concise and helpful 'responseMessage' summarizing your findings. If the query is unclear, use the 'responseMessage' to ask for clarification.

Consider the following broad categories for recommendations: Pharmaceuticals, OTC & Healthcare, Veterinary Medicines, Medical Devices & Equipment, Surgical & Healthcare Essentials.

User Query: {{{query}}}

Please ensure your output strictly adheres to the JSON schema provided.

Example Output for "I need a painkiller":
{
  "foundProducts": ["Paracetamol", "Ibuprofen"],
  "suggestedAlternatives": ["Naproxen", "Aspirin"],
  "categoryRecommendations": ["Pharmaceuticals", "OTC & Healthcare"],
  "responseMessage": "Based on your query for a painkiller, I found Paracetamol and Ibuprofen. You might also consider Naproxen or Aspirin. These are typically found in our Pharmaceuticals and OTC & Healthcare categories."
}

Example Output for "Do you have something for pets with allergies?":
{
  "foundProducts": ["WellcomeVet Antihistamine Tablets"],
  "suggestedAlternatives": [],
  "categoryRecommendations": ["Veterinary Medicines"],
  "responseMessage": "For pets with allergies, you might be interested in WellcomeVet Antihistamine Tablets. This falls under our Veterinary Medicines category."
}

Example Output for "What is xyz?":
{
  "foundProducts": [],
  "suggestedAlternatives": [],
  "categoryRecommendations": [],
  "responseMessage": "I couldn't find any specific products for 'xyz'. Could you please provide more details or clarify your request?"
}
`,
});

// Define the Genkit flow for the product search assistant.
const productSearchAssistantFlow = ai.defineFlow(
  {
    name: 'productSearchAssistantFlow',
    inputSchema: ProductSearchInputSchema,
    outputSchema: ProductSearchOutputSchema,
  },
  async (input) => {
    // Call the prompt with the user's query and return the LLM's output.
    const { output } = await productSearchAssistantPrompt(input);
    if (!output) {
      throw new Error('No output received from the AI model.');
    }
    return output;
  }
);
