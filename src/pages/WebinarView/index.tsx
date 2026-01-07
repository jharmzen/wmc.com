import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { WMCHeader, WMCFooter } from '../../components';
import { getStreamingWebinarById } from '../../services/api';

const WebinarView: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { state } = useAuth();
  const memberData = state.memberData;

  const [email, setEmail] = useState(memberData?.Email || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [webinarData, setWebinarData] = useState<{
    SeminarName: string;
    SeminarImage: string;
    Description: string;
    Content: string;
    Access?: {
      Success: boolean;
      Msg: {
        StreamingInfo?: {
          stream_url: string;
        };
      };
    };
  } | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(true);

  useEffect(() => {
    if (memberData?.Email) {
      setEmail(memberData.Email);
    }
  }, [memberData]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventId || !email) return;

    setLoading(true);
    setError(null);

    try {
      const siteKey = import.meta.env.VITE_SITE_KEY;
      const data = await getStreamingWebinarById(eventId, siteKey, memberData?.MemberCode || '', email);
      setWebinarData(data);
      setShowEmailForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load webinar');
    } finally {
      setLoading(false);
    }
  };

  if (!eventId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
        <WMCHeader />
        <div className="flex items-center justify-center min-h-[80vh] p-8">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-600 mb-2">Invalid Webinar</h2>
            <p className="text-gray-600 mb-4">No webinar ID provided</p>
            <button
              onClick={() => navigate('/webinars')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View All Webinars
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
      <div className="p-8 pt-24">
        <div className="max-w-4xl mx-auto">
          {showEmailForm ? (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-[#0d203b] mb-4">Access Webinar</h2>
              <p className="text-gray-600 mb-6">
                Enter your registered email address to access the webinar.
              </p>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Loading...
                    </div>
                  ) : (
                    'Access Webinar'
                  )}
                </button>
              </form>

              <p className="text-sm text-gray-500 mt-4 text-center">
                Having issues? Contact{' '}
                <a href="mailto:support@wealthmastersclub.com" className="text-blue-600 hover:underline">
                  support@wealthmastersclub.com
                </a>
              </p>
            </div>
          ) : webinarData ? (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-[#0d203b] mb-4">{webinarData.SeminarName}</h1>

              {webinarData.SeminarImage && (
                <img
                  src={webinarData.SeminarImage}
                  alt={webinarData.SeminarName}
                  className="w-full rounded-lg mb-6"
                />
              )}

              {webinarData.Description && (
                <div
                  className="prose max-w-none mb-6"
                  dangerouslySetInnerHTML={{ __html: webinarData.Description }}
                />
              )}

              {webinarData.Content && (
                <div
                  className="prose max-w-none mb-6"
                  dangerouslySetInnerHTML={{ __html: webinarData.Content }}
                />
              )}

              {webinarData.Access?.Success && webinarData.Access.Msg.StreamingInfo?.stream_url && (
                <div className="mt-6">
                  <video
                    controls
                    className="w-full rounded-lg"
                    src={webinarData.Access.Msg.StreamingInfo.stream_url}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              <button
                onClick={() => navigate('/webinars')}
                className="mt-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Back to Webinars
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <WMCFooter />
    </div>
  );
};

export default WebinarView;
