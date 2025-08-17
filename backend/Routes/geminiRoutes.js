import express from 'express';
import { evaluateResumeController, handleGeminiPrompt, resoursesSearchController } from '../Controllers/geminiController.js';

const router = express.Router();

router.post("/gemini", handleGeminiPrompt);
router.post("/gemini/evaluate-resume",evaluateResumeController);
router.post("/resourses-search",resoursesSearchController);
export default router;