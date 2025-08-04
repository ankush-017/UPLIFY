import express from 'express';
import { evaluateResumeController, handleGeminiPrompt } from '../Controllers/geminiController.js';

const router = express.Router();

router.post("/gemini", handleGeminiPrompt);
router.post("/gemini/evaluate-resume",evaluateResumeController);

export default router;