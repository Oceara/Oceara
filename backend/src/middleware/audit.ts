import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function auditLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const user = (req as any).user;

  res.on('finish', async () => {
    try {
      const duration = Date.now() - start;
      const metadata: any = {
        durationMs: duration,
        query: req.query,
        body: sanitizeBody(req.body),
      };
      await prisma.auditLog.create({
        data: {
          actorId: user?.id,
          actorRole: user?.role,
          action: `${req.method} ${req.path}`,
          resource: req.baseUrl || undefined,
          method: req.method,
          path: req.originalUrl,
          statusCode: res.statusCode,
          ip: req.ip,
          userAgent: req.headers['user-agent'],
          metadata,
        },
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Audit log error:', err);
    }
  });

  next();
}

function sanitizeBody(body: any) {
  try {
    const clone = JSON.parse(JSON.stringify(body || {}));
    if (clone.password) clone.password = '***';
    if (clone.token) clone.token = '***';
    return clone;
  } catch {
    return {};
  }
}


