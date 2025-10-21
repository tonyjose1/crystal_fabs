'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '../../../../../../utils/api';
import Modal from '../../../../../../components/Modal';
import axios from 'axios';

interface Category {
  id: string;
  name: string;
}

export default function EditProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    description: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setFormData({ name: data.data.name, categoryId: data.data.categoryId, description: data.data.description });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'An error occurred');
        } else {
          setError('An unknown error occurred');
        }
      }
    };
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data.data);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleCreateCategory = async () => {
    try {
      const { data } = await api.post('/categories', { name: newCategoryName }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      setCategories([...categories, data.data]);
      setFormData({ ...formData, categoryId: data.data.id });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('categoryId', formData.categoryId);
    data.append('description', formData.description);
    if (file) {
      data.append('image', file);
    }

    try {
      await api.put(`/products/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      router.push('/admin/dashboard/products');
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
      <h1 className="text-2xl font-bold mb-8">Edit Product</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 mt-1 border rounded-md" />
          </div>
          <div>
            <label htmlFor="categoryId" className="text-sm font-medium">Category</label>
            <div className="flex items-center">
              <select id="categoryId" name="categoryId" value={formData.categoryId} onChange={handleChange} required className="w-full p-3 mt-1 border rounded-md">
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <button type="button" onClick={() => setIsModalOpen(true)} className="ml-4 p-3 text-black bg-primary rounded-md">New</button>
            </div>
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full p-3 mt-1 border rounded-md"></textarea>
          </div>
          <div>
            <label htmlFor="image" className="text-sm font-medium">Image</label>
            <input id="image" type="file" name="image" onChange={handleFileChange} className="w-full p-3 mt-1 border rounded-md" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button type="submit" className="w-full p-3 text-white bg-primary rounded-md hover:bg-blue-700">
              Update Product
            </button>
          </div>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Category">
        <div className="space-y-4">
          <div>
            <label htmlFor="newCategoryName" className="text-sm font-medium">Category Name</label>
            <input id="newCategoryName" type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="w-full p-3 mt-1 border rounded-md" />
          </div>
          <div>
            <button onClick={handleCreateCategory} className="w-full p-3 text-white bg-primary rounded-md">Create</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
