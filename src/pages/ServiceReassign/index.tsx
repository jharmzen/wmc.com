import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getContactRequest, getAssignees, reassignContactRequest } from '../../services/api';
import { WMCHeader, WMCFooter } from '../../components';

interface ContactRequestData {
  ServiceProviderContactRequestId: number;
  Name: string;
  Email: string;
  Phone: string;
  RequestDate: string;
  Subject: string;
  Comment: string;
}

interface Assignee {
  id: number;
  name: string;
}

const ServiceReassign: React.FC = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const { state } = useAuth();
  const memberData = state.memberData;

  const [request, setRequest] = useState<ContactRequestData | null>(null);
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [selectedAssignee, setSelectedAssignee] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!requestId || !memberData) {
        setError('Invalid request or not logged in');
        setLoading(false);
        return;
      }

      try {
        const siteKey = import.meta.env.VITE_SITE_KEY;
        const [requestData, assigneeData] = await Promise.all([
          getContactRequest(requestId, siteKey, memberData.MemberCode),
          getAssignees(siteKey, memberData.MemberCode)
        ]);
        setRequest(requestData);
        setAssignees(assigneeData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [requestId, memberData]);

  const handleReassign = async () => {
    if (!requestId || !selectedAssignee || !memberData) return;

    setSubmitting(true);
    setError(null);

    try {
      const siteKey = import.meta.env.VITE_SITE_KEY;
      await reassignContactRequest(requestId, selectedAssignee, siteKey, memberData.MemberCode);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reassign request');
    } finally {
      setSubmitting(false);
    }
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

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
        <WMCHeader />
        <div className="flex items-center justify-center min-h-[80vh] p-8">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-green-600 mb-2">Request Reassigned</h2>
            <p className="text-gray-600">Redirecting to dashboard...</p>
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
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-[#0d203b] mb-6">Reassign Service Request</h1>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            {request && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-[#0d203b] mb-2">Request Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {request.Name}</p>
                  <p><span className="font-medium">Email:</span> {request.Email}</p>
                  <p><span className="font-medium">Phone:</span> {request.Phone}</p>
                  <p><span className="font-medium">Subject:</span> {request.Subject}</p>
                  <p><span className="font-medium">Date:</span> {request.RequestDate}</p>
                  {request.Comment && (
                    <p><span className="font-medium">Comment:</span> {request.Comment}</p>
                  )}
                </div>
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-2">
                Select New Assignee
              </label>
              <select
                id="assignee"
                value={selectedAssignee}
                onChange={(e) => setSelectedAssignee(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submitting}
              >
                <option value="">Select an assignee...</option>
                {assignees.map((assignee) => (
                  <option key={assignee.id} value={assignee.id.toString()}>
                    {assignee.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReassign}
                disabled={!selectedAssignee || submitting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {submitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Reassigning...
                  </div>
                ) : (
                  'Reassign Request'
                )}
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                disabled={submitting}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <WMCFooter />
    </div>
  );
};

export default ServiceReassign;
