import express from 'express';
import { approveInternshipController, deleteInternshipOrJobController, getAllInternshipsAndJobsController, getPendingInternshipsController, getSingleInternshipController, postInternshipOrJobController, rejectInternshipController, updateInternshipController } from '../Controllers/InternshipAndJobController.js';

const router = express.Router();

router.get('/', getAllInternshipsAndJobsController);
router.post('/', postInternshipOrJobController);
router.get('/pending', getPendingInternshipsController);
router.get('/approved-job/:uid', getApprovedJobController);
router.put('/approve/:id', approveInternshipController);
router.delete('/reject/:id', rejectInternshipController);
router.delete('/job/:id', deleteInternshipOrJobController);
router.get('/one-job/:id', getSingleInternshipController);
router.put('/admin-update/:id', updateInternshipController);

export default router;