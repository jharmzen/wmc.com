import React from 'react';
import type { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-[#ad7d13] hover:bg-[#8d6610] text-white focus:ring-[#ad7d13] shadow-lg hover:shadow-xl transform hover:scale-105',
    secondary: 'bg-[#0d203b] hover:bg-[#4782b5] text-white focus:ring-[#0d203b] shadow-lg hover:shadow-xl transform hover:scale-105',
    accent: 'bg-[#4782b5] hover:bg-[#0d203b] text-white focus:ring-[#4782b5] shadow-lg hover:shadow-xl transform hover:scale-105',
    outline: 'border-2 border-[#ad7d13] text-[#ad7d13] hover:bg-[#ad7d13] hover:text-white focus:ring-[#ad7d13]',
    ghost: 'text-[#ad7d13] hover:bg-[#ad7d13] hover:bg-opacity-10 focus:ring-[#ad7d13]',
    back: 'bg-[#f9f9f9] hover:bg-[#e0e0e0] text-black focus:ring-[#ad7d13] shadow-lg hover:shadow-xl transform hover:scale-105',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;