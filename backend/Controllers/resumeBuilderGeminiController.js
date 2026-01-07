import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

export const summaryController = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const finalPrompt = `
Generate a concise, professional resume summary (2 lines).
Content:
${prompt}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: finalPrompt
    });

    // UNIVERSAL SAFE EXTRACTION
    console.log(result);
    const text =
      result?.response?.text?.() ||
      result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No text returned from Gemini");
    }

    return res.status(200).json({
      success: true,
      summary: text.trim(),
    });

  } catch (error) {
    console.error("Gemini AI Error:", error);

    return res.status(500).json({
      success: false,
      message: "AI summary generation failed",
    });
  }
};