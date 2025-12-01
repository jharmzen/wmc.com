// src/components/LandingPage.tsx

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header id="global-header" className="code-section bg-[#0d203b] shadow-md sticky top-0 z-50">
        <div className="px-4">
          <div className="flex items-center justify-between h-28">
            {/* Logo */}
            <a href={`${import.meta.env.VITE_SITE_URL}`} className="flex-shrink-0">
              <img src="/assets/img/logo-white.png" alt="Wealth Masters Club" className="h-28 py-2" data-logo="" data-media="{&quot;id&quot;:&quot;logo-white.png&quot;,&quot;src&quot;:&quot;local&quot;,&quot;type&quot;:&quot;image&quot;}" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href={`${import.meta.env.VITE_SITE_URL}about-us`} className="text-white hover:text-[#ad7d13] font-medium transition-colors duration-200">About Us</a>
              <a href={`${import.meta.env.VITE_SITE_URL}how-it-works`} className="text-white hover:text-[#ad7d13] font-medium transition-colors duration-200">How It Works</a>
              <a href={`${import.meta.env.VITE_SITE_URL}membership`} className="text-white hover:text-[#ad7d13] font-medium transition-colors duration-200">Membership</a>
              <a href={`${import.meta.env.VITE_SITE_URL}events`} className="text-white hover:text-[#ad7d13] font-medium transition-colors duration-200">Events</a>
              <a href={`${import.meta.env.VITE_SITE_URL}membership`} className="bg-[#ad7d13] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8d6610] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Claim Your Free Wealth Guide
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button data-landingsite-mobile-menu-toggle="" className="lg:hidden text-white p-2">
              <i className="fas fa-bars text-2xl" aria-hidden="true"></i>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav data-landingsite-mobile-menu="" className="hidden lg:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <a href={`${import.meta.env.VITE_SITE_URL}about-us`} className="text-white hover:text-[#ad7d13] font-medium transition-colors duration-200 py-2 border-b border-[#4782b5]">About Us</a>
              <a href={`${import.meta.env.VITE_SITE_URL}how-it-works`} className="text-white hover:text-[#ad7d13] font-medium transition-colors duration-200 py-2 border-b border-[#4782b5]">How It Works</a>
              <a href={`${import.meta.env.VITE_SITE_URL}membership`} className="text-white hover:text-[#ad7d13] font-medium transition-colors duration-200 py-2 border-b border-[#4782b5]">Membership</a>
              <a href={`${import.meta.env.VITE_SITE_URL}events`} className="text-white hover:text-[#ad7d13] font-medium transition-colors duration-200 py-2 border-b border-[#4782b5]">Events</a>
              <a href={`${import.meta.env.VITE_SITE_URL}membership`} className="bg-[#ad7d13] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8d6610] transition-all duration-200 text-center">
                Claim Your Free Wealth Guide
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="code-section relative bg-gradient-to-br from-[#0d203b] to-[#4782b5] text-white overflow-hidden" id="s02h9l4">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-20">
          <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/7acfd9b8-0d14-482b-acc7-3c982769de00/public" alt="Real estate agents recommend interest rates, discuss the terms of the home purchase agreement, and ask clients to sign paperwork to legalize the contract." className="w-full h-full object-cover" data-media="{&quot;id&quot;:&quot;1484779739&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}" />
        </div>

        <div className="px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="font-[var(--font-family-heading)] text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Build Generational Wealth Through<br />
                <span className="text-[#ad7d13]">Tax-Free Property</span> in Trust
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed">
                Join 1,500+ South Africans who have built R3.8 billion in property portfolios using our proven trust-based strategy — completely tax-free and protected from risk.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <a href={`${import.meta.env.VITE_SITE_URL}events`} className="btn-primary">
                  View Upcoming Events
                </a>
                <a href={`${import.meta.env.VITE_SITE_URL}contact-us`} className="btn-gold">
                  Speak to an Expert
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <i className="fas fa-shield-check text-[#ad7d13] text-lg" aria-hidden="true"></i>
                  <span>FSP Authorised #48729</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-users text-[#ad7d13] text-lg" aria-hidden="true"></i>
                  <span>1,500+ Active Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-chart-line text-[#ad7d13] text-lg" aria-hidden="true"></i>
                  <span>R3.8B Portfolio Value</span>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/7acfd9b8-0d14-482b-acc7-3c982769de00/public" alt="Real estate agents recommend interest rates, discuss the terms of the home purchase agreement, and ask clients to sign paperwork to legalize the contract." className="w-full h-full object-cover" data-media="{&quot;id&quot;:&quot;1484779739&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}" />
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white text-[#0d203b] p-6 rounded-xl shadow-xl z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#4782b5] bg-opacity-20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-[#4782b5] text-xl" aria-hidden="true"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#4782b5]">1,500+</p>
                    <p className="text-sm text-[#6C757D]">Active Members</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white text-[#0d203b] p-6 rounded-xl shadow-xl z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#ad7d13] bg-opacity-20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-chart-line text-[#ad7d13] text-xl" aria-hidden="true"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#4782b5]">R5M+</p>
                    <p className="text-sm text-[#6C757D]">Avg. Portfolio</p>
                  </div>
                </div>
              </div>
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

      {/* Stats Section */}
      <section className="code-section py-12 bg-white border-b-2 border-[#f5f9fc]" id="se98sp5">
        <div className="px-4">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 items-center text-center">
            {/* Stat 1 */}
            <div className="space-y-2">
              <p className="text-3xl lg:text-4xl font-bold text-[#4782b5]">1,500+</p>
              <p className="text-sm text-[#6C757D]">Active Members</p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-2">
              <p className="text-3xl lg:text-4xl font-bold text-[#4782b5]">R5M+</p>
              <p className="text-sm text-[#6C757D]">Avg. Property Portfolio Value</p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-2">
              <p className="text-xl lg:text-2xl font-bold text-[#0d203b]">FSP #48729</p>
              <p className="text-sm text-[#6C757D]">Authorised FSP</p>
            </div>

            {/* Stat 4 */}
            <div className="space-y-2">
              <i className="fas fa-university text-3xl text-[#4782b5] mb-2" aria-hidden="true"></i>
              <p className="text-sm text-[#6C757D]">
                Backed by Major<br />South African Banks
              </p>
            </div>

            {/* Stat 5 */}
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-1">
                <p className="text-3xl lg:text-4xl font-bold text-[#ad7d13]">4.7</p>
                <i className="fas fa-star text-[#ad7d13] text-xl" aria-hidden="true"></i>
              </div>
              <p className="text-sm text-[#6C757D]">Member Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="code-section py-20 lg:py-28 bg-gradient-to-b from-white to-[#f5f9fc]" id="spfaotg">
        <div className="px-4">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="font-[var(--font-family-heading)] text-4xl lg:text-5xl font-bold text-[#0d203b] mb-4">
              What We <span className="text-[#4782b5]">Offer</span>
            </h2>
            <p className="text-2xl text-[#4782b5] font-semibold mb-6">
              Your Trusted Partner in Property-Based Wealth Creation
            </p>
            <p className="text-xl text-[#6C757D] leading-relaxed mb-8">
              Wealth Masters Club specialises exclusively in property investment,
              supported by specialised trust structures, legal compliance, and proven
              frameworks designed to protect wealth, reduce tax, and grow long-term,
              generational property portfolios.
            </p>

            {/* Three Pillars */}
            <div className="bg-gradient-to-br from-[#0d203b] to-[#4782b5] rounded-2xl p-8 text-white">
              <p className="text-lg font-semibold mb-6">
                Everything we do is built on three pillars:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center space-x-3">
                  <i className="fas fa-check-circle text-[#ad7d13] text-2xl" aria-hidden="true"></i>
                  <p className="text-xl font-bold">Property</p>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <i className="fas fa-check-circle text-[#ad7d13] text-2xl" aria-hidden="true"></i>
                  <p className="text-xl font-bold">Trust Structures</p>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <i className="fas fa-check-circle text-[#ad7d13] text-2xl" aria-hidden="true"></i>
                  <p className="text-xl font-bold">Legal Wealth Protection</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a href={`${import.meta.env.VITE_SITE_URL}membership`} className="inline-flex items-center justify-center bg-[#4782b5] text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-[#3a6a95] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <span>Explore Our Membership Option</span>
              <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Property System Section */}
      <section className="code-section py-20 lg:py-28 bg-white" id="s045wps">
        <div className="px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-[var(--font-family-heading)] text-4xl lg:text-5xl font-bold text-[#0d203b] mb-6">
              The WMC <span className="text-[#4782b5]">Property Wealth System</span>
            </h2>
            <p className="text-xl text-[#6C757D] leading-relaxed">
              A structured, step-by-step method for building tax-efficient property
              wealth in South Africa.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {/* Step 1 */}
            <div className="relative group">
              <div className="bg-[#f5f9fc] rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#4782b5] to-[#0d203b] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 mt-4 shadow-md">
                  <i className="fas fa-graduation-cap text-[#4782b5] text-3xl" aria-hidden="true"></i>
                </div>

                {/* Content */}
                <h3 className="font-[var(--font-family-heading)] text-xl font-bold text-[#0d203b] mb-3">
                  Learn the Trust System for Property
                </h3>
                <p className="text-[#6C757D] leading-relaxed">
                  Understand how to structure, protect, and own property safely
                  through compliant trust frameworks.
                </p>
              </div>

              {/* Connector Arrow (hidden on mobile) */}
              <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                <i className="fas fa-arrow-right text-2xl text-[#4782b5]" aria-hidden="true"></i>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="bg-[#f5f9fc] rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#4782b5] to-[#0d203b] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 mt-4 shadow-md">
                  <i className="fas fa-home text-[#4782b5] text-3xl" aria-hidden="true"></i>
                </div>

                {/* Content */}
                <h3 className="font-[var(--font-family-heading)] text-xl font-bold text-[#0d203b] mb-3">
                  Acquire Investment Property Strategically
                </h3>
                <p className="text-[#6C757D] leading-relaxed">
                  Use smart, bank-approved financing strategies to secure
                  investment-grade properties with reduced risk.
                </p>
              </div>

              {/* Connector Arrow (hidden on mobile) */}
              <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                <i className="fas fa-arrow-right text-2xl text-[#4782b5]" aria-hidden="true"></i>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="bg-[#f5f9fc] rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#4782b5] to-[#0d203b] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 mt-4 shadow-md">
                  <i className="fas fa-chart-line text-[#4782b5] text-3xl" aria-hidden="true"></i>
                </div>

                {/* Content */}
                <h3 className="font-[var(--font-family-heading)] text-xl font-bold text-[#0d203b] mb-3">
                  Generate Tax-Efficient Property Income
                </h3>
                <p className="text-[#6C757D] leading-relaxed">
                  Maximise long-term returns through legally compliant property trust
                  structures.
                </p>
              </div>

              {/* Connector Arrow (hidden on mobile) */}
              <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                <i className="fas fa-arrow-right text-2xl text-[#4782b5]" aria-hidden="true"></i>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative group">
              <div className="bg-[#f5f9fc] rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#4782b5] to-[#0d203b] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 mt-4 shadow-md">
                  <i className="fas fa-shield-alt text-[#4782b5] text-3xl" aria-hidden="true"></i>
                </div>

                {/* Content */}
                <h3 className="font-[var(--font-family-heading)] text-xl font-bold text-[#0d203b] mb-3">
                  Scale &amp; Protect Your Portfolio
                </h3>
                <p className="text-[#6C757D] leading-relaxed">
                  Grow your holdings while safeguarding assets from creditors, estate
                  costs, and unnecessary tax exposure.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <a href={`${import.meta.env.VITE_SITE_URL}how-it-works`} className="inline-flex items-center justify-center bg-[#4782b5] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#3a6a95] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <span>How the System Works</span>
              <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Property Journey Section */}
      <section className="code-section py-20 lg:py-28 bg-gradient-to-b from-[#f5f9fc] to-white relative overflow-hidden" id="s4sxrh">
        <div className="px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-[var(--font-family-heading)] text-4xl lg:text-5xl font-bold text-[#0d203b] mb-6">
              Your <span className="text-[#4782b5]">Property Journey</span> Starts Here
            </h2>
            <p className="text-xl text-[#6C757D] leading-relaxed">
              Whether you're a beginner or an experienced investor, we offer the right
              starting point.
            </p>
          </div>

          {/* Educational Paths Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Zoom Events */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#4782b5]">
              <div className="w-16 h-16 bg-[#4782b5] bg-opacity-10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-video text-[#4782b5] text-2xl" aria-hidden="true"></i>
              </div>
              <h3 className="font-[var(--font-family-heading)] text-xl font-bold text-[#0d203b] mb-3 text-center">
                Property Zoom Events
              </h3>
              <p className="text-[#6C757D] text-center leading-relaxed">
                Clear, beginner-friendly foundations on trusts and property investing.
              </p>
            </div>

            {/* Webinars */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#8b5cf6]">
              <div className="w-16 h-16 bg-[#8b5cf6] bg-opacity-10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-desktop text-[#8b5cf6] text-2xl" aria-hidden="true"></i>
              </div>
              <h3 className="font-[var(--font-family-heading)] text-xl font-bold text-[#0d203b] mb-3 text-center">
                Property Webinars
              </h3>
              <p className="text-[#6C757D] text-center leading-relaxed">
                Focused online sessions with practical, real-world strategies.
              </p>
            </div>

            {/* One-Day Live Events */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#f97316]">
              <div className="w-16 h-16 bg-[#f97316] bg-opacity-10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-users text-[#f97316] text-2xl" aria-hidden="true"></i>
              </div>
              <h3 className="font-[var(--font-family-heading)] text-xl font-bold text-[#0d203b] mb-3 text-center">
                One-Day Property Masterclasses
              </h3>
              <p className="text-[#6C757D] text-center leading-relaxed">
                In-person, in-depth training covering the entire WMC property system.
              </p>
            </div>

            {/* Weekly Insights */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#22c55e]">
              <div className="w-16 h-16 bg-[#22c55e] bg-opacity-10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-newspaper text-[#22c55e] text-2xl" aria-hidden="true"></i>
              </div>
              <h3 className="font-[var(--font-family-heading)] text-xl font-bold text-[#0d203b] mb-3 text-center">
                Weekly Property Insights
              </h3>
              <p className="text-[#6C757D] text-center leading-relaxed">
                Ongoing email guidance to help you stay informed and confident.
              </p>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-gradient-to-br from-[#0d203b] to-[#4782b5] rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="font-[var(--font-family-heading)] text-2xl lg:text-3xl font-bold mb-8 text-center">
              All paths include:
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-[#ad7d13] text-xl flex-shrink-0" aria-hidden="true"></i>
                <p className="text-lg">Confirmation notifications</p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-[#ad7d13] text-xl flex-shrink-0" aria-hidden="true"></i>
                <p className="text-lg">Reminder sequences</p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-[#ad7d13] text-xl flex-shrink-0" aria-hidden="true"></i>
                <p className="text-lg">Post-event support</p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-[#ad7d13] text-xl flex-shrink-0" aria-hidden="true"></i>
                <p className="text-lg">Clear next-step direction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="code-section py-20 lg:py-28 bg-white" id="s3yru4">
        <div className="px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="font-[var(--font-family-heading)] text-4xl lg:text-5xl font-bold text-[#0d203b] mb-6">
                Who We <span className="text-[#4782b5]">Help</span>
              </h2>
              <p className="text-xl text-[#6C757D] leading-relaxed">
                We help South Africans who want to:
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="flex items-start space-x-4 bg-[#f5f9fc] p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-[#4782b5] rounded-lg flex items-center justify-center">
                  <i className="fas fa-check text-white text-xl" aria-hidden="true"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#0d203b] text-lg mb-1">
                    Start investing in property safely
                  </h3>
                  <p className="text-[#6C757D] text-sm">
                    Learn proven strategies for secure property acquisition
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-[#f5f9fc] p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-[#4782b5] rounded-lg flex items-center justify-center">
                  <i className="fas fa-check text-white text-xl" aria-hidden="true"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#0d203b] text-lg mb-1">
                    Structure property legally through trusts
                  </h3>
                  <p className="text-[#6C757D] text-sm">
                    Implement compliant trust frameworks for property ownership
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-[#f5f9fc] p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-[#4782b5] rounded-lg flex items-center justify-center">
                  <i className="fas fa-check text-white text-xl" aria-hidden="true"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#0d203b] text-lg mb-1">
                    Build tax-free generational wealth
                  </h3>
                  <p className="text-[#6C757D] text-sm">
                    Create lasting financial security for your family
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-[#f5f9fc] p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-[#4782b5] rounded-lg flex items-center justify-center">
                  <i className="fas fa-check text-white text-xl" aria-hidden="true"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#0d203b] text-lg mb-1">
                    Protect assets from creditors and estate duty
                  </h3>
                  <p className="text-[#6C757D] text-sm">
                    Safeguard your wealth with professional legal structures
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-[#f5f9fc] p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-[#4782b5] rounded-lg flex items-center justify-center">
                  <i className="fas fa-check text-white text-xl" aria-hidden="true"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#0d203b] text-lg mb-1">
                    Access bank financing for property purchases
                  </h3>
                  <p className="text-[#6C757D] text-sm">
                    Leverage institutional funding for your investments
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-[#f5f9fc] p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-[#4782b5] rounded-lg flex items-center justify-center">
                  <i className="fas fa-check text-white text-xl" aria-hidden="true"></i>
                </div>
                <div>
                  <h3 className="font-bold text-[#0d203b] text-lg mb-1">
                    Scale their property portfolio strategically
                  </h3>
                  <p className="text-[#6C757D] text-sm">
                    Grow your holdings with expert guidance and support
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-gradient-to-br from-[#0d203b] to-[#4782b5] rounded-2xl p-8 lg:p-12 text-white">
              <h3 className="font-[var(--font-family-heading)] text-2xl lg:text-3xl font-bold mb-6">
                Ready to Start Your Property Wealth Journey?
              </h3>
              <p className="text-xl mb-8 leading-relaxed">
                Join thousands of South Africans who have already transformed their financial future through property investment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`${import.meta.env.VITE_SITE_URL}events`} className="btn-primary">
                  <i className="fas fa-calendar-alt mr-2" aria-hidden="true"></i> View Upcoming Events
                </a>
                <a href={`${import.meta.env.VITE_SITE_URL}contact-us`} className="btn-gold">
                  <i className="fas fa-phone mr-2" aria-hidden="true"></i> Speak to an Expert
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="code-section py-20 lg:py-28 bg-[#f5f9fc]" id="s6dultg">
        <div className="px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="font-[var(--font-family-heading)] text-4xl lg:text-5xl font-bold text-[#0d203b] mb-4">
                Why <span className="text-[#4782b5]">Trust Us</span>
              </h2>
              <p className="text-2xl text-[#4782b5] font-semibold">
                Your Wealth. Protected. For Life.
              </p>
            </div>

            {/* Trust Points Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#4782b5] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-clock text-[#4782b5] text-2xl" aria-hidden="true"></i>
                </div>
                <h3 className="font-bold text-[#0d203b] text-lg mb-2">
                  40+ years combined experience
                </h3>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#4782b5] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-users text-[#4782b5] text-2xl" aria-hidden="true"></i>
                </div>
                <h3 className="font-bold text-[#0d203b] text-lg mb-2">
                  Proven property system used by 1,500+ South Africans
                </h3>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#4782b5] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-certificate text-[#4782b5] text-2xl" aria-hidden="true"></i>
                </div>
                <h3 className="font-bold text-[#0d203b] text-lg mb-2">
                  Fully regulated under FSP #48729
                </h3>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#4782b5] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-university text-[#4782b5] text-2xl" aria-hidden="true"></i>
                </div>
                <h3 className="font-bold text-[#0d203b] text-lg mb-2">
                  Supported by major SA banks
                </h3>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#4782b5] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-check text-[#4782b5] text-2xl" aria-hidden="true"></i>
                </div>
                <h3 className="font-bold text-[#0d203b] text-lg mb-2">
                  Trusted for trust structures &amp; property compliance
                </h3>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#4782b5] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-map-marker-alt text-[#4782b5] text-2xl" aria-hidden="true"></i>
                </div>
                <h3 className="font-bold text-[#0d203b] text-lg mb-2">
                  Strategies tailored specifically to SA laws &amp; property market
                </h3>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 lg:col-span-3">
                <div className="w-16 h-16 bg-[#ad7d13] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-graduation-cap text-[#ad7d13] text-2xl" aria-hidden="true"></i>
                </div>
                <h3 className="font-bold text-[#0d203b] text-lg mb-2">
                  Transparent, education-first approach
                </h3>
              </div>
            </div>

            {/* Bottom Statement */}
            <div className="text-center bg-gradient-to-br from-[#0d203b] to-[#4782b5] rounded-2xl p-10 text-white">
              <p className="text-xl lg:text-2xl font-semibold leading-relaxed">
                We don't manage your money — we teach you how to structure, invest,
                and protect it legally and confidently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="code-section py-20 lg:py-28 bg-white" id="s189lzs">
        <div className="px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="font-[var(--font-family-heading)] text-4xl lg:text-5xl font-bold text-[#0d203b] mb-6">
                Meet the <span className="text-[#4782b5]">Founder</span>
              </h2>
            </div>

            {/* Founder Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Image */}
              <div className="order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="bg-gradient-to-br from-[#0d203b] to-[#4782b5] p-2 rounded-2xl">
                    <div className="bg-[#f5f9fc] rounded-xl p-12 text-center">
                      <i className="fas fa-user-tie text-[#4782b5] text-9xl mb-6" aria-hidden="true"></i>
                      <p className="text-[#6C757D] italic">
                        Professional image of Coert Coetzee will appear here
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="space-y-6 order-1 lg:order-2">
                <div>
                  <h3 className="font-[var(--font-family-heading)] text-3xl lg:text-4xl font-bold text-[#0d203b] mb-3">
                    Coert Coetzee
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="inline-block bg-[#4782b5] bg-opacity-10 text-[#4782b5] px-4 py-2 rounded-lg font-semibold text-sm">
                      Founder
                    </span>
                    <span className="inline-block bg-[#4782b5] bg-opacity-10 text-[#4782b5] px-4 py-2 rounded-lg font-semibold text-sm">
                      Property Wealth Strategist
                    </span>
                    <span className="inline-block bg-[#4782b5] bg-opacity-10 text-[#4782b5] px-4 py-2 rounded-lg font-semibold text-sm">
                      Trust Structure Specialist
                    </span>
                    <span className="inline-block bg-[#4782b5] bg-opacity-10 text-[#4782b5] px-4 py-2 rounded-lg font-semibold text-sm">
                      Author
                    </span>
                    <span className="inline-block bg-[#4782b5] bg-opacity-10 text-[#4782b5] px-4 py-2 rounded-lg font-semibold text-sm">
                      Educator
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-lg text-[#6C757D] leading-relaxed">
                  <p>
                    Coert Coetzee is recognised as one of South Africa's leading
                    experts in property-based wealth creation using trust structures.
                  </p>
                  <p>
                    He has taught thousands of South Africans how to build
                    tax-efficient property portfolios that last for generations.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="bg-[#f5f9fc] rounded-xl p-6 text-center">
                    <p className="text-3xl font-bold text-[#4782b5] mb-2">1,500+</p>
                    <p className="text-sm text-[#6C757D]">Students Trained</p>
                  </div>
                  <div className="bg-[#f5f9fc] rounded-xl p-6 text-center">
                    <p className="text-3xl font-bold text-[#4782b5] mb-2">40+</p>
                    <p className="text-sm text-[#6C757D]">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="code-section py-20 lg:py-28 bg-gradient-to-b from-[#f5f9fc] to-white" id="s5rn37l">
        <div className="px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center space-x-1">
                <i className="fas fa-star text-[#ad7d13] text-2xl" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13] text-2xl" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13] text-2xl" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13] text-2xl" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13] text-2xl" aria-hidden="true"></i>
              </div>
            </div>
            <h2 className="font-[var(--font-family-heading)] text-4xl lg:text-5xl font-bold text-[#0d203b] mb-6">
              Real Results From Real
              <span className="text-[#4782b5]">Property Investors</span>
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-1 mb-4">
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
              </div>
              <p className="text-[#0d203b] font-bold text-lg mb-4">
                "100 houses in 12 months — all bought with no money."
              </p>
              <p className="text-[#6C757D] mb-6 leading-relaxed">
                "Coert's property system changed my life. I own many investment
                properties today — all using his strategies."
              </p>
              <p className="text-[#4782b5] font-semibold">— Gordon Mackay</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-1 mb-4">
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
              </div>
              <p className="text-[#0d203b] font-bold text-lg mb-4">
                "I purchased R5 million worth of property after setting up my trusts."
              </p>
              <p className="text-[#6C757D] mb-6 leading-relaxed">
                "The property and trust system works. It showed me everything I was
                missing."
              </p>
              <p className="text-[#4782b5] font-semibold">— Andre Swart</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-1 mb-4">
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
              </div>
              <p className="text-[#0d203b] font-bold text-lg mb-4">
                "Even as a property professional, I learned strategies I'd never seen
                before."
              </p>
              <p className="text-[#6C757D] mb-6 leading-relaxed">
                "His explanations simplify complex property investing in a way anyone
                can apply."
              </p>
              <p className="text-[#4782b5] font-semibold">— Richard Daguia</p>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-1 mb-4">
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
              </div>
              <p className="text-[#0d203b] font-bold text-lg mb-4">
                "I started setting up my property trusts before finishing the course."
              </p>
              <p className="text-[#6C757D] mb-6 leading-relaxed">
                "I now have a clear plan to build a property portfolio for my family."
              </p>
              <p className="text-[#4782b5] font-semibold">— Gordon Alexander Ross</p>
            </div>

            {/* Testimonial 5 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-1 mb-4">
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
              </div>
              <p className="text-[#0d203b] font-bold text-lg mb-4">
                "Our trusts now own our entire multi-million rand property portfolio."
              </p>
              <p className="text-[#6C757D] mb-6 leading-relaxed">
                "WMC changed everything. Our property assets are now protected and
                structured correctly."
              </p>
              <p className="text-[#4782b5] font-semibold">— Johan van Eeden</p>
            </div>

            {/* Testimonial 6 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-1 mb-4">
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
                <i className="fas fa-star text-[#ad7d13]" aria-hidden="true"></i>
              </div>
              <p className="text-[#0d203b] font-bold text-lg mb-4">
                "My R380,000 property is worth R11 million today — thanks to WMC."
              </p>
              <p className="text-[#6C757D] mb-6 leading-relaxed">
                "This proves the property system works — I followed it step by step."
              </p>
              <p className="text-[#4782b5] font-semibold">— T. Ribeiro</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a href={`${import.meta.env.VITE_SITE_URL}testimonials`} className="inline-flex items-center justify-center bg-[#4782b5] text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-[#3a6a95] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <span>View All Testimonials</span>
              <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Accreditation & Compliance Section */}
      <section className="code-section py-20 lg:py-28 bg-[#f5f9fc]" id="spsdm7a">
        <div className="px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-[var(--font-family-heading)] text-4xl lg:text-5xl font-bold text-[#0d203b] mb-6">
              Accreditation &amp; <span className="text-[#4782b5]">Compliance</span>
            </h2>
            <p className="text-xl text-[#6C757D] leading-relaxed">
              Wealth Masters Club operates within South African regulatory standards
              and under the supervision of leading professional bodies.
            </p>
          </div>

          {/* Credentials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#4782b5] bg-opacity-10 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-certificate text-[#4782b5] text-2xl" aria-hidden="true"></i>
              </div>
              <h3 className="font-bold text-[#0d203b] text-lg mb-2">
                Authorised FSP #48729
              </h3>
              <p className="text-[#6C757D] text-sm">
                Licensed Financial Services Provider under South African regulations
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#4782b5] bg-opacity-10 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-balance-scale text-[#4782b5] text-2xl" aria-hidden="true"></i>
              </div>
              <h3 className="font-bold text-[#0d203b] text-lg mb-2">
                Fiduciary Institute of South Africa
              </h3>
              <p className="text-[#6C757D] text-sm">
                Member of the leading professional body for fiduciary practitioners
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#4782b5] bg-opacity-10 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-calculator text-[#4782b5] text-2xl" aria-hidden="true"></i>
              </div>
              <h3 className="font-bold text-[#0d203b] text-lg mb-2">
                Accounting Association of SA
              </h3>
              <p className="text-[#6C757D] text-sm">
                Recognized member ensuring financial integrity and expertise
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#4782b5] bg-opacity-10 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-home text-[#4782b5] text-2xl" aria-hidden="true"></i>
              </div>
              <h3 className="font-bold text-[#0d203b] text-lg mb-2">
                Property Practitioners Regulatory Authority
              </h3>
              <p className="text-[#6C757D] text-sm">
                Registered property practitioners adhering to industry standards
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#ad7d13] bg-opacity-10 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-building text-[#ad7d13] text-2xl" aria-hidden="true"></i>
              </div>
              <h3 className="font-bold text-[#0d203b] text-lg mb-2">
                Part of the Destinata Group
              </h3>
              <p className="text-[#6C757D] text-sm">
                Legal, Financial &amp; Property Service Provider with established
                track record
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#ad7d13] bg-opacity-10 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-map-marker-alt text-[#ad7d13] text-2xl" aria-hidden="true"></i>
              </div>
              <h3 className="font-bold text-[#0d203b] text-lg mb-2">
                Multiple Office Locations
              </h3>
              <p className="text-[#6C757D] text-sm">
                Offices in Somerset West, Pretoria &amp; Durban
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="code-section relative py-20 lg:py-28 bg-gradient-to-br from-[#0d203b] to-[#4782b5] text-white overflow-hidden" id="s4mefn9">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <img src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/e5464b5a-5756-434f-5a11-1e21b74e0900/public" alt="Wealth creation, strategies for financial success concept : Small tree / sprout grow on stacks of rising coins. The image depicting money growth from investing in perpetual income portfolio and risk free assets." className="w-full h-full object-cover" data-media="{&quot;id&quot;:&quot;1400128175&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#ad7d13] rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#4782b5] rounded-full filter blur-3xl opacity-20"></div>

        <div className="px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Headline */}
            <h2 className="font-[var(--font-family-heading)] text-4xl lg:text-5xl font-bold leading-tight">
              Ready to Build a Tax-Free, Generational
              <span className="text-[#ad7d13]">Property Portfolio?</span>
            </h2>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              We're here to guide you every step of the way.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <a href={`${import.meta.env.VITE_SITE_URL}events`} className="inline-flex items-center justify-center bg-white text-[#0d203b] px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                <i className="fas fa-calendar-alt mr-2" aria-hidden="true"></i>
                <span>View Property Events</span>
              </a>
              <a href={`${import.meta.env.VITE_SITE_URL}contact-us`} className="inline-flex items-center justify-center bg-[#ad7d13] text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-[#8d6610] transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                <i className="fas fa-phone mr-2" aria-hidden="true"></i>
                <span>Speak to an Expert</span>
              </a>
            </div>

            {/* Trust Signals */}
            <div className="pt-8 space-y-4">
              <p className="text-sm text-gray-300 flex items-center justify-center space-x-2">
                <i className="fas fa-shield-check text-[#ad7d13]" aria-hidden="true"></i>
                <span>FSP Authorised #48729 • Fully Regulated • Trusted by 1,500+
                  Members</span>
              </p>
            </div>
          </div>
        </div>

        {/* Top Wave */}
        <div className="absolute top-0 left-0 right-0 rotate-180">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f5f9fc"></path>
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer id="global-footer" className="code-section bg-[#0d203b] text-white">
        <div className="px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Column 1: Brand & Description */}
            <div className="space-y-6">
              <a href={`${import.meta.env.VITE_SITE_URL}`} className="inline-block">
                <img src="/assets/img/logo-white.png" alt="Wealth Masters Club" className="h-20" data-logo="" data-media="{&quot;id&quot;:&quot;logo-white.png&quot;,&quot;src&quot;:&quot;local&quot;,&quot;type&quot;:&quot;image&quot;}" />
              </a>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your trusted partner on the journey towards financial freedom through
                specialized trust structures and property investments.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-200">
                  <i className="fab fa-facebook-f text-white" aria-hidden="true"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-200">
                  <i className="fab fa-linkedin-in text-white" aria-hidden="true"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-200">
                  <i className="fab fa-youtube text-white" aria-hidden="true"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-200">
                  <i className="fab fa-instagram text-white" aria-hidden="true"></i>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-[var(--font-family-heading)] text-lg font-bold mb-6 text-[#4782b5]">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href={`${import.meta.env.VITE_SITE_URL}`} className="text-gray-300 hover:text-[#4782b5] transition-colors duration-200 text-sm">Home</a>
                </li>
                <li>
                  <a href={`${import.meta.env.VITE_SITE_URL}about-us`} className="text-gray-300 hover:text-[#4782b5] transition-colors duration-200 text-sm">About Us</a>
                </li>
                <li>
                  <a href={`${import.meta.env.VITE_SITE_URL}how-it-works`} className="text-gray-300 hover:text-[#4782b5] transition-colors duration-200 text-sm">How It Works</a>
                </li>
                <li>
                  <a href={`${import.meta.env.VITE_SITE_URL}membership`} className="text-gray-300 hover:text-[#4782b5] transition-colors duration-200 text-sm">Membership</a>
                </li>
                <li>
                  <a href={`${import.meta.env.VITE_SITE_URL}events`} className="text-gray-300 hover:text-[#4782b5] transition-colors duration-200 text-sm">Events</a>
                </li>
                <li>
                  <a href={`${import.meta.env.VITE_SITE_URL}testimonials`} className="text-gray-300 hover:text-[#4782b5] transition-colors duration-200 text-sm">Testimonials</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h3 className="font-[var(--font-family-heading)] text-lg font-bold mb-6 text-[#4782b5]">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href={`${import.meta.env.VITE_SITE_URL}shop`} className="text-gray-300 hover:text-[#4782b5] transition-colors duration-200 text-sm">Shop</a>
                </li>
                <li>
                  <a href={`${import.meta.env.VITE_SITE_URL}blog`} className="text-gray-300 hover:text-[#4782b5] transition-colors duration-200 text-sm">Blog/Insights</a>
                </li>
                <li>
                  <a href={`${import.meta.env.VITE_SITE_URL}contact-us`} className="text-gray-300 hover:text-[#4782b5] transition-colors duration-200 text-sm">Contact Us</a>
                </li>
                <li>
                  <a href={`${import.meta.env.VITE_SITE_URL}login`} className="text-gray-300 hover:text-[#4782b5] transition-colors duration-200 text-sm">Member Login</a>
                </li>
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
                    <p className="text-gray-300">+27 21 851 2730</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-envelope text-[#4782b5] mt-1" aria-hidden="true"></i>
                  <div>
                    <p className="text-gray-300">info@wealthmastersclub.com</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-map-marker-alt text-[#4782b5] mt-1" aria-hidden="true"></i>
                  <div>
                    <p className="text-gray-300">
                      Posbus 834, Somerset Mall<br />Somerset West, 7137<br />South
                      Africa
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
                <p className="text-xs text-gray-400 mb-2">
                  Part of Destinata Group of Companies - Legal, Financial &amp;
                  Property Service Provider
                </p>
                <p className="text-xs text-gray-400">
                  Authorised FSP: 48729 | Fiduciary Institute of South Africa |
                  Accounting Association of South Africa | Property Practitioners
                  Regulatory Authority
                </p>
              </div>

              {/* Copyright */}
              <div className="text-center lg:text-right">
                <p className="text-xs text-gray-400">
                  © 2025 Wealth Masters Club. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}