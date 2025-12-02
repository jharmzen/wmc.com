import { Footer, SectionHeader } from '../components';


interface UnderConstructionProps {
  icon: string;
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({
  icon,
  title,
  subtitle = "This page is currently under construction.",
  description = "We're working hard to bring you the best content. Check back soon for updates!",
  className = '',
}) => {
  return (
    <div className="min-h-screen bg-white">

      <div className={`w-full text-center pt-20 ${className}`}>
        <div className="w-24 h-24 bg-gradient-to-br from-[#4782b5] to-[#0d203b] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <i className={`fas ${icon} text-white text-3xl`} aria-hidden="true"></i>
        </div>
        <SectionHeader
          title={title}
          subtitle={subtitle}
          description={description}
          centered={true}
          fullWidth={true}
        />
      </div>

      <Footer
        logo="/assets/img/logo-white.png"
        quickLinks={[
          { label: 'Home', href: './' },
          { label: 'About Us', href: './about-us' },
          { label: 'How It Works', href: './how-it-works' },
          { label: 'Membership', href: './membership' },
          { label: 'Events', href: './events' },
          { label: 'Testimonials', href: './testimonials' },
        ]}
        resources={[
          { label: 'Shop', href: './shop' },
          { label: 'Blog/Insights', href: './blog' },
          { label: 'Contact Us', href: './contact-us' },
          { label: 'Member Login', href: './login' },
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
    </div>
  );
};

export default UnderConstruction;