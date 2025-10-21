'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../../../utils/api';
import axios from 'axios';

export default function TestimonialsDashboardPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('/testimonials', {
          params: { page, limit, sortBy, sortOrder, search },
        });
        const testimonialsData = response.data.data;
        if (Array.isArray(testimonialsData)) {
          setTestimonials(testimonialsData);
        } else {
          setTestimonials([]);
        }
        setTotalPages(1);
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
    fetchTestimonials();
  }, [page, limit, sortBy, sortOrder, search]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await api.delete(`/testimonials/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });
        setTestimonials(testimonials.filter((t) => t.id !== id));
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
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <Link href="/admin/dashboard/testimonials/new" className="bg-primary text-white px-4 py-2 rounded-md">
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
          <option value="author">Author</option>
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