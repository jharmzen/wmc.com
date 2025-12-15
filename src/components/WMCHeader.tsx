import React from 'react';
import Header from './Header';

const WMCHeader: React.FC = () => {
  return (
    <Header
      logo="/assets/img/logo-white.png"
      navItems={[
        { label: 'About Us', href: '/about-us' },
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'Membership', href: '/membership' },
        { label: 'Events', href: '/events' },
      ]}
      ctaButton={{ text: 'Claim Your Free Wealth Guide', href: '/membership' }}
    />
  );
};

export default WMCHeader;