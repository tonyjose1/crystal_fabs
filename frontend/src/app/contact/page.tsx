'use client';

import QuoteWizard from '../../components/QuoteWizard';
import TrustSignals from '../../components/TrustSignals';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import InteractiveDotsBackground from '../../components/InteractiveDotsBackground';

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      <InteractiveDotsBackground />
      <main className="pt-24 pb-12 relative z-10 pointer-events-none">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold inline-block bg-[var(--color-background-secondary)] px-8 py-4 rounded-lg shadow-sm text-text-primary font-serif pointer-events-auto">
              Contact Us
            </h1>
          </div>

          {/* Section 1: Quote Wizard (Primary CTA) */}
          <div className="mb-20 pointer-events-auto">
            <QuoteWizard />
          </div>

          {/* Section 2: Map (Full Width) */}
          <div className="mb-20 pointer-events-auto">
            <div className="bg-[var(--color-background-secondary)] p-2 rounded-2xl shadow-lg overflow-hidden h-[400px] border border-transparent hover:border-[#3d579f] transition-colors">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.7085076476365!2d76.55874537530995!3d10.122928889988874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07e48f69d0530f%3A0xe845ffd5330b478c!2sSt%20Antony's%20Parish%20Hall!5e0!3m2!1sen!2sin!4v1761076179716!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              ></iframe>
            </div>
          </div>

          {/* Section 3: Get in Touch (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 pointer-events-auto">
            <div className="bg-[var(--color-background-secondary)] p-8 rounded-lg shadow-md border border-transparent hover:border-[#3d579f] flex flex-col items-center text-center transition-all duration-300">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <FaPhone className="text-primary text-2xl" />
              </div>
              <h3 className="font-semibold text-text-primary text-xl mb-2">Phone</h3>
              <p className="text-text-secondary">+91 98460 12345</p>
              <p className="text-text-secondary">+91 98460 67890</p>
            </div>

            <div className="bg-[var(--color-background-secondary)] p-8 rounded-lg shadow-md border border-transparent hover:border-[#3d579f] flex flex-col items-center text-center transition-all duration-300">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <FaEnvelope className="text-primary text-2xl" />
              </div>
              <h3 className="font-semibold text-text-primary text-xl mb-2">Email</h3>
              <p className="text-text-secondary">info@crystalfabs.com</p>
            </div>

            <div className="bg-[var(--color-background-secondary)] p-8 rounded-lg shadow-md border border-transparent hover:border-[#3d579f] flex flex-col items-center text-center transition-all duration-300">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <FaMapMarkerAlt className="text-primary text-2xl" />
              </div>
              <h3 className="font-semibold text-text-primary text-xl mb-2">Address</h3>
              <p className="text-text-secondary">
                Crystal Fabs<br />
                Industrial Area, Kochi<br />
                Kerala, India - 682001
              </p>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="mb-12 pointer-events-auto">
            <TrustSignals />
          </div>
        </div>
      </main>
    </div>
  );
}