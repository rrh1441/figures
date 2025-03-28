
import React, { useState } from "react";
import { ArrowRight, Camera, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import VerificationBadge from "../verification/VerificationBadge";
import { VerificationType } from "@/hooks/use-verification";

const ProfileScreen: React.FC = () => {
  const [name] = useState("Alex Johnson");
  const [age] = useState(28);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [selectedVerifications, setSelectedVerifications] = useState<VerificationType[]>([]);
  const [currentVerification, setCurrentVerification] = useState<VerificationType | null>(null);
  const [verifiedItems, setVerifiedItems] = useState<VerificationType[]>(["identity"]);
  const navigate = useNavigate();

  const verificationOptions: { type: VerificationType; label: string }[] = [
    { type: "networth", label: "Net Worth" },
    { type: "height", label: "Height" },
    { type: "education", label: "Education" },
    { type: "career", label: "Job" },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleVerificationSelection = (type: VerificationType) => {
    setSelectedVerifications(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const startVerificationProcess = () => {
    if (selectedVerifications.length > 0) {
      setCurrentVerification(selectedVerifications[0]);
      setIsVerificationModalOpen(false);
    }
  };

  const completeCurrentVerification = () => {
    if (currentVerification) {
      setVerifiedItems(prev => [...prev, currentVerification]);
      
      // Move to next verification or finish
      const currentIndex = selectedVerifications.indexOf(currentVerification);
      if (currentIndex < selectedVerifications.length - 1) {
        setCurrentVerification(selectedVerifications[currentIndex + 1]);
      } else {
        setCurrentVerification(null);
        setSelectedVerifications([]);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <div className="px-4 py-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Your Profile</h1>
      </div>

      {/* Profile Content */}
      <div className="flex-1 p-4">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700">
                <Camera size={40} className="text-gray-500" />
              </div>
            )}
            <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-white text-black rounded-full p-2 cursor-pointer">
              <Camera size={20} />
              <input 
                type="file" 
                id="profile-image" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
            </label>
          </div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {name}
            <CheckCircle2 size={20} className="text-green-500" />
          </h2>
          <p className="text-gray-400">Age: {age}</p>
        </div>

        {/* Verification Status */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Verified Information</h3>
          <div className="grid grid-cols-2 gap-4">
            {verificationOptions.map(({ type, label }) => (
              <div key={type} className="bg-gray-900 p-4 rounded-lg flex items-center gap-3">
                <VerificationBadge 
                  type={type} 
                  verified={verifiedItems.includes(type)} 
                  size="md"
                />
                <div>
                  <span className="text-sm text-gray-400">{label}</span>
                  <p className="text-sm font-medium">
                    {verifiedItems.includes(type) ? "Verified" : "Not Verified"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Get Verified Button */}
        <button 
          onClick={() => setIsVerificationModalOpen(true)}
          className="btn-primary w-full flex items-center justify-center gap-2 group"
        >
          <span>Get Verified</span>
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={18} />
        </button>
      </div>

      {/* Verification Selection Modal */}
      <Dialog open={isVerificationModalOpen} onOpenChange={setIsVerificationModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Choose Verifications</DialogTitle>
            <DialogDescription className="text-gray-400">
              Select which aspects of your profile you would like to verify
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {verificationOptions.map(({ type, label }) => (
              <div key={type} className="flex items-center space-x-3 mb-4">
                <input
                  type="checkbox"
                  id={`verify-${type}`}
                  checked={selectedVerifications.includes(type) || verifiedItems.includes(type)}
                  onChange={() => toggleVerificationSelection(type)}
                  disabled={verifiedItems.includes(type)}
                  className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-white"
                />
                <Label 
                  htmlFor={`verify-${type}`} 
                  className={verifiedItems.includes(type) ? "text-gray-500" : "text-white"}
                >
                  {label} {verifiedItems.includes(type) && "(Already Verified)"}
                </Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsVerificationModalOpen(false)}
              className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button 
              onClick={startVerificationProcess}
              className="bg-white text-black hover:bg-gray-200"
              disabled={selectedVerifications.length === 0}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Individual Verification Screens */}
      {currentVerification && (
        <div className="fixed inset-0 bg-black flex flex-col z-50">
          <div className="px-4 py-6 border-b border-gray-800">
            <h1 className="text-2xl font-bold">
              Verify {verificationOptions.find(v => v.type === currentVerification)?.label}
            </h1>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-8">
              <VerificationBadge 
                type={currentVerification} 
                verified={false} 
                size="lg"
              />
            </div>
            <h2 className="text-xl font-bold mb-4">
              Verify your {verificationOptions.find(v => v.type === currentVerification)?.label}
            </h2>
            <p className="text-gray-400 mb-8">
              {currentVerification === "networth" && "Connect with Plaid to verify your assets and net worth"}
              {currentVerification === "height" && "Upload a measurement photo to verify your height"}
              {currentVerification === "education" && "Connect to National Student Clearinghouse to verify your education"}
              {currentVerification === "career" && "Connect to LinkedIn to verify your current and past positions"}
            </p>
            <button 
              onClick={completeCurrentVerification}
              className="btn-primary w-full flex items-center justify-center gap-2 group"
            >
              <span>Complete Verification</span>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
