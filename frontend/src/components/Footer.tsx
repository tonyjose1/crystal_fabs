import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary text-text-primary text-center border-t border-border">
      <div className="container mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold font-serif mb-4 text-text-primary text-center">Crystal Fabs</h3>
            <p className="text-lg text-text-primary">Your trusted partner for custom steel fabrication.</p>
            <div className="mt-4 flex justify-center space-x-4">
              <a href="/blog" className="text-text-primary hover:text-accent transition-colors duration-300">Blog</a>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-serif mb-4 text-text-primary text-center">Connect With Us</h3>
            <div className="flex justify-center items-center space-x-4">
              <a href="#" className="text-text-primary hover:text-accent transition-colors duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-text-primary hover:text-accent transition-colors duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-text-primary hover:text-accent transition-colors duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-text-primary hover:text-accent transition-colors duration-300">
                <FaLinkedin size={24} />
              </a>
            </div>

          </div>
          <div>
            <h3 className="text-2xl font-bold font-serif mb-4 text-text-primary text-center">Contact Us</h3>
            <p className="text-lg text-text-primary text-center">Nedungapra PO, Perumbavoor</p>
            <p className="text-lg text-text-primary text-center">info@crystalfabs.com</p>
            <p className="text-lg text-text-primary text-center">+91 9876543210</p>
          </div>
        </div>
        <div className="border-t border-border mt-8 py-4 text-center text-text-primary">
          <p className="text-lg">&copy; {currentYear} Crystal Fabs. All Rights Reserved. &reg; &trade;</p>
        </div>
      </div>
    </footer>
  );
}
