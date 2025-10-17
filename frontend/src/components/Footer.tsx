import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold font-serif mb-4 text-white">Crystal Fabs</h3>
            <p className="text-white">Your trusted partner for custom steel fabrication.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-serif mb-4 text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent transition-colors duration-300"><FaFacebook size={24} /></a>
              <a href="#" className="text-white hover:text-accent transition-colors duration-300"><FaTwitter size={24} /></a>
              <a href="#" className="text-white hover:text-accent transition-colors duration-300"><FaInstagram size={24} /></a>
              <a href="#" className="text-white hover:text-accent transition-colors duration-300"><FaLinkedin size={24} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-serif mb-4 text-white">Contact Us</h3>
            <p className="text-white">123 Industrial Zone, City, State</p>
            <p className="text-white">info@crystalfabs.com</p>
            <p className="text-white">+1 234 567 890</p>
          </div>
        </div>
        <div className="border-t border-greydark mt-8 pt-8 text-center text-white">
          <p>&copy; {currentYear} Crystal Fabs. All Rights Reserved. &reg; &trade;</p>
        </div>
      </div>
    </footer>
  );
}
