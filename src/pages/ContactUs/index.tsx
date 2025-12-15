import React, { useState } from 'react';
import { WMCHeader, WMCFooter } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const ContactUs: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.FirstNames || '',
    lastName: user?.Surname || '',
    email: user?.Email || '',
    phone: user?.Phone || '',
    subject: '',
    comment: '',
    serviceProvider: '1' // default
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const data = new FormData();
      data.append('first-name-contact', formData.firstName);
      data.append('last-name-contact', formData.lastName);
      data.append('email-contact', formData.email);
      data.append('phone-contact', formData.phone);
      data.append('subject', formData.subject);
      data.append('comment', formData.comment);
      data.append('contact-service-provider', formData.serviceProvider);

      const response = await axios.post('http://dev.wmc-portal.com/legacy/controller/action/contact_wmc.php', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.Success) {
        setMessage('Your message has been sent successfully!');
        setFormData({
          ...formData,
          subject: '',
          comment: ''
        });
      } else {
        setMessage(response.data.Msg || 'An error occurred while sending');
      }
    } catch {
      setMessage('An error occurred while sending. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white text-right">
      {/* Header */}
      <WMCHeader />

      {/* Main Content */}
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0d203b] mb-6 text-center">Contact Us</h1>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4782b5] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4782b5] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4782b5] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4782b5] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="serviceProvider" className="block text-sm font-medium text-gray-700 mb-1">
                Service Department
              </label>
              <select
                id="serviceProvider"
                name="serviceProvider"
                value={formData.serviceProvider}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4782b5] focus:border-transparent"
              >
                <option value="1">General Services</option>
                <option value="2">Technical Support</option>
                <option value="3">Membership Inquiries</option>
              </select>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4782b5] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4782b5] focus:border-transparent"
                required
              />
            </div>

            {message && (
              <div className={`p-3 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#4782b5] text-white py-3 px-4 rounded-md hover:bg-[#3a6b8c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <WMCFooter />
    </div>
  );
};

export default ContactUs;