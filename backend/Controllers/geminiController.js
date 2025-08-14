import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import axios from "axios";
import dotenv from 'dotenv'

dotenv.config();

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

export const handleGeminiPrompt = async (req, res) => {
  try {
    const { prompt } = req.body;
    // console.log("Prompt received:", prompt);

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    // console.log(result.text);
    const text = result.text;

    console.log("Response from Gemini:");
    res.status(200).json({ response: text });

  } 
  catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Something went wrong with Gemini API" });
  }
};

export const evaluateResumeController = async (req, res) => {
  try {
    const { resumeUrl, skills } = req.body;

    // Fetch PDF from URL
    const response = await axios.get(resumeUrl, {
      responseType: 'arraybuffer',
    });

    console.log("Resume fetched successfully");

    // Convert response data to Buffer
    const buffer = Buffer.from(response.data);

    // Extract text from the PDF
    const pdfText = await pdfParse(buffer);
    const resumeText = pdfText.text;

    // console.log("Extracted Resume Text:\n", resumeText);

    const prompt = `
You're an AI recruiter.

Here is a resume:
"""
${resumeText}
"""

Here are the internship requirements:
"""
${skills}
"""

Evaluate how well this resume matches the requirements. Give a score out of 100 and a short explanation.

Respond only in this JSON format:
{
  "score": number,
  "explanation": string
}
`;
    // get AI response
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    let content = result.text.trim();

    // Remove Markdown formatting if present
    if (content.startsWith('```')) {
      content = content.replace(/```(?:json)?/, '').replace(/```$/, '').trim();
    }

    try {
      const parsed = JSON.parse(content);
      res.status(200).json({ result: parsed });
    }
    catch (err) {
      console.error('JSON parsing failed:', err);
      res.status(500).json({ error: 'Invalid JSON from Gemini', raw: content });
    }

  } catch (error) {
    console.error('Failed to evaluate resume:', error.message);
    res.status(500).json({ error: 'Resume evaluation failed', details: error.message });
  }
};