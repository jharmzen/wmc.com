import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { submitRating } from '../../services/api';
import { WMCHeader, WMCFooter } from '../../components';

type RatingType = 'very_bad' | 'bad' | 'average' | 'good' | 'excellent';

interface RatingData {
  ratingType: RatingType;
  requestId?: string;
}

// Simple decryption for TDM payload (base64 decode + parse)
function decryptTdmPayload(encoded: string): Record<string, string> {
  try {
    const decoded = atob(encoded);
    const params = new URLSearchParams(decoded);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  } catch {
    return {};
  }
}

function extractRatingData(input: string): RatingData {
  let tdmValue: string | null = null;
  const fallbackParams = new URLSearchParams();

  try {
    const cleanInput = input.trim();
    let path = cleanInput;
    let query = '';

    if (cleanInput.includes('?')) {
      const parts = cleanInput.split('?');
      path = parts[0];
      query = parts.slice(1).join('?');
      const queryParams = new URLSearchParams(query);
      tdmValue = queryParams.get('tdm') || null;
    }

    if (!tdmValue && path) {
      const pathSegments = path.split('/').filter(Boolean);
      for (const segment of pathSegments) {
        if (segment.startsWith('tdm=')) {
          tdmValue = segment.substring(4);
          break;
        }
      }
    }

    if (tdmValue) {
      const decrypted = decryptTdmPayload(tdmValue);
      const requestId = decrypted['request_id'] || undefined;
      const ratingValue = decrypted['rating_value'];

      const ratingMap: Record<string, RatingType> = {
        '1': 'very_bad',
        '2': 'bad',
        '3': 'average',
        '4': 'good',
        '5': 'excellent'
      };

      const ratingType = ratingValue ? ratingMap[ratingValue] || 'average' : 'average';
      return { ratingType, requestId };
    }

    const ratingParam = fallbackParams.get('rating') || cleanInput;
    const ratingMap: Record<string, RatingType> = {
      'very_bad': 'very_bad',
      'bad': 'bad',
      'average': 'average',
      'good': 'good',
      'excellent': 'excellent',
      '1': 'very_bad',
      '2': 'bad',
      '3': 'average',
      '4': 'good',
      '5': 'excellent'
    };

    const ratingType = ratingMap[ratingParam] || 'average';
    const requestId = fallbackParams.get('request_id') || undefined;

    return { ratingType, requestId };
  } catch {
    return { ratingType: 'average' };
  }
}

const ServiceRating: React.FC = () => {
  const { data } = useParams<{ data: string }>();
  const navigate = useNavigate();
  const { state } = useAuth();

  const [ratingData, setRatingData] = useState<RatingData | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      const extracted = extractRatingData(data);
      setRatingData(extracted);
    }
  }, [data]);

  const ratingLabels: Record<RatingType, string> = {
    very_bad: 'Very Bad',
    bad: 'Bad',
    average: 'Average',
    good: 'Good',
    excellent: 'Excellent'
  };

  const ratingDescriptions: Record<RatingType, string> = {
    very_bad: 'We are sorry to hear that our service was not what you expected. We would appreciate any additional feedback.',
    bad: 'Thank you for your feedback. We\'ll work to address your concerns.',
    average: 'Thank you for your rating. We\'re always looking to improve.',
    good: 'Thank you! We\'re glad you\'re satisfied with our service.',
    excellent: 'Thank you so much! We\'re thrilled you had an excellent experience.'
  };

  const handleSubmitRating = useCallback(async () => {
    if (!ratingData) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await submitRating(state.memberData || null, ratingData.ratingType, ratingData.requestId || '', comment);
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  }, [state.memberData, ratingData, comment]);

  if (!ratingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
        <WMCHeader />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        <WMCFooter />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
        <WMCHeader />
        <div className="flex items-center justify-center min-h-[80vh] p-8">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#0d203b] mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-4">{ratingDescriptions[ratingData.ratingType]}</p>
            <p className="text-sm text-gray-500 mb-6">
              Your {ratingLabels[ratingData.ratingType].toLowerCase()} rating has been recorded.
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Return Home
            </button>
          </div>
        </div>
        <WMCFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
      <WMCHeader />
      <div className="flex items-center justify-center min-h-[80vh] p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#0d203b] mb-2">Rate Our Service</h2>
            <p className="text-gray-600">
              You've selected: <span className="font-semibold">{ratingLabels[ratingData.ratingType]}</span>
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Comments (Optional)
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Please share any additional feedback..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleSubmitRating}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                'Submit Rating'
              )}
            </button>
            <button
              onClick={() => navigate('/')}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <WMCFooter />
    </div>
  );
};

export default ServiceRating;
