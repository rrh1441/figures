
import React from "react";
import Layout from "../layout/Layout";
import VerificationBadge from "../verification/VerificationBadge";
import { Edit, Settings, Plus } from "lucide-react";

const ProfileScreen: React.FC = () => {
  const profile = {
    name: "Daniel Morgan",
    age: 32,
    location: "San Francisco, CA",
    bio: "Finance professional with a passion for travel, fitness, and great conversations. Looking for meaningful connections.",
    images: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    ],
    verifications: {
      identity: true,
      networth: true,
      education: true,
      career: true,
      height: true
    },
    details: {
      education: "MBA, Stanford",
      career: "Investment Banking",
      networth: "$1M-$5M",
      height: "6'0\""
    }
  };
  
  return (
    <Layout>
      <div className="flex flex-col pb-20">
        {/* Header image */}
        <div 
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${profile.images[0]})` }}
        >
          <div className="flex justify-end p-4">
            <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Settings size={20} className="text-white" />
            </button>
          </div>
        </div>
        
        {/* Profile info */}
        <div className="bg-card rounded-t-3xl -mt-6 relative z-10 px-4 py-6">
          <div className="flex items-end gap-4 mb-6">
            <div className="relative -mt-16">
              <div 
                className="w-24 h-24 rounded-full border-4 border-card bg-cover bg-center"
                style={{ backgroundImage: `url(${profile.images[0]})` }}
              />
              <div className="absolute -bottom-1 -right-1">
                <VerificationBadge type="identity" verified={true} />
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {profile.name}, {profile.age}
              </h1>
              <p className="text-muted-foreground">{profile.location}</p>
            </div>
            
            <button className="btn-outline py-2 px-4 flex items-center gap-1">
              <Edit size={16} />
              <span>Edit</span>
            </button>
          </div>
          
          {/* Bio */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">About me</h2>
            <p className="text-muted-foreground">{profile.bio}</p>
          </div>
          
          {/* Verification details */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Verified details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <VerificationBadge type="education" verified={profile.verifications.education} />
                <div>
                  <div className="text-sm text-muted-foreground">Education</div>
                  <div className="font-medium">{profile.details.education}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <VerificationBadge type="career" verified={profile.verifications.career} />
                <div>
                  <div className="text-sm text-muted-foreground">Career</div>
                  <div className="font-medium">{profile.details.career}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <VerificationBadge type="networth" verified={profile.verifications.networth} />
                <div>
                  <div className="text-sm text-muted-foreground">Net Worth</div>
                  <div className="font-medium">{profile.details.networth}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <VerificationBadge type="height" verified={profile.verifications.height} />
                <div>
                  <div className="text-sm text-muted-foreground">Height</div>
                  <div className="font-medium">{profile.details.height}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Photo gallery */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Photos</h2>
            <div className="grid grid-cols-3 gap-2">
              {profile.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                />
              ))}
              <button className="aspect-square rounded-lg bg-secondary/50 flex items-center justify-center">
                <Plus size={24} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileScreen;
