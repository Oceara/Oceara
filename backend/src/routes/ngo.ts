import express from 'express';
import { authenticateToken, requireRole } from '../middleware/auth';
import { buildNGOExport, listProjectsForExport } from '../services/exportService';

const router = express.Router();

router.get('/projects', authenticateToken, requireRole(['ADMIN']), async (req, res) => {
  const limit = Number(req.query.limit || 50);
  const cursor = (req.query.cursor as string) || undefined;
  const data = await listProjectsForExport(limit, cursor);
  res.json({ data });
});

router.get('/project/:projectId', authenticateToken, requireRole(['ADMIN']), async (req, res) => {
  const projectId = req.params.projectId;
  const data = await buildNGOExport(projectId);
  if (!data) return res.status(404).json({ error: 'Project not found' });
  res.json({ data });
});

export default router;


