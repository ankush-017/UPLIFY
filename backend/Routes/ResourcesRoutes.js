import express from 'express';
import { ResoursesController } from '../Controllers/ResoursesController.js';

const router = express.Router();

router.get('/', ResoursesController);

export default router;