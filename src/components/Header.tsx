import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <header id="global-header" className="code-section bg-[#0d203b] shadow-md sticky top-0 z-50">
      <div className="px-4 md:px-8 lg:px-16">
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
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-[#ad7d13] font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-[#4782b5] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#3a6b8c] transition-all duration-200"
              >
                Login
              </button>
            )}
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
            className="lg:hidden text-white p-3 rounded-md hover:bg-[#4782b5] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ad7d13] focus:ring-offset-2 focus:ring-offset-[#0d203b]"
            aria-label="Toggle mobile menu"
          >
            <i className="fas fa-bars text-xl sm:text-2xl" aria-hidden="true"></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden pb-4 px-4 bg-[#0d203b]">
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
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-white hover:text-[#ad7d13] font-medium transition-colors duration-200 py-2 border-b border-[#4782b5]"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-[#4782b5] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#3a6b8c] transition-all duration-200 text-center"
                >
                  Login
                </button>
              )}
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

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  );
};

export default Header;