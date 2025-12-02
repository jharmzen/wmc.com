import React from 'react';
import { BackButton, UnderConstruction } from '../../components';

const Testimonials: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white text-right">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0d203b] to-[#4782b5] text-white py-6">
        <div className="px-4">
          <BackButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <div className="w-full">
          <UnderConstruction
            icon="fa-star"
            title="Testimonials"
            subtitle="This page is currently under construction."
            description="We're collecting and organizing testimonials from our satisfied members. Check back soon to read success stories!"
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;