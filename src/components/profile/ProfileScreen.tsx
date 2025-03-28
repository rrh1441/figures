import React, { useState } from "react";
import Layout from "../layout/Layout";
import ProfileCard from "./ProfileCard";
import { Button } from "@/components/ui/button";
import { Camera, User, ChevronRight, Shield } from "lucide-react";
import { useVerification, VerificationType } from "@/hooks/use-verification";
import VerificationModal from "../verification/VerificationModal";
import VerificationScreen from "../verification/VerificationScreen";
import { VerificationBadge } from "../verification/VerificationBadge";

const ProfileScreen: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [currentVerification, setCurrentVerification] = useState<VerificationType | null>(null);
  const { verifiedStatus, verifyItem } = useVerification();
  
  // Simulated user data (in a real app, this would come from Plaid or a backend)
  const userData = {
    name: "Alex Johnson",
    age: 28,
    // Other profile information
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleVerificationSelect = (types: VerificationType[]) => {
    if (types.length > 0) {
      setCurrentVerification(types[0]);
    }
  };
  
  const handleVerificationComplete = () => {
    setCurrentVerification(null);
  };
  
  if (currentVerification) {
    return (
      <VerificationScreen 
        type={currentVerification}
        onComplete={handleVerificationComplete}
        onBack={handleVerificationComplete}
      />
    );
  }
  
  return (
    <Layout>
      <div className="flex flex-col space-y-6 p-4">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-primary">
              {avatar ? (
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={64} className="text-muted-foreground" />
              )}
            </div>
            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer">
              <Camera size={20} />
              <input 
                id="avatar-upload" 
                type="file" 
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          
          <h1 className="text-2xl font-bold">{userData.name}</h1>
          <p className="text-muted-foreground">{userData.age} years old</p>
          <p className="text-sm text-muted-foreground mt-1">New York, NY</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Verified Information</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsVerificationModalOpen(true)}
              className="flex items-center gap-1"
            >
              Get Verified <ChevronRight size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center p-3 rounded-lg border">
              <Shield className="mr-2" size={18} />
              <div>
                <p className="text-sm font-medium">Identity</p>
                <VerificationBadge verified={verifiedStatus.identity} />
              </div>
            </div>
            
            <div className="flex items-center p-3 rounded-lg border">
              <Shield className="mr-2" size={18} />
              <div>
                <p className="text-sm font-medium">Net Worth</p>
                <VerificationBadge verified={verifiedStatus.networth} />
              </div>
            </div>
            
            <div className="flex items-center p-3 rounded-lg border">
              <Shield className="mr-2" size={18} />
              <div>
                <p className="text-sm font-medium">Education</p>
                <VerificationBadge verified={verifiedStatus.education} />
              </div>
            </div>
            
            <div className="flex items-center p-3 rounded-lg border">
              <Shield className="mr-2" size={18} />
              <div>
                <p className="text-sm font-medium">Job</p>
                <VerificationBadge verified={verifiedStatus.career} />
              </div>
            </div>
            
            <div className="flex items-center p-3 rounded-lg border">
              <Shield className="mr-2" size={18} />
              <div>
                <p className="text-sm font-medium">Height</p>
                <VerificationBadge verified={verifiedStatus.height} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">About Me</h2>
          <Button variant="outline" className="w-full justify-start">
            Add your bio
          </Button>
        </div>
      </div>
      
      <VerificationModal 
        open={isVerificationModalOpen}
        onOpenChange={setIsVerificationModalOpen}
        onSelectVerifications={handleVerificationSelect}
      />
    </Layout>
  );
};

export default ProfileScreen;
