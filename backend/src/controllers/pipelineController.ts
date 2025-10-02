import { Request, Response } from 'express';
import { ingestDrone, ingestSatellite, ingestField } from '../services/pipelineService';

export async function ingestDroneController(req: Request, res: Response) {
  try {
    const files = (req.files as Express.Multer.File[]) || [];
    if (!files.length) return res.status(400).json({ error: 'No files uploaded. Use field name "files".' });
    const result = await ingestDrone(files, req.body);
    res.json({ message: 'Drone data ingested', result });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Drone ingest error:', error);
    res.status(500).json({ error: 'Failed to ingest drone data' });
  }
}

export async function ingestSatelliteController(req: Request, res: Response) {
  try {
    const files = (req.files as Express.Multer.File[]) || [];
    if (!files.length) return res.status(400).json({ error: 'No files uploaded. Use field name "files".' });
    const result = await ingestSatellite(files, req.body);
    res.json({ message: 'Satellite data ingested', result });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Satellite ingest error:', error);
    res.status(500).json({ error: 'Failed to ingest satellite data' });
  }
}

export async function ingestFieldController(req: Request, res: Response) {
  try {
    const file = req.file as Express.Multer.File | undefined;
    if (!file) return res.status(400).json({ error: 'No file uploaded. Use field name "file".' });
    const result = await ingestField(file, req.body);
    res.json({ message: 'Field data ingested', result });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Field ingest error:', error);
    res.status(500).json({ error: 'Failed to ingest field data' });
  }
}


