'use server';
/**
 * @fileOverview A flow to generate a game result image.
 *
 * - generateResultImage - A function that creates a game result image.
 * - GenerateResultImageInput - The input type for the generateResultImage function.
 * - GenerateResultImageOutput - The return type for the generateResultImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResultImageInputSchema = z.object({
  gold: z.number().describe('The final amount of gold the player earned.'),
  day: z.number().describe('The day number the player reached in the game.'),
  customerSprite: z.string().describe('The sprite type of the last customer, e.g., Knight, Mage.'),
  customerName: z.string().describe('The name of the last customer.'),
});
export type GenerateResultImageInput = z.infer<typeof GenerateResultImageInputSchema>;

const GenerateResultImageOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI. Expected format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateResultImageOutput = z.infer<typeof GenerateResultImageOutputSchema>;

export async function generateResultImage(input: GenerateResultImageInput): Promise<GenerateResultImageOutput> {
  return generateResultImageFlow(input);
}

const generateResultImageFlow = ai.defineFlow(
  {
    name: 'generateResultImageFlow',
    inputSchema: GenerateResultImageInputSchema,
    outputSchema: GenerateResultImageOutputSchema,
  },
  async ({ gold, day, customerSprite, customerName }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a pixel art game result screen for a game called "7일의 상인".
      The style must be retro 16-bit pixel art, similar to classic JRPGs.
      The image should be a final score screen.
      It must contain the following text elements, written in a clear pixel font:
      - Title: "모험 종료" (Adventure Over)
      - Final Gold: "${gold} G"
      - Reached Day: "제 ${day}일"
      - Last Customer: "${customerName}"

      The screen must also feature a detailed pixel art depiction of the last customer. The customer is a ${customerSprite}.
      The overall tone should be a bit melancholic but rewarding.
      The background should be the interior of a dimly lit, rustic medieval weapon shop.
      Do not include any buttons or UI elements other than the text mentioned above.
      The entire image should be a single, cohesive piece of pixel art.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed to return an image.');
    }

    return { imageDataUri: media.url };
  }
);
