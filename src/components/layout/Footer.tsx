import { Link } from 'react-router-dom';
import { Wheat, Phone, Mail, MapPin, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-3">
              <Wheat size={24} className="text-green-400" />
              <span>सही Mandi</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              भारतीय किसानों के लिए बेहतर मंडी, बेहतर दाम, बेहतर जीवन।<br />
              <span className="text-gray-500">Better mandi, better price, better life for Indian farmers.</span>
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Twitter" className="p-2 rounded-lg bg-gray-800 hover:bg-green-700 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="p-2 rounded-lg bg-gray-800 hover:bg-green-700 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" aria-label="Instagram" className="p-2 rounded-lg bg-gray-800 hover:bg-green-700 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="YouTube" className="p-2 rounded-lg bg-gray-800 hover:bg-green-700 transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/mandis', label: 'Find Mandis' },
                { to: '/analyzer', label: 'Smart Analyzer' },
                { to: '/dashboard', label: 'Farmer Dashboard' },
                { to: '/admin', label: 'Admin Portal' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-green-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              {['PM Kisan Samman Nidhi', 'MSP Rates 2024-25', 'Fasal Bima Yojana', 'eNAM Portal', 'Kisan Call Center', 'Soil Health Card'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-green-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={14} className="mt-0.5 text-green-400 shrink-0" />
                <span>Kisan Helpline: 1800-180-1551<br />(Toll Free, Mon–Sat 6AM–10PM)</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="mt-0.5 text-green-400 shrink-0" />
                <span>help@sahimandi.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 text-green-400 shrink-0" />
                <span>Krishi Bhawan, New Delhi – 110001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2025 सही Mandi. All rights reserved. Made with ❤️ for Indian Farmers.</p>
          <p className="text-center">
            <span className="text-gray-600">Disclaimer: </span>
            Prices shown are indicative. Always verify at the mandi before selling.
          </p>
        </div>
      </div>
    </footer>
  );
}
