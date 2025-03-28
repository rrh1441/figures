
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const ProveRealScreen: React.FC = () => {
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const navigate = useNavigate();

  const startVerification = () => {
    setVerificationStarted(true);
    // Simulate verification process
    setTimeout(() => {
      setVerificationComplete(true);
    }, 2000);
  };

  const handleContinue = () => {
    navigate("/profile");
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Prove You're Real</h1>
        
        {!verificationStarted ? (
          <>
            <p className="text-gray-400 text-center mb-12">
              Connect to Plaid to verify your identity and financial information
            </p>
            
            <button 
              onClick={startVerification}
              className="btn-primary w-full flex items-center justify-center gap-2 group"
            >
              <span>Connect to Plaid</span>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={18} />
            </button>
          </>
        ) : verificationComplete ? (
          <>
            <div className="flex flex-col items-center justify-center mb-12">
              <CheckCircle2 className="text-green-500 w-16 h-16 mb-4" />
              <p className="text-xl font-semibold mb-2">Verification Complete</p>
              <p className="text-gray-400 text-center">
                Your identity has been verified
              </p>
            </div>
            
            <button 
              onClick={handleContinue}
              className="btn-primary w-full flex items-center justify-center gap-2 group"
            >
              <span>Continue to Profile</span>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={18} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="animate-pulse mb-8">
              <div className="h-16 w-16 bg-gray-800 rounded-full flex items-center justify-center">
                <div className="h-12 w-12 bg-gray-700 rounded-full"></div>
              </div>
            </div>
            <p className="text-xl font-semibold mb-2">Verifying...</p>
            <p className="text-gray-400 text-center mb-8">
              Please wait while we verify your information
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProveRealScreen;
