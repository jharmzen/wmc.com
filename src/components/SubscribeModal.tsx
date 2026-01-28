import React, { useState } from 'react';
import Modal from './Modal';
import { subscribeUser } from '../services/api';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    mobile: '',
    email: '',
    newsletter: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const siteKey = import.meta.env.VITE_SITE_KEY;
      const response = await subscribeUser({
        first_name: formData.firstName,
        surname: formData.surname,
        mobile_number: formData.mobile,
        delegate_email: formData.email,
        newsletter: formData.newsletter ? '1' : '0',
        site_key: siteKey,
      });
      if (response.Success) {
        setSuccess('Subscription successful! Check your email for confirmation.');
        setFormData({ firstName: '', surname: '', mobile: '', email: '', newsletter: false });
      } else {
        let errorMsg = 'Failed to subscribe. Please try again.';
        if (typeof response.Msg === 'string') {
          errorMsg = response.Msg;
        } else if (Array.isArray(response.Msg)) {
          errorMsg = response.Msg[0] || errorMsg;
        } else if (response.Msg && typeof response.Msg === 'object' && 'message' in response.Msg) {
          errorMsg = (response.Msg as { message: string }).message;
        }
        setError(errorMsg);
      }
    } catch {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setSuccess(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-[#DAA520]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-crown text-[#DAA520] text-2xl" aria-hidden="true"></i>
        </div>
        <h2 className="font-[var(--font-family-heading)] text-2xl font-bold text-[#0A1E3D]">Join the Club</h2>
        <p className="text-gray-500 text-sm mt-1">Start your wealth education journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subscribe-firstName" className="block text-sm font-semibold text-[#0A1E3D] mb-1">
            First Name
          </label>
          <input
            type="text"
            id="subscribe-firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-transparent text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="subscribe-surname" className="block text-sm font-semibold text-[#0A1E3D] mb-1">
            Surname
          </label>
          <input
            type="text"
            id="subscribe-surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-transparent text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="subscribe-mobile" className="block text-sm font-semibold text-[#0A1E3D] mb-1">
            Mobile Number
          </label>
          <input
            type="tel"
            id="subscribe-mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-transparent text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="subscribe-email" className="block text-sm font-semibold text-[#0A1E3D] mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="subscribe-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-transparent text-sm"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="subscribe-newsletter"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
            className="h-4 w-4 accent-[#DAA520] border-gray-300 rounded"
          />
          <label htmlFor="subscribe-newsletter" className="ml-2 text-gray-600 text-sm">
            Subscribe to our newsletter
          </label>
        </div>

        {error && <p className="text-red-500 text-sm" dangerouslySetInnerHTML={{ __html: error }}></p>}
        {success && <p className="text-green-600 text-sm font-medium">{success}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#DAA520] text-white py-3 rounded-[10px] font-[var(--font-family-body)] font-semibold hover:bg-[#C29318] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
        </button>
      </form>
    </Modal>
  );
};

export default SubscribeModal;
