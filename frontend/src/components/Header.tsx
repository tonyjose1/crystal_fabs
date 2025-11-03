'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (isHomePage) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isHomePage]);

  const headerClasses = `text-white py-2 px-4 sticky top-0 z-50 transition-colors duration-300 ${
    isHomePage && !isScrolled ? 'bg-transparent' : 'bg-primary'
  }`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <Link href="/" onClick={handleLinkClick}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Image src="/images/logo.png" alt="Crystal Fabs Logo" width={160} height={35} priority />
            </motion.div>
          </Link>
          <div className="hidden bg-transparent md:flex space-x-6">
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
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li><Link href="/about" className="hover:text-accent block" onClick={handleLinkClick}>About</Link></li>
              <li><Link href="/products" className="hover:text-accent block" onClick={handleLinkClick}>Products</Link></li>
              <li><Link href="/services" className="hover:text-accent block" onClick={handleLinkClick}>Services</Link></li>
              <li><Link href="/industries" className="hover:text-accent block" onClick={handleLinkClick}>Industries</Link></li>
              <li><Link href="/projects" className="hover:text-accent block" onClick={handleLinkClick}>Projects</Link></li>
              <li><Link href="/contact" className="hover:text-accent block" onClick={handleLinkClick}>Contact</Link></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}