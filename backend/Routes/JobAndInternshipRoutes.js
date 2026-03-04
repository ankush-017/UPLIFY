import express from 'express';
import { getAllInternshipsAndJobsController, postInternshipOrJobController } from '../Controllers/InternshipAndJobController.js';

const router = express.Router();

router.get('/', getAllInternshipsAndJobsController);
router.post('/', postInternshipOrJobController);


export default router;