
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { Search } from "lucide-react";
import VerificationBadge from "../verification/VerificationBadge";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
  avatar: string;
  verified: boolean;
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Olivia",
    lastMessage: "I'm at JP Morgan! Would love to hear more about your role.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unread: true,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    verified: true
  },
  {
    id: "2",
    name: "Alexander",
    lastMessage: "Would you be interested in getting coffee this weekend?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    unread: false,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    verified: true
  },
  {
    id: "3",
    name: "Sophia",
    lastMessage: "I just got tickets to that concert we talked about!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unread: false,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    verified: true
  }
];

const MessagingListScreen: React.FC = () => {
  const navigate = useNavigate();
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const dayDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (dayDiff === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (dayDiff === 1) {
      return "Yesterday";
    } else if (dayDiff < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  return (
    <Layout>
      <div className="flex flex-col h-full px-4 pt-6 pb-20">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6">
          <h1 className="text-2xl font-bold">Messages</h1>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations"
              className="w-full py-3 pl-10 pr-4 rounded-full bg-secondary text-secondary-foreground focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          </div>
        </div>
        
        {/* Conversations list */}
        <div className="space-y-1">
          {conversations.map((convo) => (
            <div
              key={convo.id}
              onClick={() => navigate(`/messages/${convo.id}`)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
            >
              {/* Avatar */}
              <div className="relative">
                <div 
                  className="w-12 h-12 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${convo.avatar})` }}
                />
                {convo.verified && (
                  <div className="absolute -bottom-1 -right-1">
                    <VerificationBadge type="identity" verified={true} size="sm" />
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{convo.name}</h3>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(convo.timestamp)}
                  </span>
                </div>
                <p className={`text-sm truncate ${
                  convo.unread ? "font-medium text-foreground" : "text-muted-foreground"
                }`}>
                  {convo.lastMessage}
                </p>
              </div>
              
              {/* Unread indicator */}
              {convo.unread && (
                <div className="w-3 h-3 rounded-full bg-primary" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MessagingListScreen;
