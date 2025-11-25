import { GoogleGenAI, Type } from "@google/genai";
import { Track } from "../types";

const SYSTEM_INSTRUCTION = `
Tu es un expert en ethnomusicologie béninoise et en production musicale moderne (Funk, Jazz).
Ta mission est de générer des patterns rythmiques (boucles de batterie) basés sur des styles traditionnels du Bénin (Agbadja, Sato, Tchinkoumé, etc.) et une description utilisateur.
Le format de sortie doit être strictement du JSON.
Les instruments disponibles sont :
- Bell (Gankogui): La clé rythmique, souvent syncopée.
- Shaker (Axatse): Maintient le flux.
- HighDrum (Kagan): Accompagnement aigu.
- LowDrum (Gungon/Sogo): Le cœur du rythme.
Le pattern fait 16 pas (steps).
`;

export const generateRhythmPattern = async (
  styleName: string,
  userPrompt: string,
  complexity: number, // 0-100
  temperature: number // 0-100
): Promise<Track[]> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("Clé API manquante");
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      Génère un pattern rythmique de style "${styleName}".
      Description de l'utilisateur / Vibe / Paroles: "${userPrompt || 'Vibe générale dynamique'}".
      Complexité : ${complexity}%.
      Variabilité : ${temperature}%.
      
      Retourne un objet JSON avec "tracks".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tracks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  instrument: { type: Type.STRING },
                  steps: { 
                    type: Type.ARRAY,
                    items: { type: Type.BOOLEAN }
                  }
                },
                required: ["instrument", "steps"]
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Réponse vide de l'IA");

    const data = JSON.parse(text);
    
    // Map the response to our internal Track structure
    const mappedTracks: Track[] = data.tracks.map((t: any) => {
      let name = "";
      let color = "";
      switch (t.instrument) {
        case "Bell": name = "Gankogui"; color = "bg-yellow-500"; break;
        case "Shaker": name = "Axatse"; color = "bg-orange-400"; break;
        case "HighDrum": name = "Kagan"; color = "bg-red-500"; break;
        case "LowDrum": name = "Gungon"; color = "bg-purple-600"; break;
        default: name = "Percussion"; color = "bg-gray-500";
      }
      return {
        instrument: t.instrument,
        name,
        color,
        steps: t.steps
      };
    });

    return mappedTracks;

  } catch (error) {
    console.error("Erreur Gemini:", error);
    throw error;
  }
};