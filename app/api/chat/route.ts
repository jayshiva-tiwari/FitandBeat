import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.error("Missing or invalid GEMINI_API_KEY");
    return NextResponse.json({ error: "API key is not configured correctly on the server." }, { status: 500 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const systemInstruction = "You are a friendly, encouraging, and knowledgeable AI fitness coach for the FitandBeat app. Help users reach their fitness goals, suggest exercises, answer health-related questions, and provide motivation. Keep your responses concise and engaging.";

    let formattedContents = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    if (formattedContents.length > 0 && formattedContents[0].role === 'model') {
      formattedContents.shift();
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Safely extract error message
    let errorMessage = "Failed to generate response";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      errorMessage = String(error.message);
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
