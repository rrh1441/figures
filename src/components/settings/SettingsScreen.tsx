
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import {
  User,
  Shield,
  Bell,
  Lock,
  HelpCircle,
  LogOut,
  ChevronRight,
  CreditCard,
  DollarSign
} from "lucide-react";
import VerificationBadge from "../verification/VerificationBadge";

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  
  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Edit Profile",
          onClick: () => console.log("Edit Profile"),
          chevron: true
        },
        {
          icon: CreditCard,
          label: "Subscription",
          info: "Premium",
          onClick: () => console.log("Subscription"),
          chevron: true
        }
      ]
    },
    {
      title: "Verification",
      items: [
        {
          icon: Shield,
          label: "Identity Verification",
          verified: true,
          onClick: () => console.log("Identity Verification"),
          chevron: true
        },
        {
          icon: DollarSign,
          label: "Financial Verification",
          verified: true,
          info: "Last verified: 2 months ago",
          onClick: () => console.log("Financial Verification"),
          chevron: true
        }
      ]
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          onClick: () => console.log("Notifications"),
          chevron: true
        },
        {
          icon: Lock,
          label: "Privacy",
          onClick: () => console.log("Privacy"),
          chevron: true
        }
      ]
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help & Support",
          onClick: () => console.log("Help & Support"),
          chevron: true
        }
      ]
    }
  ];
  
  const handleLogout = () => {
    // Clear session etc.
    navigate("/");
  };
  
  return (
    <Layout>
      <div className="flex flex-col h-full px-4 pt-6 pb-24">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        
        {/* Profile card */}
        <div className="flex items-center gap-4 p-4 bg-card rounded-lg mb-6 animate-fade-in">
          <div className="relative">
            <div 
              className="w-16 h-16 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80)` }}
            />
            <div className="absolute -bottom-1 -right-1">
              <VerificationBadge type="identity" verified={true} size="sm" />
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Daniel Morgan</h2>
            <p className="text-muted-foreground">Premium Member</p>
          </div>
          
          <button 
            onClick={() => console.log("Edit profile")}
            className="btn-outline py-2 px-4"
          >
            Edit
          </button>
        </div>
        
        {/* Settings sections */}
        <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar">
          {settingsSections.map((section, sIndex) => (
            <div key={section.title} className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground px-1">
                {section.title}
              </h3>
              
              <div className="bg-card rounded-lg overflow-hidden">
                {section.items.map((item, iIndex) => (
                  <div
                    key={item.label}
                    onClick={item.onClick}
                    className="flex items-center justify-between p-4 hover:bg-secondary/30 cursor-pointer transition-colors"
                    style={{
                      borderBottomWidth: iIndex < section.items.length - 1 ? 1 : 0,
                      borderBottomColor: "hsl(var(--border))",
                      borderBottomStyle: "solid"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <item.icon size={20} />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{item.label}</span>
                          {"verified" in item && (
                            <VerificationBadge 
                              type="identity" 
                              verified={item.verified as boolean} 
                              size="sm"
                            />
                          )}
                        </div>
                        {"info" in item && (
                          <span className="text-xs text-muted-foreground">
                            {item.info}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {item.chevron && <ChevronRight size={20} className="text-muted-foreground" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-4 mt-6 text-destructive"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </Layout>
  );
};

export default SettingsScreen;
