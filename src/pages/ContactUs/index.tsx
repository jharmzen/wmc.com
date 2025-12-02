import React from 'react';
import { BackButton, UnderConstruction } from '../../components';

const ContactUs: React.FC = () => {
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
              icon="fa-envelope"
              title="Contact Us"
              subtitle="This page is currently under construction."
              description="We're setting up our contact forms and information for easy communication. Check back soon to get in touch with our team!"
            />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;