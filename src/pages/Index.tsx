
import React, { useEffect, useState } from "react";
import { FiguresLogo } from "../assets/icons";
import OnboardingScreen from "../components/onboarding/OnboardingScreen";

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <div className="animate-pulse-subtle">
          <FiguresLogo className="w-48 h-auto text-white" />
        </div>
        <div className="mt-8 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full w-0 animate-[shimmer_2s_linear_infinite]"></div>
        </div>
      </div>
    );
  }
  
  return <OnboardingScreen />;
};

export default Index;
