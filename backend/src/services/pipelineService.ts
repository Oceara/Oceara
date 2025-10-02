export async function ingestDrone(files: Express.Multer.File[], body: Record<string, any>) {
  // TODO: store to object storage, enqueue processing jobs
  const summary = files.map(f => ({ name: f.originalname, size: f.size, mime: f.mimetype }));
  return { count: files.length, summary, metadata: body };
}

export async function ingestSatellite(files: Express.Multer.File[], body: Record<string, any>) {
  const summary = files.map(f => ({ name: f.originalname, size: f.size, mime: f.mimetype }));
  return { count: files.length, summary, metadata: body };
}

export async function ingestField(file: Express.Multer.File, body: Record<string, any>) {
  return { file: { name: file.originalname, size: file.size, mime: file.mimetype }, metadata: body };
}


