import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTestimonials = async () => {
  return prisma.testimonial.findMany();
};
