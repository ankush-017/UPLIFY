import express from 'express';
import { applyJobController, MyApplicationController } from '../Controllers/MyApplicationController.js';

const router = express.Router();

router.get('/:uid', MyApplicationController);
router.post('/apply', applyJobController)

export default router;