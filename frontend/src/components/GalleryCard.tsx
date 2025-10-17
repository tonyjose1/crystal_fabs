import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';

interface GalleryCardProps {
  project: {
    id: string;
    name: string;
    imageUrl?: string;
  };
}

export default function GalleryCard({ project }: GalleryCardProps) {
  return (
    <div className="relative rounded-lg overflow-hidden group">
      <ImageWithFallback
        src={project.imageUrl || ''}
        fallbackSrc="/placeholder.jpg"
        alt={project.name}
        className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110 text-black"
      />
      <div className="absolute inset-0 bg-primarydarker bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-2xl font-bold font-serif">{project.name}</h3>
      </div>
    </div>
  );
}
