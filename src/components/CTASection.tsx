import React from 'react';

interface ButtonProps {
  text: string;
  href: string;
  icon?: string;
  variant?: 'primary' | 'secondary';
}

interface CTASectionProps {
  title: string;
  subtitle?: string;
  primaryButton: ButtonProps;
  secondaryButton?: ButtonProps;
  background?: 'gradient' | 'white';
  className?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  background = 'gradient',
  className = '',
}) => {
  const bgClasses = background === 'gradient'
    ? 'bg-gradient-to-br from-[#0d203b] to-[#4782b5] text-white'
    : 'bg-white text-[#0d203b]';

  const buttonClasses = {
    primary: 'bg-[#4782b5] text-white hover:bg-[#3a6a95]',
    secondary: 'bg-[#ad7d13] text-white hover:bg-[#8d6610]',
  };

  return (
    <div className={`${bgClasses} rounded-2xl p-8 lg:p-12 ${className}`}>
      <div className="text-center space-y-8">
        {subtitle && (
          <p className="text-xl lg:text-2xl font-semibold">
            {subtitle}
          </p>
        )}
        <h3 className="font-[var(--font-family-heading)] text-2xl lg:text-3xl font-bold">
          {title}
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={primaryButton.href}
            className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${buttonClasses.primary}`}
          >
            {primaryButton.icon && <i className={`fas ${primaryButton.icon} mr-2`} aria-hidden="true"></i>}
            <span>{primaryButton.text}</span>
          </a>
          {secondaryButton && (
            <a
              href={secondaryButton.href}
              className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${buttonClasses.secondary}`}
            >
              {secondaryButton.icon && <i className={`fas ${secondaryButton.icon} mr-2`} aria-hidden="true"></i>}
              <span>{secondaryButton.text}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CTASection;