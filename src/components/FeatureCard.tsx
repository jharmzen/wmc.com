import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  borderColor?: string;
  variant?: 'default' | 'rounded';
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  borderColor = '#4782b5',
  variant = 'default',
  className = '',
}) => {
  const iconBgColor = borderColor === '#4782b5' ? '#4782b5' : borderColor;
  const iconColor = borderColor;

  const cardClasses = variant === 'rounded'
    ? 'bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300'
    : 'bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4';

  const borderStyle = variant === 'default' ? { borderTopColor: borderColor } : {};

  return (
    <div className={`${cardClasses} ${className}`} style={borderStyle}>
      <div className={`w-16 h-16 ${variant === 'rounded' ? 'bg-opacity-10 rounded-full' : 'bg-white rounded-xl shadow-md'} flex items-center justify-center mb-6 mx-auto`}
           style={{ backgroundColor: variant === 'rounded' ? `${iconBgColor}1A` : undefined }}>
        <i className={`fas ${icon} text-2xl`} style={{ color: iconColor }} aria-hidden="true"></i>
      </div>
      <h3 className="font-[var(--font-family-heading)] text-xl font-bold text-[#0d203b] mb-3 text-center">
        {title}
      </h3>
      <p className="text-[#6C757D] text-center leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;