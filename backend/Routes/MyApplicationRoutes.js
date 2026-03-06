import express from 'express';
import { applyJobController, MyApplicationController } from '../Controllers/MyApplicationController.js';

const router = express.Router();

router.post('/apply/form', applyJobController)
router.get('/:uid', MyApplicationController);

export default router;