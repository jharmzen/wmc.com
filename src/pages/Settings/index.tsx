import React, { useState } from 'react';
import { Lock, User, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader, WMCHeader, WMCFooter } from '../../components';
import { updateProfileSettingsData, updatePasswordData } from '../../services/api';

const Settings: React.FC = () => {
  const { state, setMemberData } = useAuth();
  const memberData = state.memberData;
  const memberCode = memberData?.MemberCode || '';

  const memberEmail = memberData?.Email || '';
  const memberFirstNames = memberData?.FirstNames || '';
  const memberPhone = memberData?.Phone || '';
  const memberSurname = memberData?.Surname || '';

  const [formData, setFormData] = useState({
    firstName: memberFirstNames,
    lastName: memberSurname,
    email: memberEmail,
    phone: memberPhone,
    emailNotifications: true
  });

  const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const siteKey = import.meta.env.VITE_SITE_KEY || '';
      const response = await updateProfileSettingsData(memberCode, siteKey, formData);

      if (!response.Success) {
        throw new Error('Failed to update profile settings');
      }

      setMemberData({
        ...memberData!,
        FirstNames: formData.firstName,
        Surname: formData.lastName,
        Phone: formData.phone || ''
      });

      setSuccess('Profile settings updated successfully!');

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSuccess('');
      }, 5000);
    } catch (err) {
      setError('Failed to update profile settings. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const siteKey = import.meta.env.VITE_SITE_KEY || '';
      const response = await updatePasswordData(memberCode, siteKey, passwordData.newPassword);

      if (!response.Success) {
        throw new Error('Failed to update password');
      }

      setSuccess('Password updated successfully!');
      setPasswordData({ newPassword: '', confirmPassword: '' });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSuccess('');
      }, 5000);
    } catch (err) {
      setError('Failed to update password. Please try again.');
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
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0d203b] font-[var(--font-family-heading)]">
              Settings
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your profile settings and security preferences
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Success</p>
                <p className="text-sm">{success}</p>
              </div>
            </div>
          )}

          {/* Profile Settings Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-[#0d203b]">Profile Settings</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      disabled={true}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                      title="Email cannot be changed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email address cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Email Notifications Toggle */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                      <p className="text-xs text-gray-500 mt-1">Receive updates and announcements via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-not-allowed" title="Email notifications cannot be changed">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        disabled={true}
                        checked={formData.emailNotifications}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-500 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-400"></div>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        firstName: memberFirstNames,
                        lastName: memberSurname,
                        email: memberEmail,
                        phone: memberPhone,
                        emailNotifications: true
                      });
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Security/Password Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-[#0d203b]">Security</h2>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter new password"
                  minLength={6}
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm new password"
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !passwordData.newPassword || !passwordData.confirmPassword}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg"
              >
                {isSubmitting ? 'Updating...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <WMCFooter />
    </div>
  );
};

export default Settings;
