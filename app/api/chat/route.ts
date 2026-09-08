import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// We check if the GEMINI_API_KEY is defined in process.env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    // Convert OpenAI-style messages to Gemini format (optional depending on use case, 
    // but the @google/genai SDK accepts `contents: string | Array<string | Part>` or `GenerateContentRequest`.
    // It's usually easier to just use the chat API.
    
    // We can also just send the last message as prompt if we don't need history, but let's maintain some history
    const systemInstruction = "You are a friendly, encouraging, and knowledgeable AI fitness coach for the FitandBeat app. Help users reach their fitness goals, suggest exercises, answer health-related questions, and provide motivation. Keep your responses concise and engaging.";
    
    // Format the messages for Gemini SDK (contents array format for chat)
    const formattedContents = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
      }
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
