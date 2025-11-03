'use client';

import { useState } from 'react';

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thanks for your submission!' });
        setFormData({ name: '', phone: '', category: '', message: '' });
      } else {
        const responseData = await response.json();
        if (responseData.errors) {
          const errorMessage = responseData.errors.map((error: any) => error.message).join(', ');
          setStatus({ type: 'error', message: errorMessage });
        } else {
          setStatus({ type: 'error', message: 'Oops! There was a problem submitting your form' });
        }
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Oops! There was a problem submitting your form' });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      action="https://formspree.io/f/mblznreo"
      method="POST"
      className="p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-3xl font-bold font-serif text-center mb-8">Get a Free Quote</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="p-3 border rounded-md bg-black text-white border-gray-600 placeholder-gray-400" />
        <input type="tel" name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange} required className="p-3 border rounded-md bg-black text-white border-gray-600 placeholder-gray-400" />
      </div>
      <div className="mt-6">
        <select name="category" value={formData.category} onChange={handleChange} required className="p-3 border rounded-md w-full bg-black text-white border-gray-600 placeholder-gray-400">
          <option value="">Select Category</option>
          <option value="Architectural">Architectural</option>
          <option value="Structural">Structural</option>
          <option value="Decorative">Decorative</option>
        </select>
      </div>
      <div className="mt-6">
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} rows={5} className="p-3 border rounded-md w-full bg-black text-white border-gray-600 placeholder-gray-400"></textarea>
      </div>

      <div className="mt-8 text-center">
        <button type="submit" className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-900 hover:text-white transition-all duration-300 transform hover:scale-105">
          Submit Request
        </button>
      </div>
      {status.message && (
        <div className={`mt-4 text-center p-3 rounded-md ${status.type === 'success' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}`}>
          {status.message}
        </div>
      )}
    </form>
  );
}