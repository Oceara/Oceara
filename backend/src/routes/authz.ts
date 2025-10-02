import express from 'express';
import { requireRole } from '../middleware/auth';
import { roleVerificationController } from '../controllers/authzController';

const router = express.Router();

// Role verification endpoint: returns 200 if the user has one of the required roles
router.get('/verify', requireRole(['ADMIN', 'USER', 'MODERATOR']), roleVerificationController);

export default router;


