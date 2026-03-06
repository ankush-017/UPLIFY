import express from 'express';
import { uploadResumeController } from '../Controllers/resumeController.js';
import { upload } from '../Middlewares/upload.js';

const router = express.Router();

router.post("/upload-resume", upload.single("resume"), uploadResumeController);

export default router;