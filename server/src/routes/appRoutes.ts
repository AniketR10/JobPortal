import express from 'express';
import { applyJob, getApplications, updateStatus, withdrawApplication } from '../controllers/appController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { checkedUpload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// POST /api/applications
router.post('/', protect, authorize(['candidate']), checkedUpload.single('resume'), applyJob);

// GET /api/applications/my
router.get('/my', protect, authorize(['candidate']), getApplications);
router.put('/:id/status', protect, authorize(['employer']), updateStatus);
router.put('/:id/withdraw', protect, authorize(['candidate']), withdrawApplication);

export default router;