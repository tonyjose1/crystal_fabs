'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '../../../../../../utils/api';

export default function EditTestimonialPage() {
  const [formData, setFormData] = useState({
    author: '',
    content: '',
    rating: 5,
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const { data } = await api.get(`/testimonials/${id}`);
        setFormData({ author: data.author, content: data.content, rating: data.rating });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch testimonial');
      }
    };
    fetchTestimonial();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/testimonials/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      router.push('/admin/dashboard/testimonials');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update testimonial');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Edit Testimonial</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-6">
          <div>
            <label htmlFor="author" className="text-sm font-medium">Author</label>
            <input id="author" type="text" name="author" value={formData.author} onChange={handleChange} required className="w-full p-3 mt-1 border rounded-md" />
          </div>
          <div>
            <label htmlFor="content" className="text-sm font-medium">Content</label>
            <textarea id="content" name="content" value={formData.content} onChange={handleChange} rows="5" required className="w-full p-3 mt-1 border rounded-md"></textarea>
          </div>
          <div>
            <label htmlFor="rating" className="text-sm font-medium">Rating</label>
            <input id="rating" type="number" name="rating" value={formData.rating} onChange={handleChange} min="1" max="5" required className="w-full p-3 mt-1 border rounded-md" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button type="submit" className="w-full p-3 text-white bg-primary rounded-md hover:bg-blue-700">
              Update Testimonial
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
