import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.error("Missing or invalid GEMINI_API_KEY");
    return NextResponse.json({ error: "API key is not configured correctly on the server." }, { status: 500 });
  }

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

    if (formattedContents.length > 0 && formattedContents[0].role === 'model') {
      formattedContents.shift();
    }

    // Direct REST API call bypassing the SDK to fix the AQ. key authentication bug
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: formattedContents,
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          }
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API REST Error:", errorData);
      return NextResponse.json(
        { error: errorData.error?.message || "Failed to generate response from Gemini API" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate response" }, { status: 500 });
  }
}
