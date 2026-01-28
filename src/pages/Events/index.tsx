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
          <div className="max-w-5xl mx-auto">
            <img
              src="https://backoffice.treoc.com/data/archive/documents/images/697351ee632af.png"
              alt="Wealth Masters Club Events"
              className="w-full rounded-xl shadow-2xl object-cover max-h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* Event Cards Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="px-4">
          <div className="text-center mb-12">
            <h2 className="font-[var(--font-family-heading)] text-3xl sm:text-4xl font-bold text-[#0A1E3D] mb-4">
              Upcoming Half-Day Seminars
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Professional in-person seminars designed for long-term wealth builders
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {/* Johannesburg */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-[#DAA520] p-6 text-center">
                <div className="inline-block bg-[#C29318] rounded-lg px-4 py-2 mb-3">
                  <p className="text-white font-semibold text-sm">21 FEBRUARY 2026</p>
                </div>
                <h3 className="text-2xl font-[var(--font-family-heading)] font-bold text-white">GAUTENG</h3>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-[var(--font-family-heading)] font-bold text-[#1A1A1A] mb-4">Wealth &amp; Property Investment Masterclass</h4>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-map-marker-alt text-[#DAA520] mt-1 text-sm" aria-hidden="true"></i>
                    <span className="text-gray-500 text-sm">Johannesburg</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-clock text-[#DAA520] mt-1 text-sm" aria-hidden="true"></i>
                    <span className="text-gray-500 text-sm">Half-day session</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-graduation-cap text-[#DAA520] mt-1 text-sm" aria-hidden="true"></i>
                    <span className="text-gray-500 text-sm">Educational focus</span>
                  </div>
                </div>
                <Link to="https://www.quicket.co.za/events/355514-wealth-property-investment-masterclass-2102/#/" className="block text-center bg-[#DAA520] text-white px-6 py-3 rounded-[10px] hover:bg-[#C29318] transition-all duration-300 font-[var(--font-family-body)] font-semibold shadow-md hover:shadow-lg" target='_blank'>
                  Book Your Seat
                </Link>
              </div>
            </div>

            {/* Durban */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-[#DAA520] p-6 text-center">
                <div className="inline-block bg-[#C29318] rounded-lg px-4 py-2 mb-3">
                  <p className="text-white font-semibold text-sm">14 MARCH 2026</p>
                </div>
                <h3 className="text-2xl font-[var(--font-family-heading)] font-bold text-white">DURBAN</h3>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-[var(--font-family-heading)] font-bold text-[#1A1A1A] mb-4">Wealth &amp; Property Investment Masterclass</h4>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-map-marker-alt text-[#DAA520] mt-1 text-sm" aria-hidden="true"></i>
                    <span className="text-gray-500 text-sm">Durban</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-clock text-[#DAA520] mt-1 text-sm" aria-hidden="true"></i>
                    <span className="text-gray-500 text-sm">Half-day session</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-graduation-cap text-[#DAA520] mt-1 text-sm" aria-hidden="true"></i>
                    <span className="text-gray-500 text-sm">Educational focus</span>
                  </div>
                </div>
                <Link to="/contact-us" className="block text-center bg-[#DAA520] text-white px-6 py-3 rounded-[10px] hover:bg-[#C29318] transition-all duration-300 font-[var(--font-family-body)] font-semibold shadow-md hover:shadow-lg">
                  Book Your Seat
                </Link>
              </div>
            </div>

            {/* Cape Town */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-[#DAA520] p-6 text-center">
                <div className="inline-block bg-[#C29318] rounded-lg px-4 py-2 mb-3">
                  <p className="text-white font-semibold text-sm">11 APRIL 2026</p>
                </div>
                <h3 className="text-2xl font-[var(--font-family-heading)] font-bold text-white">CAPE TOWN</h3>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-[var(--font-family-heading)] font-bold text-[#1A1A1A] mb-4">Wealth &amp; Property Investment Masterclass</h4>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-map-marker-alt text-[#DAA520] mt-1 text-sm" aria-hidden="true"></i>
                    <span className="text-gray-500 text-sm">Cape Town</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-clock text-[#DAA520] mt-1 text-sm" aria-hidden="true"></i>
                    <span className="text-gray-500 text-sm">Half-day session</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-graduation-cap text-[#DAA520] mt-1 text-sm" aria-hidden="true"></i>
                    <span className="text-gray-500 text-sm">Educational focus</span>
                  </div>
                </div>
                <Link to="/contact-us" className="block text-center bg-[#DAA520] text-white px-6 py-3 rounded-[10px] hover:bg-[#C29318] transition-all duration-300 font-[var(--font-family-body)] font-semibold shadow-md hover:shadow-lg">
                  Book Your Seat
                </Link>
              </div>
            </div>
          </div>

          {/* Bonus Section */}
          <div className="max-w-6xl mx-auto bg-white rounded-xl p-6 sm:p-8 text-center shadow-xl border border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="w-16 h-16 bg-[#DAA520]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-gift text-[#DAA520] text-2xl" aria-hidden="true"></i>
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-xl sm:text-2xl font-[var(--font-family-heading)] font-bold text-[#1A1A1A] mb-2">Limited Time Bonus</h4>
                <p className="text-gray-500 text-base sm:text-lg">
                  Register now and receive a{' '}
                  <strong className="text-[#DAA520]">FREE digital copy of &quot;Rich Mind, Rich Man&quot;</strong>{' '}
                  with your seminar registration
                </p>
              </div>
            </div>
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
