import React from 'react';

interface StatCardProps {
  value: string;
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  variant = 'primary',
  className = '',
}) => {
  const colorClasses = {
    primary: 'text-[#4782b5]',
    secondary: 'text-[#ad7d13]',
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {icon && (
        <div className="flex justify-center mb-2">
          <i className={`fas ${icon} text-3xl ${colorClasses[variant]}`} aria-hidden="true"></i>
        </div>
      )}
      <p className={`text-3xl lg:text-4xl font-bold ${colorClasses[variant]}`}>{value}</p>
      <p className="text-sm text-[#6C757D]">{label}</p>
    </div>
  );
};

export default StatCard;