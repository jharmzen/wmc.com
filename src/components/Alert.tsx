import React from 'react';
import type { AlertProps } from '../types';

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  onClose,
  className = '',
}) => {
  const alertClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const iconClasses = {
    success: 'fas fa-check-circle text-green-400',
    warning: 'fas fa-exclamation-triangle text-yellow-400',
    error: 'fas fa-exclamation-circle text-red-400',
    info: 'fas fa-info-circle text-blue-400',
  };

  return (
    <div className={`border-l-4 p-4 ${alertClasses[type]} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <i className={`${iconClasses[type]} text-lg`} />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onClose}
                className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
              >
                <span className="sr-only">Dismiss</span>
                <i className="fas fa-times text-sm" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;