import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';
import DOMPurify from 'dompurify';
import { useAuth } from '../../contexts/AuthContext';
import { WMCHeader, WMCFooter } from '../../components';
import { getStreamingWebinarById, setWebinarAsAttended, sendPostWebinarNotification } from '../../services/api';

interface WebinarStreamingData {
  SeminarId: number;
  SeminarName: string;
  SeminarImage: string;
  Description: string;
  Content: string;
  EventDate: string;
  StartTime: string;
  DurationCode: string;
  DurationQuantity: number;
  LanguageCode: string;
  Access: {
    Success: boolean;
    Msg: {
      ClientId: number;
      EnrolmentId: number;
      Streaming: number;
      Image: string;
      StreamablePeriod: boolean;
      StreamingInfo?: {
        stream_url: string;
        hls_url: string;
        dash_url: string;
        expires_at: string;
      };
    };
  };
}

type WebinarStatus = 'not_started' | 'no_media' | 'streaming' | null;

const WebinarView: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { state } = useAuth();
  const memberData = state.memberData;

  const lastNotificationTimeRef = useRef<number | null>(null);
  const [webinar, setWebinar] = useState<WebinarStreamingData | null>(null);
  const [webinarStatus, setWebinarStatus] = useState<WebinarStatus>(null);
  const [webinarStart, setWebinarStart] = useState<Date | null>(null);
  const [webinarFile, setWebinarFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [email, setEmail] = useState(memberData?.Email || '');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<ReturnType<typeof videojs> | null>(null);
  const [memberCode, setMemberCode] = useState<string | null>(memberData?.MemberCode || null);

  useEffect(() => {
    if (!eventId || isNaN(parseInt(eventId))) {
      setFormError('Invalid event ID. Please check the URL and try again.');
      return;
    }

    if (memberData?.Email) {
      setEmail(memberData.Email);
      setMemberCode(memberData.MemberCode || null);
    }
  }, [eventId, memberData]);

  const fetchWebinar = useCallback(async (userEmail: string) => {
    try {
      const siteKey = import.meta.env.VITE_SITE_KEY;
      if (!siteKey) {
        throw new Error('Site key is not defined');
      }
      const webinarData = await getStreamingWebinarById(eventId!, siteKey, memberCode || '', userEmail);
      setWebinar(webinarData);
      setError(null);
      setFormError(null);
      setShowModal(false);

      if (webinarData?.Access.Msg.EnrolmentId && memberCode) {
        await setWebinarAsAttended(webinarData.Access.Msg.EnrolmentId, siteKey, memberCode).catch((error) =>
          console.error('Failed to mark webinar as attended:', error)
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load webinar. Please check the event ID or your email and try again.';
      setFormError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [eventId, memberCode]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);
    await fetchWebinar(email);
  };

  // Process webinar data and determine status
  useEffect(() => {
    if (webinar && webinar.Access && webinar.Access.Success) {
      const { SeminarId, EventDate, StartTime, DurationCode, DurationQuantity } = webinar;
      const { ClientId, StreamingInfo, StreamablePeriod } = webinar.Access.Msg;

      const today = new Date();
      let start = new Date(`${EventDate}T${StartTime}`);
      const end = new Date(start);

      if (DurationCode === 'DUR-H') {
        end.setHours(end.getHours() + DurationQuantity);
      } else {
        end.setHours(end.getHours() + (DurationQuantity < 2 ? DurationQuantity * 9 : DurationQuantity));
      }

      // Special handling for certain seminars/clients
      if (![104, 105].includes(SeminarId) && [41808, 67802, 877433, 80642, 43856, 845869].includes(ClientId)) {
        start.setMinutes(start.getMinutes() - 120);
      }

      start.setMinutes(start.getMinutes() - 10);

      let status: WebinarStatus;
      if (StreamablePeriod === false) {
        setToastMessage(
          webinar.LanguageCode === 'LANG-E'
            ? 'The streaming period for this webinar has expired. Please contact our support team at <a href="mailto:events@wealthmastersclub.com" class="text-blue-300 hover:text-blue-400">events@wealthmastersclub.com</a> for assistance.'
            : 'Die stroomtydperk vir hierdie webinar het verstryk. Kontak asseblief ons ondersteuningspan by <a href="mailto:events@wealthmastersclub.com" class="text-blue-300 hover:text-blue-400">events@wealthmastersclub.com</a> vir hulp.'
        );
        setTimeout(() => setToastMessage(null), 5000);
        status = null;
      } else if (today < start) {
        status = 'not_started';
      } else if (!webinar.Access.Msg.Streaming) {
        status = 'no_media';
      } else {
        status = 'streaming';
        if (StreamingInfo?.stream_url) {
          setWebinarFile(StreamingInfo.stream_url);
        }
      }

      setWebinarStart(start);
      setWebinarStatus(status);
    }
  }, [webinar]);

  // Auto-refresh when waiting for webinar to start
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (webinarStatus === 'not_started') {
      interval = setInterval(() => {
        window.location.reload();
      }, 60000);
    }
    return () => clearInterval(interval);
  }, [webinarStatus]);

  // Initialize video.js player
  useEffect(() => {
    if (webinarStatus === 'streaming' && videoRef.current && webinarFile) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        preload: 'auto',
        fluid: true,
        responsive: true,
        poster: `https://backoffice.treoc.com/data/archive/documents/images/${webinar?.Access.Msg.Image || 'default.png'}`,
        techOrder: ['html5'],
        html5: {
          nativeAudioTracks: false,
          nativeVideoTracks: false,
          hls: {
            overrideNative: false,
            enableLowInitialPlaylist: false,
          },
        },
        suppressNotSupportedError: true,
      });

      const player = playerRef.current;

      player.ready(() => {
        try {
          const mainSource = {
            src: webinarFile,
            type: 'video/mp4',
          };
          player.src(mainSource);
        } catch (videoError) {
          console.error('Error setting video source:', videoError);
          setError(
            webinar?.LanguageCode === 'LANG-E'
              ? 'Unable to initialize video player. Please try refreshing the page.'
              : 'Kan nie videospeler inisialiseer nie. Probeer asseblief om die bladsy te herlaai.'
          );
        }

        player.on('error', () => {
          const videoError = player.error();
          console.error('Video.js error:', videoError);

          if (videoError) {
            setError(
              webinar?.LanguageCode === 'LANG-E'
                ? 'Unable to load video: There was an issue loading the video stream. Please try refreshing the page.'
                : "Kan nie video laai nie: Daar was 'n probleem met die laai van die video stroom. Probeer asseblief om die bladsy te herlaai."
            );

            // Try HLS as fallback
            if (webinar?.Access.Msg.StreamingInfo?.hls_url) {
              player.src({
                src: webinar.Access.Msg.StreamingInfo.hls_url,
                type: 'application/x-mpegURL',
              });
            }
          }
        });

        // Download protection
        const videoElement = player.el().querySelector('video');
        if (videoElement) {
          videoElement.removeAttribute('src');
          videoElement.addEventListener('contextmenu', (e: Event) => e.preventDefault());
          videoElement.addEventListener('dragstart', (e: Event) => e.preventDefault());
          videoElement.addEventListener('selectstart', (e: Event) => e.preventDefault());
          videoElement.addEventListener('keydown', (e: KeyboardEvent) => {
            if ((e.ctrlKey && e.key === 's') || (e.ctrlKey && e.shiftKey && e.key === 'I') || e.key === 'F12') {
              e.preventDefault();
            }
          });
        }
      });

      // Post-webinar notification handler
      let cleanupTimeUpdate: (() => void) | undefined;
      player.ready(() => {
        const videoElement = player.el().querySelector('video');
        if (videoElement) {
          const handleTimeUpdate = () => {
            const vid = videoElement as HTMLVideoElement;
            const currentTime = vid.currentTime;
            const duration = vid.duration;

            if (duration - currentTime <= 300 && webinar?.Access.Msg.EnrolmentId) {
              const now = Date.now();
              if (!lastNotificationTimeRef.current || now - lastNotificationTimeRef.current > 60000) {
                sendPostWebinarNotification(
                  webinar.Access.Msg.EnrolmentId,
                  import.meta.env.VITE_SITE_KEY,
                  memberCode || ''
                ).catch((error) => console.error('Failed to send post-webinar notification:', error));
                lastNotificationTimeRef.current = now;
              }
            }
          };
          videoElement.addEventListener('timeupdate', handleTimeUpdate);
          cleanupTimeUpdate = () => {
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
          };
        }
      });

      return () => {
        if (cleanupTimeUpdate) cleanupTimeUpdate();
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, [webinarStatus, webinarFile, webinar, memberCode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
      <WMCHeader />

      <div
        className="min-h-screen flex items-center justify-center py-12 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/img/webinar.png)`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-8 text-center tracking-tight">
            Webinar Access
          </h1>

          {toastMessage && (
            <div className="bg-yellow-600/80 text-white p-4 rounded-xl mb-6 text-center max-w-3xl mx-auto">
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(toastMessage) }} />
            </div>
          )}

          {showModal && (
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg max-w-lg mx-auto">
              <h2 className="text-2xl font-bold text-white mb-4">Enter Your Email to Access the Webinar</h2>
              <p className="text-gray-300 mb-4">
                Use the email address you registered with to access the webinar. If you have issues, contact{' '}
                <a href="mailto:support@wealthmastersclub.com" className="text-blue-300 hover:text-blue-400">
                  support@wealthmastersclub.com
                </a>
                .
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {formError && <div className="bg-red-600/80 text-white p-3 rounded-lg text-sm">{formError}</div>}
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-semibold disabled:bg-blue-400 transform hover:scale-105"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Request Access'}
                </button>
              </form>
            </div>
          )}

          {webinar && webinar.Access && webinar.Access.Success && (
            <div className="space-y-6">
              {webinar.SeminarImage && (
                <img
                  src={webinar.SeminarImage}
                  alt={webinar.SeminarName}
                  className="w-full object-cover rounded-xl shadow-lg"
                />
              )}
              {webinar.Description && (
                <div
                  className="text-gray-300 text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(webinar.Description) }}
                />
              )}
              {webinar.Content && (
                <div
                  className="text-gray-300 text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(webinar.Content) }}
                />
              )}

              <div className="videoContainer">
                {webinar.Access.Msg.StreamablePeriod === false ? (
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg text-center">
                    <p className="text-gray-300">
                      {webinar.LanguageCode === 'LANG-E'
                        ? 'The viewing period for this webinar has ended. Contact '
                        : 'Die besigtigingstydperk vir hierdie webinar het geëindig. Kontak '}
                      <a href="mailto:support@wealthmastersclub.com" className="text-blue-300 hover:text-blue-400">
                        support@wealthmastersclub.com
                      </a>
                      {webinar.LanguageCode === 'LANG-E' ? ' for assistance.' : ' vir hulp.'}
                    </p>
                  </div>
                ) : webinarStatus === 'not_started' ? (
                  <div className="text-center">
                    <div className="bg-yellow-600/80 text-white p-4 rounded-xl mb-4">
                      {webinar.LanguageCode === 'LANG-E'
                        ? `The webinar has not started yet. Access will be granted on ${webinarStart?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at ${webinarStart?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
                        : `Die webinar het nog nie begin nie. Toegang sal gegee word op ${webinarStart?.toLocaleDateString('af-ZA', { month: 'long', day: 'numeric', year: 'numeric' })} teen ${webinarStart?.toLocaleTimeString('af-ZA', { hour: '2-digit', minute: '2-digit' })}`}
                    </div>
                    <img
                      src={`https://backoffice.treoc.com/data/archive/documents/images/${webinar?.Access.Msg.Image || 'default.png'}`}
                      alt="Webinar Banner"
                      className="w-full object-cover rounded-xl shadow-lg"
                    />
                  </div>
                ) : webinarStatus === 'no_media' ? (
                  <div className="text-center">
                    <div className="bg-yellow-600/80 text-white p-4 rounded-xl mb-4">
                      No stream was detected for this webinar. Please contact{' '}
                      <a href="mailto:support@wealthmastersclub.com" className="text-blue-300 hover:text-blue-400">
                        support@wealthmastersclub.com
                      </a>{' '}
                      for support.
                    </div>
                    <img
                      src="https://backoffice.treoc.com/data/archive/documents/images/60e6d9c94ab08.png"
                      alt="No Media Banner"
                      className="w-full object-cover rounded-xl shadow-lg"
                    />
                  </div>
                ) : webinarStatus === 'streaming' ? (
                  <div
                    className="relative rounded-xl overflow-hidden shadow-lg mx-auto select-none"
                    style={{ width: '90vw', maxWidth: '750px', userSelect: 'none', WebkitUserSelect: 'none' }}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  >
                    <div className="w-full aspect-video">
                      <video
                        ref={videoRef}
                        id="webinar"
                        className="video-js vjs-fill"
                        controls
                        preload="auto"
                        style={{ width: '100%', height: '100%' }}
                        onContextMenu={(e) => e.preventDefault()}
                        controlsList="nodownload nofullscreen noremoteplayback"
                        disablePictureInPicture
                      >
                        <p className="text-gray-300">
                          To view this webinar, please enable JavaScript and consider upgrading to a web browser that supports
                          HTML5 video.
                        </p>
                      </video>
                    </div>
                    {error && webinarFile && (
                      <div className="mt-4 p-4 bg-yellow-600/20 rounded-xl border border-yellow-600/30">
                        <p className="text-sm text-gray-300 mb-3">
                          {webinar?.LanguageCode === 'LANG-E'
                            ? 'Having trouble? Try opening the video directly:'
                            : 'Ondervind probleme? Probeer om die video direk oop te maak:'}
                        </p>
                        <button
                          onClick={() => window.open(webinarFile, '_blank')}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                        >
                          {webinar?.LanguageCode === 'LANG-E' ? 'Test Video URL in New Tab' : 'Toets Video URL in Nuwe Bladsy'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/webinars')}
              className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
            >
              Back to Webinars
            </button>
          </div>
        </div>
      </div>

      <WMCFooter />
    </div>
  );
};

export default WebinarView;
