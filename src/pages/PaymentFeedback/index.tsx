import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { handlePaymentFeedback } from '../../services/api';
import { WMCHeader, WMCFooter } from '../../components';

interface FeedbackData {
  Success: boolean;
  Msg: { message?: string } | string[];
  AlertType?: string;
}

const PaymentFeedback: React.FC = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!invoiceId) {
        setFeedback({
          Success: false,
          Msg: { message: 'Invalid invoice ID' },
          AlertType: 'error',
        });
        setIsLoading(false);
        return;
      }

      try {
        const data = await handlePaymentFeedback(invoiceId);
        setFeedback(data as FeedbackData);
      } catch (error) {
        console.error('Payment feedback error:', error);
        setFeedback({
          Success: false,
          Msg: { message: error instanceof Error ? error.message : 'An error occurred' },
          AlertType: 'error',
        });
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          navigate('/dashboard');
        }, 4000);
      }
    };

    fetchFeedback();
  }, [invoiceId, navigate]);

  const getMessage = (): string => {
    if (!feedback) return '';
    const msg = feedback.Msg;
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
              <p className="text-gray-600">Processing payment feedback...</p>
            </>
          ) : feedback ? (
            <>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                feedback.Success ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {feedback.Success ? (
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <h2 className={`text-xl font-semibold mb-2 ${feedback.Success ? 'text-green-600' : 'text-red-600'}`}>
                {feedback.Success ? 'Payment Successful' : 'Payment Issue'}
              </h2>
              <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: getMessage() }} />
              <p className="text-gray-400 text-sm">Redirecting to dashboard...</p>
            </>
          ) : null}
        </div>
      </div>
      <WMCFooter />
    </div>
  );
};

export default PaymentFeedback;
