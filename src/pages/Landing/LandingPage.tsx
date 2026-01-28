// src/components/LandingPage.tsx

import { Link } from 'react-router-dom';
import {
  WMCHeader,
  WMCFooter,
  SectionHeader,
} from '../../components';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <WMCHeader />

      {/* Hero Section */}
      <section className="code-section relative bg-[#0A1E3D] overflow-hidden" id="se7t6h">
        {/* Background decorative elements */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10, 30, 61, 0.95), rgba(10, 30, 61, 0.85), rgba(10, 30, 61, 0.95))' }}></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#DAA520] rounded-full filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#DAA520] rounded-full filter blur-3xl opacity-5"></div>

        <div className="px-4 py-20 sm:py-28 lg:py-36 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#DAA520]/10 border border-[#DAA520] rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
              <i className="fas fa-shield-check text-[#DAA520]" aria-hidden="true"></i>
              <span className="text-white font-[var(--font-family-body)] text-sm font-medium">Trusted Since 1996</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[var(--font-family-heading)] font-bold text-white mb-6 leading-tight">
              Master Wealth &amp; Property Investment Through{' '}
              <span className="text-[#DAA520]">Structured Education</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Professional seminars, webinars, and interactive sessions designed to help individuals, families, and business owners understand structured wealth and property investment over the long term.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/events" className="bg-[#DAA520] text-white px-6 sm:px-10 py-4 rounded-[10px] hover:bg-[#C29318] transition-all duration-300 font-[var(--font-family-body)] font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center">
                View Upcoming Events
              </Link>
              <Link to="/webinars" className="bg-white text-[#0A1E3D] px-6 sm:px-10 py-4 rounded-[10px] font-[var(--font-family-body)] font-semibold text-lg border-2 border-gray-200 hover:bg-[#F5F5F5] transition-all duration-300 shadow-lg text-center">
                Watch Free Webinar
              </Link>
            </div>

            {/* Trust Statement */}
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <i className="fas fa-check-circle text-[#DAA520]" aria-hidden="true"></i>
              <span>No pressure sales • Educational focus only • 30 years of expertise</span>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"></path>
          </svg>
        </div>
      </section>

      {/* Event Formats Section */}
      <section className="code-section bg-white py-16 sm:py-20" id="sfu4m4j">
        <div className="px-4">
          <SectionHeader
            title="Professional Financial & Property Education for Long-Term Wealth Builders"
          />

          {/* 3 Event Format Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Half-Day Seminars */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col">
              <div className="w-16 h-16 bg-[#DAA520]/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-users text-[#DAA520] text-2xl" aria-hidden="true"></i>
              </div>
              <div className="inline-block bg-[#DAA520]/10 text-[#DAA520] text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start">
                In Person
              </div>
              <h3 className="font-[var(--font-family-heading)] text-xl font-bold text-[#0A1E3D] mb-3">Half-Day Seminars</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">
                City-based educational seminars held in Johannesburg, Cape Town, and Durban. Focused on structured property investment principles, trust awareness, and long-term planning.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <i className="fas fa-check text-[#DAA520]" aria-hidden="true"></i>
                  In-person classroom learning
                </li>
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <i className="fas fa-check text-[#DAA520]" aria-hidden="true"></i>
                  Real-world examples
                </li>
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <i className="fas fa-check text-[#DAA520]" aria-hidden="true"></i>
                  Networking with like-minded attendees
                </li>
              </ul>
              <Link to="/events" className="mt-auto inline-flex items-center text-[#DAA520] font-semibold hover:gap-3 transition-all duration-300">
                View Seminars <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
              </Link>
            </div>

            {/* Live Webinars */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col">
              <div className="w-16 h-16 bg-[#DAA520]/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-video text-[#DAA520] text-2xl" aria-hidden="true"></i>
              </div>
              <div className="inline-block bg-[#DAA520]/10 text-[#DAA520] text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start">
                Online
              </div>
              <h3 className="font-[var(--font-family-heading)] text-xl font-bold text-[#0A1E3D] mb-3">Live Webinars</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Educational online sessions introducing key concepts and providing clarity around wealth structuring and property investment fundamentals.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <i className="fas fa-check text-[#DAA520]" aria-hidden="true"></i>
                  Attend from anywhere
                </li>
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <i className="fas fa-check text-[#DAA520]" aria-hidden="true"></i>
                  Structured presentations
                </li>
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <i className="fas fa-check text-[#DAA520]" aria-hidden="true"></i>
                  Suitable for beginners and refreshers
                </li>
              </ul>
              <Link to="/webinars" className="mt-auto inline-flex items-center text-[#DAA520] font-semibold hover:gap-3 transition-all duration-300">
                Register for Webinar <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
              </Link>
            </div>

            {/* Zoom Sessions */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col">
              <div className="w-16 h-16 bg-[#DAA520]/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-comments text-[#DAA520] text-2xl" aria-hidden="true"></i>
              </div>
              <div className="inline-block bg-[#DAA520]/10 text-[#DAA520] text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start">
                Interactive Online
              </div>
              <h3 className="font-[var(--font-family-heading)] text-xl font-bold text-[#0A1E3D] mb-3">Zoom Sessions</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Smaller, interactive online sessions with live discussion and Q&amp;A, allowing deeper engagement.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <i className="fas fa-check text-[#DAA520]" aria-hidden="true"></i>
                  Live Q&amp;A
                </li>
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <i className="fas fa-check text-[#DAA520]" aria-hidden="true"></i>
                  Interactive discussions
                </li>
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <i className="fas fa-check text-[#DAA520]" aria-hidden="true"></i>
                  Concept clarification
                </li>
              </ul>
              <Link to="/events" className="mt-auto inline-flex items-center text-[#DAA520] font-semibold hover:gap-3 transition-all duration-300">
                See Upcoming Sessions <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Seminars Section */}
      <section className="code-section bg-[#0A1E3D] py-16 sm:py-24 relative overflow-hidden" id="sflm2pf">
        {/* Diagonal pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(218,165,32,0.1) 35px, rgba(218,165,32,0.1) 70px)' }}></div>

        <div className="px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-[var(--font-family-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Upcoming Half-Day Seminars
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Join us at one of our professional in-person seminars across South Africa
            </p>
          </div>

          {/* 3 Event Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {/* Johannesburg */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
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
                <Link to="/events" className="block text-center bg-[#DAA520] text-white px-6 py-3 rounded-[10px] hover:bg-[#C29318] transition-all duration-300 font-[var(--font-family-body)] font-semibold shadow-md hover:shadow-lg">
                  Book Your Seat
                </Link>
              </div>
            </div>

            {/* Durban */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
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
                <Link to="/events" className="block text-center bg-[#DAA520] text-white px-6 py-3 rounded-[10px] hover:bg-[#C29318] transition-all duration-300 font-[var(--font-family-body)] font-semibold shadow-md hover:shadow-lg">
                  Book Your Seat
                </Link>
              </div>
            </div>

            {/* Cape Town */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
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
                <Link to="/events" className="block text-center bg-[#DAA520] text-white px-6 py-3 rounded-[10px] hover:bg-[#C29318] transition-all duration-300 font-[var(--font-family-body)] font-semibold shadow-md hover:shadow-lg">
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

      {/* Why Attend Section */}
      <section className="code-section bg-white py-16 sm:py-24" id="sunmdli">
        <div className="px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/c62b1219-0348-4696-e710-a390ca109400/publicContain"
                alt="Businessman analyzes growth charts on laptop for financial insights"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Content */}
            <div>
              <h2 className="font-[var(--font-family-heading)] text-3xl sm:text-4xl font-bold text-[#0A1E3D] mb-8">
                Why Attend a Wealth Masters Club Event?
              </h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#DAA520]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-book text-[#DAA520] text-xl" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="font-[var(--font-family-heading)] text-lg font-bold text-[#0A1E3D] mb-1">Education-First Approach</h3>
                    <p className="text-gray-500 leading-relaxed">We focus on helping you understand the fundamentals of wealth and property investment, not quick fixes or unrealistic promises.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#DAA520]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-chart-line text-[#DAA520] text-xl" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="font-[var(--font-family-heading)] text-lg font-bold text-[#0A1E3D] mb-1">Structured Frameworks Developed Over Decades</h3>
                    <p className="text-gray-500 leading-relaxed">Benefit from proven strategies and principles refined since 1996, designed for long-term wealth building.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#DAA520]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-comments text-[#DAA520] text-xl" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="font-[var(--font-family-heading)] text-lg font-bold text-[#0A1E3D] mb-1">Plain-Language Explanations</h3>
                    <p className="text-gray-500 leading-relaxed">Complex concepts explained clearly, making wealth education accessible to serious participants at any level.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#DAA520]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-shield-check text-[#DAA520] text-xl" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="font-[var(--font-family-heading)] text-lg font-bold text-[#0A1E3D] mb-1">No Hype, No Guarantees</h3>
                    <p className="text-gray-500 leading-relaxed">Honest, professional education designed for individuals committed to understanding investment principles over time.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Link to="/about-us" className="inline-flex items-center bg-[#DAA520] text-white px-6 sm:px-8 py-4 rounded-[10px] font-[var(--font-family-body)] font-semibold hover:bg-[#C29318] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Learn About Our Approach
                  <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Path to Financial Clarity Section */}
      <section className="code-section bg-[#F9FAFB] py-16 sm:py-24 relative overflow-hidden" id="s0lmjfe">
        {/* Decorative blur circles */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#DAA520] rounded-full filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#0A1E3D] rounded-full filter blur-3xl opacity-5"></div>

        <div className="px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-[var(--font-family-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1E3D] mb-4">
              Your Path to Financial Clarity
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              A simple, structured approach to beginning your wealth education journey
            </p>
          </div>

          {/* 4 Steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 max-w-6xl mx-auto mb-16">
            {/* Step 1 */}
            <div className="relative">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#DAA520] to-[#C29318] rounded-full flex items-center justify-center shadow-lg">
                    <i className="fas fa-search text-white text-3xl" aria-hidden="true"></i>
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#0A1E3D] text-white rounded-full flex items-center justify-center font-[var(--font-family-heading)] font-bold text-lg">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-[var(--font-family-heading)] font-bold text-[#1A1A1A] mb-3">Choose Your Event</h3>
                <p className="text-gray-500 leading-relaxed text-sm">Select from seminars, webinars, or interactive Zoom sessions based on your preferences</p>
              </div>
              <div className="hidden lg:block absolute top-12 left-full w-full">
                <i className="fas fa-arrow-right text-[#DAA520] text-2xl opacity-30" aria-hidden="true"></i>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#DAA520] to-[#C29318] rounded-full flex items-center justify-center shadow-lg">
                    <i className="fas fa-calendar-check text-white text-3xl" aria-hidden="true"></i>
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#0A1E3D] text-white rounded-full flex items-center justify-center font-[var(--font-family-heading)] font-bold text-lg">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-[var(--font-family-heading)] font-bold text-[#1A1A1A] mb-3">Secure Your Seat</h3>
                <p className="text-gray-500 leading-relaxed text-sm">Register for your chosen event and receive confirmation details and preparation materials</p>
              </div>
              <div className="hidden lg:block absolute top-12 left-full w-full">
                <i className="fas fa-arrow-right text-[#DAA520] text-2xl opacity-30" aria-hidden="true"></i>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#DAA520] to-[#C29318] rounded-full flex items-center justify-center shadow-lg">
                    <i className="fas fa-graduation-cap text-white text-3xl" aria-hidden="true"></i>
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#0A1E3D] text-white rounded-full flex items-center justify-center font-[var(--font-family-heading)] font-bold text-lg">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-[var(--font-family-heading)] font-bold text-[#1A1A1A] mb-3">Learn &amp; Engage</h3>
                <p className="text-gray-500 leading-relaxed text-sm">Attend your event, ask questions, and gain clarity on wealth and property concepts</p>
              </div>
              <div className="hidden lg:block absolute top-12 left-full w-full">
                <i className="fas fa-arrow-right text-[#DAA520] text-2xl opacity-30" aria-hidden="true"></i>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#DAA520] to-[#C29318] rounded-full flex items-center justify-center shadow-lg">
                    <i className="fas fa-rocket text-white text-3xl" aria-hidden="true"></i>
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#0A1E3D] text-white rounded-full flex items-center justify-center font-[var(--font-family-heading)] font-bold text-lg">
                    4
                  </div>
                </div>
                <h3 className="text-xl font-[var(--font-family-heading)] font-bold text-[#1A1A1A] mb-3">Apply Knowledge with Confidence</h3>
                <p className="text-gray-500 leading-relaxed text-sm">Take what you've learned and make informed decisions about your wealth journey</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/events" className="inline-flex items-center bg-[#DAA520] text-white px-10 py-4 rounded-[10px] font-[var(--font-family-body)] font-semibold text-lg hover:bg-[#C29318] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Your Journey Today
              <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="code-section bg-[#0A1E3D] py-16 sm:py-24 relative overflow-hidden" id="s9w170f">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/51b266b8-5c8a-44a5-444f-6071931b5e00/publicContain"
            alt="Glass jar filled with coins and a small seedling"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1E3D] via-[#0A1E3D]/90 to-[#0A1E3D]"></div>

        <div className="px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-[var(--font-family-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Start Your{' '}
              <span className="text-[#DAA520]">Wealth Education Journey?</span>
            </h2>

            <p className="text-gray-300 text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Join individuals, families, and business owners committed to understanding wealth and property investment through structured education.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/events" className="bg-[#DAA520] text-white px-10 py-4 rounded-[10px] font-[var(--font-family-body)] font-semibold text-lg hover:bg-[#C29318] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Explore All Events
              </Link>
              <Link to="/webinars" className="bg-white text-[#0A1E3D] px-6 sm:px-10 py-4 rounded-[10px] font-[var(--font-family-body)] font-semibold text-lg border-2 border-gray-200 hover:bg-[#F5F5F5] transition-all duration-300 shadow-lg text-center">
                Register for Webinar
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <i className="fas fa-calendar text-[#DAA520] text-lg mr-2" aria-hidden="true"></i>
                  <span className="text-white text-2xl font-bold">30+</span>
                </div>
                <p className="text-gray-400 text-sm">Years of Experience</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <i className="fas fa-users text-[#DAA520] text-lg mr-2" aria-hidden="true"></i>
                  <span className="text-white text-2xl font-bold">1000s</span>
                </div>
                <p className="text-gray-400 text-sm">Educated Participants</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <i className="fas fa-map-marker-alt text-[#DAA520] text-lg mr-2" aria-hidden="true"></i>
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <p className="text-gray-400 text-sm">Major Cities Covered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WMCFooter />
    </div>
  );
}
