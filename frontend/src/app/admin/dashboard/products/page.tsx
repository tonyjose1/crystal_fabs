'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../../../utils/api';
import axios from 'axios';

export default function ProductsDashboardPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products', {
          params: { page, limit, sortBy, sortOrder, search, filterBy, filterValue },
        });
        const productsData = response.data.data.products;
        if (Array.isArray(productsData)) {
          setProducts(productsData);
        } else {
          setProducts([]);
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
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data.data);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    fetchProducts();
    fetchCategories();
  }, [page, limit, sortBy, sortOrder, search, filterBy, filterValue]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });
        setProducts(products.filter((p) => p.id !== id));
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
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/dashboard/products/new" className="bg-primary text-white px-4 py-2 rounded-md">
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
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="p-2 border rounded-md">
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <select value={filterValue} onChange={(e) => { setFilterBy('categoryId'); setFilterValue(e.target.value); }} className="p-2 border rounded-md">
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-greylight">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category?.name}</td>
                <td className="p-4">
                  <Link href={`/admin/dashboard/products/edit/${product.id}`} className="text-blue-600 mr-4">Edit</Link>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600">Delete</button>
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
