import express from 'express';
import { applyJob, getApplications, updateStatus, withdrawApplication, getEmployerApplications } from '../controllers/appController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { checkedUpload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize(['candidate']), checkedUpload.single('resume'), applyJob);
router.get('/my', protect, authorize(['candidate']), getApplications);
router.put('/:id/status', protect, authorize(['employer']), updateStatus);
router.put('/:id/withdraw', protect, authorize(['candidate']), withdrawApplication);
router.get('/employer', protect, authorize(['employer']), getEmployerApplications);

export default router;