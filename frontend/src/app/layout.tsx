import './globals.css';
import { Roboto, Playfair_Display } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import PageTransition from '../components/PageTransition';
import Link from 'next/link';
import Cursor from '../components/Cursor';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: ['700'] });

export const metadata = {
  title: 'Crystal Fabs',
  description: 'Your trusted partner for custom steel fabrication.',
};

import { ThemeProvider } from '../components/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-background text-text-primary">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Cursor />
          <Header />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <ScrollToTop />

        </ThemeProvider>
      </body>
    </html>
  );
}