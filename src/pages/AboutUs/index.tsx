import React from 'react';
import { WMCHeader, WMCFooter } from '../../components';
import { TrendingUp, Users, Award, Globe } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
      <WMCHeader />

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0d203b] mb-6 font-[var(--font-family-heading)]">
              About Wealth Masters Club
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Empowering individuals worldwide to achieve financial independence through proven wealth-building strategies since 1996.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-[#0d203b] mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              To provide world-class education and resources that enable our members to create generational wealth through property investment, specialized trust structures, and tax-efficient strategies.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-[#0d203b] mb-2">750,000+</h3>
              <p className="text-gray-600">Members Worldwide</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-[#0d203b] mb-2">29+</h3>
              <p className="text-gray-600">Years of Excellence</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-yellow-100 rounded-full">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-[#0d203b] mb-2">Expert</h3>
              <p className="text-gray-600">Wealth Coaching</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-100 rounded-full">
                  <Globe className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-[#0d203b] mb-2">Global</h3>
              <p className="text-gray-600">Community</p>
            </div>
          </div>

          {/* Our Story */}
          <div className="bg-gradient-to-r from-[#0d203b] to-[#1a3a5c] rounded-xl shadow-lg p-8 md:p-12 mb-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                Founded in 1996, Wealth Masters Club has been at the forefront of financial education, helping individuals and families build lasting wealth through proven investment strategies.
              </p>
              <p>
                Led by renowned expert Coert Coetzee, our comprehensive Wealth Mastery System has empowered hundreds of thousands of members to achieve financial independence through property investment, specialized trust structures, and tax-efficient wealth-building techniques.
              </p>
              <p>
                Our members benefit from cutting-edge education, dedicated wealth coaching, and a vibrant community of like-minded investors committed to creating generational wealth.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#0d203b] mb-8 text-center">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Wealth Mastery Education',
                  description: 'Comprehensive online courses covering property investment, trust structures, and tax strategies.'
                },
                {
                  title: 'Expert Coaching',
                  description: 'Access to experienced wealth coaches who guide you through your financial journey.'
                },
                {
                  title: 'Exclusive Events',
                  description: 'Attend seminars and workshops led by industry experts and successful investors.'
                },
                {
                  title: 'Investment Community',
                  description: 'Connect with a global network of investors sharing insights and opportunities.'
                },
                {
                  title: 'Referral Rewards',
                  description: 'Earn commissions by introducing others to the path of financial freedom.'
                },
                {
                  title: 'Club Units Program',
                  description: 'Build wealth through our unique club units system with compounding benefits.'
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                  <h3 className="text-xl font-bold text-[#0d203b] mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-[#ad7d13] rounded-xl shadow-lg p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Wealth Journey?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of members who are building their financial future today.
            </p>
            <a
              href="/membership"
              className="inline-block bg-white text-[#ad7d13] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Explore Membership Options
            </a>
          </div>
        </div>
      </div>

      <WMCFooter />
    </div>
  );
};

export default AboutUs;