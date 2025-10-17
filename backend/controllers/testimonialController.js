import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

const prisma = new PrismaClient();

export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await prisma.testimonial.findMany();
  res.status(200).json(new ApiResponse(200, testimonials));
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const { author, content, rating } = req.body;
  const testimonial = await prisma.testimonial.create({
    data: {
      author,
      content,
      rating,
    },
  });
  res.status(201).json(new ApiResponse(201, testimonial, 'Testimonial created successfully'));
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { author, content, rating } = req.body;
  const updatedTestimonial = await prisma.testimonial.update({
    where: { id },
    data: {
      author,
      content,
      rating,
    },
  });
  res.status(200).json(new ApiResponse(200, updatedTestimonial, 'Testimonial updated successfully'));
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.testimonial.delete({ where: { id } });
  res.status(200).json(new ApiResponse(200, null, 'Testimonial deleted successfully'));
});
