import React from 'react';

interface BenefitItemProps {
  title: string;
  description: string;
  icon?: string;
  className?: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({
  title,
  description,
  icon = 'fa-check',
  className = '',
}) => {
  return (
    <div className={`flex items-start space-x-4 bg-[#f5f9fc] p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="flex-shrink-0 w-12 h-12 bg-[#4782b5] rounded-lg flex items-center justify-center">
        <i className={`fas ${icon} text-white text-xl`} aria-hidden="true"></i>
      </div>
      <div>
        <h3 className="font-bold text-[#0d203b] text-lg mb-1">
          {title}
        </h3>
        <p className="text-[#6C757D] text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default BenefitItem;