import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { autoLogin } from '../../services/api';

const AutoLogin: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { setMemberData } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Logging you in...');

  useEffect(() => {
    const performAutoLogin = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid login token');
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

      try {
        const response = await autoLogin(token);
        if (response.Success && !Array.isArray(response.Msg) && 'MemberData' in response.Msg) {
          const memberData = response.Msg.MemberData;
          setMemberData(memberData);
          setStatus('success');
          setMessage('Successfully logged in! Redirecting...');
          setTimeout(() => navigate('/dashboard'), 1500);
        } else {
          throw new Error(Array.isArray(response.Msg) ? response.Msg[0] : 'Autologin failed');
        }
      } catch (error) {
        console.error('Autologin error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Autologin failed');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    performAutoLogin();
  }, [token, navigate, setMemberData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f9fc] to-white">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{message}</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-600 font-medium">{message}</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-red-600 font-medium">{message}</p>
            <p className="text-gray-500 text-sm mt-2">Redirecting to login...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AutoLogin;
