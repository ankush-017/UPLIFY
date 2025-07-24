import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const handleGeminiPrompt = async (req, res) => {
  try {
    const { prompt } = req.body;
    // console.log("Prompt received:", prompt);

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    // console.log("Model loaded");

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Response from Gemini:");
    res.status(200).json({ response: text });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Something went wrong with Gemini API" });
  }
};