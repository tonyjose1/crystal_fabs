'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../../../utils/api';

export default function TestimonialsDashboardPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('/testimonials');
        setTestimonials(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await api.delete(`/admin/testimonials/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });
        setTestimonials(testimonials.filter((t) => t.id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete testimonial');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <Link href="/admin/dashboard/testimonials/new" className="bg-primary text-white px-4 py-2 rounded-md">
          Create New
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-greylight">
            <tr>
              <th className="p-4 text-left">Author</th>
              <th className="p-4 text-left">Content</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id} className="border-b">
                <td className="p-4">{testimonial.author}</td>
                <td className="p-4">{testimonial.content}</td>
                <td className="p-4">
                  <Link href={`/admin/dashboard/testimonials/edit/${testimonial.id}`} className="text-blue-600 mr-4">Edit</Link>
                  <button onClick={() => handleDelete(testimonial.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
