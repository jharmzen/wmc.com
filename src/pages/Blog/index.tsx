import React from 'react';
import { WMCHeader, WMCFooter, UnderConstruction } from '../../components';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white text-right">
      {/* Header */}
      <WMCHeader />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <div className="w-full">
          <UnderConstruction
            icon="fa-blog"
            title="Blog"
            subtitle="This page is currently under construction."
            description="We're writing insightful articles about property investing and wealth creation. Check back soon for expert insights and tips!"
          />
        </div>
      </div>

      <WMCFooter />
    </div>
  );
};

export default Blog;