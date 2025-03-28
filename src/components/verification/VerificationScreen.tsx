
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { VerificationType } from "@/hooks/use-verification";

interface VerificationScreenProps {
  type: VerificationType;
  onComplete: () => void;
  onBack: () => void;
}

const VerificationScreen: React.FC<VerificationScreenProps> = ({
  type,
  onComplete,
  onBack
}) => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  
  const getVerificationTitle = () => {
    switch (type) {
      case "networth": return "Net Worth Verification";
      case "height": return "Height Verification";
      case "education": return "Education Verification";
      case "career": return "Job Verification";
      case "identity": return "Background Investigation";
      default: return "Verification";
    }
  };
  
  const getVerificationDescription = () => {
    switch (type) {
      case "networth": return "Connect your bank accounts to verify your assets and net worth";
      case "height": return "Upload a document or photo to verify your height";
      case "education": return "Connect to your academic institution to verify your education";
      case "career": return "Connect to LinkedIn or your employer to verify your job";
      case "identity": return "Provide information for a comprehensive background check";
      default: return "Please complete the verification process";
    }
  };
  
  const getVerificationActionText = () => {
    switch (type) {
      case "networth": return "Connect bank accounts";
      case "height": return "Upload documentation";
      case "education": return "Connect to university";
      case "career": return "Connect to LinkedIn";
      case "identity": return "Start background check";
      default: return "Start verification";
    }
  };
  
  const handleVerification = () => {
    setLoading(true);
    // Simulate verification process
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
    }, 2000);
  };
  
  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="p-4 flex items-center">
        <button onClick={onBack} className="p-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold flex-1 text-center mr-8">{getVerificationTitle()}</h1>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {!loading && !verified ? (
          <>
            <p className="text-center text-muted-foreground mb-8">
              {getVerificationDescription()}
            </p>
            
            <button 
              onClick={handleVerification}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {getVerificationActionText()}
            </button>
          </>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
            <p className="text-xl font-semibold mb-2">Processing...</p>
            <p className="text-muted-foreground text-center">
              Please wait while we verify your information
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center mb-12">
              <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
              <p className="text-xl font-semibold mb-2">Verification Complete</p>
              <p className="text-muted-foreground text-center">
                Your {type} has been verified successfully
              </p>
            </div>
            
            <button 
              onClick={onComplete}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationScreen;
