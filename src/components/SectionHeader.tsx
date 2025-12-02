import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  highlightColor?: string;
  highlight?: string;
  fullWidth?: boolean;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  centered = true,
  highlightColor = '#4782b5',
  highlight,
  fullWidth = false,
  className = '',
}) => {
  const containerClasses = centered ? 'text-center' : '';
  const containerWidth = fullWidth ? '' : 'max-w-4xl mx-auto';
  const titleClasses = `font-[var(--font-family-heading)] text-4xl lg:text-5xl font-bold text-[#0d203b] mb-4 ${className}`;

  return (
    <div className={`${containerClasses} ${containerWidth} mb-16`}>
      {subtitle && (
        <p className="text-2xl text-[#4782b5] font-semibold mb-6">
          {subtitle}
        </p>
      )}
      <h2 className={titleClasses}>
        {highlight ? (
          title.split(highlight).map((part, index, array) => (
            <React.Fragment key={index}>
              {part}
              {index < array.length - 1 && (
                <span style={{ color: highlightColor }}>{highlight}</span>
              )}
            </React.Fragment>
          ))
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className="text-xl text-[#6C757D] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;