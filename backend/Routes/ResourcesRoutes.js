import express from 'express';
import { ResoursesController } from '../Controllers/ResoursesController.js';

const router = express.Router();

router.get('/', ResoursesController);
router.post('/add', addResoursesController);

export default router;