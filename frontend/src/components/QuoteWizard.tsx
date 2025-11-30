'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaIndustry, FaTools, FaCheck } from 'react-icons/fa';

const QuoteWizard = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        serviceType: '',
        details: '',
        name: '',
        phone: '',
        email: '',
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        const formSpreeData = new FormData();
        formSpreeData.append('name', formData.name);
        formSpreeData.append('phone', formData.phone);
        formSpreeData.append('email', formData.email);
        formSpreeData.append('category', formData.serviceType); // Mapping to match previous form
        formSpreeData.append('message', formData.details);      // Mapping to match previous form

        try {
            const response = await fetch('https://formspree.io/f/mgvgvgrd', {
                method: 'POST',
                body: formSpreeData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Thank you! We will contact you shortly.' });
                setFormData({ serviceType: '', details: '', name: '', phone: '', email: '' });
                setTimeout(() => {
                    setStep(1);
                    setStatus({ type: '', message: '' });
                }, 3000);
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
        } finally {
            setIsSubmitting(false);
        }
    };

    const services = [
        { id: 'Residential', name: 'Residential', icon: <FaHome size={30} /> },
        { id: 'Commercial', name: 'Commercial', icon: <FaIndustry size={30} /> },
        { id: 'Custom Work', name: 'Custom Work', icon: <FaTools size={30} /> },
    ];

    return (
        <div className="bg-[var(--color-background-secondary)] p-8 rounded-xl shadow-2xl max-w-2xl mx-auto border border-gray-700">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`w-1/3 h-2 rounded-full mx-1 ${step >= i ? 'bg-primary' : 'bg-gray-600'
                                }`}
                        />
                    ))}
                </div>
                <h2 className="text-2xl font-bold text-center text-text-primary">
                    {step === 1 && 'What kind of project is this?'}
                    {step === 2 && 'Tell us more about it'}
                    {step === 3 && 'How can we reach you?'}
                </h2>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                        {services.map((service) => (
                            <button
                                key={service.id}
                                onClick={() => {
                                    setFormData({ ...formData, serviceType: service.id });
                                    handleNext();
                                }}
                                className={`p-6 rounded-lg border-2 transition-all flex flex-col items-center gap-4 cursor-pointer ${formData.serviceType === service.id
                                    ? 'border-primary bg-primary/20'
                                    : 'border-gray-600 hover:border-primary/50'
                                    }`}
                            >
                                <div className="text-text-primary">{service.icon}</div>
                                <span className="font-semibold text-text-primary">{service.name}</span>
                            </button>
                        ))}
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <textarea
                            name="message"
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            placeholder="Describe your project (e.g., 'I need a stainless steel railing for my balcony, approx 20ft')..."
                            className="w-full p-4 rounded-lg bg-background border border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary h-40 text-text-primary placeholder-gray-400"
                        />
                        <div className="flex justify-between mt-6">
                            <button onClick={handleBack} className="text-gray-400 hover:text-text-primary transition-colors">
                                Back
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={!formData.details}
                                className="bg-[#1E2DB5] text-[#FFFFFF] px-8 py-2 rounded-full hover:bg-[#1E2DB5]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all z-10"
                            >
                                Next
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <form
                            action="https://formspree.io/f/mgvgvgrd"
                            method="POST"
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            {/* Hidden inputs to include data from previous steps in standard form submission */}
                            <input type="hidden" name="category" value={formData.serviceType} />
                            <input type="hidden" name="message" value={formData.details} />

                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="w-full p-4 rounded-lg bg-background border border-gray-600 focus:border-primary text-text-primary placeholder-gray-400"
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                                className="w-full p-4 rounded-lg bg-background border border-gray-600 focus:border-primary text-text-primary placeholder-gray-400"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full p-4 rounded-lg bg-background border border-gray-600 focus:border-primary text-text-primary placeholder-gray-400"
                            />
                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="text-gray-400 hover:text-text-primary transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#1E2DB5] text-[#FFFFFF] px-8 py-3 rounded-full hover:bg-[#1E2DB5]/80 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all z-10"
                                >
                                    {isSubmitting ? 'Sending...' : <><FaCheck /> Submit Request</>}
                                </button>
                            </div>
                            {status.message && (
                                <div className={`mt-4 text-center p-3 rounded-md ${status.type === 'success' ? 'bg-green-900/50 text-green-100' : 'bg-red-900/50 text-red-100'}`}>
                                    {status.message}
                                </div>
                            )}
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuoteWizard;
