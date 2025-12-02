import React from 'react';
import { BackButton, UnderConstruction } from '../../components';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9fc] to-white text-right">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0d203b] to-[#4782b5] text-white py-6">
        <div className="px-4">
          <BackButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <div className="w-full">
          <UnderConstruction
            icon="fa-sign-in-alt"
            title="Login"
            subtitle="This page is currently under construction."
            description="We're implementing secure member login functionality. Check back soon to access your member dashboard!"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;