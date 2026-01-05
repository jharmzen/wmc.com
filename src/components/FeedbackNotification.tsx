import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import type { ApiResponse } from '../types';

interface FeedbackNotificationProps {
  feedback: ApiResponse<unknown> | null;
  onClose?: () => void;
  autoHideDelay?: number; // in milliseconds, default 4000
}

export const FeedbackNotification: React.FC<FeedbackNotificationProps> = ({
  feedback,
  onClose,
  autoHideDelay = 4000,
}) => {
  useEffect(() => {
    if (feedback && autoHideDelay > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, autoHideDelay);
      return () => clearTimeout(timer);
    }
  }, [feedback, onClose, autoHideDelay]);

  if (!feedback) return null;

  const { AlertType } = feedback;
  const msg = feedback.Msg as { message: string } | string[];
  const messageContent = Array.isArray(msg) ? msg[0] : 'message' in msg ? msg.message : '';

  let bgColor = 'bg-gray-100';
  let borderColor = 'border-gray-500';
  let textColor = 'text-gray-700';
  let Icon = CheckCircle;
  let title = 'Notification';

  switch (AlertType) {
    case 'success':
      bgColor = 'bg-green-100';
      borderColor = 'border-green-500';
      textColor = 'text-green-700';
      Icon = CheckCircle;
      title = 'Success';
      break;
    case 'warning':
      bgColor = 'bg-yellow-100';
      borderColor = 'border-yellow-500';
      textColor = 'text-yellow-700';
      Icon = AlertTriangle;
      title = 'Warning';
      break;
    case 'error':
      bgColor = 'bg-red-100';
      borderColor = 'border-red-500';
      textColor = 'text-red-700';
      Icon = XCircle;
      title = 'Error';
      break;
  }

  return (
    <div className={`fixed top-4 right-4 z-50 animate-fade-in`}>
      <div className={`${bgColor} border-l-4 ${borderColor} ${textColor} p-4 rounded-lg shadow-md flex items-center`}>
        <Icon className="h-6 w-6 mr-2" />
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm">{messageContent}</p>
        </div>
      </div>
    </div>
  );
};
