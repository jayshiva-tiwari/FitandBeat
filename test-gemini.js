const { GoogleGenAI } = require("@google/genai");

const apiKey = "DUMMY"; // I don't need a real key to see if it throws a validation error before sending, or I can just check the doc.
// Actually, it sends it to the API and the API returns 400 Bad Request.
