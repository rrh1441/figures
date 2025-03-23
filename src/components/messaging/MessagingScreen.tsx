
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { ArrowLeft, Send, Phone, Video, MoreVertical } from "lucide-react";
import VerificationBadge from "../verification/VerificationBadge";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
}

const MessagingScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! I noticed we're both in finance. Where do you work?",
      sender: "other",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    {
      id: "2",
      text: "I'm at Goldman Sachs, what about you?",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1) // 1 hour ago
    },
    {
      id: "3",
      text: "I'm at JP Morgan! Would love to hear more about your role.",
      sender: "other",
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    }
  ]);
  
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;
    
    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      text: message,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate reply
    setTimeout(() => {
      const replyMessage: Message = {
        id: (messages.length + 2).toString(),
        text: "That sounds interesting! Would you like to grab coffee sometime?",
        sender: "other",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, replyMessage]);
    }, 2000);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <Layout hideNavigation>
      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        <div className="glass-dark flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/messages")}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-cover bg-center" style={{ 
                backgroundImage: `url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80)` 
              }} />
              
              <div>
                <div className="flex items-center gap-1">
                  <h2 className="font-semibold">Olivia</h2>
                  <VerificationBadge type="identity" verified={true} size="sm" />
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5">
              <Phone size={20} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5">
              <Video size={20} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl p-3 ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground ml-12"
                    : "bg-secondary text-secondary-foreground mr-12"
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === "user" ? "text-white/70" : "text-muted-foreground"
                }`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-3 rounded-full bg-secondary text-secondary-foreground focus:outline-none"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
              disabled={message.trim() === ""}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default MessagingScreen;
