import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

const prisma = new PrismaClient();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, 'Username and password are required');
  }

  const admin = await prisma.admin.findUnique({ where: { username } });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    throw new ApiError(401, 'Invalid username or password');
  }

  const token = generateToken(admin.id);

  const loggedInAdmin = await prisma.admin.findUnique({
    where: { id: admin.id },
    select: { id: true, username: true },
  });

  res.status(200).json(new ApiResponse(200, { ...loggedInAdmin, token }, 'Login successful'));
});

export const getProfile = asyncHandler(async (req, res) => {
  const admin = await prisma.admin.findUnique({
    where: { id: req.admin.id },
    select: { id: true, username: true },
  });

  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }

  res.status(200).json(new ApiResponse(200, admin));
});

export const getAdmins = asyncHandler(async (req, res) => {
  const admins = await prisma.admin.findMany({
    select: { id: true, username: true },
  });
  res.status(200).json(new ApiResponse(200, admins));
});

export const getAdminById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const admin = await prisma.admin.findUnique({
    where: { id },
    select: { id: true, username: true },
  });

  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }

  res.status(200).json(new ApiResponse(200, admin));
});

export const createAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, 'Username and password are required');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  res.status(201).json(new ApiResponse(201, { id: admin.id, username: admin.username }, 'Admin created successfully'));
});

export const updateAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  let data = { username };
  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }

  const updatedAdmin = await prisma.admin.update({
    where: { id },
    data,
    select: { id: true, username: true },
  });

  res.status(200).json(new ApiResponse(200, updatedAdmin, 'Admin updated successfully'));
});

export const deleteAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.admin.delete({ where: { id } });
  res.status(200).json(new ApiResponse(200, null, 'Admin deleted successfully'));
});
