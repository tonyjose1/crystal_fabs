import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

const prisma = new PrismaClient();

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await prisma.project.findMany();
  res.status(200).json(new ApiResponse(200, projects));
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
  const { name, category, description, imageUrl, client, testimonial } = req.body;
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
