'use client';

import { useState } from 'react';
import api from '../utils/api';

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: '',
    message: '',
  });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });

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
    data.append('phone', formData.phone);
    data.append('category', formData.category);
    data.append('message', formData.message);
    if (file) {
      data.append('attachment', file);
    }

    try {
      await api.post('/quotes', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatus({ type: 'success', message: 'Quote request sent successfully!' });
      setFormData({ name: '', phone: '', category: '', message: '' });
      setFile(null);
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to send quote request.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold font-serif text-center mb-8">Get a Free Quote</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="p-3 border rounded-md" />
        <input type="tel" name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange} required className="p-3 border rounded-md" />
      </div>
      <div className="mt-6">
        <select name="category" value={formData.category} onChange={handleChange} required className="p-3 border rounded-md w-full">
          <option value="">Select Category</option>
          <option value="Architectural">Architectural</option>
          <option value="Structural">Structural</option>
          <option value="Decorative">Decorative</option>
        </select>
      </div>
      <div className="mt-6">
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} rows="5" className="p-3 border rounded-md w-full"></textarea>
      </div>
      <div className="mt-6">
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">Attach a file (PDF/Image)</label>
        <input type="file" name="file" id="file" onChange={handleFileChange} className="mt-1 block w-full" />
      </div>
      <div className="mt-8 text-center">
        <button type="submit" className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
          Submit Request
        </button>
      </div>
      {status.message && (
        <div className={`mt-4 text-center p-3 rounded-md ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status.message}
        </div>
      )}
    </form>
  );
}