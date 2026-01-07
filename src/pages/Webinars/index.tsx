import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WMCHeader, WMCFooter } from '../../components';
import { useWebinars } from '../../hooks/useWebinars';
import type { WebinarData } from '../../hooks/useWebinars';

const Webinars: React.FC = () => {
  const navigate = useNavigate();
  const { webinars, loading, error } = useWebinars();

  const handleWebinarClick = (webinar: WebinarData) => {
    // Navigate to webinar detail page for booking
    if (webinar.EventId) {
      navigate(`/webinar/${webinar.EventId}`);
    } else if (webinar.BookingLink) {
      // Fallback to external link if no EventId
      window.open(webinar.BookingLink, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
      <WMCHeader />

      <div className="p-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0d203b] font-[var(--font-family-heading)]">
              Webinars
            </h1>
            <p className="text-gray-600 mt-2">Join our live educational webinars and events</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm p-6">
            {loading ? (
              <div className="text-center text-gray-600 py-8">Loading webinars...</div>
            ) : webinars.length === 0 ? (
              <div className="text-center text-gray-600 py-8">No webinars available at this time</div>
            ) : (
              <div className="grid gap-6">
                {webinars.map((webinar) => (
                  <div
                    key={webinar.EventId || webinar.Title}
                    className="border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                    onClick={() => handleWebinarClick(webinar)}
                  >
                    {webinar.SeminarImage && (
                      <img
                        src={webinar.SeminarImage}
                        alt={webinar.Title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2 text-[#0d203b]">{webinar.Title}</h3>
                      {webinar.Description && (
                        <div
                          className="text-gray-600 text-sm prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: webinar.Description }}
                        />
                      )}
                      <button
                        className="mt-4 px-4 py-2 bg-[#4782b5] text-white rounded-lg hover:bg-[#3a6b8c] transition font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWebinarClick(webinar);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <WMCFooter />
    </div>
  );
};

export default Webinars;
