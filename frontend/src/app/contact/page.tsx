'use client';

import QuoteForm from '../../components/QuoteForm';
import InteractiveDotsBackground from '../../components/InteractiveDotsBackground';

export default function ContactPage() {
  return (
    <main className="relative py-20 text-text-primary">
      <InteractiveDotsBackground />
      <div className="container mx-auto px-4 relative z-10 pointer-events-none">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold inline-block bg-[var(--color-background-secondary)] px-8 py-4 rounded-lg pointer-events-auto shadow-sm">Contact Us</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pointer-events-auto">
          <div className="bg-[var(--color-background-secondary)] rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-2">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center mt-4">Get in Touch</h2>
              <QuoteForm />
            </div>
          </div>

          <div className="bg-[var(--color-background-secondary)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">Our Location</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-inner">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.7085076476365!2d76.55874537530995!3d10.122928889988874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07e48f69d0530f%3A0xe845ffd5330b478c!2sSt%20Antony&#39;s%20Parish%20Hall!5e0!3m2!1sen!2sin!4v1761076179716!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}