'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="relative h-screen text-white bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/cover.jpg)' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center text-center z-10">
        <div className="relative">
          <h1 className="text-4xl md:text-7xl font-bold font-serif animate-fade-in-down">Custom Steel Fabrication</h1>
          <p className="text-xl md:text-2xl mt-4 animate-fade-in-up tracking-widest px-4">Precision &nbsp;|&nbsp; Quality &nbsp;|&nbsp; Durability</p>
          <Link href="/contact">
            <button className="mt-8 bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-120 animate-fade-in-up cursor-pointer border border-transparent hover:border-[#3d579f]">
              Get a Free Quote
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}