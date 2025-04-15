import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Navigation items with corresponding section IDs
  const navItems = [
    { name: "Home", id: "hero" },
    { name: "Projects", id: "projects" },
    { name: "About", id: "about" }
  ];

  // Function to handle smooth scrolling to sections
  const scrollToSection = (id: string) => {
    // Close mobile menu if open
    if (isOpen) setIsOpen(false);
    
    // Find the element
    const element = document.getElementById(id);
    if (element) {
      // Scroll smoothly to the element
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 w-full mx-auto z-50 px-4 sm:px-6 lg:px-8 py-2 mt-4">
      <div className="max-w-full mx-auto bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 px-6 transition-all duration-300 hover:bg-white/70">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="h-10 w-10 overflow-hidden scale-150 rounded-2xl">
              <img
                src="/images/logo.png"
                alt="Archiform Logo"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-900 hover:text-gray-600 px-3 py-2 relative group rounded-lg transition-all duration-300 hover:scale-105 font-bold text-lg"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-900 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full" />
              </button>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-50/50 transition-all duration-300"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden mt-2 transition-all duration-300 transform ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-white/60 backdrop-blur-xl rounded-xl shadow-lg mx-4 border border-white/20">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className="text-gray-900 hover:text-gray-600 block w-full px-4 py-3 text-left hover:bg-gray-50/50 transition-all duration-300 first:rounded-t-xl last:rounded-b-xl hover:scale-[1.02] font-bold text-lg"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;