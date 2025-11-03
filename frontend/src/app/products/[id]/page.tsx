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

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="bg-white text-black">
      <main className="py-10 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="relative h-64 md:h-96">
              <Image src={product.imageUrl || '/placeholder.jpg'} alt={product.name} fill style={{ objectFit: 'cover' }} className="rounded-lg shadow-lg" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2 md:mb-4">{product.name}</h1>
              <p className="text-secondary text-base md:text-lg mb-4">{product.category.name}</p>
              <p className="text-text text-sm md:text-base">{product.description}</p>
              <div className="mt-4 md:mt-8">
                <h3 className="text-xl md:text-2xl font-bold font-serif mb-2 md:mb-4">Key Features</h3>
                <ul className="list-disc list-inside text-text">
                  <li>High-quality materials</li>
                  <li>Durable construction</li>
                  <li>Customizable design</li>
                </ul>
              </div>
              <div className="mt-4 md:mt-8">
                <button className="bg-primary text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-[#3d579f] transition-all duration-300">
                  Request a Quote for this Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}