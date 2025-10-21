'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../../../utils/api';
import axios from 'axios';

export default function NewTestimonialPage() {
  const [formData, setFormData] = useState({
    author: '',
    content: '',
    rating: 5,
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/testimonials', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      router.push('/admin/dashboard/testimonials');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to create testimonial');
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Create New Testimonial</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-6">
          <div>
            <label htmlFor="author" className="text-sm font-medium">Author</label>
            <input id="author" type="text" name="author" value={formData.author} onChange={handleChange} required className="w-full p-3 mt-1 border rounded-md" />
          </div>
          <div>
            <label htmlFor="content" className="text-sm font-medium">Content</label>
            <textarea id="content" name="content" value={formData.content} onChange={handleChange} rows={5} required className="w-full p-3 mt-1 border rounded-md"></textarea>
          </div>
          <div>
            <label htmlFor="rating" className="text-sm font-medium">Rating</label>
            <input id="rating" type="number" name="rating" value={formData.rating} onChange={handleChange} min="1" max="5" required className="w-full p-3 mt-1 border rounded-md" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button type="submit" className="w-full p-3 text-white bg-primary rounded-md hover:bg-blue-900">
              Create Testimonial
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
