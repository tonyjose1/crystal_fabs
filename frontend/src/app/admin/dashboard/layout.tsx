'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AdminUser {
  username: string;
}

export default function DashboardPage({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setAdmin({ username: 'admin' });
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (!admin) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-greylight flex">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-8">Admin</h1>
        <nav>
          <ul>
            <li><Link href="/admin/dashboard" className="block py-2 px-4 hover:bg-gray-700">Dashboard</Link></li>
            <li><Link href="/admin/dashboard/products" className="block py-2 px-4 hover:bg-gray-700">Products</Link></li>
            <li><Link href="/admin/dashboard/projects" className="block py-2 px-4 hover:bg-gray-700">Projects</Link></li>
            <li><Link href="/admin/dashboard/testimonials" className="block py-2 px-4 hover:bg-gray-700">Testimonials</Link></li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">
            Logout
          </button>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
