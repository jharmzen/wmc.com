import React from 'react';
import { Link } from 'react-router-dom';

const WMCFooter: React.FC = () => {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Membership', href: '/membership' },
    { label: 'Events', href: '/events' },
    { label: 'Testimonials', href: '/testimonials' },
  ];

  const resources = [
    { label: 'Shop', href: '/shop' },
    { label: 'Blog/Insights', href: '/blog' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'Member Login', href: '/login' },
  ];

  const socialLinks = [
    { icon: 'fa-facebook-f', href: 'https://www.facebook.com/wealthmastersclub', label: 'Facebook' },
    { icon: 'fa-linkedin-in', href: 'https://www.linkedin.com/company/wealth-masters-club', label: 'LinkedIn' },
    { icon: 'fa-youtube', href: 'https://www.youtube.com/@WealthMastersClub', label: 'YouTube' },
    { icon: 'fa-instagram', href: 'https://www.instagram.com/wealthmastersclub', label: 'Instagram' },
  ];

  return (
    <footer id="global-footer" className="code-section bg-[#0d203b] text-white">
      <div className="px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & Description */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img src="/assets/header.png" alt="Wealth Masters Club" className="h-20" />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner on the journey towards financial freedom through
              specialized trust structures and property investments.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-200"
                >
                  <i className={`fab ${link.icon} text-white text-lg`} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-[var(--font-family-heading)] text-lg font-bold mb-6 text-[#4782b5]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-[#4782b5] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-[var(--font-family-heading)] text-lg font-bold mb-6 text-[#4782b5]">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-[#4782b5] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-[var(--font-family-heading)] text-lg font-bold mb-6 text-[#4782b5]">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <i className="fas fa-phone text-[#4782b5] mt-1" aria-hidden="true"></i>
                <div>
                  <p className="text-gray-300">+27 21 851 2730</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-envelope text-[#4782b5] mt-1" aria-hidden="true"></i>
                <div>
                  <p className="text-gray-300">info@wealthmastersclub.com</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt text-[#4782b5] mt-1" aria-hidden="true"></i>
                <div>
                  <p className="text-gray-300">
                    Posbus 834, Somerset Mall<br />
                    Somerset West, 7137<br />
                    South Africa
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white border-opacity-20 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Credentials */}
            <div className="text-center lg:text-left">
              <p className="text-xs text-gray-400">
                Part of Destinata Group of Companies - Legal, Financial & Property Service Provider
              </p>
              <p className="text-xs text-gray-400">
                Authorised FSP: 48729 | Fiduciary Institute of South Africa | Accounting Association of South Africa | Property Practitioners Regulatory Authority
              </p>
            </div>

            {/* Copyright */}
            <div className="text-center lg:text-right">
              <p className="text-xs text-gray-400">
                © 2025 Wealth Masters Club. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WMCFooter;
