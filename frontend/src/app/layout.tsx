import './globals.css';
import { Roboto, Playfair_Display } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import PageTransition from '../components/PageTransition';
import Link from 'next/link';
import Cursor from '../components/Cursor';
import { ThemeProvider } from '../components/ThemeProvider';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: ['700'] });

export const metadata = {
  metadataBase: new URL('https://crystal-fabs.vercel.app'), // Replace with your actual domain
  title: {
    default: 'Crystal Fabs | Custom Steel Fabrication & Engineering',
    template: '%s | Crystal Fabs',
  },
  description: 'Crystal Fabs offers premium custom steel fabrication, structural engineering, and metalworks in Kerala. Expert craftsmanship for residential, commercial, and industrial projects.',
  keywords: [
    'Steel Fabrication',
    'Custom Metal Works',
    'Structural Engineering',
    'Stainless Steel Kitchen Equipment',
    'Commercial Kitchen Hoods',
    'Custom Gates and Railings',
    'Industrial Shelving',
    'Roofing Solutions',
    'Metal Fabrication Kerala',
    'Steel Work Kochi',
    'Wrought Iron Gates',
    'Laser Cutting Services',
    'MIG TIG Welding',
    'Crystal Fabs',
  ],
  authors: [{ name: 'Crystal Fabs' }],
  creator: 'Crystal Fabs',
  publisher: 'Crystal Fabs',
  openGraph: {
    title: 'Crystal Fabs | Custom Steel Fabrication & Engineering',
    description: 'Premium custom steel fabrication and engineering solutions. We bring your metalwork visions to life with precision and quality.',
    url: 'https://crystal-fabs.vercel.app',
    siteName: 'Crystal Fabs',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg', // Ensure you have a default OG image at this path
        width: 1200,
        height: 630,
        alt: 'Crystal Fabs - Custom Steel Fabrication',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crystal Fabs | Custom Steel Fabrication',
    description: 'Premium custom steel fabrication and engineering solutions in Kerala.',
    images: ['/images/og-image.jpg'], // Same as OG image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-background text-text-primary" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Cursor />
            <Header />
            <main className="flex-grow">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}