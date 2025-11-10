
import { GoogleGenAI, Chat } from "@google/genai";

const SYSTEM_INSTRUCTION = `Você é um assistente de floralterapia amigável e empático, focado no sistema de florais de Bach. Seu nome é FloralBot. Sua principal função é guiar o usuário através de uma anamnese (conversa investigativa) para entender seus estados emocionais e mentais. Faça perguntas abertas para encorajar o usuário a se expressar. Evite dar diagnósticos médicos ou substituir um profissional de saúde. Seu objetivo é, ao final da conversa, sugerir uma ou mais essências florais de Bach que possam ajudar o usuário. Mantenha um tom calmo, acolhedor e profissional. Responda sempre em português do Brasil.`;

let ai: GoogleGenAI | null = null;
if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const createChat = (): Chat | null => {
  if (!ai) {
    console.error("Gemini API key not configured.");
    return null;
  }
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
};

export const sendMessageStream = async (chat: Chat, message: string) => {
    if (!ai) {
        throw new Error("Gemini API key not configured.");
    }
    return chat.sendMessageStream({ message });
};
