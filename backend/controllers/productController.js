import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

const prisma = new PrismaClient();

export const getProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', search, filterBy, filterValue } = req.query;

  const where = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (filterBy && filterValue) {
    where[filterBy] = { equals: filterValue };
  }

  const products = await prisma.product.findMany({
    where,
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: { category: true },
  });

  const totalProducts = await prisma.product.count({ where });

  res.status(200).json(new ApiResponse(200, {
    products,
    totalPages: Math.ceil(totalProducts / Number(limit)),
    currentPage: Number(page),
    totalProducts,
  }));
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  res.status(200).json(new ApiResponse(200, product));
});

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, categoryId } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

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
  const { name, description, categoryId } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

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