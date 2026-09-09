import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.error("Missing or invalid GEMINI_API_KEY");
    return NextResponse.json({ error: "API key is not configured correctly on the server." }, { status: 500 });
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }
    
    const systemInstruction = "You are a friendly, encouraging, and knowledgeable AI fitness coach for the FitandBeat app. Help users reach their fitness goals, suggest exercises, answer health-related questions, and provide motivation. Keep your responses concise and engaging.";
    
    let formattedContents = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    
    // The Gemini API requires the conversation history to start with a 'user' message.
    // If the frontend sends the initial 'assistant' greeting as the first message, we must remove it.
    if (formattedContents.length > 0 && formattedContents[0].role === 'model') {
      formattedContents.shift();
    }
    
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
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
