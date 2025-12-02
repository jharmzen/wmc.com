import React from 'react';

interface FloatingStatCardProps {
  icon: string;
  value: string;
  label: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

const FloatingStatCard: React.FC<FloatingStatCardProps> = ({
  icon,
  value,
  label,
  position,
  className = '',
}) => {
  const positionClasses = {
    'top-left': '-top-6 -left-6',
    'top-right': '-top-6 -right-6',
    'bottom-left': '-bottom-6 -left-6',
    'bottom-right': '-bottom-6 -right-6',
  };

  const iconBgColor = icon.includes('users') ? '#4782b5' : '#ad7d13';
  const textColor = icon.includes('users') ? '#4782b5' : '#4782b5'; // Both use #4782b5 for text

  return (
    <div className={`absolute ${positionClasses[position]} bg-white text-[#0d203b] p-6 rounded-xl shadow-xl z-20 ${className}`}>
      <div className="flex items-center space-x-3">
        <div className={`w-12 h-12 bg-opacity-20 rounded-lg flex items-center justify-center`}
             style={{ backgroundColor: `${iconBgColor}33` }}>
          <i className={`fas ${icon} text-xl`} style={{ color: iconBgColor }} aria-hidden="true"></i>
        </div>
        <div>
          <p className="text-2xl font-bold" style={{ color: textColor }}>{value}</p>
          <p className="text-sm text-[#6C757D]">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default FloatingStatCard;