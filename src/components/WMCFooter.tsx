import React from 'react';
import { Link } from 'react-router-dom';

const WMCFooter: React.FC = () => {
  const eventLinks = [
    { label: 'All Events', href: '/events' },
    { label: 'Half-Day Seminars', href: '/events' },
    { label: 'Webinars', href: '/webinars' },
    { label: 'Interactive Zoom Sessions', href: '/events' },
  ];

  const companyLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about-us' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact-us' },
  ];

  const socialLinks = [
    { icon: 'fa-facebook-f', href: 'https://www.facebook.com/wealthmastersclub', label: 'Facebook' },
    { icon: 'fa-linkedin-in', href: 'https://www.linkedin.com/company/wealth-masters-club', label: 'LinkedIn' },
    { icon: 'fa-youtube', href: 'https://www.youtube.com/@WealthMastersClub', label: 'YouTube' },
  ];

  return (
    <footer id="global-footer" className="code-section bg-[#0A1E3D] border-t border-[#1E3A5F] pt-12 pb-6">
      <div className="px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="block mb-4">
              <img src="/assets/header.png" alt="Wealth Masters Club" className="h-20 w-auto" />
            </Link>
            <p className="text-white opacity-80 text-sm leading-relaxed mb-4">
              Professional wealth and property education since 1996.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 bg-[#DAA520] bg-opacity-10 rounded-full flex items-center justify-center hover:bg-[#DAA520] transition-all duration-300 group"
                >
                  <i className={`fab ${link.icon} text-[#DAA520] group-hover:text-white`} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>

          {/* Events Links */}
          <div>
            <h3 className="text-white font-[var(--font-family-heading)] font-bold text-lg mb-4">
              Events
            </h3>
            <ul className="space-y-3">
              {eventLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white opacity-80 hover:text-[#DAA520] text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-[var(--font-family-heading)] font-bold text-lg mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white opacity-80 hover:text-[#DAA520] text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-[var(--font-family-heading)] font-bold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <i className="fas fa-envelope text-[#DAA520] mt-1" aria-hidden="true"></i>
                <a href="mailto:info@wealthmastersclub.com" className="text-white opacity-80 hover:text-[#DAA520] text-sm transition-colors duration-300">
                  info@wealthmastersclub.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-phone text-[#DAA520] mt-1" aria-hidden="true"></i>
                <a href="tel:+27218512730" className="text-white opacity-80 hover:text-[#DAA520] text-sm transition-colors duration-300">
                  +27 21 851 2730
                </a>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-[#DAA520] mt-1" aria-hidden="true"></i>
                <span className="text-white opacity-80 text-sm">South Africa</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="border-t border-[#1E3A5F] pt-8 mb-6">
          <div className="bg-[#DAA520] bg-opacity-5 border border-[#DAA520] border-opacity-20 rounded-lg p-4 mb-6">
            <p className="text-white opacity-80 text-xs leading-relaxed">
              <strong className="text-white">Important Disclaimer:</strong>{' '}
              All content provided is for educational purposes only. Wealth Masters Club does not guarantee any specific financial returns or outcomes. Investment decisions should always be made in consultation with licensed financial professionals. Past performance and educational content do not guarantee future results.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#1E3A5F] pt-6 text-center">
          <p className="text-white opacity-80 text-sm">
            &copy; 2026 Wealth Masters Club. All rights reserved. Established 1996.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default WMCFooter;
