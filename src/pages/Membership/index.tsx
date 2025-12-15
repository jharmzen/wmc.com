import React from 'react';
import { WMCHeader, WMCFooter } from '../../components';
import { Link } from 'react-router-dom';

const Membership: React.FC = () => {
  const membershipPlans = [
    {
      name: 'Basic Membership',
      price: 'Free',
      features: [
        'Access to basic content',
        'Weekly newsletters',
        'Participation in public events',
        'Email support'
      ],
      cta: 'Sign Up',
      href: '/contact-us'
    },
    {
      name: 'Gold Membership',
      price: 'R 500/month',
      features: [
        'All Basic Membership features',
        'Access to advanced content',
        'Monthly consultation sessions',
        'Event discounts',
        'Phone support'
      ],
      cta: 'Subscribe Now',
      href: '/contact-us',
      popular: true
    },
    {
      name: 'Platinum Membership',
      price: 'R 1000/month',
      features: [
        'All Gold Membership features',
        'Weekly consultation sessions',
        'Access to exclusive events',
        'Custom monthly reports',
        '24/7 VIP support'
      ],
      cta: 'Contact Us',
      href: '/contact-us'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white text-right">
      {/* Header */}
      <WMCHeader />

      {/* Main Content */}
      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#0d203b] mb-4">Membership Options</h1>
            <p className="text-xl text-gray-600">Choose the plan that suits your needs to build your wealth and achieve your financial goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg p-6 relative ${
                  plan.popular ? 'border-2 border-[#ad7d13] transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#ad7d13] text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#0d203b] mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-[#4782b5]">{plan.price}</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <i className="fas fa-check text-green-500 ml-3"></i>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.href}
                  className={`block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-[#ad7d13] text-white hover:bg-[#8d6610]'
                      : 'bg-[#4782b5] text-white hover:bg-[#3a6b8c]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Have questions about membership? We're here to help.
            </p>
            <Link
              to="/contact-us"
              className="bg-[#0d203b] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#1a2a3a] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <WMCFooter />
    </div>
  );
};

export default Membership;