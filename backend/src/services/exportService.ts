import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function buildNGOExport(projectId: string) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      landParcels: true,
      droneUploads: true,
      satelliteArchives: true,
      fieldDatabaseEntries: true,
      owner: { select: { id: true, email: true, username: true } },
    },
  });
  return project;
}

export async function listProjectsForExport(limit = 50, cursor?: string) {
  const projects = await prisma.project.findMany({
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' },
  });
  return projects;
}


