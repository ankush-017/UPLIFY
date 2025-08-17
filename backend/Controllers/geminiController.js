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

export const resoursesSearchController = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    console.log("Search query received:", query);

    const prompt = `You are an API that returns YouTube video that tar uploaded on youtube and thumbnail must present valid only those video that are really present, data. Your job is to find the top 3 most relevant, full-length video courses for a given query and respond with a single, valid JSON object.

Search Query: ${query}

The JSON response must strictly adhere to the following structure and include real, accurate data for each field.

JSON Structure:
{
  "query": "The original search query",
  "searchResults": [
    {
      "videoId": "The unique YouTube video ID",
      "title": "The full, official title of the video",
      "videoUrl": "The complete watch URL for the video",
      "descriptionSnippet": "A concise, one-sentence summary of the video's content, optimized for a search result display.",
      "thumbnailUrl": "The URL for the high-quality default thumbnail (hqdefault.jpg)",
      "creator": {
        "name": "The name of the YouTube channel or creator",
        "profileImageUrl": "A placeholder URL for the creator's profile image"
      },
      "duration": "The video's total duration in HH:MM:SS format"
    }
  ]
}

Do not include any introductory text, explanations, or markdown formatting. Only output the raw JSON object.`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let content = response.text.trim();
    let result;

    try {
      result = JSON.parse(content);
    } 
    catch (e) {
      // console.error("JSON parse error:", e, "Raw content:", content);
      throw new Error("Model did not return valid JSON");
    }

    console.log("Search response:", result);
    res.status(200).send({
      success: true,
      data: result,
    })

  } catch (error) {
    console.error("Search API Error:", error);
    res.status(500).json({ error: "Something went wrong with the search API" });
  }
}