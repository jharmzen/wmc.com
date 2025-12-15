import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { WMCHeader, WMCFooter } from '../../components';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white text-right">
      {/* Header */}
      <WMCHeader />

      {/* Main Content */}
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d203b] mb-6">Dashboard</h1>
          
          {user && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Member Information</h2>
              <pre className="bg-gray-100 p-4 rounded text-left overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder cards for logged-in features */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Events</h3>
              <p className="text-gray-600">Manage events and registrations</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Content</h3>
              <p className="text-gray-600">Access exclusive content</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Profile</h3>
              <p className="text-gray-600">Update your personal information</p>
            </div>
          </div>
        </div>
      </div>

      <WMCFooter />
    </div>
  );
};

export default Dashboard;