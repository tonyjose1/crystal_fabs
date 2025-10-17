'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../../../utils/api';

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('description', formData.description);
    if (file) {
      data.append('image', file);
    }

    try {
      await api.post('/admin/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      router.push('/admin/dashboard/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Create New Product</h1>
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
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="5" className="w-full p-3 mt-1 border rounded-md"></textarea>
          </div>
          <div>
            <label htmlFor="image" className="text-sm font-medium">Image</label>
            <input id="image" type="file" name="image" onChange={handleFileChange} className="w-full p-3 mt-1 border rounded-md" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button type="submit" className="w-full p-3 text-white bg-primary rounded-md hover:bg-blue-700">
              Create Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
