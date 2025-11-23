import express from 'express';
import { createJob, getJobs, getJobApplications } from '../controllers/jobController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const route = express.Router();

route.get('/', getJobs);
route.get('/:id/applications', protect, authorize(['employer']), getJobApplications);
route.post('/', protect, authorize(['employer']), createJob);

export default route;