import { Request, Response } from 'express';

export function roleVerificationController(req: any, res: Response) {
  // If we are here, requireRole passed and user exists with permitted role
  return res.json({ ok: true, userId: req.user.id, role: req.user.role });
}


