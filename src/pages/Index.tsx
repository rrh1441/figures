
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigate("/auth"); // Navigate to the auth screen after loading
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="animate-pulse-subtle">
        <h1 className="text-4xl font-bold tracking-tight">FIGURES</h1>
      </div>
      <div className="mt-8 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-white rounded-full w-0 animate-[shimmer_2s_linear_infinite]"></div>
      </div>
    </div>
  );
};

export default Index;
