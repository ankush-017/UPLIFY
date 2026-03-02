import express from 'express';
import { ResoursesController } from '../Controllers/ResourcesController.js';

const router = express.Router();

router.get('/', ResoursesController);

export default router;