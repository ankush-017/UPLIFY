import express from 'express';
import { AllBlogsController } from '../Controllers/AllBlogsController.js';

const router = express.Router();

router.get('/', AllBlogsController);
export default router;