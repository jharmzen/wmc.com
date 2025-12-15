import React from 'react';
import Footer from './Footer';

const WMCFooter: React.FC = () => {
  return (
    <Footer
      logo="/assets/img/logo-white.png"
      quickLinks={[
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about-us' },
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'Membership', href: '/membership' },
        { label: 'Events', href: '/events' },
        { label: 'Testimonials', href: '/testimonials' },
      ]}
      resources={[
        { label: 'Shop', href: '/shop' },
        { label: 'Blog/Insights', href: '/blog' },
        { label: 'Contact Us', href: '/contact-us' },
        { label: 'Member Login', href: '/login' },
      ]}
      contactInfo={{
        phone: '+27 21 851 2730',
        email: 'info@wealthmastersclub.com',
        address: ['Posbus 834, Somerset Mall', 'Somerset West, 7137', 'South Africa'],
      }}
      socialLinks={[
        { icon: 'fa-facebook-f', href: '#' },
        { icon: 'fa-linkedin-in', href: '#' },
        { icon: 'fa-youtube', href: '#' },
        { icon: 'fa-instagram', href: '#' },
      ]}
      credentials={[
        'Part of Destinata Group of Companies - Legal, Financial & Property Service Provider',
        'Authorised FSP: 48729 | Fiduciary Institute of South Africa | Accounting Association of South Africa | Property Practitioners Regulatory Authority',
      ]}
      copyright="© 2025 Wealth Masters Club. All rights reserved."
    />
  );
};

export default WMCFooter;