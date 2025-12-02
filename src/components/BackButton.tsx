import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './Button';

interface BackButtonProps {
  to?: string;
  text?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  to = '/',
  text = 'Back to Home',
  className = '',
}) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(to)}
      variant="back"
      size="md"
      className={`inline-flex items-center ${className}`}
    >
      <i className="fas fa-arrow-left mr-2" aria-hidden="true"></i>
      {text}
    </Button>
  );
};

export default BackButton;