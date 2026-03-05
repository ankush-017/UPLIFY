import express from 'express';
import { addResourcesController, ResoursesController } from '../Controllers/ResoursesController.js';

const router = express.Router();

router.get('/', ResoursesController);
router.post('/add', addResourcesController);

export default router;