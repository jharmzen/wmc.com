import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { bookWebinar } from '../../services/api';
import { redirectToPayGate } from '../../utils/payment';

interface PaymentParameters {
  UniqueTransactionDescription: string;
  TransactionAmount: number;
  CardholderName: string;
  CardholderEmail: string;
  m_1: number;
  m_2: number;
}

interface BookingResponseMsg {
  Streaming?: boolean;
  EmbeddedCode?: string | null;
  EnrolmentId?: number;
  BookingFeedback?: string[];
  BookingFeedback_Afr?: string[];
  PaymentParameters?: PaymentParameters;
}

interface WebinarBookingProps {
  eventId: string;
  languageCode?: string; // 'LANG-E' for English, 'LANG-A' for Afrikaans
  onSuccess?: (data: { Streaming: boolean; EmbeddedCode: string | null; EnrolmentId: number }) => void;
  onCancel?: () => void;
}

const WebinarBooking: React.FC<WebinarBookingProps> = ({ eventId, languageCode = 'LANG-E', onSuccess, onCancel }) => {
  const { state } = useAuth();
  const isAfrikaans = languageCode === 'LANG-A';
  const memberData = state.memberData;
  const memberCode = memberData?.MemberCode || '';
  const siteKey = import.meta.env.VITE_SITE_KEY;

  const [firstName, setFirstName] = useState(memberData?.FirstNames || '');
  const [surname, setSurname] = useState(memberData?.Surname || '');
  const [email, setEmail] = useState(memberData?.Email || '');
  const [mobile, setMobile] = useState(memberData?.Phone || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [pendingRegistration, setPendingRegistration] = useState<{
    Streaming: boolean;
    EmbeddedCode: string | null;
    EnrolmentId: number;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const data = await bookWebinar(eventId, firstName, surname, email, mobile, memberCode, siteKey);
      if (data.Success) {
        const msgObj = data.Msg as BookingResponseMsg;

        // Check if payment is required
        if (msgObj?.PaymentParameters && msgObj.PaymentParameters.TransactionAmount > 0) {
          setIsLoading(false);
          setIsProcessingPayment(true);

          // Redirect to PayGate after 2 second delay (matching template behavior)
          setTimeout(() => {
            redirectToPayGate(
              msgObj.PaymentParameters!.UniqueTransactionDescription,
              msgObj.PaymentParameters!.TransactionAmount,
              msgObj.PaymentParameters!.CardholderEmail
            );
          }, 2000);
          return;
        }

        // No payment required - show success
        const defaultMessage = isAfrikaans
          ? 'Webinar suksesvol bespreek!'
          : 'Successfully booked the webinar!';
        let successMessage = defaultMessage;

        if (typeof data.Msg === 'string') {
          successMessage = data.Msg;
        } else if (Array.isArray(data.Msg)) {
          successMessage = data.Msg[0] || successMessage;
        } else if (data.Msg && typeof data.Msg === 'object') {
          // Use Afrikaans feedback if available and language is Afrikaans
          if (isAfrikaans && 'BookingFeedback_Afr' in data.Msg && Array.isArray(data.Msg.BookingFeedback_Afr)) {
            successMessage = data.Msg.BookingFeedback_Afr[0] || successMessage;
          } else if ('BookingFeedback' in data.Msg && Array.isArray(data.Msg.BookingFeedback)) {
            successMessage = data.Msg.BookingFeedback[0] || successMessage;
          } else if ('message' in data.Msg) {
            successMessage = (data.Msg as { message: string }).message || successMessage;
          }
        }

        setSuccess(successMessage);

        if (data.Msg && typeof data.Msg === 'object' && !Array.isArray(data.Msg)) {
          setPendingRegistration(data.Msg as { Streaming: boolean; EmbeddedCode: string | null; EnrolmentId: number });
        } else {
          setPendingRegistration({ Streaming: true, EmbeddedCode: null, EnrolmentId: 0 });
        }

        setFirstName('');
        setSurname('');
        setEmail('');
        setMobile('');
      } else {
        let errorMessage = 'Registration failed';
        if (typeof data.Msg === 'string') {
          errorMessage = data.Msg;
        } else if (Array.isArray(data.Msg)) {
          errorMessage = data.Msg[0] || errorMessage;
        } else if (data.Msg && typeof data.Msg === 'object' && 'message' in data.Msg) {
          errorMessage = (data.Msg as { message: string }).message || errorMessage;
        }
        setError(errorMessage);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register for webinar');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess('');
    if (pendingRegistration && onSuccess) {
      onSuccess(pendingRegistration);
      setPendingRegistration(null);
    }
  };

  // Show payment processing state
  if (isProcessingPayment) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        <h3 className="text-xl font-semibold text-blue-600 mb-2">Processing Payment</h3>
        <p className="text-gray-600">Redirecting to secure payment page...</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-green-600 mb-4">Booking Successful</h3>
        <div
          className="text-gray-700 mb-6 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: success }}
        />
        <button
          onClick={handleClose}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
            Surname
          </label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Enter your surname"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your mobile number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Booking...
              </div>
            ) : (
              'Book Webinar'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WebinarBooking;
