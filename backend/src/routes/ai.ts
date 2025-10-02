import express from 'express';
import { processImageUploadController, getModelStatusController } from '../controllers/aiController';
import multer from 'multer';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
});

router.get('/status', authenticateToken, requireRole(['ADMIN', 'USER', 'MODERATOR']), getModelStatusController);
router.post('/crown-detection', authenticateToken, requireRole(['ADMIN', 'USER']), upload.single('image'), processImageUploadController);

export default router;


