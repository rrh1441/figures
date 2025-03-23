
import React from "react";
import { BadgeCheck, DollarSign, GraduationCap, Briefcase, Ruler } from "lucide-react";

export type VerificationType = "identity" | "networth" | "education" | "career" | "height";

interface VerificationBadgeProps {
  type: VerificationType;
  verified: boolean;
  value?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  type,
  verified,
  value,
  size = "md",
  showLabel = false,
}) => {
  const getIcon = () => {
    switch (type) {
      case "identity":
        return BadgeCheck;
      case "networth":
        return DollarSign;
      case "education":
        return GraduationCap;
      case "career":
        return Briefcase;
      case "height":
        return Ruler;
      default:
        return BadgeCheck;
    }
  };

  const getLabel = () => {
    switch (type) {
      case "identity":
        return "Identity";
      case "networth":
        return "Net Worth";
      case "education":
        return "Education";
      case "career":
        return "Career";
      case "height":
        return "Height";
      default:
        return "Verified";
    }
  };

  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  const Icon = getIcon();

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center ${
          verified
            ? "bg-white/10 border border-white/30 text-white"
            : "bg-gray-200/10 border border-gray-200/30 text-gray-400"
        } ${verified ? "verified-outline" : ""}`}
      >
        <Icon size={iconSizes[size]} />
      </div>
      
      {showLabel && (
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">{getLabel()}</span>
          {value && <span className="text-sm font-medium">{value}</span>}
        </div>
      )}
    </div>
  );
};

export default VerificationBadge;
