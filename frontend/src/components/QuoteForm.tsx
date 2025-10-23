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
      className="bg-white p-8 rounded-lg shadow-lg"
    >
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
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} rows={5} className="p-3 border rounded-md w-full"></textarea>
      </div>

      <div className="mt-8 text-center">
        <button type="submit" className="bg-primary text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-900 hover:text-white transition-all duration-300 transform hover:scale-105">
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