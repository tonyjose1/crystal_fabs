import React from 'react';
import Link from 'next/link';

const IndustriesPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-text-primary">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Industries We Serve</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        <div className="bg-background-secondary p-6 rounded-lg shadow-md border border-transparent hover:border-[#3d579f] ">
          <h3 className="text-lg md:text-xl font-semibold mb-2">Construction</h3>
          <p>We provide structural steel for commercial and residential construction projects.</p>
        </div>
        <div className="bg-background-secondary p-6 rounded-lg shadow-md border border-transparent hover:border-[#3d579f]">
          <h3 className="text-xl font-semibold mb-2">Manufacturing</h3>
          <p>We create custom metal components for a variety of manufacturing applications.</p>
        </div>
        <div className="bg-background-secondary p-6 rounded-lg shadow-md border border-transparent hover:border-[#3d579f]">
          <h3 className="text-xl font-semibold mb-2">Energy</h3>
          <p>We supply fabricated steel for the energy sector, including power plants and renewable energy projects.</p>
        </div>
        <div className="bg-background-secondary p-6 rounded-lg shadow-md border border-transparent hover:border-[#3d579f]">
          <h3 className="text-xl font-semibold mb-2">Transportation</h3>
          <p>Our work includes fabricating components for bridges, railways, and other transportation infrastructure.</p>
        </div>
        <div className="bg-background-secondary p-6 rounded-lg shadow-md border border-transparent hover:border-[#3d579f]">
          <h3 className="text-xl font-semibold mb-2">Agriculture</h3>
          <p>We provide durable and reliable steel products for the agricultural industry.</p>
        </div>
        <div className="bg-background-secondary p-6 rounded-lg shadow-md border border-transparent hover:border-[#3d579f]">
          <h3 className="text-xl font-semibold mb-2">Marine</h3>
          <p>We have experience in fabricating components for ships and other marine applications.</p>
        </div>
      </div>
      <div className="text-center mt-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-lg mb-8">Contact us today for a free consultation and quote.</p>
        <Link href="/contact" className="bg-primary text-text-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#3d579f] transition-colors">
            Get a Quote
        </Link>
      </div>
    </div>
  );
};

export default IndustriesPage;