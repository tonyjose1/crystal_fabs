'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import Modal from '../../components/Modal';
import Image from 'next/image';

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

export default function ProductsList({ products }: { products: Product[] }) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <div className="flex justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 rounded-md w-full md:w-1/2 bg-[var(--color-background-secondary)] text-text-primary border border-[#3d579f] placeholder-gray-500 focus:border-[#3d579f] focus:outline-none focus:ring-0"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            onClick={() => openModal(product)}
            className="animate-stagger-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <Modal isOpen={!!selectedProduct} onClose={closeModal} title={selectedProduct?.name}>
        {selectedProduct && (
          <div>
            <Image src={selectedProduct.imageUrl || '/placeholder.jpg'} alt={selectedProduct.name} width={500} height={400} className="w-full h-64 object-cover mb-4" />
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
    </div>
  );
}
