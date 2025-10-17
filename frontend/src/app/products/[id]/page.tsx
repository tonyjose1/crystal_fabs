'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '../../../utils/api';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`/products/${id}`);
          setProduct(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <img src={product.imageUrl || '/placeholder.jpg'} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-serif mb-4">{product.name}</h1>
            <p className="text-secondary text-lg mb-4">{product.category}</p>
            <p className="text-text">{product.description}</p>
            <div className="mt-8">
              <h3 className="text-2xl font-bold font-serif mb-4">Key Features</h3>
              <ul className="list-disc list-inside text-text">
                {/* Add key features here if available in your data */}
                <li>High-quality materials</li>
                <li>Durable construction</li>
                <li>Customizable design</li>
              </ul>
            </div>
            <div className="mt-8">
              <button className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300">
                Request a Quote for this Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
