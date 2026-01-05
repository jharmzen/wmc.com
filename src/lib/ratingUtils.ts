import { decryptTdmPayload } from './utils';

export interface RatingData {
  ratingType: 'very_bad' | 'bad' | 'average' | 'good' | 'excellent';
  requestId?: string;
}

/**
 * Extracts rating data from URL (query or path), supporting legacy 'tdm=' format.
 * Mimics PHP's IQ_DestructURL() + IQ_DestructURLParams() + rating parsing.
 */
export function extractRatingData(input: string): RatingData {
  let tdmValue: string | null = null;
  let fallbackParams = new URLSearchParams();

  try {
    // Normalize input: trim whitespace
    const cleanInput = input.trim();

    // Split into path and query string
    let path = cleanInput;
    let query = '';

    if (cleanInput.includes('?')) {
      const parts = cleanInput.split('?');
      path = parts[0];
      query = parts.slice(1).join('?'); // in case of multiple ?
      fallbackParams = new URLSearchParams(query);
    }

    // Step 1: Look for 'tdm=' in query string
    if (query) {
      tdmValue = fallbackParams.get('tdm') || null;
      // Remove tdm from fallback so it doesn't interfere
      fallbackParams.delete('tdm');
    }

    // Step 2: Look for 'tdm=' in path (e.g. /rating/tdm=abc123)
    if (!tdmValue && path) {
      const pathSegments = path.split('/').filter(Boolean);
      for (const segment of pathSegments) {
        if (segment.startsWith('tdm=')) {
          tdmValue = segment.substring(4);
          break;
        }
      }
    }

    // Step 3: If tdm payload exists → decrypt and use
    if (tdmValue) {
      console.log('Found tdm payload:', tdmValue);
      const decrypted = decryptTdmPayload(tdmValue);
      console.log('Decrypted params:', decrypted);

      const requestId = decrypted['request_id'] || undefined;
      const ratingValue = decrypted['rating_value'];

      const ratingMap: Record<string, RatingData['ratingType']> = {
        '1': 'very_bad',
        '2': 'bad',
        '3': 'average',
        '4': 'good',
        '5': 'excellent'
      };

      const ratingType = ratingValue ? ratingMap[ratingValue] || 'average' : 'average';

      return { ratingType, requestId };
    }

    // Step 4: Fallback: direct rating or query params
    const ratingParam = fallbackParams.get('rating') || cleanInput;

    const ratingMap: Record<string, RatingData['ratingType']> = {
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

  } catch (error) {
    console.error('Error in extractRatingData:', error);
    return { ratingType: 'average' };
  }
}
