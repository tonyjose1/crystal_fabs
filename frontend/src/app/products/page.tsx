import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Products | Premium Steel Gates, Railings & More',
  description: 'Browse our catalog of high-quality steel products including custom gates, railings, trusses, and industrial components.',
};

import fs from 'fs/promises';
import path from 'path';
import ProductsList from './ProductsList';
import InteractiveDotsBackground from '../../components/InteractiveDotsBackground';

interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

async function getProducts(): Promise<Product[]> {
  const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  const productsJson = await fs.readFile(productsFilePath, 'utf8');
  return JSON.parse(productsJson);
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="relative py-20 text-text-primary">
      <InteractiveDotsBackground />
      <div className="container mx-auto px-4 relative z-10 pointer-events-none">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-serif inline-block bg-[var(--color-background-secondary)] px-8 py-4 rounded-lg pointer-events-auto shadow-sm">Our Products</h1>
        </div>
        <div className="pointer-events-auto">
          <ProductsList products={products} />
        </div>
      </div>
    </main>
  );
}