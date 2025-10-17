'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
  '/images/products/item1.jpg',
  '/images/products/item2.jpg',
  '/images/products/item3.jpg',
  '/images/products/item4.jpg',
];

export default function Hero() {
  return (
    <section className="relative h-screen text-white">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primarydark opacity-75"></div>
      <div className="absolute inset-0 flex items-center justify-center text-center z-10">
        <div className="relative">
          <h1 className="text-5xl md:text-7xl font-bold font-serif animate-fade-in-down">Custom Steel Fabrication</h1>
          <p className="text-xl md:text-2xl mt-4 animate-fade-in-up">Precision, Quality, Durability</p>
          <Link href="/contact">
            <button className="mt-8 bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primarydark transition-all duration-300 transform hover:scale-105 animate-fade-in-up">
              Get a Free Quote
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}