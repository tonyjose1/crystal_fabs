import fs from 'fs/promises';
import path from 'path';
import ProjectsList from './ProjectsList';

interface Project {
  id: string;
  name: string;
  imageUrl?: string;
  client?: string;
  description?: string;
}

async function getProjects(): Promise<Project[]> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(jsonData);
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold font-serif text-center mb-12">Our Projects</h1>
        <ProjectsList projects={projects} />
      </div>
    </main>
  );
}