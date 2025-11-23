import express from 'express';
import { applyJob, getApplications } from '../controllers/appController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { checkedUpload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// POST /api/applications
router.post('/', protect, authorize(['candidate']), checkedUpload.single('resume'), applyJob);

// GET /api/applications/my
router.get('/my', protect, authorize(['candidate']), getApplications);

export default router;