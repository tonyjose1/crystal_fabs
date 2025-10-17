import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

const prisma = new PrismaClient();

export const getProducts = asyncHandler(async (req, res) => {
  const products = await prisma.product.findMany();
  res.status(200).json(new ApiResponse(200, products));
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  res.status(200).json(new ApiResponse(200, product));
});

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, imageUrl, categoryId } = req.body;
  const product = await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      categoryId,
    },
  });
  res.status(201).json(new ApiResponse(201, product, 'Product created successfully'));
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, imageUrl, categoryId } = req.body;
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      imageUrl,
      categoryId,
    },
  });
  res.status(200).json(new ApiResponse(200, updatedProduct, 'Product updated successfully'));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({ where: { id } });
  res.status(200).json(new ApiResponse(200, null, 'Product deleted successfully'));
});
