import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white bg-opacity-80 text-gray-800 py-12 rounded-xl shadow-lg mx-4 my-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Archiform</h3>
            <p className="text-gray-600">
              Creating exceptional spaces that inspire and transform lives through innovative design
              and architectural excellence.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-gray-700" />
                <a href="mailto:info@archiform.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                  info@archiform.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-gray-700" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-gray-700" />
                <span className="text-gray-600">123 Design Street, NY 10001</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Projects', 'Services', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <button className="text-gray-600 hover:text-gray-900 transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <button
                  key={index}
                  className="text-gray-600 hover:text-gray-900 transition-colors transform hover:scale-110"
                >
                  <Icon className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Archiform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;