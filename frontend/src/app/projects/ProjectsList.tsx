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

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Industrial'];

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((project) =>
        project.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [searchTerm, selectedCategory, projects]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div>
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 cursor-pointer ${selectedCategory === category
                  ? 'bg-[#1E2DB5] text-white shadow-md transform scale-105'
                  : 'bg-[var(--color-background)] text-[var(--color-text-primary)] border border-gray-200 dark:border-gray-700'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 pl-6 rounded-full w-full md:w-1/3 bg-[var(--color-background-secondary)] text-text-primary border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => openModal(project)}
              className="animate-stagger-in cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <GalleryCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-text-primary inline-block bg-[var(--color-background-secondary)] px-8 py-4 rounded-lg shadow-sm">No projects found matching your criteria.</p>
        </div>
      )}

      {/* Project Details Modal */}
      <Modal isOpen={!!selectedProject} onClose={closeModal} title={selectedProject?.name}>
        {selectedProject && (
          <div className="space-y-6">
            <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden">
              <Image
                src={selectedProject.imageUrl || '/placeholder.jpg'}
                alt={selectedProject.name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {selectedProject.category}
                </span>
                {selectedProject.client && (
                  <span className="text-sm text-gray-500">
                    Client: {selectedProject.client}
                  </span>
                )}
              </div>

              <p className="text-text-primary leading-relaxed">
                {selectedProject.description}
              </p>

              {selectedProject.testimonial && (
                <div className="mt-6 p-4 bg-[var(--color-background-secondary)] rounded-lg border-l-4 border-primary italic text-gray-600 dark:text-gray-300">
                  "{selectedProject.testimonial}"
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
