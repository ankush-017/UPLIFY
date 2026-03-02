import express from 'express';
import { MyApplicationController } from '../Controllers/MyApplicationController.js';

const router = express.Router();

router.get('/:uid', MyApplicationController);

export default router;