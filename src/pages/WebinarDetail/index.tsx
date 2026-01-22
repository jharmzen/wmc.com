import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { WMCHeader, WMCFooter } from '../../components';
import WebinarBooking from '../../components/WebinarBooking';
import { getWebinarById } from '../../services/api';
import { X } from 'lucide-react';

interface WebinarData {
  Title: string;
  EventId: string | null;
  SeminarImage: string;
  Content: string;
  Description: string;
  BookingLink?: string;
  LanguageCode?: string;
}

const WebinarDetail: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { state } = useAuth();
  const memberData = state.memberData;
  const memberCode = memberData?.MemberCode || '';

  const [webinar, setWebinar] = useState<WebinarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const fetchWebinar = async () => {
      if (!eventId) {
        setError('Invalid webinar ID');
        setLoading(false);
        return;
      }

      try {
        const siteKey = import.meta.env.VITE_SITE_KEY;
        if (!siteKey) {
          throw new Error('Site key is not defined');
        }

        const data = await getWebinarById(eventId, siteKey, memberCode);

        // Fix relative image paths
        const apiRootDomain = import.meta.env.VITE_API_ROOT_DOMAIN;
        if (data.SeminarImage && data.SeminarImage.startsWith('../')) {
          const relativePath = data.SeminarImage.replace(/^\.\.\//g, '');
          data.SeminarImage = `${apiRootDomain}/${relativePath}`;
        }

        setWebinar(data);
      } catch (err) {
        console.error('Failed to fetch webinar:', err);
        setError(err instanceof Error ? err.message : 'Failed to load webinar');
      } finally {
        setLoading(false);
      }
    };

    fetchWebinar();
  }, [eventId, memberCode]);

  const handleBookNowClick = () => {
    // if (webinar?.BookingLink) {
    //   window.open(webinar.BookingLink, '_blank', 'noopener,noreferrer');
    // } else {
      setShowBookingModal(true);
    // }
  };

  const handleBookingSuccess = () => {
    setShowBookingModal(false);
  };

  if (loading) {
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

  if (error || !webinar) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
        <WMCHeader />
        <div className="p-8 pt-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-red-50 text-red-600 p-6 rounded-xl">
              <p className="text-lg font-semibold mb-2">Error Loading Webinar</p>
              <p>{error || 'Webinar not found'}</p>
              <button
                onClick={() => navigate('/webinars')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Back to Webinars
              </button>
            </div>
          </div>
        </div>
        <WMCFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
      <WMCHeader />

      <div className="p-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/webinars')}
            className="mb-6 text-blue-600 hover:text-blue-700 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Webinars
          </button>

          <h1 className="text-3xl font-bold text-[#0d203b] mb-6">{webinar.Title}</h1>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {webinar.SeminarImage && (
              <img
                src={webinar.SeminarImage}
                alt={webinar.Title}
                className="w-full object-cover"
              />
            )}

            <div className="p-6">
              {webinar.Description && (
                <div
                  className="text-gray-600 mb-4 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: webinar.Description }}
                />
              )}

              {webinar.Content && (
                <div
                  className="text-gray-600 mb-6 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: webinar.Content }}
                />
              )}

              <button
                onClick={handleBookNowClick}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#0d203b]">Book Webinar</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <WebinarBooking
              eventId={eventId!}
              languageCode={webinar.LanguageCode}
              onSuccess={handleBookingSuccess}
              onCancel={() => setShowBookingModal(false)}
            />
          </div>
        </div>
      )}

      <WMCFooter />
    </div>
  );
};

export default WebinarDetail;
