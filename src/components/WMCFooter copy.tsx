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
    <footer id="global-footer" className="code-section bg-[#0d203b] text-white">
      <div className="px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="block mb-4">
              <img src="/assets/header.png" alt="Wealth Masters Club" className="h-20 w-auto" />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
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
                  className="w-10 h-10 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-200"
                >
                  <i className={`fab ${link.icon} text-white text-lg`} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>

          {/* Events Links */}
          <div>
            <h3 className="font-[var(--font-family-heading)] text-lg font-bold mb-6 text-[#4782b5]">
              Events
            </h3>
            <ul className="space-y-3">
              {eventLinks.map((link, index) => (
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

          {/* Company Links */}
          <div>
            <h3 className="font-[var(--font-family-heading)] text-lg font-bold mb-6 text-[#4782b5]">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
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

          {/* Contact Info */}
          <div>
            <h3 className="font-[var(--font-family-heading)] text-lg font-bold mb-6 text-[#4782b5]">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <i className="fas fa-envelope text-[#4782b5] mt-1" aria-hidden="true"></i>
                <a href="mailto:info@wealthmastersclub.com" className="text-gray-300 hover:text-[#4782b5] text-sm transition-colors duration-200">
                  info@wealthmastersclub.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-phone text-[#4782b5] mt-1" aria-hidden="true"></i>
                <a href="tel:+27218512730" className="text-gray-300 hover:text-[#4782b5] text-sm transition-colors duration-200">
                  +27 21 851 2730
                </a>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-[#4782b5] mt-1" aria-hidden="true"></i>
                <span className="text-gray-300 text-sm">South Africa</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white border-opacity-20 pt-8">
          <div className="text-center mb-6">
            <p className="text-xs text-gray-400">
              Part of Destinata Group of Companies - Legal, Financial &amp; Property Service Provider
            </p>
            <p className="text-xs text-gray-400">
              Authorised FSP: 48729 | Fiduciary Institute of South Africa | Accounting Association of South Africa | Property Practitioners Regulatory Authority
            </p>
            <p className="text-xs text-gray-400 mt-2">
              &copy; 2026 Wealth Masters Club. All rights reserved.
            </p>
          </div>

          <p className="text-center text-xs text-gray-500 leading-relaxed">
            All content is for educational purposes only. Wealth Masters Club does not guarantee specific financial returns or outcomes. Investment decisions should be made in consultation with licensed financial professionals.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default WMCFooter;
