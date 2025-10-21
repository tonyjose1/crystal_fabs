import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

const prisma = new PrismaClient();

export const getTestimonials = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', search, countOnly } = req.query;

  const where = {};
  if (search) {
    where.OR = [
      { author: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (countOnly) {
    const totalTestimonials = await prisma.testimonial.count({ where });
    return res.status(200).json(new ApiResponse(200, { totalTestimonials }));
  }

  const testimonials = await prisma.testimonial.findMany({
    where,
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const totalTestimonials = await prisma.testimonial.count({ where });

  res.status(200).json(new ApiResponse(200, {
    testimonials,
    totalPages: Math.ceil(totalTestimonials / Number(limit)),
    currentPage: Number(page),
    totalTestimonials,
  }));
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