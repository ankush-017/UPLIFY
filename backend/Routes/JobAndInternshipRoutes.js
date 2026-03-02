import express from 'express';
import { getAllInternshipsAndJobsController } from '../Controllers/InternshipAndJobController.js';

const router = express.Router();

router.get('/', getAllInternshipsAndJobsController);


export default router;