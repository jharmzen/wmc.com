import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { WMCHeader, WMCFooter } from '../../components';
import { getQuestionnaireData, updateQuestionnaireData } from '../../services/api';
import type { QuestionnaireFormData } from '../../types';

interface QuestionnaireData {
  Success: boolean;
  Msg: {
    'Monthly Income': {
      Gross: { Applicant: string; CoApplicant: string; Combined: string };
      Rental: { Applicant: string; CoApplicant: string; Combined: string };
      'Average Overtime': { Applicant: string; CoApplicant: string; Combined: string };
      'Average Commission': { Applicant: string; CoApplicant: string; Combined: string };
      'Travel Allowance': { Applicant: string; CoApplicant: string; Combined: string };
      'Interest Other': { Applicant: string; CoApplicant: string; Combined: string };
      'Total Income': { Applicant: string; CoApplicant: string; Combined: string };
    };
    'Monthly Expense': {
      PAYE: { Applicant: string; CoApplicant: string; Combined: string };
      'Pension Provident Fund': { Applicant: string; CoApplicant: string; Combined: string };
      UIF: { Applicant: string; CoApplicant: string; Combined: string };
      'Bond Repayment': { Applicant: string; CoApplicant: string; Combined: string };
      'Investment Bond Repayment': { Applicant: string; CoApplicant: string; Combined: string };
      'Vehicle Finance': { Applicant: string; CoApplicant: string; Combined: string };
      'Retail Account': { Applicant: string; CoApplicant: string; Combined: string };
      'Credit Card': { Applicant: string; CoApplicant: string; Combined: string };
      'Personal Loan': { Applicant: string; CoApplicant: string; Combined: string };
      'Cellular Phone': { Applicant: string; CoApplicant: string; Combined: string };
      Maintenance: { Applicant: string; CoApplicant: string; Combined: string };
      'Life Insurance': { Applicant: string; CoApplicant: string; Combined: string };
      'Short Term Insurance': { Applicant: string; CoApplicant: string; Combined: string };
      'Retirement Annuities': { Applicant: string; CoApplicant: string; Combined: string };
      Rent: { Applicant: string; CoApplicant: string; Combined: string };
      'Rates Taxes': { Applicant: string; CoApplicant: string; Combined: string };
      'Water Lights': { Applicant: string; CoApplicant: string; Combined: string };
      Levies: { Applicant: string; CoApplicant: string; Combined: string };
      Clothing: { Applicant: string; CoApplicant: string; Combined: string };
      Groceries: { Applicant: string; CoApplicant: string; Combined: string };
      'School Fees': { Applicant: string; CoApplicant: string; Combined: string };
      Transport: { Applicant: string; CoApplicant: string; Combined: string };
      Entertainment: { Applicant: string; CoApplicant: string; Combined: string };
      Security: { Applicant: string; CoApplicant: string; Combined: string };
      Medical: { Applicant: string; CoApplicant: string; Combined: string };
      Telephone: { Applicant: string; CoApplicant: string; Combined: string };
      'Bank Charges': { Applicant: string; CoApplicant: string; Combined: string };
      Other: { Applicant: string; CoApplicant: string; Combined: string };
      'Total Expenses': { Applicant: string; CoApplicant: string; Combined: string };
    };
    'Disposable Income': string;
  };
}

