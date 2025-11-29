'use client';

import Link from 'next/link';
import Hero from '../components/Hero';
// import InteractiveBlueprint from '../components/InteractiveBlueprint';
import ProductCard from '../components/ProductCard';
import GalleryCard from '../components/GalleryCard';
import TestimonialCard from '../components/TestimonialCard';
import InfoCard from '../components/InfoCard';
import FeatureList from '../components/FeatureList';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaHammer, FaAward, FaLightbulb, FaRulerCombined, FaPeopleCarry, FaCheck, FaQuoteLeft, FaArrowLeft, FaArrowRight, FaBroadcastTower, FaCogs, FaDraftingCompass } from 'react-icons/fa';
import SwiperCore from 'swiper';
import { useState } from 'react';
import WeldingSparkCursor from '../components/WeldingSparkCursor';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Product {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
  description?: string;
}

interface Project {
  id: string;
  name: string;
  imageUrl?: string;
}

interface Testimonial {
  id: string;
  author: string;
  content: string;
  company: string;
}

export default function HomePageClient({ products, projects, testimonials }: { products: Product[], projects: Project[], testimonials: Testimonial[] }) {
  const features = [
    {
      icon: <FaRulerCombined />,
      title: 'Precision Engineering',
      description: 'We use the latest technology to ensure every project is built to exact specifications.',
    },
    {
      icon: <FaPeopleCarry />,
      title: 'Experienced Team',
      description: 'Our team of skilled professionals has decades of combined experience.',
    },
    {
      icon: <FaCheck />,
      title: 'Quality Materials',
      description: 'We source only the highest quality steel and materials for our projects.',
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);

  const handleNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleSlideChange = (swiperInstance: SwiperCore) => {
    setIsEnd(swiperInstance.isEnd);
    setIsBeginning(swiperInstance.isBeginning);
  };

  return (
    <main className="relative">
      <Hero />
      <WeldingSparkCursor />
      
      {/* Service Nodes Container */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
      </div>

      {/* <InteractiveBlueprint /> */}

      {/* Why Choose Us Section */}
      <motion.section
        id="why-choose-us"
        className="py-20 bg-background relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-center text-text-primary mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <InfoCard icon={<FaHammer />} title="Years of Experience" value="15+" />
            <InfoCard icon={<FaAward />} title="Projects Completed" value="500+" />
            <InfoCard icon={<FaLightbulb />} title="Innovative Solutions" value="100+" />
          </div>
          <div className="mt-16">
            <FeatureList features={features} />
          </div>
        </div>
      </motion.section>

      {/* Featured Products Section */}
      <motion.section
        id="products"
        className="py-20 bg-background-secondary"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold font-serif text-center text-text-primary mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Project Gallery Section */}
      <motion.section
        id="projects"
        className="py-20 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold font-serif text-center text-text-primary mb-12">Our Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects?.map((project) => (
                <div key={project.id}>
                  <GalleryCard project={project} />
                </div>
              ))}
            </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="text-center py-20 bg-background-secondary"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-4">Ready to start your next project?</h2>
          <p className="text-lg text-text-primary mb-8">Contact us today for a free consultation and quote.</p>
          <Link href="/contact">
            <button className="bg-primary text-text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#3d579f] transition-all duration-300 transform hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
              Get a Quote
            </button>
          </Link>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        className="bg-background py-40"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div className="relative flex flex-col justify-center -mt-50 ml-40">
              <div className="absolute -top-16 -left-16 w-40 h-40 border-2 border-[#3d579f] rounded-full opacity-50"></div>
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-[#3d579f] rounded-full flex items-center justify-center">
                <FaQuoteLeft className="text-text-primary text-5xl" />
              </div>
              <h2 className="text-6xl md:text-7xl font-bold font-serif text-text-primary relative z-10 mt-24 ml-16">
                <span className="block">What Our</span>
                <span className="block">Clients Say</span>
              </h2>
            </div>

            {/* Right Column */}
            <div className="relative mr-10">
              <Swiper
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                onSwiper={setSwiper}
                onSlideChange={handleSlideChange}
              >
                {testimonials?.map((testimonial) => (
                  <SwiperSlide key={testimonial.id}>
                    <TestimonialCard testimonial={testimonial} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="flex justify-end items-center mt-8 space-x-4">
                {!isBeginning && (
                  <button
                    onClick={handlePrev}
                    className="w-16 h-16 rounded-full border-2 border-[#3d579f] text-[#3d579f] flex items-center justify-center hover:bg-[#3d579f] hover:text-text-primary transition-colors"
                  >
                    <FaArrowLeft />
                  </button>
                )}
                {!isEnd && (
                  <button
                    onClick={handleNext}
                    className="w-16 h-16 rounded-full border-2 border-[#3d579f] text-[#3d579f] flex items-center justify-center hover:bg-[#3d579f] hover:text-text-primary transition-colors"
                  >
                    <FaArrowRight />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
