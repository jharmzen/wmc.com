import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShareIcon, Users, TrendingUp, Calendar } from 'lucide-react';
import { getDashboardStats, getUpcomingEvents } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { WMCHeader, WMCFooter } from '../../components';

const Dashboard: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const memberStatusCode = state.memberData?.MemberStatusCode || '';

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Allowed member status codes for restricted features
  const allowedCodes = ['MS-D', 'MS-EXEC', 'MS-PREM', 'MS-PE', 'MS-P', 'MS-PG', 'MS-PS'];

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      try {
        // Use member data if available
        if (state.memberData) {
          await getDashboardStats(state.memberData);
          await getUpcomingEvents(state.memberData);
        } else {
          // Fallback to regular API calls
          await getDashboardStats();
          await getUpcomingEvents();
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load dashboard data');
          console.error('Dashboard data fetch error:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, [state.memberData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
        <WMCHeader />
        <div className="p-6 mt-16 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
        <WMCFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
        <WMCHeader />
        <div className="p-6 mt-16">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-4xl mx-auto">
            {error}
          </div>
        </div>
        <WMCFooter />
      </div>
    );
  }

  // Use real member data when available
  const memberData = state.memberData;
  const clubUnits = memberData?.ClubUnits || '0';
  const clubUnitAmount = memberData?.ClubUnitAmount || '0';
  const clubUnitPricePerUnit = memberData?.ClubUnitPricePerUnit || 0;
  const annualCommission = memberData?.AnnualCommission || 0;
  const formattedAnnualCommission = `${memberData?.CurrencyCode || 'R'} ${annualCommission.toLocaleString()}`;
  const growthRate = memberData?.ClubUnitGrowth || 0;
  const eventsCount = memberData?.Events?.length || 0;

  const statItems = [
    { label: 'Annual Commission', value: formattedAnnualCommission, icon: ShareIcon },
    { label: 'Club Units', value: clubUnits, icon: Users },
    { label: 'Growth Rate', value: `${growthRate}%`, icon: TrendingUp },
    { label: 'Events This Month', value: eventsCount.toString(), icon: Calendar }
  ];

  // Calculate club unit value
  const clubUnitValue = parseFloat(clubUnitAmount.replace(/,/g, ''));
  const formattedClubUnitValue = `${memberData?.CurrencyCode || 'R'} ${clubUnitValue.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
      <WMCHeader />

      <div className="p-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d203b] mb-6">Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statItems.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-blue-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Club Units Overview - Only for allowed members */}
          {allowedCodes.includes(memberStatusCode) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Club Units Overview</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Value</span>
                    <span className="font-medium">{clubUnits} Units</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-medium">{clubUnitPricePerUnit.toFixed(2)} {memberData?.CurrencyCode || 'ZAR'} per Unit</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Value ({memberData?.CurrencyCode || 'ZAR'})</span>
                    <span className="font-medium">{formattedClubUnitValue}</span>
                  </div>
                  <button
                    className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    onClick={() => navigate('/club-units')}
                  >
                    Redeem Units
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button
                    className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-left flex items-center justify-between"
                    onClick={() => navigate('/referrals')}
                  >
                    <span>Manage Referrals</span>
                    <ShareIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-left flex items-center justify-between"
                    onClick={() => navigate('/invoices')}
                  >
                    <span>View Invoices</span>
                    <Users className="h-5 w-5" />
                  </button>
                  <button
                    className="w-full px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition text-left flex items-center justify-between"
                    onClick={() => navigate('/events')}
                  >
                    <span>View Events</span>
                    <Calendar className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* For non-allowed members, show upgrade message */}
          {!allowedCodes.includes(memberStatusCode) && (
            <div className="bg-gradient-to-br from-[#0d203b] to-[#4782b5] rounded-xl shadow-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Upgrade Your Membership</h2>
              <p className="text-lg mb-6">
                Unlock exclusive features including club units, referral management, and more!
              </p>
              <button
                className="bg-[#ad7d13] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#8d6610] transition"
                onClick={() => navigate('/membership')}
              >
                Explore Membership Options
              </button>
            </div>
          )}
        </div>
      </div>

      <WMCFooter />
    </div>
  );
};

export default Dashboard;
