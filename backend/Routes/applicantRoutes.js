import express from 'express'
import { deleteApplicantController } from '../Controllers/applicantController';

const router = express.Router();

router.delete('/delete-applicant/:id',deleteApplicantController);

export default router;