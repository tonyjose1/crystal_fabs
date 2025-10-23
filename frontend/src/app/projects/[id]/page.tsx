import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';

interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  client: string;
  testimonial: string;
}

async function getProject(id: string): Promise<Project | undefined> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const projects = JSON.parse(jsonData);
  return projects.find((p: Project) => p.id === id);
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const projects = JSON.parse(jsonData);

  return projects.map((project: Project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

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
