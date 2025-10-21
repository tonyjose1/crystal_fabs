import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

const prisma = new PrismaClient();

export const getProjects = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', search, filterBy, filterValue } = req.query;

  const where = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { client: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (filterBy && filterValue) {
    where[filterBy] = { equals: filterValue };
  }

  const projects = await prisma.project.findMany({
    where,
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const totalProjects = await prisma.project.count({ where });

  res.status(200).json(new ApiResponse(200, {
    projects,
    totalPages: Math.ceil(totalProjects / Number(limit)),
    currentPage: Number(page),
    totalProjects,
  }));
});

export const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  res.status(200).json(new ApiResponse(200, project));
});

export const createProject = asyncHandler(async (req, res) => {
  const { name, category, description, client, testimonial } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

  const project = await prisma.project.create({
    data: {
      name,
      category,
      description,
      imageUrl,
      client,
      testimonial,
    },
  });
  res.status(201).json(new ApiResponse(201, project, 'Project created successfully'));
});

export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category, description, client, testimonial } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

  const updatedProject = await prisma.project.update({
    where: { id },
    data: {
      name,
      category,
      description,
      imageUrl,
      client,
      testimonial,
    },
  });
  res.status(200).json(new ApiResponse(200, updatedProject, 'Project updated successfully'));
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.project.delete({ where: { id } });
  res.status(200).json(new ApiResponse(200, null, 'Project deleted successfully'));
});