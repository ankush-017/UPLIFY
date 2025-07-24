// routes/geminiRoutes.js
import express from 'express';
import { handleGeminiPrompt } from '../Controllers/geminiController.js';

const router = express.Router();

router.post("/gemini", handleGeminiPrompt);

export default router;