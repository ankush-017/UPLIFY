import express from 'express';
import { approveInternshipController, deleteInternshipOrJobController, getAllInternshipsAndJobsController, getPendingInternshipsController, getSingleInternshipController, postInternshipOrJobController, rejectInternshipController, updateInternshipController } from '../Controllers/InternshipAndJobController.js';

const router = express.Router();

router.get('/', getAllInternshipsAndJobsController);
router.post('/', postInternshipOrJobController);
router.delete('/:id', deleteInternshipOrJobController);
router.get('/:id', getSingleInternshipController);
router.put('/:id', updateInternshipController);
router.get('/pending', getPendingInternshipsController);
router.put('/approve/:id', approveInternshipController);
router.delete('/reject/:id', rejectInternshipController);

export default router;