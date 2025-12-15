import React from 'react';
import { WMCHeader, WMCFooter } from '../../components';
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Registration and Joining',
      description: 'Join our platform and become part of the property investment community. Get instant access to educational content and tools.',
      icon: 'fa-user-plus'
    },
    {
      number: 2,
      title: 'Learning and Development',
      description: 'Benefit from our training courses, online seminars, and live events to develop your property investment skills.',
      icon: 'fa-graduation-cap'
    },
    {
      number: 3,
      title: 'Research and Analysis',
      description: 'Use our advanced tools to research investment opportunities and analyze the market to make informed decisions.',
      icon: 'fa-search'
    },
    {
      number: 4,
      title: 'Investment and Growth',
      description: 'Start building your investment portfolio with our guidance and ongoing support for long-term wealth building.',
      icon: 'fa-chart-line'
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
            <h1 className="text-4xl font-bold text-[#0d203b] mb-4">How It Works</h1>
            <p className="text-xl text-gray-600">
              A simple and organized journey to build your wealth through property investment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="bg-[#4782b5] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  <i className={`fas ${step.icon}`}></i>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 h-full">
                  <div className="text-3xl font-bold text-[#ad7d13] mb-2">{step.number}</div>
                  <h3 className="text-xl font-semibold text-[#0d203b] mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-[#0d203b] mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6">
              Join thousands of members who are building their wealth through our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/membership"
                className="bg-[#ad7d13] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#8d6610] transition-colors"
              >
                View Membership Plans
              </Link>
              <Link
                to="/contact-us"
                className="bg-[#4782b5] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#3a6b8c] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <WMCFooter />
    </div>
  );
};

export default HowItWorks;