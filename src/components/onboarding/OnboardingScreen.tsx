
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, BadgeCheck, DollarSign } from "lucide-react";

const OnboardingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const slides = [
    {
      icon: Shield,
      title: "Real people only",
      description: "We verify identity through facial recognition and government ID",
    },
    {
      icon: BadgeCheck,
      title: "Verified information",
      description: "Education, career, and demographic information are all verified",
    },
    {
      icon: DollarSign,
      title: "Verified net worth",
      description: "We partner with Plaid to verify financial information securely",
    },
  ];

  const nextSlide = () => {
    if (currentStep < slides.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/auth");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const progressElement = document.getElementById(`progress-${currentStep}`);
      if (progressElement) {
        progressElement.classList.add("w-full");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Progress indicators */}
      <div className="absolute top-10 left-0 right-0 flex justify-center gap-2 px-4">
        {slides.map((_, index) => (
          <div 
            key={index} 
            className="h-1 bg-gray-800 rounded-full flex-1 max-w-16 overflow-hidden"
          >
            <div 
              id={`progress-${index}`}
              className={`h-full bg-white rounded-full w-0 transition-all duration-[2000ms] ease-out ${
                index < currentStep ? "w-full" : ""
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div 
          className="text-center transform transition-all duration-500 ease-out animate-scale-up"
          style={{animationDelay: '300ms'}}
        >
          <div className="flex justify-center mb-8">
            {React.createElement(slides[currentStep].icon, { 
              size: 64, 
              className: "text-white animate-pulse-subtle" 
            })}
          </div>
          <h1 className="text-3xl font-bold mb-4">{slides[currentStep].title}</h1>
          <p className="text-gray-400 text-lg">{slides[currentStep].description}</p>
        </div>
      </div>

      {/* Bottom button */}
      <div className="pb-12 px-8">
        <button 
          onClick={nextSlide}
          className="btn-primary w-full flex items-center justify-center gap-2 group"
        >
          <span>{currentStep === slides.length - 1 ? "Get Started" : "Next"}</span>
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={18} />
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
