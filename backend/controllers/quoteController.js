import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import { sendQuoteNotification } from '../utils/emailService.js';

const prisma = new PrismaClient();

export const submitQuote = asyncHandler(async (req, res) => {
  const { name, phone, category, message } = req.body;
  const attachments = req.file ? req.file.path : null;

  if (!name || !phone || !category || !message) {
    throw new ApiError(400, 'All fields are required');
  }

  const newQuote = await prisma.quote.create({
    data: {
      name,
      phone,
      category,
      message,
      attachments,
    },
  });

  await sendQuoteNotification(newQuote);

  res.status(201).json(new ApiResponse(201, newQuote, 'Quote submitted successfully!'));
});
