import express from 'express';
import multer from 'multer';
import { ingestDroneController, ingestSatelliteController, ingestFieldController } from '../controllers/pipelineController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 },
});

// Drone imagery uploads (RGB, multispectral)
router.post('/drone', authenticateToken, requireRole(['USER', 'ADMIN']), upload.array('files', 10), ingestDroneController);

// Satellite tiles or GeoTIFFs
router.post('/satellite', authenticateToken, requireRole(['ADMIN']), upload.array('files', 10), ingestSatelliteController);

// Field data CSV/JSON forms
router.post('/field', authenticateToken, requireRole(['USER', 'ADMIN']), upload.single('file'), ingestFieldController);

export default router;


