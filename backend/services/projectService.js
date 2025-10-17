import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProjects = async () => {
  return prisma.project.findMany();
};
