import React from 'react';

interface TrustCardProps {
  icon: string;
  title: string;
  iconColor?: string;
  className?: string;
}

const TrustCard: React.FC<TrustCardProps> = ({
  icon,
  title,
  iconColor = '#4782b5',
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className="w-16 h-16 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4"
           style={{ backgroundColor: `${iconColor}1A` }}>
        <i className={`fas ${icon} text-2xl`} style={{ color: iconColor }} aria-hidden="true"></i>
      </div>
      <h3 className="font-bold text-[#0d203b] text-lg mb-2">
        {title}
      </h3>
    </div>
  );
};

export default TrustCard;