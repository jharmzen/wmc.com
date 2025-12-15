import React, { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '../contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      onClose();
      // Navigate to dashboard or reload page like legacy
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="text-center">
        {/* Logo */}
        <div className="mb-6">
          <img
            src="/assets/logo.png"
            alt="Wealth Masters Club"
            className="h-16 mx-auto"
          />
        </div>

        {/* Welcome Message */}
        <h3 className="text-xl font-semibold text-[#0d203b] mb-6">
          Welcome back!
        </h3>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="messages">
            {error && (
              <div className="text-red-600 text-sm mb-4">
                {error}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                id="username-login"
                name="username-login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4782b5] focus:border-transparent"
                required
              />
            </div>

            <div>
              <input
                type="password"
                id="psw-login"
                name="psw-login"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4782b5] focus:border-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#4782b5] text-white py-3 px-4 rounded-md hover:bg-[#3a6b8c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <a
            href="#"
            className="text-[#4782b5] hover:underline text-sm"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Implement forgot password modal
              alert('Forgot password functionality to be implemented');
            }}
          >
            <i className="fa fa-sign-in mr-2" aria-hidden="true"></i>
            Forgot Username / Password?
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;