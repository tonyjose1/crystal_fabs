import fs from 'fs/promises';
import path from 'path';
import HomePageClient from './HomePageClient';

async function getData() {
  const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  const projectsFilePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
  const testimonialsFilePath = path.join(process.cwd(), 'src', 'data', 'testimonials.json');

  const productsJson = await fs.readFile(productsFilePath, 'utf8');
  const projectsJson = await fs.readFile(projectsFilePath, 'utf8');
  const testimonialsJson = await fs.readFile(testimonialsFilePath, 'utf8');

  const allProducts = JSON.parse(productsJson);
  const allProjects = JSON.parse(projectsJson);
  const allTestimonials = JSON.parse(testimonialsJson);

  return {
    products: allProducts.slice(0, 6),
    projects: allProjects.slice(0, 6),
    testimonials: allTestimonials.slice(0, 3),
  };
}

export default async function Home() {
  const { products, projects, testimonials } = await getData();

  return <HomePageClient products={products} projects={projects} testimonials={testimonials} />;
}