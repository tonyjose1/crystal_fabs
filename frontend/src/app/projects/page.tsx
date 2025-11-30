import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Projects | Portfolio of Custom Steel Works',
  description: 'View our portfolio of completed projects showcasing our expertise in residential, commercial, and industrial steel fabrication.',
};

import fs from 'fs/promises';
import path from 'path';
import ProjectsList from './ProjectsList';
import InteractiveDotsBackground from '../../components/InteractiveDotsBackground';

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

async function getProjects(): Promise<Project[]> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(jsonData);
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="relative py-20 text-text-primary">
      <InteractiveDotsBackground />
      <div className="container mx-auto px-4 relative z-10 pointer-events-none">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-serif inline-block bg-[var(--color-background-secondary)] px-8 py-4 rounded-lg pointer-events-auto shadow-sm">Our Projects</h1>
        </div>
        <div className="pointer-events-auto">
          <ProjectsList projects={projects} />
        </div>
      </div>
    </main>
  );
}