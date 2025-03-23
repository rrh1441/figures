
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import ProfileCard, { ProfileData } from "../profile/ProfileCard";
import { Filter } from "lucide-react";

// Sample data
const sampleProfiles: ProfileData[] = [
  {
    id: "1",
    name: "Olivia",
    age: 28,
    location: "New York, NY",
    bio: "Finance professional who loves traveling and fitness. Looking for someone with similar interests and ambitions.",
    images: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80"
    ],
    verifications: {
      identity: true,
      networth: true,
      education: true,
      career: true,
      height: true
    },
    details: {
      education: "MBA, Harvard",
      career: "Investment Banking",
      networth: "$1M-$5M",
      height: "5'7\""
    }
  },
  {
    id: "2",
    name: "Alexander",
    age: 32,
    location: "San Francisco, CA",
    bio: "Tech entrepreneur who enjoys hiking and photography. Looking for someone who appreciates both adventure and quiet moments.",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    ],
    verifications: {
      identity: true,
      networth: true,
      education: true,
      career: true,
      height: false
    },
    details: {
      education: "CS, Stanford",
      career: "Founder & CEO",
      networth: "$5M-$10M",
      height: "6'0\""
    }
  },
  {
    id: "3",
    name: "Sophia",
    age: 30,
    location: "Los Angeles, CA",
    bio: "Entertainment attorney who loves beach volleyball and wine tasting. Looking for genuine connection and shared experiences.",
    images: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    ],
    verifications: {
      identity: true,
      networth: false,
      education: true,
      career: true,
      height: true
    },
    details: {
      education: "JD, UCLA",
      career: "Attorney",
      networth: "Unverified",
      height: "5'9\""
    }
  }
];

const HomeScreen: React.FC = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const navigate = useNavigate();
  
  const handleLike = (id: string) => {
    console.log(`Liked profile ${id}`);
    // Move to next profile with animation
    if (currentProfileIndex < sampleProfiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    }
  };
  
  const handleDislike = (id: string) => {
    console.log(`Disliked profile ${id}`);
    // Move to next profile with animation
    if (currentProfileIndex < sampleProfiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    }
  };
  
  const handleMessage = (id: string) => {
    navigate(`/messages/${id}`);
  };
  
  const currentProfile = sampleProfiles[currentProfileIndex];
  
  return (
    <Layout>
      <div className="flex flex-col h-full px-4 py-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">FIGURES</h1>
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <Filter size={20} />
          </button>
        </div>
        
        {/* Profiles */}
        <div className="flex-1 overflow-hidden">
          {currentProfile && (
            <ProfileCard 
              profile={currentProfile}
              onLike={handleLike}
              onDislike={handleDislike}
              onMessage={handleMessage}
            />
          )}
          
          {currentProfileIndex >= sampleProfiles.length && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-card rounded-xl animate-fade-in">
              <h2 className="text-2xl font-bold mb-4">No more profiles</h2>
              <p className="text-muted-foreground mb-8">
                We're finding more verified matches for you. Check back soon!
              </p>
              <button 
                onClick={() => setCurrentProfileIndex(0)}
                className="btn-primary"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomeScreen;
