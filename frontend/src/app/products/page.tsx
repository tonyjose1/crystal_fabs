import fs from 'fs/promises';
import path from 'path';
import ProductsList from './ProductsList';

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
    <main className="py-20 text-text-primary">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-center mb-12">Our Products</h1>
        <ProductsList products={products} />
      </div>
    </main>
  );
}