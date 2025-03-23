
import React from "react";
import { Heart, X, MessageSquare } from "lucide-react";
import VerificationBadge from "../verification/VerificationBadge";

export interface ProfileData {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  images: string[];
  verifications: {
    identity: boolean;
    networth: boolean;
    education: boolean;
    career: boolean;
    height: boolean;
  };
  details: {
    education?: string;
    career?: string;
    networth?: string;
    height?: string;
  };
}

interface ProfileCardProps {
  profile: ProfileData;
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
  onMessage?: (id: string) => void;
  expanded?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  onLike, 
  onDislike, 
  onMessage,
  expanded = false
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  const nextImage = () => {
    if (currentImageIndex < profile.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  
  return (
    <div className={`relative overflow-hidden rounded-xl bg-card ${expanded ? "h-auto" : "h-[36rem]"} shadow-lg`}>
      {/* Image gallery */}
      <div className="relative w-full h-[70%]">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out animate-fade-in"
          style={{ backgroundImage: `url(${profile.images[currentImageIndex]})` }}
        />
        
        {/* Image navigation dots */}
        <div className="absolute top-4 left-0 right-0 flex justify-center gap-1">
          {profile.images.map((_, index) => (
            <div 
              key={index} 
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? "bg-white" : "bg-white/30"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
        
        {/* Touch areas for image navigation */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full" onClick={prevImage} />
          <div className="w-1/2 h-full" onClick={nextImage} />
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
        
        {/* Name and age */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white">{profile.name}, {profile.age}</h2>
            {profile.verifications.identity && (
              <VerificationBadge type="identity" verified={true} size="sm" />
            )}
          </div>
          <p className="text-white/70">{profile.location}</p>
        </div>
      </div>
      
      {/* Profile info */}
      <div className="p-4 bg-card h-[30%] overflow-y-auto no-scrollbar">
        {/* Verification badges */}
        <div className="flex justify-between mb-4">
          <VerificationBadge 
            type="networth" 
            verified={profile.verifications.networth} 
            value={profile.details.networth}
            showLabel
          />
          <VerificationBadge 
            type="education" 
            verified={profile.verifications.education} 
            value={profile.details.education}
            showLabel
          />
          <VerificationBadge 
            type="career" 
            verified={profile.verifications.career} 
            value={profile.details.career}
            showLabel
          />
          <VerificationBadge 
            type="height" 
            verified={profile.verifications.height} 
            value={profile.details.height}
            showLabel
          />
        </div>
        
        {/* Bio */}
        <p className="text-card-foreground mb-4">{profile.bio}</p>
        
        {/* Action buttons */}
        <div className="flex justify-between gap-4 mt-auto">
          <button 
            onClick={() => onDislike && onDislike(profile.id)}
            className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all hover:bg-destructive hover:text-white"
          >
            <X size={24} />
          </button>
          
          <button 
            onClick={() => onMessage && onMessage(profile.id)}
            className="flex-1 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center gap-2 transition-all hover:bg-secondary"
          >
            <MessageSquare size={20} />
            <span>Message</span>
          </button>
          
          <button 
            onClick={() => onLike && onLike(profile.id)}
            className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all hover:bg-primary hover:text-white"
          >
            <Heart size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
