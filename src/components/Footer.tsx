import React from "react";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon from react-icons

const Footer: React.FC = () => {
  // WhatsApp link with your phone number
  const whatsappLink = "https://wa.me/9825346592";

  // Instagram profile link
  const instagramLink =
    "https://www.instagram.com/bipin_mevada_architects?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="; // Replace with your actual Instagram handle

  return (
    <footer className="bg-white bg-opacity-80 text-gray-800 py-12 rounded-xl shadow-lg mx-4 my-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Archiform</h3>
            <p className="text-gray-600">
              Creating exceptional spaces that inspire and transform lives
              through innovative design and architectural excellence.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-gray-700" />
                <a
                  href="mailto:bipin.mevada@yahoo.com"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  bipin.mevada@yahoo.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-gray-700" />
                <span className="text-gray-600">+91 98253-46592</span>
              </div>
              {/* <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-gray-700" />
                <span className="text-gray-600">123 Design Street, NY 10001</span>
              </div> */}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Projects", "About"].map((item) => (
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
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-colors transform hover:scale-110"
                aria-label="Contact us on WhatsApp"
              >
                {/* Using FaWhatsapp if you've added react-icons */}
                <FaWhatsapp className="w-6 h-6" />
              </a>
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 transition-colors transform hover:scale-110"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Archiform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
