import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import aiRoutes from './routes/ai';
import pipelineRoutes from './routes/pipeline';
import authzRoutes from './routes/authz';
import adminRoutes from './routes/admin';
import { auditLogger } from './middleware/audit';
import ngoRoutes from './routes/ngo';
import complianceRoutes from './routes/compliance';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(auditLogger);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/pipeline', pipelineRoutes);
app.use('/api/authz', authzRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ngo', ngoRoutes);
app.use('/api/compliance', complianceRoutes);

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API running on http://localhost:${port}`);
});