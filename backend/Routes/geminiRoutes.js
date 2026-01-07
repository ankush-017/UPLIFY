import express from 'express';
import { evaluateResumeController, handleGeminiPrompt, resoursesSearchController } from '../Controllers/geminiController.js';
import {summaryController} from '../Controllers/resumeBuilderGeminiController.js'

const router = express.Router();

router.post("/gemini", handleGeminiPrompt);
router.post("/gemini/evaluate-resume",evaluateResumeController);
router.post("/resourses-search",resoursesSearchController);
router.post("/ai-resume-summary",summaryController);
export default router;