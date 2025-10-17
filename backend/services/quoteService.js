import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createQuote = async (quoteData) => {
  return prisma.quote.create({ data: quoteData });
};
