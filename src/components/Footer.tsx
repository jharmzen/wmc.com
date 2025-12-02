import React from 'react';
import { Link } from 'react-router-dom';

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: string;
  href: string;
}

interface FooterProps {
  logo: string;
  quickLinks: FooterLink[];
  resources: FooterLink[];
  contactInfo: {
    phone: string;
    email: string;
    address: string[];
  };
  socialLinks: SocialLink[];
  credentials: string[];
  copyright: string;
}

const Footer: React.FC<FooterProps> = ({
  logo,
  quickLinks,
  resources,
  contactInfo,
  socialLinks,
  credentials,
  copyright,
}) => {
  return (
    <footer id="global-footer" className="code-section bg-[#0d203b] text-white">
      <div className="px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & Description */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img src={logo} alt="Wealth Masters Club" className="h-20" />
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
                  className="w-10 h-10 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-200"
                >
                  <i className={`fab ${link.icon} text-white`} aria-hidden="true"></i>
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
                  <p className="text-gray-300">{contactInfo.phone}</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-envelope text-[#4782b5] mt-1" aria-hidden="true"></i>
                <div>
                  <p className="text-gray-300">{contactInfo.email}</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt text-[#4782b5] mt-1" aria-hidden="true"></i>
                <div>
                  <p className="text-gray-300">
                    {contactInfo.address.map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < contactInfo.address.length - 1 && <br />}
                      </span>
                    ))}
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
              {credentials.map((cred, index) => (
                <p key={index} className="text-xs text-gray-400">
                  {cred}
                </p>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center lg:text-right">
              <p className="text-xs text-gray-400">
                {copyright}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;