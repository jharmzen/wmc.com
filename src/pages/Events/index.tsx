import React from 'react';
import { WMCHeader, WMCFooter } from '../../components';

const Events: React.FC = () => {
  const postponedImageUrl = "https://backoffice.treoc.com/data/archive/documents/images/68edc640c7b67.png";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
      <WMCHeader />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white py-12 pt-20">
        <div className="grid grid-cols-1 max-w-4xl mx-auto px-4">
          <div className="border rounded-lg overflow-hidden shadow-xl bg-white">
            <img
              src={postponedImageUrl}
              alt="Postponed Event"
              className="w-full object-contain"
            />
            <div className="p-6 md:p-8">
              <h3 className="font-bold text-2xl mb-4 text-[#0d203b] text-center">
                EVENTS POSTPONED TO NEXT YEAR!
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  We're making big upgrades to deliver an even better Wealth Masters Experience in 2026.
                </p>
                <p className="text-lg leading-relaxed">
                  Our team is working behind the scenes to bring you new events, enhanced content, and powerful opportunities to build lasting wealth.
                </p>
                <p className="text-lg leading-relaxed flex items-start">
                  <span className="mr-2">👉</span>
                  <span>Stay connected for updates on the new event dates and exciting announcements.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WMCFooter />
    </div>
  );
};

export default Events;