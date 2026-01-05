import React, { useState, useEffect, useMemo } from 'react';
import { FileText, Eye, X, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader, WMCHeader, WMCFooter } from '../../components';
import { getInvoiceHistory, getCommissionData, submitInvoice } from '../../services/api';

interface Invoice {
  InvoiceAmount: number;
  SubmittedDate: string;
  UrlLocation: string;
}

interface CommissionData {
  wmc_paying_referrals?: string;
  wmc_comms_tx_amount?: string;
  acc_paying_referrals?: string;
  acc_comms_tx_amount?: string;
  tts_paying_referrals?: string;
  tts_comms_tx_amount?: string;
  props_paying_referrals?: string;
  props_comms_tx_amount?: string;
  dbl_trust_paying_referrals?: string;
  dbl_trust_comms_tx_amount?: string;
  bmn_paying_referrals?: string;
  bmn_comms_tx_amount?: string;
}

const InvoiceTransactions: React.FC = () => {
  const { state } = useAuth();
  const { memberData } = state;

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [commissionData, setCommissionData] = useState<CommissionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [termsAcknowledged, setTermsAcknowledged] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [monthlySubmission, setMonthlySubmission] = useState(false);

  const MemberStatusCode = memberData?.MemberStatusCode || '';
  const CurrencyCode = memberData?.CurrencyCode || 'USD';

  // Access control - member status codes allowed to submit invoices
  const allowedCodes = ['MS-D', 'MS-EXEC', 'MS-PREM', 'MS-PE', 'MS-P', 'MS-PG', 'MS-PS'];

  useEffect(() => {
    const fetchData = async () => {
      if (!memberData) return;

      try {
        setIsLoading(true);
        const siteKey = import.meta.env.VITE_SITE_KEY || '';

        // Fetch invoice history and commission data in parallel
        const [invoiceHistoryResponse, commissionDataResponse] = await Promise.all([
          getInvoiceHistory(memberData.MemberCode, siteKey),
          getCommissionData(memberData.MemberCode, siteKey)
        ]);

        setInvoices(invoiceHistoryResponse);
        setCommissionData(commissionDataResponse);

        // Check if member has submitted invoice this month
        if (invoiceHistoryResponse.length > 0) {
          const latestInvoice = invoiceHistoryResponse[0];
          if (latestInvoice.SubmittedDate) {
            const latestDate = new Date(latestInvoice.SubmittedDate);
            const now = new Date();
            if (latestDate.getMonth() === now.getMonth() && latestDate.getFullYear() === now.getFullYear()) {
              setMonthlySubmission(true);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [memberData]);

  const totalCommissionBalance = useMemo(() => {
    if (!commissionData) return 0;
    let total = 0;
    total += parseFloat(commissionData.wmc_comms_tx_amount || '0');
    total += parseFloat(commissionData.acc_comms_tx_amount || '0');
    total += parseFloat(commissionData.tts_comms_tx_amount || '0');
    total += parseFloat(commissionData.props_comms_tx_amount || '0');
    total += parseFloat(commissionData.dbl_trust_comms_tx_amount || '0');
    total += parseFloat(commissionData.bmn_comms_tx_amount || '0');
    return total;
  }, [commissionData]);

  const canSubmitInvoice = (): boolean => {
    // Already submitted this month
    if (monthlySubmission) return false;

    // Must be before 7th of the month
    const today = new Date();
    if (today.getDate() > 7) return false;

    // Member status must be in allowed list
    if (!allowedCodes.includes(MemberStatusCode)) return false;

    // Must have commission balance
    if (totalCommissionBalance <= 0) return false;

    return true;
  };

  const formatCurrency = (amount: string | number): string => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    const currencySymbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      ZAR: 'R',
      AUD: 'A$',
    };
    const symbol = currencySymbols[CurrencyCode] || CurrencyCode + ' ';
    return `${symbol}${numAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSubmitInvoice = () => {
    if (!canSubmitInvoice()) return;

    // Check if member has accepted terms before
    const hasAcceptedTerms = localStorage.getItem(`terms-accepted-${memberData?.MemberCode}`);

    if (!hasAcceptedTerms) {
      setShowTermsModal(true);
    } else {
      setShowInvoiceModal(true);
    }
  };

  const handleTermsAccept = () => {
    if (!termsAcknowledged) return;

    // Save terms acceptance
    localStorage.setItem(`terms-accepted-${memberData?.MemberCode}`, 'true');
    setShowTermsModal(false);
    setShowInvoiceModal(true);
  };

  const handleInvoiceSubmit = async () => {
    if (!memberData) return;

    try {
      const siteKey = import.meta.env.VITE_SITE_KEY || '';
      const response = await submitInvoice(memberData.MemberCode, siteKey, totalCommissionBalance.toString());

      if (response.Success) {
        setShowInvoiceModal(false);
        setShowSuccessMessage(true);
        setMonthlySubmission(true);

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);

        // Refresh invoice history
        const updatedInvoices = await getInvoiceHistory(memberData.MemberCode, siteKey);
        setInvoices(updatedInvoices);
      }
    } catch (error) {
      console.error('Error submitting invoice:', error);
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
              Invoice & Transactions
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your commission invoices and transaction history
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT PANEL: Commission Summary */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6 text-[#0d203b]">Commission Summary</h2>

                {/* Total Commission Balance Card */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 mb-6 text-white">
                  <p className="text-sm opacity-90 mb-1">Total Commission Balance</p>
                  <p className="text-3xl font-bold">{formatCurrency(totalCommissionBalance)}</p>
                </div>

                {/* Commission Breakdown Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Source
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Referrals
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">WMC</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{commissionData?.wmc_paying_referrals}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(commissionData?.wmc_comms_tx_amount ?? '0')}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">DACC</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{commissionData?.acc_paying_referrals}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(commissionData?.acc_comms_tx_amount ?? '0')}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">TTS</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{commissionData?.tts_paying_referrals}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(commissionData?.tts_comms_tx_amount ?? '0')}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">Property Sales</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{commissionData?.props_paying_referrals}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(commissionData?.props_comms_tx_amount ?? '0')}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">Double Trust</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{commissionData?.dbl_trust_paying_referrals}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(commissionData?.dbl_trust_comms_tx_amount ?? '0')}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">BMN</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{commissionData?.bmn_paying_referrals}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(commissionData?.bmn_comms_tx_amount ?? '0')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Submit Invoice Button */}
                <button
                  onClick={handleSubmitInvoice}
                  disabled={!canSubmitInvoice()}
                  className={`w-full mt-6 px-4 py-3 text-white rounded-lg font-medium transition ${
                    canSubmitInvoice()
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {monthlySubmission
                    ? 'Invoice Already Submitted This Month'
                    : !allowedCodes.includes(MemberStatusCode)
                    ? 'Upgrade Membership to Submit Invoices'
                    : totalCommissionBalance <= 0
                    ? 'No Commission Balance Available'
                    : new Date().getDate() > 7
                    ? 'Invoice Submission Closed (After 7th)'
                    : 'Submit Invoice'
                  }
                </button>

                {/* Info Text */}
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Invoices can only be submitted before the 7th of each month
                </p>
              </div>

              {/* RIGHT PANEL: Recent Invoices */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6 text-[#0d203b]">Recent Invoices</h2>
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader />
                  </div>
                ) : Array.isArray(invoices) && invoices.filter(inv => inv.SubmittedDate && inv.SubmittedDate.trim() !== '').length > 0 ? (
                  <div className="space-y-4">
                    {invoices
                      .filter(inv => inv.SubmittedDate && inv.SubmittedDate.trim() !== '')
                      .map((invoice, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <FileText className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{formatDate(invoice.SubmittedDate)}</div>
                              <div className="text-sm text-gray-500">Invoice #{index + 1}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">{formatCurrency(invoice.InvoiceAmount?.toString() ?? '0')}</div>
                            </div>
                            <a
                              href={invoice.UrlLocation}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 hover:bg-gray-100 rounded-lg transition"
                              title="View Invoice"
                            >
                              <Eye className="h-5 w-5 text-gray-600" />
                            </a>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No invoices submitted yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-[#0d203b]">Terms and Conditions</h2>
            <div className="mb-6 h-64 overflow-y-auto border rounded-lg">
              <iframe
                src="https://backoffice.treoc.com/data/archive/terms_and_conditions/Affiliate Terms and Conditions.pdf"
                className="w-full h-full"
                title="Terms and Conditions"
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="accept-terms"
                checked={termsAcknowledged}
                onChange={() => setTermsAcknowledged(prev => !prev)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="accept-terms" className="text-sm text-gray-700">
                I have read and agree to the Terms and Conditions
              </label>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleTermsAccept}
                disabled={!termsAcknowledged}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Submission Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowInvoiceModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-[#0d203b]">Confirm Invoice Submission</h2>
            <p className="mb-6 text-gray-700">
              You are about to submit an invoice for:{' '}
              <strong className="text-blue-600 text-xl ml-1">{formatCurrency(totalCommissionBalance)}</strong>
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleInvoiceSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md flex items-center max-w-md">
            <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
            <div>
              <p className="font-semibold">Invoice Submitted Successfully</p>
              <p className="text-sm">Your invoice for {formatCurrency(totalCommissionBalance)} has been submitted.</p>
            </div>
          </div>
        </div>
      )}
      <WMCFooter />
    </div>
  );
};

export default InvoiceTransactions;
