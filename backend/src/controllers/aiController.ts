import { Request, Response } from 'express';
import { analyzeCrownDetection, getModelStatus } from '../services/aiService';

export async function getModelStatusController(_req: Request, res: Response) {
  const status = await getModelStatus();
  res.json(status);
}

export async function processImageUploadController(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded. Use field name "image".' });
    }

    const { buffer, originalname, mimetype } = req.file;
    const result = await analyzeCrownDetection({
      fileName: originalname,
      mimeType: mimetype,
      bytes: buffer,
      metadata: {
        speciesHint: req.body.speciesHint,
        gps: req.body.gps,
      },
    });

    res.json({
      message: 'Processing complete',
      result,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('AI processing error:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
}


