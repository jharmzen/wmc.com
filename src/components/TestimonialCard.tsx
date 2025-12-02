import React from 'react';

interface TestimonialCardProps {
  rating: number;
  quote: string;
  text: string;
  author: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  rating,
  quote,
  text,
  author,
  className = '',
}) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <i key={i} className={`fas fa-star ${i < rating ? 'text-[#ad7d13]' : 'text-gray-300'}`} aria-hidden="true"></i>
  ));

  return (
    <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className="flex items-center space-x-1 mb-4">
        {stars}
      </div>
      <p className="text-[#0d203b] font-bold text-lg mb-4">
        "{quote}"
      </p>
      <p className="text-[#6C757D] mb-6 leading-relaxed">
        {text}
      </p>
      <p className="text-[#4782b5] font-semibold">— {author}</p>
    </div>
  );
};

export default TestimonialCard;