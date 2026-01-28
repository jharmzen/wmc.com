import React from 'react';
import { Link } from 'react-router-dom';
import { WMCHeader, WMCFooter } from '../../components';

const Events: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <WMCHeader />

      {/* Hero Section */}
      <section className="bg-[#0A1E3D] py-16 sm:py-24">
        <div className="px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#DAA520]/10 border border-[#DAA520] rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
              <i className="fas fa-calendar text-[#DAA520]" aria-hidden="true"></i>
              <span className="text-white text-sm font-medium">Upcoming Events</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-family-heading)] font-bold text-white mb-6 leading-tight">
              Wealth &amp; Property Investment{' '}
              <span className="text-[#DAA520]">Events</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join us at one of our professional in-person seminars across South Africa. Half-day sessions focused on structured property investment principles, trust awareness, and long-term planning.
            </p>
          </div>
        </div>
      </section>

      {/* Event Formats Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <img
            src="https://backoffice.treoc.com/data/archive/documents/images/697351ee632af.png"
            alt="Wealth Masters Club Events"
            className="w-full rounded-xl shadow-2xl object-cover max-h-[400px]"
          />
        </div>

        <div className="px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#0d203b] mb-4">
              Professional Financial &amp; Property Education for Long-Term Wealth Builders
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Half-Day Seminars */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#4782b5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-users text-[#4782b5] text-2xl" aria-hidden="true"></i>
                </div>
                <span className="inline-block bg-[#ad7d13]/10 text-[#ad7d13] text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  In Person
                </span>
                <h3 className="text-2xl font-bold text-[#0d203b]">Half-Day Seminars</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                City-based educational seminars held in Johannesburg, Cape Town, and Durban. Focused on structured property investment principles, trust awareness, and long-term planning.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3" aria-hidden="true"></i>
                  <span className="text-gray-700">In-person classroom learning</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3" aria-hidden="true"></i>
                  <span className="text-gray-700">Real-world examples</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3" aria-hidden="true"></i>
                  <span className="text-gray-700">Networking with like-minded attendees</span>
                </li>
              </ul>
              <Link
                to="/events"
                className="mt-auto block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors bg-[#4782b5] text-white hover:bg-[#3a6b8c]"
              >
                View Seminars
              </Link>
            </div>

            {/* Live Webinars */}
            <div className="bg-white rounded-lg shadow-lg p-6 relative border-2 border-[#ad7d13] transform scale-105 flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#ad7d13] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#4782b5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-video text-[#4782b5] text-2xl" aria-hidden="true"></i>
                </div>
                <span className="inline-block bg-[#ad7d13]/10 text-[#ad7d13] text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  Online
                </span>
                <h3 className="text-2xl font-bold text-[#0d203b]">Live Webinars</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Educational online sessions introducing key concepts and providing clarity around wealth structuring and property investment fundamentals.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3" aria-hidden="true"></i>
                  <span className="text-gray-700">Attend from anywhere</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3" aria-hidden="true"></i>
                  <span className="text-gray-700">Structured presentations</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3" aria-hidden="true"></i>
                  <span className="text-gray-700">Suitable for beginners and refreshers</span>
                </li>
              </ul>
              <Link
                to="/webinars"
                className="mt-auto block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors bg-[#ad7d13] text-white hover:bg-[#8d6610]"
              >
                Register for Webinar
              </Link>
            </div>

            {/* Zoom Sessions */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#4782b5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-comments text-[#4782b5] text-2xl" aria-hidden="true"></i>
                </div>
                <span className="inline-block bg-[#ad7d13]/10 text-[#ad7d13] text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  Interactive Online
                </span>
                <h3 className="text-2xl font-bold text-[#0d203b]">Zoom Sessions</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Smaller, interactive online sessions with live discussion and Q&amp;A, allowing deeper engagement.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3" aria-hidden="true"></i>
                  <span className="text-gray-700">Live Q&amp;A</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3" aria-hidden="true"></i>
                  <span className="text-gray-700">Interactive discussions</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3" aria-hidden="true"></i>
                  <span className="text-gray-700">Concept clarification</span>
                </li>
              </ul>
              <Link
                to="/events"
                className="mt-auto block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors bg-[#4782b5] text-white hover:bg-[#3a6b8c]"
              >
                See Upcoming Sessions
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Have questions about our events? We're here to help.
            </p>
            <Link
              to="/contact-us"
              className="bg-[#0d203b] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#1a2a3a] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 sm:py-24 bg-[#F9FAFB]">
        <div className="px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-[var(--font-family-heading)] text-3xl sm:text-4xl font-bold text-[#0A1E3D] mb-4">
                What to Expect
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Our seminars are designed to educate, not to sell
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-[#DAA520]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-book text-[#DAA520] text-xl" aria-hidden="true"></i>
                </div>
                <h3 className="font-[var(--font-family-heading)] text-lg font-bold text-[#1A1A1A] mb-2">Education-First</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Understand the fundamentals of wealth and property investment</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#DAA520]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-chart-line text-[#DAA520] text-xl" aria-hidden="true"></i>
                </div>
                <h3 className="font-[var(--font-family-heading)] text-lg font-bold text-[#1A1A1A] mb-2">Proven Frameworks</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Strategies refined since 1996 for long-term wealth building</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#DAA520]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-comments text-[#DAA520] text-xl" aria-hidden="true"></i>
                </div>
                <h3 className="font-[var(--font-family-heading)] text-lg font-bold text-[#1A1A1A] mb-2">Plain Language</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Complex concepts explained clearly and accessibly</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#DAA520]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-users text-[#DAA520] text-xl" aria-hidden="true"></i>
                </div>
                <h3 className="font-[var(--font-family-heading)] text-lg font-bold text-[#1A1A1A] mb-2">Networking</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Connect with like-minded attendees and industry experts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0A1E3D] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/51b266b8-5c8a-44a5-444f-6071931b5e00/publicContain"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1E3D] via-[#0A1E3D]/90 to-[#0A1E3D]"></div>
        <div className="px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-[var(--font-family-heading)] text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              Ready to Start Your{' '}
              <span className="text-[#DAA520]">Wealth Education Journey?</span>
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Secure your seat at one of our upcoming seminars and take the first step towards financial clarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-us" className="bg-[#DAA520] text-white px-6 sm:px-10 py-4 rounded-[10px] font-[var(--font-family-body)] font-semibold text-lg hover:bg-[#C29318] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center">
                Contact Us to Register
              </Link>
              <Link to="/webinars" className="bg-white text-[#0A1E3D] px-6 sm:px-10 py-4 rounded-[10px] font-[var(--font-family-body)] font-semibold text-lg border-2 border-gray-200 hover:bg-[#F5F5F5] transition-all duration-300 shadow-lg text-center">
                View Webinars Instead
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WMCFooter />
    </div>
  );
};

export default Events;
