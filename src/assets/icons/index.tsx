
import React from "react";

export const FiguresLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 80 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M0 0.5H16V4.5H4V10H14V14H4V24H0V0.5Z" 
        fill="currentColor"
      />
      <path 
        d="M18 0.5H22V20.5H32V24H18V0.5Z" 
        fill="currentColor"
      />
      <path 
        d="M36 24V0.5H40V9.5H50V0.5H54V24H50V13.5H40V24H36Z" 
        fill="currentColor"
      />
      <path 
        d="M58 24V0.5H78V4.5H62V10H76V14H62V20H78V24H58Z" 
        fill="currentColor"
      />
    </svg>
  );
};

export const VerifiedCheckmark: React.FC<{ className?: string, size?: number }> = ({ 
  className, 
  size = 24 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity="0.1" />
      <path 
        d="M16.5 8.5L10.5 14.5L7.5 11.5" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

export const VerificationIcon: React.FC<{ className?: string, size?: number }> = ({ 
  className, 
  size = 24 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M12 1L15.5 8.5L23 10L17.5 15.5L19 23L12 19.5L5 23L6.5 15.5L1 10L8.5 8.5L12 1Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};
