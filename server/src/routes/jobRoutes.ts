import express from 'express';
import { createJob, getJobs } from '../controllers/jobController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const route = express.Router();

route.get('/', getJobs);
route.post('/', protect, authorize(['employer']), createJob);

export default route;