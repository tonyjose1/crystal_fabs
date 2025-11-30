import fs from 'fs/promises';
import path from 'path';
import HomePageClient from './HomePageClient';

async function getData() {
  const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  const projectsFilePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
  const testimonialsFilePath = path.join(process.cwd(), 'src', 'data', 'testimonials.json');

  const productsJson = await fs.readFile(productsFilePath, 'utf8');
  const projectsJson = await fs.readFile(projectsFilePath, 'utf8');
  const testimonialsJson = await fs.readFile(testimonialsFilePath, 'utf8');

  const allProducts = JSON.parse(productsJson);
  const allProjects = JSON.parse(projectsJson);
  const allTestimonials = JSON.parse(testimonialsJson);

  return {
    products: allProducts.slice(0, 6),
    projects: allProjects.slice(0, 6),
    testimonials: allTestimonials.slice(0, 3),
  };
}

export default async function Home() {
  const { products, projects, testimonials } = await getData();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Crystal Fabs',
    image: 'https://crystal-fabs.vercel.app/images/logo.png',
    '@id': 'https://crystal-fabs.vercel.app',
    url: 'https://crystal-fabs.vercel.app',
    telephone: '+919846000000', // Replace with actual number
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Main Road', // Replace with actual address
      addressLocality: 'Kochi',
      addressRegion: 'Kerala',
      postalCode: '682001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 9.9312, // Replace with actual coordinates
      longitude: 76.2673,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [
      'https://www.facebook.com/crystalfabs',
      'https://www.instagram.com/crystalfabs',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient products={products} projects={projects} testimonials={testimonials} />
    </>
  );
}