// src/components/LandingPage.tsx

import { Link } from 'react-router-dom';
import {
  Header,
  Footer,
  SectionHeader,
  StatCard,
  ProcessStep,
  FeatureCard,
  BenefitItem,
  TestimonialCard,
  FloatingStatCard,
  CTASection,
  TrustCard,
  CredentialCard,
} from '../../components';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header
        logo="/assets/img/logo-white.png"
        navItems={[
          { label: 'About Us', href: './about-us' },
          { label: 'How It Works', href: './how-it-works' },
          { label: 'Membership', href: './membership' },
          { label: 'Events', href: './events' },
        ]}
        ctaButton={{ text: 'Claim Your Free Wealth Guide', href: './membership' }}
      />

      {/* Hero Section */}
      <section className="code-section relative bg-gradient-to-br from-[#0d203b] to-[#4782b5] text-white overflow-hidden" id="s02h9l4">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-20">
          <img src="./assets/img/header_insert.png" alt="Real estate agents recommend interest rates, discuss the terms of the home purchase agreement, and ask clients to sign paperwork to legalize the contract." className="w-full h-full object-cover" data-media="{&quot;id&quot;:&quot;1484779739&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}" />
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
                <Link to="/events" className="btn-primary">
                  View Upcoming Events
                </Link>
                <Link to="/contact-us" className="btn-gold">
                  Speak to an Expert
                </Link>
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
                <img src="./assets/img/header_insert.png" alt="Real estate agents recommend interest rates, discuss the terms of the home purchase agreement, and ask clients to sign paperwork to legalize the contract." className="w-full h-full object-cover" data-media="{&quot;id&quot;:&quot;1484779739&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}" />
              </div>

              {/* Floating Stats Cards */}
              <FloatingStatCard
                icon="fa-users"
                value="1,500+"
                label="Active Members"
                position="bottom-left"
              />
              <FloatingStatCard
                icon="fa-chart-line"
                value="R5M+"
                label="Avg. Portfolio"
                position="top-right"
              />
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
            <StatCard value="1,500+" label="Active Members" />
            <StatCard value="R5M+" label="Avg. Property Portfolio Value" />
            <StatCard value="FSP #48729" label="Authorised FSP" />
            <StatCard value="" label="Backed by Major South African Banks" icon="fa-university" />
            <StatCard value="4.7 ★" label="Member Satisfaction" />
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="code-section py-20 lg:py-28 bg-gradient-to-b from-white to-[#f5f9fc]" id="spfaotg">
        <div className="px-4">
          <SectionHeader
            title="What We Offer"
            subtitle="Your Trusted Partner in Property-Based Wealth Creation"
            description="Wealth Masters Club specialises exclusively in property investment, supported by specialised trust structures, legal compliance, and proven frameworks designed to protect wealth, reduce tax, and grow long-term, generational property portfolios."
          />

          {/* Three Pillars */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-[#0d203b] to-[#4782b5] rounded-2xl p-8 text-white">
              <h3 className="font-[var(--font-family-heading)] text-2xl lg:text-3xl font-bold mb-8 text-center">
                Everything we do is built on three pillars:
              </h3>
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
          <div className="mt-16 text-center">
            <Link to="/membership" className="inline-flex items-center justify-center bg-[#4782b5] text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-[#3a6a95] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <span>Explore Our Membership Option</span>
              <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Property System Section */}
      <section className="code-section py-20 lg:py-28 bg-white" id="s045wps">
        <div className="px-4">
          <SectionHeader
            title="The WMC Property Wealth System"
            description="A structured, step-by-step method for building tax-efficient property wealth in South Africa."
          />

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            <ProcessStep
              stepNumber={1}
              icon="fa-graduation-cap"
              title="Learn the Trust System for Property"
              description="Understand how to structure, protect, and own property safely through compliant trust frameworks."
            />
            <ProcessStep
              stepNumber={2}
              icon="fa-home"
              title="Acquire Investment Property Strategically"
              description="Use smart, bank-approved financing strategies to secure investment-grade properties with reduced risk."
            />
            <ProcessStep
              stepNumber={3}
              icon="fa-chart-line"
              title="Generate Tax-Efficient Property Income"
              description="Maximise long-term returns through legally compliant property trust structures."
            />
            <ProcessStep
              stepNumber={4}
              icon="fa-shield-alt"
              title="Scale & Protect Your Portfolio"
              description="Grow your holdings while safeguarding assets from creditors, estate costs, and unnecessary tax exposure."
              showArrow={false}
            />
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Link to="/how-it-works" className="inline-flex items-center justify-center bg-[#4782b5] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#3a6a95] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <span>How the System Works</span>
              <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Property Journey Section */}
      <section className="code-section py-20 lg:py-28 bg-gradient-to-b from-[#f5f9fc] to-white relative overflow-hidden" id="s4sxrh">
        <div className="px-4 relative z-10">
          <SectionHeader
            title="Your Property Journey Starts Here"
            description="Whether you're a beginner or an experienced investor, we offer the right starting point."
          />

          {/* Educational Paths Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <FeatureCard
              icon="fa-video"
              title="Property Zoom Events"
              description="Clear, beginner-friendly foundations on trusts and property investing."
              borderColor="#4782b5"
            />
            <FeatureCard
              icon="fa-desktop"
              title="Property Webinars"
              description="Focused online sessions with practical, real-world strategies."
              borderColor="#8b5cf6"
            />
            <FeatureCard
              icon="fa-users"
              title="One-Day Property Masterclasses"
              description="In-person, in-depth training covering the entire WMC property system."
              borderColor="#f97316"
            />
            <FeatureCard
              icon="fa-newspaper"
              title="Weekly Property Insights"
              description="Ongoing email guidance to help you stay informed and confident."
              borderColor="#22c55e"
            />
          </div>

          {/* What's Included */}
          <div className="max-w-6xl mx-auto">
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
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="code-section py-20 lg:py-28 bg-white" id="s3yru4">
        <div className="px-4">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              title="Who We Help"
              description="We help South Africans who want to:"
            />

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <BenefitItem
                title="Start investing in property safely"
                description="Learn proven strategies for secure property acquisition"
              />
              <BenefitItem
                title="Structure property legally through trusts"
                description="Implement compliant trust frameworks for property ownership"
              />
              <BenefitItem
                title="Build tax-free generational wealth"
                description="Create lasting financial security for your family"
              />
              <BenefitItem
                title="Protect assets from creditors and estate duty"
                description="Safeguard your wealth with professional legal structures"
              />
              <BenefitItem
                title="Access bank financing for property purchases"
                description="Leverage institutional funding for your investments"
              />
              <BenefitItem
                title="Scale their property portfolio strategically"
                description="Grow your holdings with expert guidance and support"
              />
            </div>

            {/* CTA Section */}
            <CTASection
              title="Ready to Start Your Property Wealth Journey?"
              subtitle="Join thousands of South Africans who have already transformed their financial future through property investment."
              primaryButton={{
                text: "View Upcoming Events",
                href: "./events",
                icon: "fa-calendar-alt"
              }}
              secondaryButton={{
                text: "Speak to an Expert",
                href: "./contact-us",
                icon: "fa-phone"
              }}
            />
          </div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="code-section py-20 lg:py-28 bg-[#f5f9fc]" id="s6dultg">
        <div className="px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <SectionHeader
              title="Why Trust Us"
              highlight="Trust Us"
              subtitle="Your Wealth. Protected. For Life."
            />

            {/* Trust Points Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <TrustCard
                icon="fa-clock"
                title="40+ years combined experience"
              />
              <TrustCard
                icon="fa-users"
                title="Proven property system used by 1,500+ South Africans"
              />
              <TrustCard
                icon="fa-certificate"
                title="Fully regulated under FSP #48729"
              />
              <TrustCard
                icon="fa-university"
                title="Supported by major SA banks"
              />
              <TrustCard
                icon="fa-shield-check"
                title="Trusted for trust structures & property compliance"
              />
              <TrustCard
                icon="fa-map-marker-alt"
                title="Strategies tailored specifically to SA laws & property market"
              />
              <TrustCard
                icon="fa-graduation-cap"
                title="Transparent, education-first approach"
                iconColor="#ad7d13"
                className="lg:col-span-3"
              />
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
            <SectionHeader
              title="Meet the Founder"
              highlight="Founder"
            />

            {/* Founder Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Image */}
              <div className="order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="bg-gradient-to-br from-[#0d203b] to-[#4782b5] p-2 rounded-2xl">
                    <div className="bg-[#f5f9fc] rounded-xl p-2 text-center">
                      {/* <i className="fas fa-user-tie text-[#4782b5] text-9xl mb-6" aria-hidden="true"></i> */}
                      <p className="text-[#6C757D] italic">
                        {/* Coert Coetzee */}
                        <img src="./assets/img/coert.jpg" alt="Coert Coetzee" className="w-full h-full object-cover" />
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
          <SectionHeader
            title="Real Results From Real Property Investors"
          />

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <TestimonialCard
              rating={5}
              quote="100 houses in 12 months — all bought with no money."
              text="Coert's property system changed my life. I own many investment properties today — all using his strategies."
              author="Gordon Mackay"
            />
            <TestimonialCard
              rating={5}
              quote="I purchased R5 million worth of property after setting up my trusts."
              text="The property and trust system works. It showed me everything I was missing."
              author="Andre Swart"
            />
            <TestimonialCard
              rating={5}
              quote="Even as a property professional, I learned strategies I'd never seen before."
              text="His explanations simplify complex property investing in a way anyone can apply."
              author="Richard Daguia"
            />
            <TestimonialCard
              rating={5}
              quote="I started setting up my property trusts before finishing the course."
              text="I now have a clear plan to build a property portfolio for my family."
              author="Gordon Alexander Ross"
            />
            <TestimonialCard
              rating={5}
              quote="Our trusts now own our entire multi-million rand property portfolio."
              text="WMC changed everything. Our property assets are now protected and structured correctly."
              author="Johan van Eeden"
            />
            <TestimonialCard
              rating={5}
              quote="My R380,000 property is worth R11 million today — thanks to WMC."
              text="This proves the property system works — I followed it step by step."
              author="T. Ribeiro"
            />
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link to="/testimonials" className="inline-flex items-center justify-center bg-[#4782b5] text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-[#3a6a95] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <span>View All Testimonials</span>
              <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Accreditation & Compliance Section */}
      <section className="code-section py-20 lg:py-28 bg-[#f5f9fc]" id="spsdm7a">
        <div className="px-4">
          {/* Section Header */}
          <SectionHeader
            title="Accreditation & Compliance"
            highlight="Compliance"
            description="Wealth Masters Club operates within South African regulatory standards and under the supervision of leading professional bodies."
          />

          {/* Credentials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <CredentialCard
              icon="fa-certificate"
              title="Authorised FSP #48729"
              description="Licensed Financial Services Provider under South African regulations"
            />
            <CredentialCard
              icon="fa-balance-scale"
              title="Fiduciary Institute of South Africa"
              description="Member of the leading professional body for fiduciary practitioners"
            />
            <CredentialCard
              icon="fa-calculator"
              title="Accounting Association of SA"
              description="Recognized member ensuring financial integrity and expertise"
            />
            <CredentialCard
              icon="fa-home"
              title="Property Practitioners Regulatory Authority"
              description="Registered property practitioners adhering to industry standards"
            />
            <CredentialCard
              icon="fa-building"
              title="Part of the Destinata Group"
              description="Legal, Financial & Property Service Provider with established track record"
              iconColor="#ad7d13"
            />
            <CredentialCard
              icon="fa-map-marker-alt"
              title="Multiple Office Locations"
              description="Offices in Somerset West, Pretoria & Durban"
              iconColor="#ad7d13"
            />
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
              <Link to="/events" className="inline-flex items-center justify-center bg-white text-[#0d203b] px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                <i className="fas fa-calendar-alt mr-2" aria-hidden="true"></i>
                <span>View Property Events</span>
              </Link>
              <Link to="/contact-us" className="inline-flex items-center justify-center bg-[#ad7d13] text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-[#8d6610] transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                <i className="fas fa-phone mr-2" aria-hidden="true"></i>
                <span>Speak to an Expert</span>
              </Link>
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
}