import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

const prisma = new PrismaClient();

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await prisma.category.findMany();
  res.status(200).json(new ApiResponse(200, categories));
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new ApiError(400, 'Category name is required');
  }
  const newCategory = await prisma.category.create({
    data: { name },
  });
  res.status(201).json(new ApiResponse(201, newCategory, 'Category created successfully'));
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    throw new ApiError(400, 'Category name is required');
  }
  const updatedCategory = await prisma.category.update({
    where: { id },
    data: { name },
  });
  res.status(200).json(new ApiResponse(200, updatedCategory, 'Category updated successfully'));
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.category.delete({ where: { id } });
  res.status(200).json(new ApiResponse(200, null, 'Category deleted successfully'));
});
