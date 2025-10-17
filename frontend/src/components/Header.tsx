'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white p-4 sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-serif">
          Crystal Fabs
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/about" className="hover:text-accent">About</Link>
          <Link href="/products" className="hover:text-accent">Products</Link>
          <Link href="/services" className="hover:text-accent">Services</Link>
          <Link href="/industries" className="hover:text-accent">Industries</Link>
          <Link href="/projects" className="hover:text-accent">Projects</Link>
          <Link href="/contact" className="hover:text-accent">Contact</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
            </svg>
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-4">
            <li><Link href="/about" className="hover:text-accent block text-center">About</Link></li>
            <li><Link href="/products" className="hover:text-accent block text-center">Products</Link></li>
            <li><Link href="/services" className="hover:text-accent block text-center">Services</Link></li>
            <li><Link href="/industries" className="hover:text-accent block text-center">Industries</Link></li>
            <li><Link href="/projects" className="hover:text-accent block text-center">Projects</Link></li>
            <li><Link href="/contact" className
="hover:text-accent block text-center">Contact</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}