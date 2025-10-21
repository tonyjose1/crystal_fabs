'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '../../../../../../utils/api';
import axios from 'axios';

export default function EditProjectPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    client: '',
    testimonial: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await api.get(`/projects/${id}`);
        setFormData({ name: data.data.name, category: data.data.category, description: data.data.description, client: data.data.client, testimonial: data.data.testimonial });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'An error occurred');
        } else {
          setError('An unknown error occurred');
        }
      }
    };
    fetchProject();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('client', formData.client);
    data.append('testimonial', formData.testimonial);
    if (file) {
      data.append('image', file);
    }

    try {
      await api.put(`/projects/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      router.push('/admin/dashboard/projects');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'An error occurred');
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Edit Project</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 mt-1 border rounded-md" />
          </div>
          <div>
            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <input id="category" type="text" name="category" value={formData.category} onChange={handleChange} required className="w-full p-3 mt-1 border rounded-md" />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full p-3 mt-1 border rounded-md"></textarea>
          </div>
          <div>
            <label htmlFor="client" className="text-sm font-medium">Client</label>
            <input id="client" type="text" name="client" value={formData.client} onChange={handleChange} className="w-full p-3 mt-1 border rounded-md" />
          </div>
          <div>
            <label htmlFor="testimonial" className="text-sm font-medium">Testimonial</label>
            <textarea id="testimonial" name="testimonial" value={formData.testimonial} onChange={handleChange} rows={3} className="w-full p-3 mt-1 border rounded-md"></textarea>
          </div>
          <div>
            <label htmlFor="image" className="text-sm font-medium">Image</label>
            <input id="image" type="file" name="image" onChange={handleFileChange} className="w-full p-3 mt-1 border rounded-md" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button type="submit" className="w-full p-3 text-white bg-primary rounded-md hover:bg-blue-900">
              Update Project
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
