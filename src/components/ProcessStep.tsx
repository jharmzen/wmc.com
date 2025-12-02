import React from 'react';

interface ProcessStepProps {
  stepNumber: number;
  icon: string;
  title: string;
  description: string;
  showArrow?: boolean;
  className?: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({
  stepNumber,
  icon,
  title,
  description,
  showArrow = true,
  className = '',
}) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="bg-[#f5f9fc] rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
        {/* Step Number */}
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#4782b5] to-[#0d203b] rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold text-white">{stepNumber}</span>
        </div>

        {/* Icon */}
        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 mt-4 shadow-md">
          <i className={`fas ${icon} text-[#4782b5] text-3xl`} aria-hidden="true"></i>
        </div>

        {/* Content */}
        <h3 className="font-[var(--font-family-heading)] text-xl font-bold text-[#0d203b] mb-3">
          {title}
        </h3>
        <p className="text-[#6C757D] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Connector Arrow (hidden on mobile) */}
      {showArrow && (
        <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
          <i className="fas fa-arrow-right text-2xl text-[#4782b5]" aria-hidden="true"></i>
        </div>
      )}
    </div>
  );
};

export default ProcessStep;