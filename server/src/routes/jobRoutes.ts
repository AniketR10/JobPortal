import express from 'express';
import { createJob, getJobs, getJobApplications, getEmployerJobs, updateJobs, deleteJob, getJobById } from '../controllers/jobController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/employer/jobs', protect, authorize(['employer']), getEmployerJobs);
router.get('/', getJobs);
router.get('/:id/applications', protect, authorize(['employer']), getJobApplications);
router.post('/', protect, authorize(['employer']), createJob);
router.put('/:id', protect, authorize(['employer']), updateJobs);
router.delete('/:id', protect, authorize(['employer']), deleteJob);
router.get('/:id', getJobById);

export default router;