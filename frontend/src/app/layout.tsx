import './globals.css';
import { Roboto, Playfair_Display } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import PageTransition from '../components/PageTransition';
import Link from 'next/link';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: ['700'] });

export const metadata = {
  title: 'Crystal Fabs',
  description: 'Your trusted partner for custom steel fabrication.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <div className="md:hidden fixed bottom-5 left-5">
          <Link href="/contact" className="bg-primary text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-900 transition-all duration-300">
            Get a Quote
          </Link>
        </div>
      </body>
    </html>
  );
}