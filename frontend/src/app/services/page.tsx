

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Custom Metal Fabrication & Engineering',
  description: 'Explore our wide range of services including structural engineering, custom gate design, roofing solutions, and precision metal fabrication.',
};

import React from 'react';
import Link from 'next/link';
import InteractiveDotsBackground from '../../components/InteractiveDotsBackground';

const ServicesPage = () => {
  return (
    <div className="relative">
      <InteractiveDotsBackground />
      <div className="container mx-auto px-4 py-16 text-text-primary relative z-10 pointer-events-none">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold inline-block bg-[var(--color-background-secondary)] px-8 py-4 rounded-lg pointer-events-auto shadow-sm">Our Services</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-8 pointer-events-auto">
          <div className="bg-[var(--color-background-secondary)] p-6 rounded-lg shadow-md border border-transparent hover:border-[#3d579f]">
            <h3 className="text-lg md:text-xl font-semibold mb-2">Structural Steel Fabrication</h3>
            <p>We specialize in the fabrication of structural steel for a wide range of applications, including buildings, bridges, and industrial facilities.</p>
          </div>
          <div className="bg-[var(--color-background-secondary)] p-6 rounded-lg shadow-md border border-transparent hover:border-[#3d579f] ">
            <h3 className="text-xl font-semibold mb-2">Custom Metal Fabrication</h3>
            <p>Our team can create custom metal components to your exact specifications, from simple brackets to complex assemblies.</p>
          </div>
          <div className="bg-[var(--color-background-secondary)] p-6 rounded-lg shadow-md border border-transparent hover:border-[#3d579f]">
            <h3 className="text-xl font-semibold mb-2">Welding Services</h3>
            <p>We offer a variety of welding services, including MIG, TIG, and stick welding, to meet the needs of your project.</p>
          </div>
          <div className="bg-[var(--color-background-secondary)] p-6 rounded-lg shadow-md border border-transparent hover:border-[#3d579f]">
            <h3 className="text-xl font-semibold mb-2">Sheet Metal Work</h3>
            <p>Our skilled craftsmen can handle all your sheet metal needs, from shearing and bending to punching and forming.</p>
          </div>
          <div className="bg-[var(--color-background-secondary)] p-6 rounded-lg shadow-md border border-transparent hover:border-[#3d579f]">
            <h3 className="text-xl font-semibold mb-2">On-Site Installation</h3>
            <p>We provide professional on-site installation services to ensure your project is completed to the highest standards.</p>
          </div>
          <div className="bg-[var(--color-background-secondary)] p-6 rounded-lg shadow-md border border-transparent hover:border-[#3d579f]">
            <h3 className="text-xl font-semibold mb-2">Design and Engineering</h3>
            <p>Our team can assist with the design and engineering of your project,
              ensuring it meets all necessary codes and standards.</p>
          </div>
        </div>
        <div className="text-center mt-16 bg-[var(--color-background-secondary)] p-4 rounded-lg pointer-events-auto max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-8">Contact us today for a free consultation and quote.</p>
          <Link href="/contact" className="bg-primary text-text-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#3d579f] transition-colors">
            Get a Quote
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;