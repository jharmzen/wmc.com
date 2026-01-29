import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import { ChevronDown } from 'lucide-react';

const WMCHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);
  const { isAuthenticated, logout, state } = useAuth();
  const memberData = state.memberData;
  const memberName = memberData ? `${memberData.FirstNames} ${memberData.Surname}` : '';

  // Navigation items for non-logged-in users
  const publicNavItems = [
    { label: 'About Us', href: '/about-us' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Membership', href: '/membership' },
    { label: 'Events', href: '/events' },
    { label: 'Webinars', href: '/webinars' },
  ];

  // Navigation items for logged-in users
  const memberNavItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Education', href: '/education' },
    { label: 'Blog', href: '/blog' },
    { label: 'Events', href: '/events' },
    { label: 'Webinars', href: '/webinars' },
  ];

  const navItems = isAuthenticated ? memberNavItems : publicNavItems;
  const ctaButton = isAuthenticated
    ? { text: 'My Account', href: '/dashboard' }
    : { text: 'Claim Your Free Wealth Guide', href: '/membership' };

  return (
    <header id="global-header" className="code-section bg-[#0d203b] shadow-md sticky top-0 z-50">
      <div className="px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/assets/img/logo-white.png" alt="Wealth Masters Club" className="h-28 py-2" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="text-white hover:text-[#ad7d13] text-sm font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsMemberDropdownOpen(!isMemberDropdownOpen)}
                  className="flex items-center space-x-2 text-white hover:text-[#ad7d13] transition-colors duration-200"
                >
                  <img
                    src="https://backoffice.treoc.com/data/archive/images/portal-profile.png"
                    alt={memberName}
                    className="h-8 w-8 rounded-full border border-gray-400"
                  />
                  <span className="text-sm font-medium">{memberName}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isMemberDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-200 z-50">
                    <Link to="/dashboard" onClick={() => setIsMemberDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">
                      Dashboard
                    </Link>

                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="px-4 py-1">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Financial</span>
                    </div>
                    <Link to="/invoices" onClick={() => setIsMemberDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">
                      Invoices
                    </Link>
                    <Link to="/referrals" onClick={() => setIsMemberDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">
                      Referrals
                    </Link>
                    <Link to="/club-units" onClick={() => setIsMemberDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">
                      Club Units
                    </Link>

                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="px-4 py-1">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Education</span>
                    </div>
                    <Link to="/education" onClick={() => setIsMemberDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">
                      Online Courses
                    </Link>

                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="px-4 py-1">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tools</span>
                    </div>
                    <Link to="/affordability-calculator" onClick={() => setIsMemberDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">
                      Affordability Calculator
                    </Link>
                    <Link to="/financial-questionnaire" onClick={() => setIsMemberDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">
                      Financial Questionnaire
                    </Link>
                    <a href="https://www.thelcsystem.com/" target="_blank" rel="noopener noreferrer" onClick={() => setIsMemberDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium flex items-center justify-between">
                      <span>LC System</span>
                      <span className="text-xs text-gray-400">↗</span>
                    </a>
                    <a href="https://www.treocinvestor.com" target="_blank" rel="noopener noreferrer" onClick={() => setIsMemberDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium flex items-center justify-between">
                      <span>Investor Software</span>
                      <span className="text-xs text-gray-400">↗</span>
                    </a>

                    <div className="border-t border-gray-200 my-2"></div>
                    <Link to="/settings" onClick={() => setIsMemberDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">
                      Settings
                    </Link>
                    <button onClick={() => { setIsMemberDropdownOpen(false); logout(); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-medium">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setIsLoginModalOpen(true)} className="bg-[#4782b5] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#3a6b8c] transition-all duration-200">
                Login
              </button>
            )}
            <Link to={ctaButton.href} className="bg-[#ad7d13] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#8d6610] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              {ctaButton.text}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white p-3 rounded-md hover:bg-[#4782b5] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ad7d13] focus:ring-offset-2 focus:ring-offset-[#0d203b]" aria-label="Toggle mobile menu">
            <i className="fas fa-bars text-xl sm:text-2xl" aria-hidden="true"></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden pb-4 px-4 bg-[#0d203b]">
            <div className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <Link key={index} to={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-[#ad7d13] text-sm font-medium transition-colors duration-200 py-2 border-b border-[#4782b5]">
                  {item.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <div className="pt-2">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Financial</p>
                    <Link to="/invoices" onClick={() => setIsMobileMenuOpen(false)} className="block text-white hover:text-[#ad7d13] text-sm font-medium transition-colors duration-200 py-2 border-b border-[#4782b5]">Invoices</Link>
                    <Link to="/referrals" onClick={() => setIsMobileMenuOpen(false)} className="block text-white hover:text-[#ad7d13] text-sm font-medium transition-colors duration-200 py-2 border-b border-[#4782b5]">Referrals</Link>
                    <Link to="/club-units" onClick={() => setIsMobileMenuOpen(false)} className="block text-white hover:text-[#ad7d13] text-sm font-medium transition-colors duration-200 py-2 border-b border-[#4782b5]">Club Units</Link>
                  </div>

                  <div className="pt-4">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Education</p>
                    <Link to="/education" onClick={() => setIsMobileMenuOpen(false)} className="block text-white hover:text-[#ad7d13] text-sm font-medium transition-colors duration-200 py-2 border-b border-[#4782b5]">Online Courses</Link>
                  </div>

                  <div className="pt-4">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Tools</p>
                    <Link to="/affordability-calculator" onClick={() => setIsMobileMenuOpen(false)} className="block text-white hover:text-[#ad7d13] text-sm font-medium transition-colors duration-200 py-2 border-b border-[#4782b5]">Affordability Calculator</Link>
                    <Link to="/financial-questionnaire" onClick={() => setIsMobileMenuOpen(false)} className="block text-white hover:text-[#ad7d13] text-sm font-medium transition-colors duration-200 py-2 border-b border-[#4782b5]">Financial Questionnaire</Link>
                    <a href="https://www.thelcsystem.com/" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="block text-white hover:text-[#ad7d13] text-sm font-medium transition-colors duration-200 py-2 border-b border-[#4782b5] flex items-center justify-between">
                      <span>LC System</span>
                      <span className="text-xs text-gray-400">↗</span>
                    </a>
                    <a href="https://www.treocinvestor.com" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="block text-white hover:text-[#ad7d13] text-sm font-medium transition-colors duration-200 py-2 border-b border-[#4782b5] flex items-center justify-between">
                      <span>Investor Software</span>
                      <span className="text-xs text-gray-400">↗</span>
                    </a>
                  </div>

                  <div className="pt-4">
                    <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)} className="block text-white hover:text-[#ad7d13] text-sm font-medium transition-colors duration-200 py-2 border-b border-[#4782b5]">Settings</Link>
                  </div>

                  <button onClick={() => { setIsMobileMenuOpen(false); logout(); }} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-all duration-200 text-center mt-4">
                    Logout
                  </button>
                </>
              ) : (
                <button onClick={() => { setIsMobileMenuOpen(false); setIsLoginModalOpen(true); }} className="bg-[#4782b5] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#3a6b8c] transition-all duration-200 text-center">
                  Login
                </button>
              )}
              <Link to={ctaButton.href} onClick={() => setIsMobileMenuOpen(false)} className="bg-[#ad7d13] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#8d6610] transition-all duration-200 text-center">
                {ctaButton.text}
              </Link>
            </div>
          </nav>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
};

export default WMCHeader;
