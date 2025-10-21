'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../../utils/api';
import axios from 'axios';
import Modal from '../../../components/Modal';

export default function DashboardHomePage() {
  const [stats, setStats] = useState({ products: 0, projects: 0, testimonials: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, projectsRes, testimonialsRes] = await Promise.all([
          api.get('/products?countOnly=true'),
          api.get('/projects?countOnly=true'),
          api.get('/testimonials?countOnly=true'),
        ]);
        setStats({
          products: productsRes.data.data.totalProducts,
          projects: projectsRes.data.data.totalProjects,
          testimonials: testimonialsRes.data.data.totalTestimonials,
        });
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
    fetchStats();
  }, []);

  const handleCreateCategory = async () => {
    try {
      await api.post('/categories', { name: newCategoryName }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      setIsModalOpen(false);
      setNewCategoryName('');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'An error occurred');
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold">Welcome, Admin!</h2>
      <p>This is your admin dashboard. You can manage the website content from here.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-3xl">{stats.products}</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Projects</h3>
          <p className="text-3xl">{stats.projects}</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Testimonials</h3>
          <p className="text-3xl">{stats.testimonials}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Link href="/admin/dashboard/products/new" className="bg-primary hover:bg-primary-dark text-black font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 text-center">Add New Product</Link>
        <Link href="/admin/dashboard/projects/new" className="bg-primary hover:bg-primary-dark text-black font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 text-center">Add New Project</Link>
        <Link href="/admin/dashboard/testimonials/new" className="bg-primary hover:bg-primary-dark text-black font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 text-center">Add New Testimonial</Link>
        <button onClick={() => setIsModalOpen(true)} className="bg-secondary hover:bg-secondary-dark text-black font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 text-center">Add New Product Category</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Category">
        <div className="space-y-4">
          <div>
            <label htmlFor="newCategoryName" className="text-sm font-medium">Category Name</label>
            <input id="newCategoryName" type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="w-full p-3 mt-1 border rounded-md" />
          </div>
          <div>
            <button onClick={handleCreateCategory} className="w-full p-3 text-black bg-primary rounded-md">Create</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}