const FinancialQuestionnaire: React.FC = () => {
  const { state } = useAuth();
  const memberCode = state.memberData?.MemberCode || '';
  const [formData, setFormData] = useState<QuestionnaireFormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const currencyCode = state.memberData?.CurrencyCode || 'ZAR';

  // Income fields configuration
  const incomeFields = [
    { name: 'Gross', label: 'Gross Income' },
    { name: 'Rental', label: 'Rental Income' },
    { name: 'AverageOvertime', label: 'Average Overtime', apiName: 'Average Overtime' },
    { name: 'AverageCommission', label: 'Average Commission', apiName: 'Average Commission' },
    { name: 'TravelAllowance', label: 'Travel Allowance', apiName: 'Travel Allowance' },
    { name: 'InterestOther', label: 'Interest & Other', apiName: 'Interest Other' }
  ];

  // Expense fields configuration
  const expenseFields = [
    { name: 'PAYE', label: 'PAYE' },
    { name: 'PensionProvidentFund', label: 'Pension/Provident Fund', apiName: 'Pension Provident Fund' },
    { name: 'UIF', label: 'UIF' },
    { name: 'BondRepayment', label: 'Bond Repayment', apiName: 'Bond Repayment' },
    { name: 'InvestmentBondRepayment', label: 'Investment Bond Repayment', apiName: 'Investment Bond Repayment' },
    { name: 'VehicleFinance', label: 'Vehicle Finance', apiName: 'Vehicle Finance' },
    { name: 'RetailAccount', label: 'Retail Account', apiName: 'Retail Account' },
    { name: 'CreditCard', label: 'Credit Card', apiName: 'Credit Card' },
    { name: 'PersonalLoan', label: 'Personal Loan', apiName: 'Personal Loan' },
    { name: 'CellularPhone', label: 'Cellular Phone', apiName: 'Cellular Phone' },
    { name: 'Maintenance', label: 'Maintenance' },
    { name: 'LifeInsurance', label: 'Life Insurance', apiName: 'Life Insurance' },
    { name: 'ShortTermInsurance', label: 'Short Term Insurance', apiName: 'Short Term Insurance' },
    { name: 'RetirementAnnuities', label: 'Retirement Annuities', apiName: 'Retirement Annuities' },
    { name: 'Rent', label: 'Rent' },
    { name: 'RatesTaxes', label: 'Rates & Taxes', apiName: 'Rates Taxes' },
    { name: 'WaterLights', label: 'Water & Lights', apiName: 'Water Lights' },
    { name: 'Levies', label: 'Levies' },
    { name: 'Clothing', label: 'Clothing' },
    { name: 'Groceries', label: 'Groceries' },
    { name: 'SchoolFees', label: 'School Fees', apiName: 'School Fees' },
    { name: 'Transport', label: 'Transport' },
    { name: 'Entertainment', label: 'Entertainment' },
    { name: 'Security', label: 'Security' },
    { name: 'Medical', label: 'Medical' },
    { name: 'Telephone', label: 'Telephone' },
    { name: 'BankCharges', label: 'Bank Charges', apiName: 'Bank Charges' },
    { name: 'Other', label: 'Other' }
  ];

  // Fetch initial data on first render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const siteKey = import.meta.env.VITE_SITE_KEY;
        const data: QuestionnaireData = await getQuestionnaireData(memberCode, siteKey);

        if (data.Success && data.Msg) {
          const newFormData: QuestionnaireFormData = {};

          // Map income fields
          incomeFields.forEach(field => {
            const apiFieldName = field.apiName || field.name;
            newFormData[`${field.name}_Applicant`] = (data.Msg['Monthly Income'] as any)[apiFieldName]?.Applicant || '0';
            newFormData[`${field.name}_CoApplicant`] = (data.Msg['Monthly Income'] as any)[apiFieldName]?.CoApplicant || '0';
          });

          // Map expense fields
          expenseFields.forEach(field => {
            const apiFieldName = field.apiName || field.name;
            newFormData[`${field.name}_Applicant`] = (data.Msg['Monthly Expense'] as any)[apiFieldName]?.Applicant || '0';
            newFormData[`${field.name}_CoApplicant`] = (data.Msg['Monthly Expense'] as any)[apiFieldName]?.CoApplicant || '0';
          });

          // Calculate and set initial totals
          const totals = calculateTotals(newFormData);
          setFormData({ ...newFormData, ...totals });
        }
      } catch (err) {
        console.error('Error fetching affordability data:', err);
        setError('Failed to load initial data');
      } finally {
        setIsLoading(false);
      }
    };

    if (memberCode) {
      fetchData();
    }
  }, [memberCode]);

  const calculateTotals = (data: QuestionnaireFormData) => {
    let applicantIncome = 0;
    let coApplicantIncome = 0;

    incomeFields.forEach(field => {
      applicantIncome += parseFloat(data[`${field.name}_Applicant`] || '0');
      coApplicantIncome += parseFloat(data[`${field.name}_CoApplicant`] || '0');
    });

    let applicantExpenses = 0;
    let coApplicantExpenses = 0;

    expenseFields.forEach(field => {
      applicantExpenses += parseFloat(data[`${field.name}_Applicant`] || '0');
      coApplicantExpenses += parseFloat(data[`${field.name}_CoApplicant`] || '0');
    });

    return {
      TotalIncome_Applicant: applicantIncome.toString(),
      TotalIncome_CoApplicant: coApplicantIncome.toString(),
      TotalIncome_Combined: (applicantIncome + coApplicantIncome).toString(),
      TotalExpenses_Applicant: applicantExpenses.toString(),
      TotalExpenses_CoApplicant: coApplicantExpenses.toString(),
      TotalExpenses_Combined: (applicantExpenses + coApplicantExpenses).toString(),
      DisposableIncome: (applicantIncome + coApplicantIncome - applicantExpenses - coApplicantExpenses).toString()
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedFormData = { ...prev, [name]: value };
      const totals = calculateTotals(updatedFormData);
      return { ...updatedFormData, ...totals };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const siteKey = import.meta.env.VITE_SITE_KEY;
      const response = await updateQuestionnaireData(memberCode, siteKey, formData);

      if (!response.Success) {
        throw new Error('Failed to submit assessment');
      }

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Failed to submit assessment. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: string) => {
    const num = parseFloat(value || '0');
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: currencyCode
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white">
      <WMCHeader />

      <div className="p-8 pt-24">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-semibold mb-6 text-[#0d203b] font-[var(--font-family-heading)]">Financial Assessment</h1>

            {isLoading && <div className="mb-6 text-gray-500">Loading...</div>}

            {error && (
              <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-50 text-green-600 p-4 rounded-lg">
                Assessment submitted successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Income Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-[#0d203b]">Monthly Income</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 text-gray-700">Description</th>
                        <th className="text-right p-2 text-gray-700">Applicant</th>
                        <th className="text-right p-2 text-gray-700">Co-Applicant</th>
                        <th className="text-right p-2 text-gray-700">Combined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incomeFields.map((field) => (
                        <tr key={field.name} className="border-t hover:bg-gray-50">
                          <td className="p-2">{field.label}</td>
                          <td className="p-2">
                            <input
                              type="number"
                              name={`${field.name}_Applicant`}
                              value={formData[`${field.name}_Applicant`] || ''}
                              onChange={handleInputChange}
                              className="w-full text-right px-2 py-1 border rounded focus:ring-2 focus:ring-[#4782b5] focus:border-[#4782b5]"
                              step="0.01"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              name={`${field.name}_CoApplicant`}
                              value={formData[`${field.name}_CoApplicant`] || ''}
                              onChange={handleInputChange}
                              className="w-full text-right px-2 py-1 border rounded focus:ring-2 focus:ring-[#4782b5] focus:border-[#4782b5]"
                              step="0.01"
                            />
                          </td>
                          <td className="p-2 text-right text-gray-700">
                            {formatCurrency(
                              ((parseFloat(formData[`${field.name}_Applicant`] || '0') +
                                parseFloat(formData[`${field.name}_CoApplicant`] || '0')).toString())
                            )}
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t font-semibold bg-gray-50">
                        <td className="p-2 text-[#0d203b]">Total Income</td>
                        <td className="p-2 text-right text-[#0d203b]">{formatCurrency(formData.TotalIncome_Applicant || '0')}</td>
                        <td className="p-2 text-right text-[#0d203b]">{formatCurrency(formData.TotalIncome_CoApplicant || '0')}</td>
                        <td className="p-2 text-right text-[#0d203b]">{formatCurrency(formData.TotalIncome_Combined || '0')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Expenses Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-[#0d203b]">Monthly Expenses</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 text-gray-700">Description</th>
                        <th className="text-right p-2 text-gray-700">Applicant</th>
                        <th className="text-right p-2 text-gray-700">Co-Applicant</th>
                        <th className="text-right p-2 text-gray-700">Combined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenseFields.map((field) => (
                        <tr key={field.name} className="border-t hover:bg-gray-50">
                          <td className="p-2">{field.label}</td>
                          <td className="p-2">
                            <input
                              type="number"
                              name={`${field.name}_Applicant`}
                              value={formData[`${field.name}_Applicant`] || ''}
                              onChange={handleInputChange}
                              className="w-full text-right px-2 py-1 border rounded focus:ring-2 focus:ring-[#4782b5] focus:border-[#4782b5]"
                              step="0.01"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              name={`${field.name}_CoApplicant`}
                              value={formData[`${field.name}_CoApplicant`] || ''}
                              onChange={handleInputChange}
                              className="w-full text-right px-2 py-1 border rounded focus:ring-2 focus:ring-[#4782b5] focus:border-[#4782b5]"
                              step="0.01"
                            />
                          </td>
                          <td className="p-2 text-right text-gray-700">
                            {formatCurrency(
                              ((parseFloat(formData[`${field.name}_Applicant`] || '0') +
                                parseFloat(formData[`${field.name}_CoApplicant`] || '0')).toString())
                            )}
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t font-semibold bg-gray-50">
                        <td className="p-2 text-[#0d203b]">Total Expenses</td>
                        <td className="p-2 text-right text-[#0d203b]">{formatCurrency(formData.TotalExpenses_Applicant || '0')}</td>
                        <td className="p-2 text-right text-[#0d203b]">{formatCurrency(formData.TotalExpenses_CoApplicant || '0')}</td>
                        <td className="p-2 text-right text-[#0d203b]">{formatCurrency(formData.TotalExpenses_Combined || '0')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Disposable Income */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#0d203b]">Disposable Income</span>
                  <span className="text-xl font-bold text-[#4782b5]">
                    {formatCurrency(formData.DisposableIncome || '0')}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-[#4782b5] text-white rounded-lg hover:bg-[#3a6b8c] transition disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <WMCFooter />
    </div>
  );
};

export default FinancialQuestionnaire;
