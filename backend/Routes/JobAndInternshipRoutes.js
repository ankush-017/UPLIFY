import express from 'express';
import { deleteInternshipOrJobController, getAllInternshipsAndJobsController, getSingleInternshipController, postInternshipOrJobController, updateInternshipController } from '../Controllers/InternshipAndJobController.js';

const router = express.Router();

router.get('/', getAllInternshipsAndJobsController);
router.post('/', postInternshipOrJobController);
router.delete('/:id', deleteInternshipOrJobController);
router.get('/:id', getSingleInternshipController);
router.put('/:id', updateInternshipController);


export default router;