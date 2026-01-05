import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader, WMCHeader, WMCFooter } from '../../components';
import { getReferralSettings, getReferralSummary, updateCompoundingPercentage } from '../../services/api';

interface ReferralSummaryData {
  Inactive: number;
  NotPaying: number;
  Paying: number;
}

const Referrals: React.FC = () => {
  const { state } = useAuth();
  const memberData = state.memberData;

  const [compoundingPercentage, setCompoundingPercentage] = useState(0);
  const [referralSummary, setReferralSummary] = useState<ReferralSummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPercentage, setNewPercentage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const memberCode = memberData?.MemberCode || '';

  useEffect(() => {
    const fetchReferralData = async () => {
      if (!memberCode) {
        setIsLoading(false);
        return;
      }

      try {
        const siteKey = import.meta.env.VITE_SITE_KEY || '';

        // Fetch referral settings
        try {
          const settingsData = await getReferralSettings(memberCode, siteKey);
          if (settingsData.Success && settingsData.Msg?.compounding_settings?.CompoundingPercentage) {
            setCompoundingPercentage(settingsData.Msg.compounding_settings.CompoundingPercentage);
            setNewPercentage(settingsData.Msg.compounding_settings.CompoundingPercentage);
          }
        } catch (error) {
          console.error('Error fetching referral settings:', error);
          setCompoundingPercentage(0);
          setNewPercentage(0);
        }

        // Fetch referral summary
        try {
          const summaryData = await getReferralSummary(memberCode, siteKey);
          if (summaryData.Success && summaryData.Msg?.referrals_linear) {
            setReferralSummary(summaryData.Msg.referrals_linear);
          }
        } catch (error) {
          console.error('Error fetching referral summary:', error);
          setReferralSummary({ Inactive: 0, NotPaying: 0, Paying: 0 });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferralData();
  }, [memberCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const siteKey = import.meta.env.VITE_SITE_KEY || '';
      const response = await updateCompoundingPercentage(memberCode, siteKey, newPercentage);

      if (response.Success) {
        setCompoundingPercentage(newPercentage);
        setIsModalOpen(false);
      } else {
        setError(response.Msg || 'Failed to update percentage');
      }
    } catch (err) {
      setError('An error occurred while updating the percentage');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!memberData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
      <WMCHeader />
      <div className="p-8 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0d203b] font-[var(--font-family-heading)]">
              Referrals
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your referral network and compounding settings
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader />
            </div>
          ) : (
            <>
              {/* Summary and Compounding Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Referrals Summary Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6 text-[#0d203b]">Referrals Summary</h2>
                  <div className="space-y-4">
                    {referralSummary ? (
                      <>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-red-100 text-red-600">
                              <Clock className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Inactive</div>
                              <div className="text-xs text-gray-500">Unsubscribed referrals</div>
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-red-600">{referralSummary.Inactive}</div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                              <ArrowDownRight className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Not Paying</div>
                              <div className="text-xs text-gray-500">Non-paying members</div>
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-yellow-600">{referralSummary.NotPaying}</div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                              <ArrowUpRight className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Paying</div>
                              <div className="text-xs text-gray-500">Active paying members</div>
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-green-600">{referralSummary.Paying}</div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No referral data available</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Compounding Percentage Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6 text-[#0d203b]">Compounding Percentage</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-center h-40">
                      <div className="text-center">
                        <div className="relative inline-block">
                          <div className="text-6xl font-bold text-blue-600">{compoundingPercentage}</div>
                          <span className="absolute -right-6 top-2 text-3xl font-semibold text-blue-500">%</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-3">Current Compounding Rate</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Applied to referral commission
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg"
                    >
                      Change Percentage
                    </button>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6 text-[#0d203b]">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    {
                      q: "What is Compounding Percentage?",
                      a: "Percentage of Referral Commission to Compound into Club Units."
                    },
                    {
                      q: "What are Inactive Referrals?",
                      a: "Referrals who have unsubscribed from Wealth Masters Club."
                    },
                    {
                      q: "What are Not Paying Referrals?",
                      a: "Referrals who are not yet paying members of the Wealth Masters Club."
                    },
                    {
                      q: "What are Paying Referrals?",
                      a: "Active members who are currently contributing to your commission earnings."
                    }
                  ].map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                      <p className="text-gray-600 text-sm">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Change Compounding Percentage Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setError('');
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-[#0d203b]">
              Change Compounding Percentage
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Select Percentage
                  </label>
                  <span className="text-2xl font-bold text-blue-600">{newPercentage}%</span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={newPercentage}
                  onChange={(e) => setNewPercentage(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  style={{
                    background: `linear-gradient(to right, #2563eb 0%, #2563eb ${newPercentage}%, #e5e7eb ${newPercentage}%, #e5e7eb 100%)`
                  }}
                />

                {/* Range Labels */}
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  This percentage of your referral commission will be converted to Club Units
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setError('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <WMCFooter />
    </div>
  );
};

export default Referrals;
