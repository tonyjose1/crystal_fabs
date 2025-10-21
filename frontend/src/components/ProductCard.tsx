import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    imageUrl?: string;
    description?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-greydark rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full">
      <div className="relative h-48">
        <ImageWithFallback
          src={product.imageUrl || '/placeholder.jpg'}
          fallbackSrc="/placeholder.jpg"
          alt={product.name}
          className=""
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold font-serif mt-2 text-blue">{product.name}</h3>
        <p className="text-blue mt-2 text-sm">{product.description}</p>
      </div>
    </div>
  );
}