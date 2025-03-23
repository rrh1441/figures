
import { useState, useCallback } from "react";

export type VerificationType = "identity" | "networth" | "education" | "career" | "height";

interface UseVerificationProps {
  initialVerifiedState?: Record<VerificationType, boolean>;
}

interface VerificationResult {
  verifiedStatus: Record<VerificationType, boolean>;
  isVerifying: boolean;
  error: string | null;
  verifyItem: (type: VerificationType) => Promise<boolean>;
  resetVerification: (type: VerificationType) => void;
}

export function useVerification({ 
  initialVerifiedState = {
    identity: false,
    networth: false,
    education: false,
    career: false,
    height: false
  }
}: UseVerificationProps = {}): VerificationResult {
  const [verifiedStatus, setVerifiedStatus] = useState<Record<VerificationType, boolean>>(initialVerifiedState);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const verifyItem = useCallback(async (type: VerificationType): Promise<boolean> => {
    setIsVerifying(true);
    setError(null);
    
    try {
      // Simulate API call for verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll always succeed
      setVerifiedStatus(prev => ({
        ...prev,
        [type]: true
      }));
      
      setIsVerifying(false);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
      setIsVerifying(false);
      return false;
    }
  }, []);
  
  const resetVerification = useCallback((type: VerificationType) => {
    setVerifiedStatus(prev => ({
      ...prev,
      [type]: false
    }));
    setError(null);
  }, []);
  
  return {
    verifiedStatus,
    isVerifying,
    error,
    verifyItem,
    resetVerification
  };
}
