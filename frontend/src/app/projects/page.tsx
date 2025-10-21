'use client';

import { useEffect, useState } from 'react';
import GalleryCard from '../../components/GalleryCard';
import api from '../../utils/api';
import Modal from '../../components/Modal';
import Image from 'next/image';

interface Project {
  id: string;
  name: string;
  imageUrl?: string;
  client?: string;
  description?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        console.log('Projects API response:', response.data);
        setProjects(response.data.data.projects || []);
        setFilteredProjects(response.data.data.projects || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = projects;
    if (searchTerm) {
      filtered = filtered.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProjects(filtered);
    console.log('Filtered projects:', filtered);
  }, [searchTerm, projects]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold font-serif text-center mb-12">Our Projects</h1>
        <div className="flex justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 border rounded-md w-1/2"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} onClick={() => openModal(project)}>
              <GalleryCard project={project} />
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={!!selectedProject} onClose={closeModal} title={selectedProject?.name}>
        {selectedProject && (
          <div>
            <Image src={selectedProject.imageUrl || '/placeholder.jpg'} alt={selectedProject.name} width={500} height={400} className="w-full h-64 object-cover mb-4" />
            <p>{selectedProject.description}</p>
            <div className="mt-4">
              <h3 className="font-bold">Project Details:</h3>
              <p>Client: {selectedProject.client || 'N/A'}</p>
              <p>Address: 123 Main St, Anytown, USA</p>
              <p>Duration: 6 weeks</p>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}