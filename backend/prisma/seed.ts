/// <reference types="node" />

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Categories
  const kitchenCategory = await prisma.category.upsert({
    where: { name: 'Kitchen Equipment' },
    update: {},
    create: { name: 'Kitchen Equipment' },
  });

  const fabricationCategory = await prisma.category.upsert({
    where: { name: 'Steel Works & Fabrication' },
    update: {},
    create: { name: 'Steel Works & Fabrication' },
  });

  const storageCategory = await prisma.category.upsert({
    where: { name: 'Storage Solutions' },
    update: {},
    create: { name: 'Storage Solutions' },
  });

  const architecturalCategory = await prisma.category.upsert({
    where: { name: 'Architectural Metalwork' },
    update: {},
    create: { name: 'Architectural Metalwork' },
  });

  // Products
  const products = [
    { id: 'product-1', name: 'Stainless Steel Kitchen Sink', description: 'High-quality stainless steel sink, durable and easy to clean.', imageUrl: '/images/products/item1.jpg', categoryId: kitchenCategory.id },
    { id: 'product-2', name: 'Custom Steel Railing', description: 'Bespoke steel railing for modern and classic interiors.', imageUrl: '/images/products/item2.jpg', categoryId: fabricationCategory.id },
    { id: 'product-3', name: 'Industrial Shelving Unit', description: 'Heavy-duty steel shelving for industrial and commercial use.', imageUrl: '/images/products/item3.jpg', categoryId: storageCategory.id },
    { id: 'product-4', name: 'Decorative Metal Gate', description: 'Ornate and secure metal gates for residential and commercial properties.', imageUrl: '/images/products/item4.jpg', categoryId: architecturalCategory.id },
    { id: 'product-5', name: 'Commercial Kitchen Hood', description: 'High-performance kitchen hood for commercial kitchens.', imageUrl: '/images/products/item5.jpg', categoryId: kitchenCategory.id },
    { id: 'product-6', name: 'Custom Steel Beams', description: 'Fabrication of custom steel beams for construction projects.', imageUrl: '/images/products/item6.jpg', categoryId: fabricationCategory.id },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: { name: product.name, description: product.description, imageUrl: product.imageUrl, categoryId: product.categoryId },
      create: { id: product.id, name: product.name, description: product.description, imageUrl: product.imageUrl, categoryId: product.categoryId },
    });
  }

  // Projects
  const projects = [
    { id: 'project-1', name: 'Luxury Apartment Interior', category: 'Residential', description: 'Fabrication and installation of custom steel fixtures for a luxury apartment.', imageUrl: '/images/projects/project1.jpg', client: 'Private Client', testimonial: 'Crystal Fabs exceeded our expectations with their attention to detail and craftsmanship.' },
    { id: 'project-2', name: 'Restaurant Kitchen Setup', category: 'Commercial', description: 'Complete stainless steel kitchen setup for a new restaurant.', imageUrl: '/images/projects/project2.jpg', client: 'The Gourmet Kitchen', testimonial: 'The team was professional, efficient, and delivered a top-quality kitchen.' },
    { id: 'project-3', name: 'Commercial Building Facade', category: 'Commercial', description: 'Design and installation of a modern steel and glass facade.', imageUrl: '/images/projects/project3.jpg', client: 'ABC Corporation', testimonial: 'A stunning transformation of our building. Highly recommended.' },
    { id: 'project-4', name: 'Residential Staircase', category: 'Residential', description: 'Custom-designed spiral staircase for a modern home.', imageUrl: '/images/projects/project4.jpg', client: 'Private Client', testimonial: 'The staircase is a work of art. We are thrilled with the result.' },
    { id: 'project-5', name: 'Office Building Entrance', category: 'Commercial', description: 'Fabrication and installation of a grand steel and glass entrance.', imageUrl: '/images/projects/project5.jpg', client: 'Tech Corp', testimonial: 'The new entrance has completely transformed our building.' },
    { id: 'project-6', name: 'Modern Home Extension', category: 'Residential', description: 'Steel frame extension for a modern home.', imageUrl: '/images/projects/project6.jpg', client: 'Private Client', testimonial: 'The extension is seamless and the quality is outstanding.' },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: project,
      create: project,
    });
  }

  // Testimonials
  const testimonials = [
    { id: 'testimonial-1', author: 'John Doe', content: 'Crystal Fabs delivered exceptional quality and service. Highly recommended!', rating: 5 },
    { id: 'testimonial-2', author: 'Jane Smith', content: 'Professional and efficient. Our custom railing looks fantastic!', rating: 5 },
    { id: 'testimonial-3', author: 'Michael Johnson', content: 'The team was a pleasure to work with and the results speak for themselves.', rating: 5 },
    { id: 'testimonial-4', author: 'Emily Williams', content: 'I am so impressed with the craftsmanship and attention to detail.', rating: 5 },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.id },
      update: testimonial,
      create: testimonial,
    });
  }

  // Admin User
  const hashedPassword = await bcrypt.hash('password', 10);
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });