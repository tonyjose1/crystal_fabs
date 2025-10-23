import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: { name: string };
}

async function getProduct(id: string): Promise<Product | undefined> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const products = JSON.parse(jsonData);
  return products.find((p: Product) => p.id === id);
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const products = JSON.parse(jsonData);

  return products.map((product: Product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) return <p>Product not found.</p>;

  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative h-96">
            <Image src={product.imageUrl || '/placeholder.jpg'} alt={product.name} fill style={{ objectFit: 'cover' }} className="rounded-lg shadow-lg" />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-serif mb-4">{product.name}</h1>
            <p className="text-secondary text-lg mb-4">{product.category.name}</p>
            <p className="text-text">{product.description}</p>
            <div className="mt-8">
              <h3 className="text-2xl font-bold font-serif mb-4">Key Features</h3>
              <ul className="list-disc list-inside text-text">
                <li>High-quality materials</li>
                <li>Durable construction</li>
                <li>Customizable design</li>
              </ul>
            </div>
            <div className="mt-8">
              <button className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-900 transition-all duration-300">
                Request a Quote for this Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
