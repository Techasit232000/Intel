import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables.");
    // In a real app, handle this gracefully.
  }
  return new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });
};

export const generateAssistantResponse = async (prompt: string, context?: string): Promise<string> => {
  try {
    const ai = getClient();
    const modelId = 'gemini-2.5-flash';
    
    const systemInstruction = `You are "BlackBerry Assistant", a helpful, concise, and professional AI embedded in the fictional BlackBerry OS 11. 
    You have access to a simulated "Neural Link" interface which monitors the user's cognitive state (Alpha, Beta, Theta waves).
    Keep responses brief, professional, and slightly futuristic.
    User Context: ${context || 'None provided'}`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I'm having trouble connecting to the neural network. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Secure connection failed. Offline mode active.";
  }
};
