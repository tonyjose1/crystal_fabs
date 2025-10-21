'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '../../../utils/api';
import Image from 'next/image';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const response = await api.get(`/projects/${id}`);
          setProject(response.data.data);
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
      fetchProject();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative h-96">
            <Image src={project.imageUrl || '/placeholder.jpg'} alt={project.name} fill style={{ objectFit: 'cover' }} className="rounded-lg shadow-lg" />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-serif mb-4">{project.name}</h1>
            <p className="text-secondary text-lg mb-4">{project.category}</p>
            <p className="text-text">{project.description}</p>
            <div className="mt-8">
              <h3 className="text-2xl font-bold font-serif mb-4">Client</h3>
              <p className="text-text">{project.client || 'N/A'}</p>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold font-serif mb-4">Testimonial</h3>
              <blockquote className="text-text italic border-l-4 border-primary pl-4">
                {project.testimonial || 'No testimonial available for this project.'}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
