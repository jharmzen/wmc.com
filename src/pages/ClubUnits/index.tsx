import React, { useState, useEffect } from 'react';
import { TrendingUp, ArrowUpRight, Gift, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader, WMCHeader, WMCFooter } from '../../components';
import { getClubUnitData, redeemClubUnits } from '../../services/api';

interface ClubUnitData {
  Amount: string;
  Amount_BroughtOver: string;
  Amount_Current: string;
  Available: string;
  Available_BroughtOver: string;
  Available_Current: string;
  Compounded: string;
  Compounded_BroughtOver: string;
  Compounded_Current: string;
  FirstAllocation: number;
  FirstAllocation_BroughtOver: number;
  FirstAllocation_Current: number;
  Recurring: number;
  Recurring_BroughtOver: number;
  Recurring_Current: number;
  Redeemed: number;
  Redeemed_BroughtOver: number;
  Redeemed_Current: number;
}

const ClubUnits: React.FC = () => {
  const { state } = useAuth();
  const memberData = state.memberData;

  const [clubUnitData, setClubUnitData] = useState<ClubUnitData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [redeemAmount, setRedeemAmount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Member data values
  const clubUnits = memberData?.ClubUnits || '0';
  const clubUnitPricePerUnit = memberData?.ClubUnitPricePerUnit || 0;
  const clubUnitAmount = memberData?.ClubUnitAmount || '0';
  const clubUnitGrowth = memberData?.ClubUnitGrowth || 0;
  const currencyCode = memberData?.CurrencyCode || 'ZAR';
  const exchangeRate = memberData?.ExchangeRate || 1;
  const clubUnitLimit = memberData?.ClubUnitPercentageLimit || 0.1;
  const memberCode = memberData?.MemberCode || '';

  // Calculate values from memberData
  const numericClubUnits = parseFloat(clubUnits.replace(/,/g, ''));
  const numericClubUnitPricePerUnit = clubUnitPricePerUnit;
  const numericClubUnitAmount = parseFloat(clubUnitAmount.replace(/,/g, ''));
  const unitsToNextMilestone = Math.max(0, 2000 - numericClubUnits);

  // Limit available units to percentage (e.g., 10% of total)
  const limitedUnits = numericClubUnits * clubUnitLimit;

  // Calculate estimated redeem value
  const estimatedRedeemValue = redeemAmount * numericClubUnitPricePerUnit;

  // Function to parse currency strings (e.g., "R 377,551.71")
  const parseCurrencyString = (value: string | undefined): number => {
    if (!value) return 0;
    const cleaned = value.replace(/[^\d.-]/g, '');
    return parseFloat(cleaned) || 0;
  };

  useEffect(() => {
    const fetchClubUnitData = async () => {
      if (!memberCode) {
        setIsLoading(false);
        return;
      }

      try {
        const siteKey = import.meta.env.VITE_SITE_KEY || '';
        const summaryData = await getClubUnitData(memberCode, siteKey);
        if (summaryData.Success && summaryData.Msg) {
          setClubUnitData(summaryData.Msg);
        }
      } catch (error) {
        console.error('Error fetching club unit data:', error);
        setClubUnitData({
          Amount: '0.00',
          Amount_BroughtOver: '0.00',
          Amount_Current: '0.00',
          Available: '0.00',
          Available_BroughtOver: '0.00',
          Available_Current: '0.00',
          Compounded: '0.00',
          Compounded_BroughtOver: '0.00',
          Compounded_Current: '0.00',
          FirstAllocation: 0,
          FirstAllocation_BroughtOver: 0,
          FirstAllocation_Current: 0,
          Recurring: 0,
          Recurring_BroughtOver: 0,
          Recurring_Current: 0,
          Redeemed: 0,
          Redeemed_BroughtOver: 0,
          Redeemed_Current: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubUnitData();
  }, [memberCode]);

  // Parse values from clubUnitData
  const broughtOverBalance = parseCurrencyString(clubUnitData?.Amount_BroughtOver);
  const broughtOverClubUnits = parseCurrencyString(clubUnitData?.Available_BroughtOver);

  // Calculate percentage limits for display
  const tenPercentBalanceAvailable = broughtOverBalance * clubUnitLimit;
  const tenPercentClubUnitsAvailable = broughtOverClubUnits * clubUnitLimit;

  // Format for display
  const tenPercentFormattedBalance = tenPercentBalanceAvailable.toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const tenPercentFormattedUnits = tenPercentClubUnitsAvailable.toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleRedeemUnits = async () => {
    setErrorMessage('');

    // Validate minimum
    if (redeemAmount < 100) {
      setErrorMessage('You must redeem at least 100 units.');
      return;
    }

    // Validate maximum
    if (redeemAmount > tenPercentClubUnitsAvailable) {
      setErrorMessage(`You cannot redeem more than ${tenPercentFormattedUnits} units.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const siteKey = import.meta.env.VITE_SITE_KEY || '';
      await redeemClubUnits(memberCode, siteKey, redeemAmount.toString());

      setShowSuccessMessage(true);
      setRedeemAmount(0);

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);

      // Refresh club unit data
      const updatedData = await getClubUnitData(memberCode, siteKey);
      if (updatedData.Success && updatedData.Msg) {
        setClubUnitData(updatedData.Msg);
      }
    } catch (error) {
      console.error('Error redeeming units:', error);
      setErrorMessage('There was an error redeeming your units. Please try again.');
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
              Club Units
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your club units and redemptions
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader />
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Units Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Total Units</h3>
                  <div className="text-3xl font-bold text-[#0d203b]">{clubUnits}</div>
                  <div className="flex items-center mt-2 text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">+{clubUnitGrowth}% since Aug, 2018</span>
                  </div>
                </div>

                {/* Value Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Value in {currencyCode}</h3>
                  <div className="text-3xl font-bold text-[#0d203b]">
                    {currencyCode}{' '}
                    {numericClubUnitAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    @ {exchangeRate.toFixed(2)} {currencyCode} per unit
                  </div>
                </div>

                {/* Milestone Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Next Milestone</h3>
                  <div className="text-3xl font-bold text-[#0d203b]">
                    {unitsToNextMilestone > 0 ? unitsToNextMilestone : '0'}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {unitsToNextMilestone > 0 ? 'units until 2,000 redemption' : 'Milestone reached!'}
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Units Summary */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6 text-[#0d203b]">Units Summary</h2>
                  <div className="space-y-4">
                    {/* Value Per Unit */}
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                          <ArrowUpRight className="h-5 w-5" />
                        </div>
                        <div className="font-medium text-gray-900">Value Per Unit</div>
                      </div>
                      <div className="text-right font-semibold text-blue-600">
                        {clubUnitPricePerUnit.toFixed(2)} {currencyCode}
                      </div>
                    </div>

                    {clubUnitData && (
                      <>
                        {/* Balance Brought Over */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-full bg-green-100 text-green-600">
                              <ArrowUpRight className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Balance Brought Over</div>
                              <div className="text-xs text-gray-500">Total units from previous period</div>
                            </div>
                          </div>
                          <div className="text-right font-semibold text-green-600">
                            {clubUnitData.Available_BroughtOver}
                          </div>
                        </div>

                        {/* Total Available */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-full bg-green-100 text-green-600">
                              <ArrowUpRight className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Total Available ({clubUnitLimit * 100}%)</div>
                              <div className="text-xs text-gray-500">Maximum redeemable units</div>
                            </div>
                          </div>
                          <div className="text-right font-semibold text-green-600">
                            {tenPercentFormattedUnits}
                          </div>
                        </div>

                        {/* Amount Available */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-full bg-green-100 text-green-600">
                              <Gift className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Amount Available ({clubUnitLimit * 100}%)</div>
                              <div className="text-xs text-gray-500">Maximum redemption value</div>
                            </div>
                          </div>
                          <div className="text-right font-semibold text-green-600">
                            {currencyCode} {tenPercentFormattedBalance}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Redeem Units Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6 text-[#0d203b]">Redeem Units</h2>

                  {errorMessage && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Input Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount to Redeem
                      </label>
                      <input
                        type="number"
                        value={redeemAmount || ''}
                        onChange={(e) => {
                          setRedeemAmount(Number(e.target.value));
                          setErrorMessage('');
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter units amount"
                        min={100}
                        max={tenPercentClubUnitsAvailable}
                      />
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-500">
                          Minimum redemption: <span className="font-medium">100 units</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Maximum redemption: <span className="font-medium">{tenPercentFormattedUnits} units</span>
                        </p>
                      </div>
                    </div>

                    {/* Redemption Summary */}
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700">Units Available ({clubUnitLimit * 100}% max)</span>
                        <span className="font-medium text-gray-900">{limitedUnits.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700">Conversion Rate</span>
                        <span className="font-medium text-gray-900">
                          {numericClubUnitPricePerUnit.toFixed(2)} {currencyCode} per unit
                        </span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-blue-200">
                        <span className="font-semibold text-gray-900">Estimated Value</span>
                        <span className="font-bold text-blue-600 text-lg">
                          {currencyCode}{' '}
                          {estimatedRedeemValue.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Redeem Button */}
                    <button
                      onClick={handleRedeemUnits}
                      disabled={
                        isSubmitting ||
                        redeemAmount < 100 ||
                        redeemAmount > tenPercentClubUnitsAvailable
                      }
                      className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Processing...' : 'Redeem Units'}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md flex items-center max-w-md">
            <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
            <div>
              <p className="font-semibold">Units Redeemed Successfully</p>
              <p className="text-sm">Your redemption request has been processed.</p>
            </div>
          </div>
        </div>
      )}
      <WMCFooter />
    </div>
  );
};

export default ClubUnits;
