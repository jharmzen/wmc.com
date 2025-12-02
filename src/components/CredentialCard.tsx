import React from 'react';

interface CredentialCardProps {
  icon: string;
  title: string;
  description: string;
  iconColor?: string;
  className?: string;
}

const CredentialCard: React.FC<CredentialCardProps> = ({
  icon,
  title,
  description,
  iconColor = '#4782b5',
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className="w-16 h-16 bg-opacity-10 rounded-xl flex items-center justify-center mb-4"
           style={{ backgroundColor: `${iconColor}1A` }}>
        <i className={`fas ${icon} text-2xl`} style={{ color: iconColor }} aria-hidden="true"></i>
      </div>
      <h3 className="font-bold text-[#0d203b] text-lg mb-2">
        {title}
      </h3>
      <p className="text-[#6C757D] text-sm">
        {description}
      </p>
    </div>
  );
};

export default CredentialCard;