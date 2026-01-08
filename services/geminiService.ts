
import { GoogleGenAI, Type } from "@google/genai";
import { FurnitureType, FurnitureVariant } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLore = async (type: FurnitureType): Promise<FurnitureVariant[]> => {
  const prompt = `Generate 3 gritty, Berlin-style industrial furniture variants for a "${type}". 
  The vibe is GTA, rugged, male-centric, Berlin underground techno scene. 
  Each variant needs a cool name and a 1-sentence description.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["name", "description"]
          }
        }
      }
    });

    const results = JSON.parse(response.text);
    return results.map((item: any, index: number) => ({
      id: index,
      name: item.name,
      description: item.description,
      seed: Math.random() * 1000
    }));
  } catch (error) {
    console.error("Error generating lore:", error);
    // Fallback data
    return [
      { id: 0, name: "Industrial Prototype 01", description: "Standard issue rugged build for high-traffic environments.", seed: 123 },
      { id: 1, name: "Underground Variant", description: "A modified version found in the deep bunkers of Berlin.", seed: 456 },
      { id: 2, name: "Reinforced Slab", description: "Built to survive anything the city throws at it.", seed: 789 }
    ];
  }
};
