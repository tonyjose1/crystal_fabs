'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import GalleryCard from '../components/GalleryCard';
import TestimonialCard from '../components/TestimonialCard';
import InfoCard from '../components/InfoCard';
import FeatureList from '../components/FeatureList';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { FaHammer, FaAward, FaLightbulb, FaRulerCombined, FaPeopleCarry, FaCheck } from 'react-icons/fa';
import api from '../utils/api';

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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, projectsResponse, testimonialsResponse] = await Promise.all([
          api.get('/products'),
          api.get('/projects'),
          api.get('/testimonials'),
        ]);
        setProducts(productsResponse.data.data || []);
        setProjects(projectsResponse.data.data || []);
        setTestimonials(testimonialsResponse.data.data || []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="bg-black text-white">
      <Hero />

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-serif text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <InfoCard icon={<FaHammer />} title="Years of Experience" value="15+" />
            <InfoCard icon={<FaAward />} title="Projects Completed" value="500+" />
            <InfoCard icon={<FaLightbulb />} title="Innovative Solutions" value="100+" />
          </div>
          <div className="mt-16">
            <FeatureList features={features} />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-serif text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Project Gallery Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-serif text-center mb-12">Our Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects?.map((project) => (
                <div key={project.id}>
                  <GalleryCard project={project} />
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to start your next project?</h2>
          <p className="text-lg mb-8">Contact us today for a free consultation and quote.</p>
          <Link href="/contact" className="text-white font-bold py-3 px-8 rounded-full hover:bg-accent transition-colors">
            Get a Quote
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-serif text-center mb-12">What Our Clients Say</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
          >
            {testimonials?.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </main>
  );
}