import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  logo: string;
  navItems: NavItem[];
  ctaButton: {
    text: string;
    href: string;
  };
}

const Header: React.FC<HeaderProps> = ({ logo, navItems, ctaButton }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header id="global-header" className="code-section bg-[#0d203b] shadow-md sticky top-0 z-50">
      <div className="px-4">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Wealth Masters Club" className="h-28 py-2" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="text-white hover:text-[#ad7d13] font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={ctaButton.href}
              className="bg-[#ad7d13] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8d6610] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {ctaButton.text}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            <i className="fas fa-bars text-2xl" aria-hidden="true"></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="text-white hover:text-[#ad7d13] font-medium transition-colors duration-200 py-2 border-b border-[#4782b5]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to={ctaButton.href}
                className="bg-[#ad7d13] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8d6610] transition-all duration-200 text-center"
              >
                {ctaButton.text}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;