import React from 'react';
import { BackButton, UnderConstruction } from '../../components';

const Shop: React.FC = () => {
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
            icon="fa-shopping-cart"
            title="Shop"
            subtitle="This page is currently under construction."
            description="We're preparing our online store with educational resources and tools. Check back soon for exclusive member products!"
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;