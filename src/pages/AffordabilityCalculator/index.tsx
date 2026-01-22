import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { WMCHeader, WMCFooter } from '../../components';
import { Calculator } from 'lucide-react';
import { getAffordabilityData, updateAffordabilityData } from '../../services/api';
import type { AffordabilityFormData } from '../../types';

interface AffordabilityData {
  Success: boolean;
  Msg: {
    ProfileYear: number;
    ClientCode: string;
    FirstNames: string;
    Surname: string;
    FullName: string;
    NettIncome: string;
    NettIncomeId: number;
    NettWorth: string;
    NettWorthId: number;
    AvalaibleCash: string;
    AvalaibleCashId: number;
  };
  InsertId: number;
  AlertType: string;
}

const AffordabilityCalculator: React.FC = () => {
  const { state } = useAuth();
  const memberCode = state.memberData?.MemberCode || '';
  const [formData, setFormData] = useState<AffordabilityFormData>({
    nett_income: '',
    nett_worth: '',
    available_cash: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [affordabilityData, setAffordabilityData] = useState<AffordabilityData | null>(null);

  const currencyCode = state.memberData?.CurrencyCode || 'ZAR';

  const incomeOptions = [
    { value: 'nett_income_0', label: `Less than ${currencyCode} 50,000`, id: 0 },
    { value: 'nett_income_1', label: `${currencyCode} 50,000 - ${currencyCode} 100,000`, id: 1 },
    { value: 'nett_income_2', label: `${currencyCode} 100,000 - ${currencyCode} 200,000`, id: 2 },
    { value: 'nett_income_3', label: `${currencyCode} 200,000+`, id: 3 }
  ];

  const worthOptions = [
    { value: 'nett_worth_0', label: `Less than ${currencyCode} 1,000,000`, id: 0 },
    { value: 'nett_worth_1', label: `${currencyCode} 1,000,000 - ${currencyCode} 10,000,000`, id: 1 },
    { value: 'nett_worth_2', label: `${currencyCode} 10,000,000 - ${currencyCode} 100,000,000`, id: 2 },
    { value: 'nett_worth_3', label: `${currencyCode} 100,000,000+`, id: 3 }
  ];

  const cashOptions = [
    { value: 'available_cash_0', label: `Less than ${currencyCode} 200,000`, id: 0 },
    { value: 'available_cash_1', label: `${currencyCode} 200,000 - ${currencyCode} 500,000`, id: 1 },
    { value: 'available_cash_2', label: `${currencyCode} 500,000 - ${currencyCode} 1,000,000`, id: 2 },
    { value: 'available_cash_3', label: `${currencyCode} 1,000,000+`, id: 3 }
  ];

  // Fetch initial affordability data on first render
  useEffect(() => {
    const fetchAffordabilityData = async () => {
      try {
        const siteKey = import.meta.env.VITE_SITE_KEY;
        const data = await getAffordabilityData(memberCode, siteKey);
        setAffordabilityData(data);

        if (data.Success && data.Msg) {
          setFormData({
            nett_income: incomeOptions.find(opt => opt.id === data.Msg.NettIncomeId)?.value || '',
            nett_worth: worthOptions.find(opt => opt.id === data.Msg.NettWorthId)?.value || '',
            available_cash: cashOptions.find(opt => opt.id === data.Msg.AvalaibleCashId)?.value || ''
          });
        }
      } catch (err) {
        console.error('Error fetching affordability data:', err);
        setError('Failed to load initial data');
      } finally {
        setIsLoading(false);
      }
    };

    if (memberCode) {
      fetchAffordabilityData();
    }
  }, [memberCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const siteKey = import.meta.env.VITE_SITE_KEY;

      // Transform formData values to their corresponding IDs
      const submissionData: AffordabilityFormData = {
        nett_income: incomeOptions.find(opt => opt.value === formData.nett_income)?.id.toString() || '',
        nett_worth: worthOptions.find(opt => opt.value === formData.nett_worth)?.id.toString() || '',
        available_cash: cashOptions.find(opt => opt.value === formData.available_cash)?.id.toString() || ''
      };

      // Update data using updateAffordabilityData with transformed data
      const response = await updateAffordabilityData(memberCode, siteKey, submissionData);

      if (!response.Success) {
        throw new Error('Failed to update affordability data');
      }

      // Refetch the data to show updated values
      const updatedData = await getAffordabilityData(memberCode, siteKey);
      setAffordabilityData(updatedData);

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Failed to submit questionnaire. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
      <WMCHeader />

      <div className="p-8 pt-24">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Calculator className="h-6 w-6 text-[#4782b5]" />
              <h1 className="text-2xl font-semibold text-[#0d203b] font-[var(--font-family-heading)]">Affordability Calculator</h1>
            </div>

            {isLoading && <div className="mb-6 text-gray-500">Loading...</div>}

            {error && (
              <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-50 text-green-600 p-4 rounded-lg">
                Questionnaire submitted successfully! We'll analyze your affordability based on the provided information.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Monthly Nett Income */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[#0d203b]">Monthly Nett Income</h2>
                <div className="grid gap-3">
                  {incomeOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition"
                    >
                      <input
                        type="radio"
                        name="nett_income"
                        value={option.value}
                        checked={formData.nett_income === option.value}
                        onChange={(e) => setFormData({ ...formData, nett_income: e.target.value })}
                        className="h-4 w-4 text-[#4782b5] border-gray-300 focus:ring-[#4782b5]"
                      />
                      <span className="ml-3">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Nett Worth */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[#0d203b]">Nett Worth</h2>
                <div className="grid gap-3">
                  {worthOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition"
                    >
                      <input
                        type="radio"
                        name="nett_worth"
                        value={option.value}
                        checked={formData.nett_worth === option.value}
                        onChange={(e) => setFormData({ ...formData, nett_worth: e.target.value })}
                        className="h-4 w-4 text-[#4782b5] border-gray-300 focus:ring-[#4782b5]"
                      />
                      <span className="ml-3">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Available Cash */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[#0d203b]">Available Cash</h2>
                <div className="grid gap-3">
                  {cashOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition"
                    >
                      <input
                        type="radio"
                        name="available_cash"
                        value={option.value}
                        checked={formData.available_cash === option.value}
                        onChange={(e) => setFormData({ ...formData, available_cash: e.target.value })}
                        className="h-4 w-4 text-[#4782b5] border-gray-300 focus:ring-[#4782b5]"
                      />
                      <span className="ml-3">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-red-600 font-semibold text-sm italic">
                  Disclaimer: Wealth Masters Club confirm that we will apply the information provided herein, only for the purpose of executing our responsibilities towards the member and does not constitute financial advice in any manner, way or form.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.nett_income || !formData.nett_worth || !formData.available_cash}
                className="w-full px-4 py-2 bg-[#4782b5] text-white rounded-lg hover:bg-[#3a6b8c] transition disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? 'Submitting...' : 'Calculate Affordability'}
              </button>
            </form>

            {/* Display fetched data */}
            {affordabilityData?.Success && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-[#0d203b]">Current Assessment</h3>
                <p className="text-gray-700">Nett Income: {affordabilityData.Msg.NettIncome}</p>
                <p className="text-gray-700">Nett Worth: {affordabilityData.Msg.NettWorth}</p>
                <p className="text-gray-700">Available Cash: {affordabilityData.Msg.AvalaibleCash}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <WMCFooter />
    </div>
  );
};

export default AffordabilityCalculator;
