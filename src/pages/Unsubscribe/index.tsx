import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WMCHeader, WMCFooter } from '../../components';

interface UnsubscribeResult {
  Success: boolean;
  Msg: { message?: string } | string[];
  AlertType?: string;
}

const Unsubscribe: React.FC = () => {
  const { memberCode, section } = useParams<{ memberCode: string; section?: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<UnsubscribeResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const performUnsubscribe = async () => {
      if (!memberCode) {
        setResult({
          Success: false,
          Msg: { message: 'Invalid unsubscribe link' },
          AlertType: 'error',
        });
        setIsLoading(false);
        return;
      }

      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        if (!baseUrl) {
          throw new Error('API URL is not defined');
        }

        let apiUrl = `${baseUrl}/client/unsubscribe?member_code=${memberCode}`;
        if (section) {
          apiUrl += `&unsubscribe_section=${section}`;
        }

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: UnsubscribeResult = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Unsubscribe error:', error);
        setResult({
          Success: false,
          Msg: { message: error instanceof Error ? error.message : 'An error occurred' },
          AlertType: 'error',
        });
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    };

    performUnsubscribe();
  }, [memberCode, section, navigate]);

  const getMessage = (): string => {
    if (!result) return '';
    const msg = result.Msg;
    if (Array.isArray(msg)) return msg[0] || '';
    if (typeof msg === 'object' && 'message' in msg) return msg.message || '';
    return '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
      <WMCHeader />
      <div className="flex items-center justify-center min-h-[80vh] p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Processing your request...</p>
            </>
          ) : result ? (
            <>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                result.Success ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {result.Success ? (
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <h2 className={`text-xl font-semibold mb-2 ${result.Success ? 'text-green-600' : 'text-red-600'}`}>
                {result.Success ? 'Unsubscribed Successfully' : 'Unsubscribe Failed'}
              </h2>
              <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: getMessage() }} />
              <p className="text-gray-400 text-sm">Redirecting to home page...</p>
            </>
          ) : null}
        </div>
      </div>
      <WMCFooter />
    </div>
  );
};

export default Unsubscribe;
