import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ApiWebinarData {
  Title: string;
  SeminarId: string;
  SeminarImage: string;
  Content: string;
  Description: string;
  BookingLink?: string;
}

export interface WebinarData {
  Title: string;
  EventId: string;
  SeminarImage: string;
  Content: string;
  Description: string;
  BookingLink?: string;
}

export const useWebinars = () => {
  const [webinars, setWebinars] = useState<WebinarData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { state } = useAuth();
  const memberData = state.memberData;
  const memberCode = memberData?.MemberCode || '';
  const siteKey = import.meta.env.VITE_SITE_KEY || '';
  const apiRootDomain = import.meta.env.VITE_API_ROOT_DOMAIN || '';
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    console.log('useWebinars useEffect triggered', { siteKey, memberCode });

    const fetchData = async () => {
      try {
        setLoading(true);

        if (!siteKey) {
          throw new Error('Missing site key');
        }

        // For non-logged-in users, we can try to fetch public webinars
        // If memberCode is empty, we'll omit the session_member_token parameter

        console.log('Fetching webinars from API');
        const apiUrl = import.meta.env.VITE_API_URL;
        const params = new URLSearchParams({
          site_key: siteKey,
        });

        // Only include session_member_token if memberCode is available (logged-in user)
        if (memberCode) {
          params.append('session_member_token', memberCode);
        }

        const response = await fetch(`${apiUrl}/education/events?method=webinar_details&${params.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response:', data);

        if (!data.Success || !Array.isArray(data.Msg)) {
          console.error('Expected an array in data.Msg, received:', data);
          throw new Error('Invalid data format');
        }

        setWebinars(
          data.Msg.map((webinar: ApiWebinarData) => ({
            Title: webinar.Title || '',
            EventId: webinar.SeminarId ? String(webinar.SeminarId) : '',
            SeminarImage: webinar.SeminarImage
              ? webinar.SeminarImage.replace('../..', apiRootDomain)
              : '',
            Content: webinar.Content || '',
            Description: webinar.Description || '',
            BookingLink: webinar.BookingLink || '',
          }))
        );
      } catch (err: unknown) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch webinars');
        setWebinars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [siteKey, memberCode, apiRootDomain]);

  return { webinars, loading, error };
};
