'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import api from '../../utils/api';
import Modal from '../../components/Modal';

interface Product {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
  description?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        console.log('Products API response:', response.data);
        setProducts(response.data.data || []);
        setFilteredProducts(response.data.data || []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
    console.log('Filtered products:', filtered);
  }, [searchTerm, products]);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold font-serif text-center mb-12">Our Products</h1>
        <div className="flex justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 border rounded-md w-1/2"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} onClick={() => openModal(product)}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={!!selectedProduct} onClose={closeModal} title={selectedProduct?.name}>
        {selectedProduct && (
          <div>
            <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-64 object-cover mb-4" />
            <p>{selectedProduct.description}</p>
            <div className="mt-4">
              <h3 className="font-bold">Dimensions:</h3>
              <p>Height: 100cm</p>
              <p>Width: 80cm</p>
              <p>Depth: 50cm</p>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}