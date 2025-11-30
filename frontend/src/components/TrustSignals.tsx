'use client';

import React from 'react';
import { FaAward, FaShieldAlt, FaClock, FaTools } from 'react-icons/fa';

const TrustSignals = () => {
    const signals = [
        {
            icon: <FaAward className="text-4xl text-primary mb-4" />,
            title: 'Premium Quality',
            description: 'We use only the highest grade materials for durability and aesthetics.',
        },
        {
            icon: <FaTools className="text-4xl text-primary mb-4" />,
            title: 'Expert Craftsmanship',
            description: 'Our team of skilled fabricators ensures precision in every cut and weld.',
        },
        {
            icon: <FaClock className="text-4xl text-primary mb-4" />,
            title: 'On-Time Delivery',
            description: 'We respect your timelines and strive to complete projects on schedule.',
        },
        {
            icon: <FaShieldAlt className="text-4xl text-primary mb-4" />,
            title: 'Guaranteed Satisfaction',
            description: 'Your satisfaction is our priority. We stand behind our work.',
        },
    ];

    return (
        <section className="py-16 bg-[var(--color-background-secondary)]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Crystal Fabs?</h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Committed to delivering excellence in every project. Here is what sets us apart.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {signals.map((signal, index) => (
                        <div
                            key={index}
                            className="bg-background p-6 rounded-lg shadow-md text-center hover:transform hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#3d579f]"
                        >
                            <div className="flex justify-center">{signal.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{signal.title}</h3>
                            <p className="text-text-secondary">{signal.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSignals;
