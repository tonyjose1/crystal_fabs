'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../../../utils/api';
import axios from 'axios';

export default function ProjectsDashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects', {
          params: { page, limit, sortBy, sortOrder, search },
        });
        const projectsData = response.data.data.projects;
        if (Array.isArray(projectsData)) {
          setProjects(projectsData);
        } else {
          setProjects([]);
        }
        setTotalPages(response.data.data.totalPages);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'An error occurred');
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [page, limit, sortBy, sortOrder, search]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });
        setProjects(projects.filter((p) => p.id !== id));
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'An error occurred');
        } else {
          setError('An unknown error occurred');
        }
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link href="/admin/dashboard/projects/new" className="bg-primary text-white px-4 py-2 rounded-md">
          Create New
        </Link>
      </div>

      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 border rounded-md">
          <option value="createdAt">Created At</option>
          <option value="name">Name</option>
          <option value="client">Client</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="p-2 border rounded-md">
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-greylight">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Client</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b">
                <td className="p-4">{project.name}</td>
                <td className="p-4">{project.category}</td>
                <td className="p-4">{project.client}</td>
                <td className="p-4">
                  <Link href={`/admin/dashboard/projects/edit/${project.id}`} className="text-blue-600 mr-4">Edit</Link>
                  <button onClick={() => handleDelete(project.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <button onClick={() => setPage(page - 1)} disabled={page === 1} className="p-2 border rounded-md">
            Previous
          </button>
          <span className="mx-4">Page {page} of {totalPages}</span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="p-2 border rounded-md">
            Next
          </button>
        </div>
        <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="p-2 border rounded-md">
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>
    </div>
  );
}
