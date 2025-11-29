'use client';

import { useState, useEffect } from 'react';
import GalleryCard from '../../components/GalleryCard';
import Modal from '../../components/Modal';
import Image from 'next/image';

interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  client: string;
  testimonial: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    let filtered = projects;
    if (searchTerm) {
      filtered = filtered.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div>
      <div className="flex justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 rounded-md w-full md:w-1/2 bg-background-secondary text-text-primary border border-[#3d579f] onclick:border-[#3d579f] placeholder-gray-500 focus:border-[#3d579f] focus:outline-none focus:ring-0"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            onClick={() => openModal(project)}
            className="animate-stagger-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <GalleryCard project={project} />
          </div>
        ))}
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
    </div>
  );
}
