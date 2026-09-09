import { GoogleGenAI } from "@google/genai";

async function test() {
  const apiKey = "AIzaSy_dummy_key_just_to_see_validation";
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const formattedContents = [
      { role: 'user', parts: [{ text: "Hello" }] }
    ];
    await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: "You are a bot"
      }
    });
  } catch(e) {
    console.log("Error:", e.message);
  }
}
test();
