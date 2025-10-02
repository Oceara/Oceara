import express from 'express';
import { authenticateToken, requireRole } from '../middleware/auth';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Admin (NCCR): registry updates (e.g., mark project verified, set compliance flags)
router.post('/project/:projectId/verify', authenticateToken, requireRole(['ADMIN']), async (req, res) => {
  const projectId = req.params.projectId;
  const project = await prisma.project.update({
    where: { id: projectId },
    data: { description: req.body.description ?? undefined },
  });
  res.json({ message: 'Project updated', project });
});

// Compliance reporting summary
router.get('/report/summary', authenticateToken, requireRole(['ADMIN']), async (_req, res) => {
  const [projectCount, uploads, ledger] = await Promise.all([
    prisma.project.count(),
    prisma.droneImagery.count(),
    prisma.blockchainLedgerEntry.count(),
  ]);
  res.json({
    projectCount,
    droneUploads: uploads,
    ledgerEntries: ledger,
  });
});

export default router;


